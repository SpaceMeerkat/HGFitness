import { BASE_API_URL } from "@/components/network/apiConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';


interface ActivateGymProps {
    profile: any;
    setProfile: any;
    myPrograms: any; 
    setMyPrograms: any;
    trackingData: any;
    setTrackingData: any;
}

export async function ActivateGymSubscriptionToggle({profile, setProfile, myPrograms, setMyPrograms, trackingData, setTrackingData}: ActivateGymProps) {

    const getSecureToken = async () => {
        try {
            const retrievedToken = await SecureStore.getItemAsync('jwtToken');
            if (!retrievedToken) {
                console.warn("No JWT token found in SecureStore.");
                // Optionally handle this error, e.g., redirect to login
            }
            return retrievedToken;
        } catch (error) {
            console.error("Failed to retrieve token from SecureStore:", error);
            return null; // Return null on error
        }
    };

    const sendPriumToggleRequest = async (token: string, currentSubscriptionState: boolean): Promise<any | null> => {
        try {
            const response = await fetch(`${BASE_API_URL}/toggleGymSubscription`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: token,
                    currentSubscriptionState: currentSubscriptionState,
                    trackingData: trackingData,
                    myPrograms: myPrograms,
                    transactionQueue: profile.purchaseQueue
                }),
            });

            if (response.ok) {
                const jsonResponse = await response.json();
                const newSubscriptionState = jsonResponse.newGymSubscriptionState;
                const newNotifications = jsonResponse.newNotifications;
                const updatedMyPrograms = jsonResponse.myPrograms;
                const updatedGymTrackingData = jsonResponse.trackingData;
                const newPurchaseQueue = jsonResponse.newPurchaseQueue;
                return {newSubscriptionState, newNotifications, updatedMyPrograms, updatedGymTrackingData, newPurchaseQueue}; // Return the updated profile
            } else {
                console.error("Gym Subscription toggle failed with status:", response.status, await response.text());
                return null;
            }
        } catch (error) {
            console.error("Gym Subscription toggle request failed:", error);
            return null;
        }
    };

    const executeSubscriptionToggle = async () => { // Make this function async
        // Step 1: Retrieve the token (await its resolution)
        const token = await getSecureToken();

        if (!token) {
            // Handle case where token is not found or retrieval failed
            console.error("Cannot proceed without a valid token.");
            return;
        }

        const {newSubscriptionState, newNotifications, updatedMyPrograms, updatedGymTrackingData, newPurchaseQueue} = await sendPriumToggleRequest(token, profile.gymSubscription);

        // Step 3: Use the returned profile data
        if (newSubscriptionState != null) {
            //--------------------------------------------------------------------------
            // Update the profile gym subscription status
            const updatedProfile = {
                ...profile,
                gymSubscription: newSubscriptionState,
                myPrograms: updatedMyPrograms,
                purchaseQueue: newPurchaseQueue,
                notifications: newNotifications
            };
            setProfile(updatedProfile);
            await AsyncStorage.setItem('profile', JSON.stringify(updatedProfile));
            //--------------------------------------------------------------------------
            // Update the booleans for accessible programs
            setMyPrograms(updatedMyPrograms);
            await AsyncStorage.setItem('myPrograms', JSON.stringify(updatedMyPrograms));
            //--------------------------------------------------------------------------
            // Update the tracking data to include memory keys for the subscription gym programs
            setTrackingData(updatedGymTrackingData);
            await AsyncStorage.setItem('trackingData', JSON.stringify(updatedGymTrackingData));
            //--------------------------------------------------------------------------
        } else {
            console.warn("Gym Subscription toggle operation did not return an updated profile.");
        }
    };

    await executeSubscriptionToggle();
}