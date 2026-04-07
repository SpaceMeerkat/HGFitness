import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store';
import { Linking } from "react-native";
import { BASE_API_URL } from "../network/apiConfig";

interface SubscriptionPayFastProps {
        itemCategory: string;
        profile: any;
        setProfile: any;
};

export async function SubscriptionPayment({itemCategory, profile, setProfile}: SubscriptionPayFastProps) {

    const retrievedToken = await SecureStore.getItemAsync('jwtToken');
    if (retrievedToken && profile) {
        try {
            const url = `${BASE_API_URL}/query_subscription`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            //   Send the itemCategory and jwt
                body: JSON.stringify({
                    item_category: itemCategory,
                    token: retrievedToken,
                }),
            });
            if (response.ok) {
            const jsonResponse = await response.json();
            const query = jsonResponse.PayFastQuery;
            const m_transaction_id = query.m_payment_id;
            // Set the profile purchaseQuery dict to match the separately updated backend profile -----------
            const updatedProfile = {
                ...profile,
                purchaseQueue: {
                    ...profile.purchaseQueue, // Spreads the existing items in purchaseQueue
                    [m_transaction_id]: query.billing_date, // Adds the new key-value pair
                },
            };
            setProfile(updatedProfile);
            await AsyncStorage.setItem("profile", JSON.stringify(updatedProfile));
            // ----------------------------------------------------------------------------------------------
            const urlParams = new URLSearchParams(query).toString();
            // const url = `https://sandbox.payfast.co.za/eng/process?${urlParams}`;
            const url = `https://www.payfast.co.za/eng/process?${urlParams}`;
            const supported = await Linking.canOpenURL(url);
            if (supported) {
                await Linking.openURL(url);
            } else {
                console.error("Cannot open PayFast URL:", url);
            }
            } else {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error making payment:', error);
            return null; 
        }
    } else {
        console.log("User is not currently logged in")
        // Replace with user warning (attention)
    }
};