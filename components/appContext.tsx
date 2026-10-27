import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Network from 'expo-network';
import React, { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { Alert, AppState, Linking } from 'react-native';
import { api, ApiError, clearToken, getToken, setToken } from './network/api';

// Everything the app shows, persisted as one AsyncStorage entry so it's available offline and on restart
type AppData = {
  profile: any | null;
  mealPrograms: any | null;
  masterGymProgramsDictionary: any | null;
  myPrograms: any | null;
  beginnerPrograms: any | null;
  intermediatePrograms: any | null;
  advancedPrograms: any | null;
  trackingData: any | null;
  profileImagePaths: { [key: string]: string };
  bestSellers: any | null;
};

const EMPTY: AppData = {
  profile: null, mealPrograms: null, masterGymProgramsDictionary: null, myPrograms: null, beginnerPrograms: null,
  intermediatePrograms: null, advancedPrograms: null, trackingData: null, profileImagePaths: null as any, bestSellers: null,
};
const USER_FIELDS: (keyof AppData)[] = ['profile', 'mealPrograms', 'myPrograms', 'trackingData'];

const STATE_KEY = 'hgState';
// Storage keys used by v1 of the app, removed on first start
const V1_KEYS = ['profile', 'masterGymProgramsDictionary', 'mealPrograms', 'myPrograms', 'beginnerPrograms',
  'intermediatePrograms', 'advancedPrograms', 'trackingData', 'profileImagePaths', 'bestSellers', 'lastUpdateDate'];

const PAYMENT_POLL_ATTEMPTS = 6;
const PAYMENT_POLL_INTERVAL_MS = 5000;

type ItemCategory = 'gymplan' | 'premium' | 'gymSubscription';
type SubscriptionCategory = 'premium' | 'gymSubscription';

interface AppContextType extends AppData {
  loading: boolean | null;
  isConnected: boolean | null;
  setProfile: (profile: any | null) => void;
  setMyPrograms: (myPrograms: any | null) => void;
  setTrackingData: (trackingData: any | null) => void;
  updateData: (force?: boolean) => Promise<void>;
  recheckConnectivity: () => Promise<void>;
  login: (email: string, password: string) => Promise<string>;
  signup: (username: string, email: string, password: string) => Promise<string>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<string>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<string>;
  changeUsername: (username: string) => Promise<boolean>;
  contactSupport: (message: string) => Promise<boolean>;
  setAvatar: (avatarURL: string) => Promise<boolean>;
  saveProgramSession: (programID: string, week: string, day: string, sessionData: any) => Promise<boolean>;
  rerunProgram: (programID: string) => Promise<boolean>;
  startCheckout: (itemCategory: ItemCategory, itemName?: string) => Promise<void>;
  checkPendingPayments: () => Promise<void>;
  cancelSubscription: (itemCategory: SubscriptionCategory) => Promise<boolean>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const isToday = (dateString: string) => {
  const lastUpdate = new Date(dateString);
  const today = new Date();
  return lastUpdate.getDate() === today.getDate() &&
         lastUpdate.getMonth() === today.getMonth() &&
         lastUpdate.getFullYear() === today.getFullYear();
};

const checkConnectivity = async (): Promise<boolean> => {
  try {
    const networkState = await Network.getNetworkStateAsync();
    return (networkState.isConnected && networkState.isInternetReachable) ?? false;
  } catch {
    return false;
  }
};

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AppData>(EMPTY);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean | null>(true);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  // The latest values, for async actions that run across several renders (kept current by the effect below)
  const dataRef = useRef(data);
  const lastUpdateRef = useRef(lastUpdate);
  const hydrated = useRef(false);
  const polling = useRef(false);

  const setField = <K extends keyof AppData>(key: K) => (value: AppData[K]) =>
    setData(current => ({ ...current, [key]: value }));
  const setProfile = setField('profile');
  const setMyPrograms = setField('myPrograms');
  const setTrackingData = setField('trackingData');

  // Keep the refs current and persist whenever anything changes (once the stored copy has been loaded)
  useEffect(() => {
    dataRef.current = data;
    lastUpdateRef.current = lastUpdate;
    if (!hydrated.current) return;
    AsyncStorage.setItem(STATE_KEY, JSON.stringify({ ...data, lastUpdate })).catch(error =>
      console.error('Failed to save app state:', error));
  }, [data, lastUpdate]);

  // Takes a backend response and puts whatever it contains into state
  const applyResponse = async (response: any) => {
    if (response.token) await setToken(response.token);
    setData(current => ({
      ...current,
      profile: response.profile ?? current.profile,
      mealPrograms: response.mealPrograms ?? current.mealPrograms,
      myPrograms: response.myPrograms ?? current.myPrograms,
      trackingData: response.trackingData ?? current.trackingData,
      masterGymProgramsDictionary: response.gymMasterDictionary ?? current.masterGymProgramsDictionary,
      beginnerPrograms: response.beginner ?? current.beginnerPrograms,
      intermediatePrograms: response.intermediate ?? current.intermediatePrograms,
      advancedPrograms: response.advanced ?? current.advancedPrograms,
      profileImagePaths: response.profileImagePaths ?? current.profileImagePaths,
      bestSellers: response.bestSellers ?? current.bestSellers,
    }));
    setLastUpdate(new Date().toISOString());
  };

  const clearUser = async () => {
    await clearToken();
    setData(current => ({ ...current, ...Object.fromEntries(USER_FIELDS.map(k => [k, null])) }));
  };

  // Loads the stored copy into state, the first time only
  const hydrate = async () => {
    if (hydrated.current) return { data: dataRef.current, lastUpdate: lastUpdateRef.current };
    const stored = JSON.parse((await AsyncStorage.getItem(STATE_KEY)) ?? 'null');
    hydrated.current = true;
    if (!stored) {
      AsyncStorage.multiRemove(V1_KEYS).catch(() => {});
      return { data: EMPTY, lastUpdate: null };
    }
    const { lastUpdate: storedUpdate, ...storedData } = stored;
    const loaded = { ...EMPTY, ...storedData } as AppData;
    setData(loaded);
    setLastUpdate(storedUpdate ?? null);
    return { data: loaded, lastUpdate: storedUpdate as string | null };
  };

  /** Brings the user's data (or, logged out, the shop) up to date. Runs at start-up and on the first
   *  resume of a new day; within the same day the stored copy is used unless `force` is set. */
  const updateData = async (force = false) => {
    try {
      const current = await hydrate();
      const token = await getToken();
      if (!force && current.lastUpdate && isToday(current.lastUpdate) && (current.data.profile || !token)) {
        return;
      }

      const connected = await checkConnectivity();
      setIsConnected(connected);
      if (!connected) return;

      if (token) {
        try {
          // The meal day and calorie calculator go along so the previous day's tracking is saved
          await applyResponse(await api('/me/sync', {
            body: { meals: current.data.trackingData?.meals, calorieCalculator: current.data.profile?.calorieCalculator },
          }));
          return;
        } catch (error) {
          if (!(error instanceof ApiError && error.status === 401)) throw error;
          await clearUser(); // Session expired, or the password was changed on another device
        }
      }
      await applyResponse(await api('/catalog', { auth: false }));
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to update data.');
    } finally {
      setLoading(false);
    }
  };

  const recheckConnectivity = async () => {
    setLoading(true);
    await updateData(true);
  };

  // --- Accounts -------------------------------------------------------------------------------

  const login = async (email: string, password: string) => {
    const response = await api('/auth/login', { body: { email, password }, auth: false });
    if (response.message === 'success') await applyResponse(response);
    return response.message as string;
  };

  const signup = async (username: string, email: string, password: string) => {
    try {
      return (await api('/auth/signup', { body: { username, email, password }, auth: false })).message as string;
    } catch (error) {
      if (error instanceof ApiError && error.status === 400) return 'invalid_details';
      throw error;
    }
  };

  const logout = async () => {
    const { trackingData, profile } = dataRef.current;
    try {
      if (trackingData?.meals) {
        await api('/me/meal-tracking', {
          body: { trackingData: trackingData.meals, calorieCalculatorData: profile?.calorieCalculator },
        });
      }
    } catch (error) {
      console.error('Error saving meals at logout:', error);
    }
    try {
      await clearUser();
      Alert.alert('Logout Successful', 'You have been logged out.', [{ text: 'OK' }]);
    } catch (error) {
      console.error('Error clearing storage:', error);
      Alert.alert('Error', 'There was an error logging you out. Please try again.');
    }
  };

  const resetPassword = async (email: string) =>
    (await api('/auth/reset-password', { body: { email }, auth: false })).message as string;

  const changePassword = async (currentPassword: string, newPassword: string) => {
    const response = await api('/auth/change-password', { body: { currentPassword, newPassword } });
    if (response.token) await setToken(response.token);
    return response.message as string;
  };

  // Runs a request that either works or doesn't; returns whether it worked
  const attempt = async (request: () => Promise<unknown>) => {
    try {
      await request();
      return true;
    } catch (error) {
      console.error('Request failed:', error);
      return false;
    }
  };

  const changeUsername = (username: string) => attempt(async () => {
    await api('/me/username', { body: { newUsername: username } });
    setData(current => ({ ...current, profile: { ...current.profile, username } }));
  });

  const contactSupport = (message: string) => attempt(() => api('/me/support', { body: { message } }));

  const setAvatar = (avatarURL: string) => attempt(async () => {
    await api('/me/avatar', { body: { avatarURL } });
    setData(current => ({ ...current, profile: { ...current.profile, avatar: avatarURL } }));
  });

  // --- Gym programs -----------------------------------------------------------------------------

  const saveProgramSession = (programID: string, week: string, day: string, sessionData: any) => attempt(async () => {
    const result = await api('/me/program-tracking', { body: { programID, week, day, trackingData: sessionData } });
    setData(current => {
      const program = current.trackingData?.[programID] ?? {};
      return {
        ...current,
        trackingData: {
          ...current.trackingData,
          [programID]: {
            ...program,
            memoryData: { ...program.memoryData, [`week-${week}-day-${day}`]: { trackingData: sessionData } },
            completed: result.completed,
            streakDates: result.streakDates,
            rerunNumber: result.rerunNumber,
          },
        },
      };
    });
  });

  const rerunProgram = (programID: string) => attempt(async () => {
    const { freshProgramTrackingData } = await api('/me/rerun', { body: { programID } });
    setData(current => ({ ...current, trackingData: { ...current.trackingData, [programID]: freshProgramTrackingData } }));
  });

  // --- Payments ---------------------------------------------------------------------------------

  /** Opens PayFast for a purchase. The backend applies the purchase itself when PayFast confirms it;
   *  the app only watches the pending payment (profile.purchaseQueue) and refreshes once it's settled. */
  const startCheckout = async (itemCategory: ItemCategory, itemName?: string) => {
    if (!(await getToken()) || !dataRef.current.profile) {
      Alert.alert('Login Required', 'User login required.', [{ text: 'OK' }]);
      return;
    }
    try {
      const { PayFastQuery: query, PayFastUrl } = await api('/payments/checkout', {
        body: { item_category: itemCategory, item_name: itemName },
      });
      setData(current => ({
        ...current,
        profile: { ...current.profile, purchaseQueue: { ...current.profile?.purchaseQueue, [query.m_payment_id]: 'PENDING' } },
      }));
      await Linking.openURL(`${PayFastUrl}?${new URLSearchParams(query).toString()}`);
    } catch (error) {
      console.error('Error making payment:', error);
    }
  };

  /** Checks pending payments and refreshes once PayFast has settled one. Retries for a short while, as
   *  the user usually lands back in the app just before PayFast's confirmation reaches the backend. */
  const checkPendingPayments = async () => {
    if (polling.current) return;
    polling.current = true;
    try {
      for (let attemptNumber = 0; attemptNumber < PAYMENT_POLL_ATTEMPTS; attemptNumber++) {
        const queue = dataRef.current.profile?.purchaseQueue ?? {};
        const pending = Object.keys(queue).filter(id => queue[id] === 'PENDING');
        if (pending.length === 0) return;
        const statuses = await Promise.all(pending.map(id =>
          api(`/payments/status/${id}`).then(r => r.status as string).catch(error =>
            error instanceof ApiError && error.status === 404 ? 'UNKNOWN' : 'PENDING')));
        if (statuses.some(status => status !== 'PENDING')) {
          await updateData(true);
          return;
        }
        await new Promise(resolve => setTimeout(resolve, PAYMENT_POLL_INTERVAL_MS));
      }
    } finally {
      polling.current = false;
    }
  };

  const cancelSubscription = (itemCategory: SubscriptionCategory) => attempt(async () => {
    await applyResponse(await api('/payments/cancel', { body: { item_category: itemCategory } }));
  });

  useEffect(() => {
    updateData();
    // Phones usually resume the app rather than restart it, so also check on resume whether the day has
    // rolled over. Otherwise the new-day sync never runs and today's meals get added to yesterday.
    const subscription = AppState.addEventListener('change', (nextState) => {
      if (nextState === 'active' && lastUpdateRef.current && !isToday(lastUpdateRef.current)) {
        updateData(true);
      }
    });
    return () => subscription.remove();
  }, []);

  return (
    <AppContext.Provider value={{
      ...data, loading, isConnected, setProfile, setMyPrograms, setTrackingData, updateData, recheckConnectivity,
      login, signup, logout, resetPassword, changePassword, changeUsername, contactSupport, setAvatar,
      saveProgramSession, rerunProgram, startCheckout, checkPendingPayments, cancelSubscription,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};
