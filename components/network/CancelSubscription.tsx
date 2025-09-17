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

interface RunSubscriptionCancellationArgs {
  profile: any;
  myPrograms: any;
  trackingData: any;
  setMealPrograms: (mp: any) => void;
  setProfile: (p: any) => void;
  setMyPrograms: (mp: any) => void;
  setTrackingData: (td: any) => void;
}

export async function runSubscriptionCancellation(
  currentQueue: Record<string, string>,
  { profile,
    myPrograms,
    trackingData,
    setMealPrograms,
    setProfile,
    setMyPrograms,
    setTrackingData,
  }: RunSubscriptionCancellationArgs
): Promise<void> {
  if (!currentQueue || Object.keys(currentQueue).length === 0) return;

    const sendCancellationRequest = async (token: string, paymentId: string): Promise<any | null> => {

        try {
            const response = await fetch(`${BASE_API_URL}/subscription-cancellation`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: token,
                    m_payment_id: paymentId,
                }),
            });

            if (response.ok) {
                const jsonResponse = await response.json();
                const item_category = jsonResponse.item_category;
                const new_notifications = jsonResponse.new_notifications;
                const new_transaction_queue = jsonResponse.new_transaction_queue;

                return {item_category, new_notifications, new_transaction_queue};

            } else {
                console.error("cancellation request failed with status:", response.status, await response.text());
                return null;
            }

        } catch (error) {
            console.error("cancellation request request failed:", error);
            return null;
        }
    }

    const executeCancellation = async (paymentId: string) => {
        const token = await getSecureToken();
        if (!token) {
            // Handle case where token is not found or retrieval failed
            console.error("Cannot proceed without a valid token.");
            return;
        }

        const result = await sendCancellationRequest(token, paymentId);
        if (!result) return;
        const { item_category, new_notifications, new_transaction_queue } = result;

        const updatedProfile = { 
            ...profile, 
            purchaseQueue: new_transaction_queue, // Now set to {'CANCELLED': 'YYYY-MM-DD'}
            notifications: new_notifications 
        };

        if (item_category === 'premium') {
            await ActivatePremiumToggle({
              profile: updatedProfile, // Need to add a backend "if CANCELLED then return no notification and toggle as usual"
              setProfile,
              setMealPrograms,
              myPrograms,
              setMyPrograms,
              trackingData,
              setTrackingData,
            });
        } else if (item_category === 'gymSubscription') {
            await ActivateGymSubscriptionToggle({
                profile: updatedProfile, // Need to add a backend "if CANCELLED then return no notification and toggle as usual"
                setProfile,
                myPrograms,
                setMyPrograms,
                trackingData,
                setTrackingData,
            });
        }
    };

    const processTransactionQueueCancellations = async () => {

        const updatedQueue = { ...currentQueue };

        for (const [paymentId, billingDate] of Object.entries(updatedQueue)) {
            if (!dateRegex.test(billingDate)) {
            console.log(
                `Skipping ${paymentId} because billingDate is not of format YYYY-MM-DD:`,
                billingDate
            );
            continue; // Skip single gym plan payments
            }

            if (!isTodayOrAfter(billingDate)) {
            console.log(`Skipping ${paymentId} because billingDate is in the future.`)
            continue; // Only poll if today === scheduled billingDate
            }

            try {
               await executeCancellation(paymentId);
            } catch (error) {
                console.error("cancellation request request failed:", error);
                continue;
            }
        }
    }

    await processTransactionQueueCancellations()
}

  