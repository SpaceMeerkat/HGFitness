import { useAppContext } from "@/components/appContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { ActivatePremium } from "./ActivatePremium";
import { BASE_API_URL } from "./apiConfig";

// Helper for getting token
const getSecureToken = async () => {
  try {
    return await SecureStore.getItemAsync("jwtToken");
  } catch (err) {
    console.error("Failed to retrieve token:", err);
    return null;
  }
};

// Safe function to check if today matches billing date
const isToday = (dateString: string): boolean => {
  const today = new Date();
  const billingDate = new Date(dateString);
  return (
    today.getFullYear() === billingDate.getFullYear() &&
    today.getMonth() === billingDate.getMonth() &&
    today.getDate() === billingDate.getDate()
  );
};

// Roll the billing date forward by one month (accounting for month lengths)
const rollForwardOneMonth = (dateString: string): string => {
  const date = new Date(dateString);
  const newDate = new Date(date);

  // Move one month forward
  newDate.setMonth(date.getMonth() + 1);

  // If the new month doesn’t have the same date (e.g. Feb 30 → Mar 2),
  // roll back to the last valid day of that month.
  if (newDate.getDate() !== date.getDate()) {
    newDate.setDate(0); // sets to the last day of the previous month
  }

  return newDate.toISOString().split("T")[0]; // YYYY-MM-DD
};

interface SubscriptionPollingProps {
  initialQueue: Record<string, string> | null; // { m_transaction_id: "YYYY-MM-DD" }
}

export default function SubscriptionPolling({ initialQueue }: SubscriptionPollingProps) {
  const { profile, myPrograms, trackingData, setProfile, setMyPrograms, setTrackingData } =
    useAppContext();
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (!initialQueue || Object.keys(initialQueue).length === 0) return;

      setLoading(true);

      const pollSubscriptionStatus = async (currentQueue: Record<string, string>) => {
        const updatedQueue = { ...currentQueue };

        for (const [paymentId, billingDate] of Object.entries(updatedQueue)) {
          if (!isToday(billingDate)) {
            continue; // Only poll if today === scheduled billingDate
          }

          try {
            const response = await fetch(
              `${BASE_API_URL}/subscription-status?m_payment_id=${paymentId}`
            );

            if (!response.ok) {
              console.error("Fetch failed:", response.status);
              continue;
            }

            const { status, item_name, item_category } = await response.json();

            if (status === "COMPLETE") {
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
                  status,
                }),
              });

              if (postResponse.ok) {
                // Roll forward billing date locally
                const updated_billing_date = rollForwardOneMonth(billingDate);
                updatedQueue[paymentId] = updated_billing_date;

                const updatedProfile = { ...profile, purchaseQueue: updatedQueue };
                await AsyncStorage.setItem("profile", JSON.stringify(updatedProfile));

                if (item_category === "premium") {
                  //  Simply trigger the premium upgrade funtion
                  ActivatePremium();
                }

                const jsonResponse = await postResponse.json();

                if (item_category === "gymSubscription") {
                  // Add two gym programs
                  const newPrograms = {
                    ...jsonResponse.myPrograms,
                    extraGym1: { ...jsonResponse.myPrograms[item_name] },
                    extraGym2: { ...jsonResponse.myPrograms[item_name] },
                  };
                  setMyPrograms(newPrograms);
                  await AsyncStorage.setItem("myPrograms", JSON.stringify(newPrograms));
                  const updatedTrackingData = {
                    ...trackingData,
                    [item_name]: jsonResponse.trackingDataNewProgram,
                  };
                  setTrackingData(updatedTrackingData);
                  await AsyncStorage.setItem("trackingData", JSON.stringify(updatedTrackingData))
                } else if (item_category === "premium") {
                  console.log("this is a premium purchase");
                }
              }
            } else {
              console.log(`Subscription payment ${paymentId} failed on ${billingDate}`);
            }
          } catch (err) {
            console.error("Polling error:", err);
          }
        }

        setLoading(false);
      };

      pollSubscriptionStatus(initialQueue);

      return () => {};
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
      <Text>Checking subscription status...</Text>
    </View>
  );
}
