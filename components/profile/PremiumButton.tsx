import { useState } from "react";
import { Alert, View } from "react-native";
import { useAppContext } from "../appContext";
import PricingModal from "../premium/PricingModal";
import { PremiumPlanCard } from "../shop/PlanCards";

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
            <View style={{ flex: 0.1, paddingTop: 10 }}>
                <PremiumPlanCard
                    subtitle={profile?.['freeTrial']?.['premium'] ? "Join the club" : "Free trial"}
                    onPress={() => {
                        if (!profile) {
                            Alert.alert('Login Required', 'User login required.', [{ text: 'OK' }]);
                            return;
                        }
                        setPricingVisible(true);
                    }}
                />
            </View>
        </>
    );
}
