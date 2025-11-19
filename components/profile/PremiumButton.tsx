import { Pressable } from "react-native";
import { useAppContext } from "../appContext";
import { ActivatePremiumToggle } from "../network/ActivatePremium";
import { SubscriptionCard } from "../shop/SubscriptionCard";

export function PremiumButton() {

    const { profile, setProfile, setMealPrograms, myPrograms, setMyPrograms, trackingData, setTrackingData  } = useAppContext();

    return (
        <Pressable
            style={{ flex: 0.1, paddingVertical: 10 }}
            onPress={async () => {
                await ActivatePremiumToggle({
                    profile,
                    setProfile,
                    setMealPrograms,
                    myPrograms,
                    setMyPrograms,
                    trackingData,
                    setTrackingData,
                });
            }} // Directly call the async function
        >
            <SubscriptionCard cardImage={require('@/assets/images/premiumCard.jpg')} cardTitle="Upgrade to premium" cardDays="Monthly rewards" />
        </Pressable>
    )
}