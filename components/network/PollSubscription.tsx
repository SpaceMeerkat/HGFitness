import { useAppContext } from "@/components/appContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { useCallback, useState } from "react";
import { ActivateGymToggle } from "./ActivateGymSubscription";
import { ActivatePremiumToggle } from "./ActivatePremium";
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
  console.log("beginning to poll the subscriptions from queue: ", initialQueue);
  const { profile, myPrograms, trackingData, setMealPrograms, setProfile, setMyPrograms, setTrackingData } =
    useAppContext();
  const [loading, setLoading] = useState(false);
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  useFocusEffect(
    useCallback(() => {
      if (!initialQueue || Object.keys(initialQueue).length === 0) return;

      setLoading(true);

      const pollSubscriptionStatus = async (currentQueue: Record<string, string>) => {
        const updatedQueue = { ...currentQueue };

        for (const [paymentId, billingDate] of Object.entries(updatedQueue)) {

          if (!dateRegex.test(billingDate)) {
            console.log(`Skipping ${paymentId} because billingDate is not YYYY-MM-DD:`, billingDate);
            continue; // Skip the transaction if the value is not of the form YYYY-MM-DD. i.e. it is a single gym plan payment
          }

          if (!isToday(billingDate)) {
            continue; // Only poll if today === scheduled billingDate
          }

          try {
            const response = await fetch(
              `${BASE_API_URL}/payment-status?m_payment_id=${paymentId}`
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
                console.log("billing date prior to roll forward is ", billingDate);
                const updated_billing_date = rollForwardOneMonth(billingDate);
                console.log("roller forward billing date is: ", updated_billing_date);
                updatedQueue[paymentId] = updated_billing_date;

                // Update the transaction queue in the user's clientside profile
                const updatedProfile = { ...profile, purchaseQueue: updatedQueue };
                await AsyncStorage.setItem("profile", JSON.stringify(updatedProfile));

                //  Toggle the user's premium status if premium purchase is COMPLETE
                if (status === "COMPLETE" && item_category === "premium") {
                  console.log("Triggering the premium toggle given COMPLETE and Premium tags");
                  await ActivatePremiumToggle({profile, setProfile, setMealPrograms, myPrograms, setMyPrograms, trackingData, setTrackingData});
                }

                if (item_category === "gymSubscription") {
                  const jsonResponse = await postResponse.json(); // Send this to the ActivateGymToggle function
                  await ActivateGymToggle({profile, setProfile, setMealPrograms, myPrograms, setMyPrograms, trackingData, setTrackingData});
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
    null
  );
}
