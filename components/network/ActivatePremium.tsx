import { BASE_API_URL } from "@/components/network/apiConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';


interface ActivatePremiumProps {
    profile: any;
    setProfile: any;
    setMealPrograms: any;
    myPrograms: any; 
    setMyPrograms: any;
    trackingData: any;
    setTrackingData: any;
}

export async function ActivatePremiumToggle({profile, setProfile, setMealPrograms, myPrograms, setMyPrograms, trackingData, setTrackingData}: ActivatePremiumProps) {

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

    const sendPriumToggleRequest = async (token: string, currentPremiumState: boolean): Promise<any | null> => {
        try {
            const response = await fetch(`${BASE_API_URL}/togglePremium`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: token,
                    currentPremiumState: currentPremiumState,
                    trackingData: trackingData,
                    myPrograms: myPrograms,
                    transactionQueue: profile.purchaseQueue
                }),
            });

            if (response.ok) {
                const jsonResponse = await response.json();
                const newPremiumState = jsonResponse.newPremiumState;
                const newPurchaseQueue = jsonResponse.newPurchaseQueue;
                const newNotifications = jsonResponse.newNotifications;
                const newCalorieTrackingState = jsonResponse.newCalorieTracking;
                const allMealPrograms = jsonResponse.mealPrograms;
                const updatedMyPrograms = jsonResponse.myPrograms;
                const updatedGymTrackingData = jsonResponse.trackingData;
                return {newPremiumState, newPurchaseQueue, newNotifications, newCalorieTrackingState, allMealPrograms, updatedMyPrograms, updatedGymTrackingData}; // Return the updated profile
            } else {
                console.error("Premium toggle failed with status:", response.status, await response.text());
                return null;
            }
        } catch (error) {
            console.error("Premium toggle request failed:", error);
            return null;
        }
    };

    const executePremiumToggle = async () => { // Make this function async
        // Step 1: Retrieve the token (await its resolution)
        const token = await getSecureToken();

        if (!token) {
            // Handle case where token is not found or retrieval failed
            console.error("Cannot proceed without a valid token.");
            return;
        }

        const {newPremiumState, newPurchaseQueue, newNotifications, newCalorieTrackingState, allMealPrograms, updatedMyPrograms, updatedGymTrackingData} = await sendPriumToggleRequest(token, profile.premium);

        // Step 3: Use the returned profile data
        if (newPremiumState != null) {
            //--------------------------------------------------------------------------
            // Update the accessible meal data
            setMealPrograms(allMealPrograms);
            await AsyncStorage.setItem('mealPrograms', JSON.stringify(allMealPrograms));
            //--------------------------------------------------------------------------
            // Update the profile premium status
            const updatedProfile = {
                ...profile,
                premium: newPremiumState,
                myPrograms: updatedMyPrograms,
                calorieCalculator: newCalorieTrackingState,
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
            console.warn("Premium toggle operation did not return an updated profile.");
        }
    };

    await executePremiumToggle();
}