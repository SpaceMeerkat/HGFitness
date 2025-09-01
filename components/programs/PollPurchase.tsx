import { useAppContext } from "@/components/appContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { BASE_API_URL } from "../network/apiConfig";


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


interface PaymentStatusProps {
  mPaymentId: string;
}

export default function PaymentStatus({ mPaymentId }: PaymentStatusProps) {
  const [status, setStatus] = useState<string>('PENDING');
  const [loading, setLoading] = useState<boolean>(true);
  const { myPrograms, trackingData, setMyPrograms, setTrackingData } = useAppContext(); 

  useEffect(() => {
    let interval: number;

    const pollPaymentStatus = async () => {
      try {
        const response = await fetch(
          `${BASE_API_URL}/payment-status?m_payment_id=${mPaymentId}`
        );
        if (response.ok) {
            const json = await response.json();
            const currentStatus = json.status;
            const item_name = json.item_name;
            const item_category = json.item_category;
            setStatus(currentStatus);

            // Now if the status is COMPLETE update the backend and push changes to context here   
            if (currentStatus === 'COMPLETE') {
                clearInterval(interval); // stop polling once final status is reached
                try{
                    const token = await getSecureToken();
                    const response = await fetch(`${BASE_API_URL}/postPaymentProcessing`, {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "token": token,
                            "myPrograms": myPrograms,
                            "trackingData": trackingData,
                            "item_name": item_name,
                            "item_category": item_category
                        }),
                    });
                    if (response.ok) {
                        const jsonResponse = await response.json();
                        const myProgramsUpdated = jsonResponse.myPrograms;
                        const trackingDataNewProgram = jsonResponse.trackingDataNewProgram;
                        setMyPrograms(myProgramsUpdated)
                        await AsyncStorage.setItem('myPrograms', JSON.stringify(myProgramsUpdated))
                        // Update the trackingData
                        const updatedTrackingData = {
                            ...trackingData,
                            // Creates a new key value pair when item_name doesn't exist in keys already
                            [item_name]: trackingDataNewProgram,
                        };
                        setTrackingData(updatedTrackingData);
                        await AsyncStorage.setItem('trackingData', JSON.stringify(updatedTrackingData));
                    } else {
                    console.error("postPaymentProcessing failed with status:", response.status, await response.text());
                    setLoading(false);
                    return null;
                    }
                } catch (error) {
                console.error("postPaymentProcessing failed:", error);
                setLoading(false);
                return null;
                }
            };
            // End of inner backend update POST request

          if (currentStatus === 'COMPLETE' || currentStatus === 'FAILED') {
            clearInterval(interval); // stop polling once final status is reached
            setLoading(false);
          }
        } else {
          console.error('Error fetching payment status:', response.status);
        }
      } catch (err) {
        console.error('Polling error:', err);
      }
    };

    // Poll immediately, then every 5 seconds
    pollPaymentStatus();

    interval = window.setInterval(pollPaymentStatus, 5000);

    return () => clearInterval(interval); // cleanup on unmount
  }, [mPaymentId]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'plum' }}>
      {loading ? (
        <>
          <ActivityIndicator size="large" />
          <Text>Checking payment status...</Text>
        </>
      ) : (
        <Text>Payment {status}</Text>
      )}
    </View>
  );
}
