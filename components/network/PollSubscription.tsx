import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { ActivateGymSubscriptionToggle } from "./ActivateGymSubscription";
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

const isTodayOrAfter = (dateString: string): boolean => {
  const today = new Date();
  const billingDate = new Date(dateString);

  // Normalize today to remove hours/minutes/seconds
  today.setHours(0, 0, 0, 0);
  billingDate.setHours(0, 0, 0, 0);

  return today.getTime() >= billingDate.getTime();
};


const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

interface RunSubscriptionPollingArgs {
  profile: any;
  myPrograms: any;
  trackingData: any;
  setMealPrograms: (mp: any) => void;
  setProfile: (p: any) => void;
  setMyPrograms: (mp: any) => void;
  setTrackingData: (td: any) => void;
}

/**
 * Run subscription polling on a given queue.
 * To be triggered by parent (e.g. in useFocusEffect).
 */
export async function runSubscriptionPolling(
  currentQueue: Record<string, string>,
  {
    profile,
    myPrograms,
    trackingData,
    setMealPrograms,
    setProfile,
    setMyPrograms,
    setTrackingData,
  }: RunSubscriptionPollingArgs
): Promise<void> {
  if (!currentQueue || Object.keys(currentQueue).length === 0) return;

  const updatedQueue = { ...currentQueue };

  for (const [paymentId, billingDate] of Object.entries(updatedQueue)) {
    if (!dateRegex.test(billingDate)) {
      console.log(
        `Skipping ${paymentId} because billingDate is not YYYY-MM-DD:`,
        billingDate
      );
      continue; // Skip single gym plan payments
    }

    if (!isTodayOrAfter(billingDate)) {
      console.log(`Skipping ${paymentId} because billingDate is not today:`)
      continue; // Only poll if today === scheduled billingDate
    }

    try {
      const response = await fetch(
        `${BASE_API_URL}/subscription-status?m_payment_id=${paymentId}&billing_date=${billingDate}`
      );

      if (!response.ok) {
        console.error("Fetch failed:", response.status);
        continue;
      }

      const {
        status,
        item_name,
        item_category,
        returned_billing_date,
        reccurence,
      } = await response.json();

      console.log(
        status,
        item_name,
        item_category,
        returned_billing_date,
        reccurence
      );

      if (status === "COMPLETE" || status === "FAILED") {
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

        console.log("made it here");

        if (postResponse.ok && reccurence === false) {
          // Covers both COMPLETE and FAILED recurrence payments
          updatedQueue[paymentId] = returned_billing_date;
          const updatedProfile = { ...profile, purchaseQueue: updatedQueue };

          // Toggle premium if applicable
          if (status === "COMPLETE" && item_category === "premium") {
            console.log(
              "Triggering the premium toggle given COMPLETE and Premium tags"
            );
            await ActivatePremiumToggle({
              profile: updatedProfile,
              setProfile,
              setMealPrograms,
              myPrograms,
              setMyPrograms,
              trackingData,
              setTrackingData,
            });
            
          }

          // Handle gym subscription
          if (status === "COMPLETE" && item_category === "gymSubscription") {
            console.log(
              "Triggering the gym subscription toggle given COMPLETE and gymSubscription tags"
            );
            await ActivateGymSubscriptionToggle({
              profile: updatedProfile,
              setProfile,
              myPrograms,
              setMyPrograms,
              trackingData,
              setTrackingData,
            });
          }
        } else if (postResponse.ok && reccurence === false && status === "FAILED") {
          // Catches fresh payment fails, delete from queue
          delete updatedQueue[paymentId];
          const updatedProfile = { ...profile, purchaseQueue: updatedQueue };
          await AsyncStorage.setItem("profile", JSON.stringify(updatedProfile));
          setProfile(updatedProfile);
        }
      } else {
        console.log(`Subscription payment ${paymentId} failed on ${billingDate}`);
      }
    } catch (err) {
      console.error("Polling error:", err);
    }
  }
}
