import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { BASE_API_URL } from "./apiConfig";

const getSecureToken = async () => {
  try {
    return await SecureStore.getItemAsync("jwtToken");
  } catch (err) {
    console.error("Failed to retrieve token:", err);
    return null;
  }
};

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

interface RunPaymentStatusArgs {
  profile: any;
  myPrograms: any;
  trackingData: any;
  setProfile: (p: any) => void;
  setMyPrograms: (mp: any) => void;
  setTrackingData: (td: any) => void;
}

/**
 * Run payment status polling on a given queue.
 * To be triggered by parent (e.g. in useFocusEffect).
 */
export async function runPaymentStatus(
  currentQueue: Record<string, string>,
  { profile, myPrograms, trackingData, setProfile, setMyPrograms, setTrackingData }: RunPaymentStatusArgs
): Promise<void> {
  if (!currentQueue || Object.keys(currentQueue).length === 0) return;

  const updatedQueue = { ...currentQueue };

  for (const [paymentId, status] of Object.entries(updatedQueue)) {
    if (dateRegex.test(status)) {
      console.log(
        `Skipping ${paymentId} for single payments because status is YYYY-MM-DD:`,
        status
      );
      continue; // Skip subscription payments
    }

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
          const jsonResponse =
            currentStatus === "COMPLETE" ? await postResponse.json() : null;

          // Remove processed payment
          delete updatedQueue[paymentId];
          const updatedProfile = { ...profile, purchaseQueue: updatedQueue };
          await AsyncStorage.setItem("profile", JSON.stringify(updatedProfile));
          setProfile(updatedProfile);

          // Update client state for completed payments
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
}
