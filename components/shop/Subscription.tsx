import { Text, View } from "react-native";
import { SubscriptionCard } from "./SubscriptionCard";

type WhatsHotProps = {
    handleBackButton: () => void;
  };

export function SubscriptionPage({handleBackButton}: WhatsHotProps) {
    
    return (
        <View style={{flex: 1, paddingTop: 30, paddingHorizontal: 10, justifyContent: 'center'}}>
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
        <View style={{flex: 0.3, width: '100%', justifyContent: 'center'}}>
            <SubscriptionCard cardImage={require('@/assets/images/premiumCard.jpg')} cardTitle="Upgrade to premium" cardDays="Monthly rewards" />
        </View>
        <View style={{flex: 0.3, width: '100%', justifyContent: 'center'}}>
            <SubscriptionCard cardImage={require('@/assets/images/SubscriptionCard2day.jpg')} cardTitle="Gym plan subscription" cardDays="~ 2 days/week" />
        </View>
        <View style={{flex: 0.3, width: '100%', justifyContent: 'center'}}>
            <SubscriptionCard cardImage={require('@/assets/images/SubscriptionCard4day.jpg')} cardTitle="Gym plan subscription" cardDays="4 days/week" />
        </View>
        <View style={{flex: 0.15}} />
        </View>
    );
}



