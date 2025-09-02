import { useAppContext } from "@/components/appContext";
import { BASE_API_URL } from "@/components/network/apiConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import React from 'react';
import { Alert, Button } from 'react-native';

const LAST_UPDATE_KEY = 'lastUpdate'; // Define your LAST_UPDATE_KEY here

const LogoutButton = () => {

  const { trackingData, setProfile, setMyPrograms, setTrackingData, setMealPrograms, setprofileImagePaths, setMasterGymProgramsDictionary } = useAppContext();

  const clearStorage = async () => {
    try {
        // Set items in AsyncStorage to null
        await AsyncStorage.removeItem('profile');
        await AsyncStorage.removeItem('myPrograms');
        await AsyncStorage.removeItem('trackingData');
        await AsyncStorage.removeItem('mealPrograms');
        await AsyncStorage.removeItem('profileImagePaths');
        await AsyncStorage.removeItem('masterGymProgramsDictionary');
        await AsyncStorage.removeItem(LAST_UPDATE_KEY);
        await AsyncStorage.removeItem("purchaseQueue");

        // Remove authentication token from SecureStore
        await SecureStore.deleteItemAsync('jwtToken');
        setProfile(undefined);
        setMyPrograms(undefined);
        setTrackingData(undefined);
        setMealPrograms(undefined);
        setprofileImagePaths(undefined);
        setMasterGymProgramsDictionary(undefined);

      Alert.alert('Logout Successful', 'You have been logged out.', [{ text: 'OK' }]);
    } catch (error) {
      console.error("Error clearing storage:", error);
      Alert.alert('Error', 'There was an error logging you out. Please try again.');
    }
  };

  const SubmitTrackingData = async (trackingDictionary: any) => { 
    // Fetch the jwt from securestore
    const retrievedToken = await SecureStore.getItemAsync('jwtToken');
    if (retrievedToken && trackingDictionary) {
      try {
          const url = `${BASE_API_URL}/saveMealTracking`;
          const response = await fetch(url, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  trackingData: trackingDictionary.meals,
                  token: retrievedToken
              }),
          });
          if (response.ok) {
            clearStorage();
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      } catch (error) {
          console.error('Error pushing data:', error);
         return null; 
      }
    };
  }

  return (
    <Button title="Logout" onPress={()=>SubmitTrackingData(trackingData)}/>
  );
};

export default LogoutButton;
