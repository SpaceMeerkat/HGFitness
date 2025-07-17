import { BASE_API_URL } from "@/components/network/apiConfig"; // AppContextProvider.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

// Define the structure of the context
interface AppContextType {
  profile: any | null;
  mealPrograms: any | null;
  myPrograms: any | null;
  beginnerPrograms: any | null;
  intermediatePrograms: any | null;
  advancedPrograms: any | null;
  trackingData: any | null;
  profileImagePaths: {[key: string]: string};
  bestSellers: any | null;
  loading: boolean | null;
  setProfile: (profile: any | null) => void; // Add setProfile function;
  setMealPrograms: (mealPrograms: any | null) => void;
  setMyPrograms: (myPrograms: any | null) => void; // Add setMyPrograms function;
  setTrackingData: (trackingData: any | null) => void; // Add setTrackingData function;
  setBestSellers: (bestSellers: any | null) => void;
  setprofileImagePaths: (profileImagePaths: any | null) => void;
  setBeginnerPrograms: (beginnerPrograms: any | null) => void;
  setIntermediatePrograms: (intermediatePrograms: any | null) => void;
  setAdvancedPrograms: (advancedPrograms: any | null) => void;
  updateData: () => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppContextProviderProps {
  children: ReactNode;
}

const LAST_UPDATE_KEY = 'lastUpdateDate'; // Key to store the date of last update

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {

  // // // COMMENT OUT IN PRODUCTION MODE
  // useEffect(() => {
  //   const clearStorage = async () => {
  //     try {
  //       await SecureStore.deleteItemAsync('jwtToken');
  //       console.log("SecureStore cleared");
  //       await AsyncStorage.removeItem('profile');
  //       await AsyncStorage.removeItem('myPrograms');
  //       await AsyncStorage.removeItem('trackingData');
  //       await AsyncStorage.removeItem(LAST_UPDATE_KEY);
  //       await AsyncStorage.removeItem('profileImagePaths');
  //     } catch (error) {
  //       console.error("Error clearing SecureStore:", error);
  //     }
  //   };
  
  //   // Call the async function
  //   clearStorage();
  // }, []);

  const [profile, setProfile] = useState<any | null>(null);
  const [mealPrograms, setMealPrograms] = useState<any | null>(null);
  const [myPrograms, setMyPrograms] = useState<any | null>(null);  // Add myPrograms state
  const [beginnerPrograms, setBeginnerPrograms] = useState<any | null>(null);
  const [intermediatePrograms, setIntermediatePrograms] = useState<any | null>(null);
  const [advancedPrograms, setAdvancedPrograms] = useState<any | null>(null);
  const [trackingData, setTrackingData] = useState<any | null>(null);
  const [profileImagePaths, setprofileImagePaths] = useState<any | null>(null);
  const [bestSellers, setBestSellers] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean | null>(true);

  // Helper function to check if the last request was made not-today
  const isToday = (dateString: string) => {
    const lastUpdate = new Date(dateString);
    const today = new Date();
    return lastUpdate.getDate() === today.getDate() &&
           lastUpdate.getMonth() === today.getMonth() &&
           lastUpdate.getFullYear() === today.getFullYear();
  };

  // Function to update profile, programs, and tracking data
  const updateData = async () => {

    try {
      // Check if data is present in AsyncStorage
      // const storedProfile = null;
      const storedProfile = await AsyncStorage.getItem('profile');
      const storedMealPrograms = await AsyncStorage.getItem('mealPrograms');
      const storedMyPrograms = await AsyncStorage.getItem('myPrograms');  // Check if myPrograms is present
      const storedBeginnerPrograms = await AsyncStorage.getItem('beginnerPrograms');
      const storedIntermediatePrograms = await AsyncStorage.getItem('intermediatePrograms');
      const storedAdvancedPrograms = await AsyncStorage.getItem('advancedPrograms');
      const storedTrackingData = await AsyncStorage.getItem('trackingData');
      const storedProfileImagePaths = await AsyncStorage.getItem('profileImagePaths');
      const bestSellers = await AsyncStorage.getItem('bestSellers');
      const lastUpdateDate = await AsyncStorage.getItem(LAST_UPDATE_KEY);

      if (storedMealPrograms && bestSellers && storedProfileImagePaths && storedProfile && storedMyPrograms && storedBeginnerPrograms && storedIntermediatePrograms && storedAdvancedPrograms && storedTrackingData && lastUpdateDate && isToday(lastUpdateDate)) {
        // If the data is present and is from today, load it from AsyncStorage
        setProfile(JSON.parse(storedProfile));
        setMealPrograms(JSON.parse(storedMealPrograms));
        setMyPrograms(JSON.parse(storedMyPrograms));  // Load myPrograms from AsyncStorage
        setBeginnerPrograms(JSON.parse(storedBeginnerPrograms));
        setIntermediatePrograms(JSON.parse(storedIntermediatePrograms));
        setAdvancedPrograms(JSON.parse(storedAdvancedPrograms));
        setTrackingData(JSON.parse(storedTrackingData));
        setprofileImagePaths(JSON.parse(storedProfileImagePaths));
        setBestSellers(JSON.parse(bestSellers));
        console.log('leaving...');
        setLoading(false);
        return;  // No need to make any network requests
      }

      // If data is not from today, check for JWT token in SecureStore
      const retrievedToken = await SecureStore.getItemAsync('jwtToken');
      // If there is mealTracking data, it needs to go with the daily POST request
      let storedMealData = null;

      if (storedTrackingData !== null) {
        const parsedData = JSON.parse(storedTrackingData);
        storedMealData = parsedData.meals;
      }
      // console.log(retrievedTrackingData);  

      if (retrievedToken) {
        console.log("running full get request");
        // If token is present, make a POST request
        const loginData = { token: retrievedToken, mealTrackingData: storedMealData };

        const response = await fetch(`${BASE_API_URL}/getContext`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        } 

        const jsonResponse = await response.json();
        
        // Save the response data to AsyncStorage
        await AsyncStorage.setItem('profile', JSON.stringify(jsonResponse.profile));
        await AsyncStorage.setItem('mealPrograms', JSON.stringify(jsonResponse.mealPrograms));
        await AsyncStorage.setItem('myPrograms', JSON.stringify(jsonResponse.myPrograms));  // Save myPrograms to AsyncStorage
        await AsyncStorage.setItem('trackingData', JSON.stringify(jsonResponse.trackingData));
        await AsyncStorage.setItem('beginnerPrograms', JSON.stringify(jsonResponse.beginner));
        await AsyncStorage.setItem('intermediatePrograms', JSON.stringify(jsonResponse.intermediate));
        await AsyncStorage.setItem('advancedPrograms', JSON.stringify(jsonResponse.advanced));
        await AsyncStorage.setItem('profileImagePaths', JSON.stringify(jsonResponse.profileImagePaths));
        await AsyncStorage.setItem('bestSellers', JSON.stringify(jsonResponse.bestSellers));
        await AsyncStorage.setItem(LAST_UPDATE_KEY, new Date().toISOString());

        setProfile(jsonResponse.profile);
        setMealPrograms(jsonResponse.mealPrograms);
        setMyPrograms(jsonResponse.myPrograms);  // Update myPrograms state
        setBeginnerPrograms(jsonResponse.beginner);
        setIntermediatePrograms(jsonResponse.intermediate);
        setAdvancedPrograms(jsonResponse.advanced);
        setTrackingData(jsonResponse.trackingData);
        setprofileImagePaths(jsonResponse.profileImagePaths);
        setBestSellers(jsonResponse.bestSellers);

        setLoading(false);

      } else {
        // If no token, make a GET request
        const response = await fetch(`${BASE_API_URL}/getContext`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const jsonResponse = await response.json();

        console.log('running GET only');
        
        // Save the response data to AsyncStorage
        // await AsyncStorage.setItem('mealPrograms', JSON.stringify(jsonResponse.mealPrograms));
        await AsyncStorage.setItem('beginnerPrograms', JSON.stringify(jsonResponse.beginner));
        await AsyncStorage.setItem('intermediatePrograms', JSON.stringify(jsonResponse.intermediate));
        await AsyncStorage.setItem('advancedPrograms', JSON.stringify(jsonResponse.advanced));
        await AsyncStorage.setItem('bestSellers', JSON.stringify(jsonResponse.bestSellers));

        if (LAST_UPDATE_KEY) {
          await AsyncStorage.setItem(LAST_UPDATE_KEY, new Date().toISOString());
        }

        setMealPrograms(jsonResponse.mealPrograms);
        setBeginnerPrograms(jsonResponse.beginner);
        setIntermediatePrograms(jsonResponse.intermediate);
        setAdvancedPrograms(jsonResponse.advanced);
        setBestSellers(jsonResponse.bestSellers);
        setLoading(false);
      }

    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to update data.');
      // If there's an error, set everything to null
      setProfile(null);
      setMealPrograms(null);
      setMyPrograms(null);  // Reset myPrograms state on error
      setBeginnerPrograms(null);
      setIntermediatePrograms(null);
      setAdvancedPrograms(null);
      setTrackingData(null);
      setprofileImagePaths(null);
      setBestSellers(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load data on app start
    updateData();
  }, []);

  return (
    <AppContext.Provider value={{ profile, mealPrograms, myPrograms, beginnerPrograms, intermediatePrograms, advancedPrograms, trackingData, profileImagePaths, bestSellers, loading,
    updateData, setProfile, setMealPrograms, setMyPrograms, setTrackingData, setprofileImagePaths, setBeginnerPrograms, setIntermediatePrograms, setBestSellers,
    setAdvancedPrograms }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};
