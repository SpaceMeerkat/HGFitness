import { BASE_API_URL } from "@/components/network/apiConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";

const LAST_UPDATE_KEY = "lastUpdate";

interface UseLogoutProps {
    profile: any,
    trackingData: any,
    setProfile: any,
    setMyPrograms: any,
    setTrackingData: any,
    setMealPrograms: any,
    setprofileImagePaths: any,
    setMasterGymProgramsDictionary: any
}

export const useLogout = ({profile,trackingData,setProfile,setMyPrograms,setTrackingData,setMealPrograms,setprofileImagePaths,setMasterGymProgramsDictionary}: UseLogoutProps) => {

  const clearStorage = async () => {
    try {
      await AsyncStorage.removeItem("profile");
      await AsyncStorage.removeItem("myPrograms");
      await AsyncStorage.removeItem("trackingData");
      await AsyncStorage.removeItem("mealPrograms");
      await AsyncStorage.removeItem("profileImagePaths");
      await AsyncStorage.removeItem("masterGymProgramsDictionary");
      await AsyncStorage.removeItem(LAST_UPDATE_KEY);

      await SecureStore.deleteItemAsync("jwtToken");

      setProfile(undefined);
      setMyPrograms(undefined);
      setTrackingData(undefined);
      setMealPrograms(undefined);
      setprofileImagePaths(undefined);
      setMasterGymProgramsDictionary(undefined);

      Alert.alert("Logout Successful", "You have been logged out.", [
        { text: "OK" },
      ]);
    } catch (error) {
      console.error("Error clearing storage:", error);
      Alert.alert(
        "Error",
        "There was an error logging you out. Please try again."
      );
    }
  };

  const submitTrackingData = async (trackingDictionary: any) => {
    const retrievedToken = await SecureStore.getItemAsync("jwtToken");
    if (retrievedToken && trackingDictionary) {
      try {
        const url = `${BASE_API_URL}/saveMealTracking`;
        const calorieCalculator = profile.calorieCalculator;
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            trackingData: trackingDictionary.meals,
            calorieCalculatorData: calorieCalculator,
            token: retrievedToken,
          }),
        });
        if (response.ok) {
          clearStorage();
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error pushing data:", error);
        return null;
      }
    } else {
      // If no token or no data, just clear storage
      clearStorage();
    }
  };

  // Call this function to logout
  const logout = () => submitTrackingData(trackingData);

  return { logout };
};
