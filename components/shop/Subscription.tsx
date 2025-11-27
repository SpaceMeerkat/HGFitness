import { useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { TrackingNotesStyles } from "../HGStyles";
import PricingModal from "../premium/PricingModal";
import { SubscriptionCard } from "./SubscriptionCard";

type WhatsHotProps = {
    handleBackButton: () => void;
  };

export function SubscriptionPage({handleBackButton}: WhatsHotProps) {

    const [premiumVisible, setPremiumVisible] = useState(false);
    const [defaultPricing, setDefaultPricing] = useState("premium");
    
    return (
        <>

        <PricingModal
        visible={premiumVisible}
        onClose={() => setPremiumVisible(false)}
        defaultType={defaultPricing}
        />

        <View style={{flex: 1, paddingTop: 10, paddingHorizontal: 10, justifyContent: 'center'}}>
        <View style={{flex: 0.2, width: '100%', justifyContent: 'center'}}>
            <TouchableOpacity style={{flex: 1, width: "20%", paddingLeft: 10, paddingTop: 5, paddingBottom: 5, justifyContent: 'center'}} onPress={handleBackButton}>
                <Text style={[TrackingNotesStyles.backButtonText]}>Back</Text>
            </TouchableOpacity>
        </View>
        <View style={{flex: 0.1, width: '100%', paddingBottom: 20}}>
            <Text style={{fontFamily: 'Edo', color: 'gold', fontSize: 30, textAlign: 'center'}}>
                Monthly subscriptions
            </Text>
        </View>
        <View style={{flex: 0.2, width: '100%', paddingHorizontal: 10, paddingBottom: 20}}>
            <Text style={{color: 'white', fontSize: 15, textAlign: 'center'}}>
                If you want a new and exciting gym program each month, that builds upon the previous program, you're in the right place!
            </Text>
        </View>
        <Pressable onPress={() => {setDefaultPricing('premium'), setPremiumVisible(true)}} style={{flex: 0.3, width: '100%', justifyContent: 'center'}}>
            <SubscriptionCard cardImage={require('@/assets/images/premiumCard.jpg')} cardTitle="Upgrade to premium" cardDays="Monthly rewards" />
        </Pressable>
        <Pressable onPress={() => {setDefaultPricing('subscription'), setPremiumVisible(true)}} style={{flex: 0.3, width: '100%', justifyContent: 'center'}}>
            <SubscriptionCard cardImage={require('@/assets/images/SubscriptionCard2day.jpg')} cardTitle="Gym plan subscription" cardDays="2 days/week" />
        </Pressable>
        <Pressable onPress={() => {setDefaultPricing('subscription'), setPremiumVisible(true)}} style={{flex: 0.3, width: '100%', justifyContent: 'center'}}>
            <SubscriptionCard cardImage={require('@/assets/images/SubscriptionCard4day.jpg')} cardTitle="Gym plan subscription" cardDays="4 days/week" />
        </Pressable>
        <View style={{flex: 0.15}} />
        </View>

        </>
    );
}



