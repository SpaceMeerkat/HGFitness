import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { useAppContext } from "../appContext";
import PricingModal from "../premium/PricingModal";
import { SubscriptionCard } from "../shop/SubscriptionCard";

export function PremiumButton() {

    const { profile } = useAppContext();
    const [pricingVisible, setPricingVisible] = useState(false);

    const isPremium = profile?.premium;
    const hasSubscription = profile?.gymSubscription;
    const isFreeTier = !isPremium && !hasSubscription;

    if (!isFreeTier) return null;

    return (
        <>
            <PricingModal
                visible={pricingVisible}
                onClose={() => setPricingVisible(false)}
                defaultType="premium"
            />
            <TouchableOpacity
                style={{ flex: 0.1, paddingVertical: 10 }}
                onPress={() => setPricingVisible(true)}
            >
                <SubscriptionCard
                    cardImage={require('@/assets/images/premiumCard.jpg')}
                    cardTitle="Upgrade to premium"
                    cardDays={profile['freeTrial']['premium'] ? "Join the club" : "Free trial"}
                />
            </TouchableOpacity>
        </>
    );
}
