import { useAppContext } from "@/components/appContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { BASE_API_URL } from "../network/apiConfig";

const getSecureToken = async () => {
  try {
    return await SecureStore.getItemAsync("jwtToken");
  } catch (err) {
    console.error("Failed to retrieve token:", err);
    return null;
  }
};

interface PaymentStatusProps {
  initialQueue: Record<string, string> | null;
}

export default function PaymentStatus({ initialQueue }: PaymentStatusProps) {
  const { profile, myPrograms, trackingData, setProfile, setMyPrograms, setTrackingData } =
    useAppContext();
  const [loading, setLoading] = useState(false);

  // useFocusEffect is the correct hook for this use case
  useFocusEffect(
    useCallback(() => {
      // Return early if the queue is empty
      if (!initialQueue || Object.keys(initialQueue).length === 0) {
        return;
      }
      
      setLoading(true);

      const pollPaymentStatus = async (currentQueue: Record<string, string>) => {
        const updatedQueue = { ...currentQueue };

        for (const [paymentId] of Object.entries(updatedQueue)) {
          try {
            const response = await fetch(
              `${BASE_API_URL}/payment-status?m_payment_id=${paymentId}`
            );

            if (!response.ok) {
              console.error("Fetch failed:", response.status);
              continue;
            }

            const { status: currentStatus, item_name, item_category } = await response.json();

            if (currentStatus === "FAILED" || currentStatus === "COMPLETE") {
              const token = await getSecureToken();
              const postResponse = await fetch(`${BASE_API_URL}/postPaymentProcessing`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  token,
                  myPrograms,
                  trackingData,
                  item_name,
                  item_category,
                  purchaseID: paymentId,
                  status: currentStatus,
                }),
              });

              if (postResponse.ok) {
                const jsonResponse = currentStatus === "COMPLETE" ? await postResponse.json() : null;

                delete updatedQueue[paymentId];
                const updatedProfile = { ...profile, purchaseQueue: updatedQueue };
                setProfile(updatedProfile);
                await AsyncStorage.setItem("profile", JSON.stringify(updatedProfile));

                if (currentStatus === "COMPLETE" && jsonResponse) {
                  setMyPrograms(jsonResponse.myPrograms);
                  await AsyncStorage.setItem("myPrograms", JSON.stringify(jsonResponse.myPrograms));

                  const updatedTrackingData = {
                    ...trackingData,
                    [item_name]: jsonResponse.trackingDataNewProgram,
                  };
                  setTrackingData(updatedTrackingData);
                  await AsyncStorage.setItem("trackingData", JSON.stringify(updatedTrackingData));
                }
              }
            }
          } catch (err) {
            console.error("Polling error:", err);
          }
        }
        setLoading(false);
      };

      // Call the polling function immediately
      pollPaymentStatus(initialQueue);
      
      // Cleanup function is not strictly needed since we are not using an interval,
      // but it's good practice for useFocusEffect
      return () => {
        // Any cleanup logic can go here
      };
    }, [initialQueue, myPrograms, trackingData, profile, setProfile, setMyPrograms, setTrackingData])
  );

  if (!loading || !initialQueue || Object.keys(initialQueue).length === 0) return null;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "plum",
      }}
    >
      <ActivityIndicator size="large" />
      <Text>Checking payment status...</Text>
    </View>
  );
}