import { PricingStyles } from '@/components/premium/PricingStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Alert, ImageBackground, Pressable, ScrollView, Text, View } from 'react-native';
import { useAppContext } from "../appContext";
import { SubscriptionPayment } from "../premium/PremiumPayment";
import { PLAN_BENEFITS } from "./PlanBenefits";

type PricingPricingProps = {
    typeString: "free" | "subscription" | "premium";
};

const PremiumPricing = ({typeString}: PricingPricingProps) => {

    const { profile, setProfile } = useAppContext();

    const item_category_dict: Record<"free" | "subscription" | "premium", string> = {
      free: "free",
      subscription: "gymSubscription",
      premium: "premium",
    };

    const price_category_dict: Record<"free" | "subscription" | "premium", string> = {
      free: "0",
      subscription: "59",
      premium: "79",
    };

    const title_dict: Record<"free" | "subscription" | "premium", string> = {
      free: "Free tier",
      subscription: "Subscription",
      premium: "Premium",
    };

    const itemCategory = item_category_dict[typeString];
    const itemPrice = price_category_dict[typeString];

      const renderBenefit = (text: string, type: "yes" | "no", index: number) => {
        const included = type === "yes";

        return (
          <View key={`${type}-${index}`} style={PricingStyles.benefitRow}>
            <View style={[PricingStyles.benefitIcon, included ? PricingStyles.benefitIconYes : PricingStyles.benefitIconNo]}>
              <Ionicons name={included ? "checkmark" : "close"} size={14} color={included ? "lime" : "#6b6b6b"} />
            </View>
            <Text style={[PricingStyles.benefitText, !included && PricingStyles.benefitTextNo]}>{text}</Text>
          </View>
        );
      };

    const imageSourceMap: Record<string, any> = {
      free: require("@/assets/images/Subscription.jpg"),
      subscription: require("@/assets/images/subscriptionModal.jpg"),
      premium: require("@/assets/images/premiumModal.jpg"),
    };

    const imageSourceString = (typeString: string) => {
      return imageSourceMap[typeString] || imageSourceMap["free"];
    };

    const renderModal = () => {
      const benefits = PLAN_BENEFITS[typeString] || { yes: [], no: [] };
      const isFree = itemCategory === "free";

    return (
        <View style={PricingStyles.content}>
        {/* Hero: tier artwork with title and price */}
        <ImageBackground source={imageSourceString(typeString)} resizeMode="stretch" style={PricingStyles.hero}>
          <LinearGradient
            pointerEvents="none"
            colors={['rgba(0, 0, 0, 0.15)', 'rgba(0, 0, 0, 0.55)']}
            style={PricingStyles.heroOverlay}
          />
          <Text style={PricingStyles.heroTitle}>{title_dict[typeString]}</Text>
          <View style={PricingStyles.priceRow}>
            <Text style={PricingStyles.priceCurrency}>R</Text>
            <Text style={PricingStyles.priceText}>{itemPrice}</Text>
            <Text style={PricingStyles.priceCadence}>/ month</Text>
          </View>
        </ImageBackground>

        <ScrollView style={PricingStyles.benefitsScroll} contentContainerStyle={PricingStyles.benefitsContent} showsVerticalScrollIndicator={false}>
          {benefits.yes.length > 0 && <Text style={PricingStyles.sectionLabel}>{"WHAT'S INCLUDED"}</Text>}
          {benefits.yes.map((benefit, index) => renderBenefit(benefit, "yes", index))}
          {benefits.no.length > 0 && <Text style={[PricingStyles.sectionLabel, { paddingTop: 14 }]}>NOT INCLUDED</Text>}
          {benefits.no.map((benefit, index) => renderBenefit(benefit, "no", index))}
        </ScrollView>

        {/* Purchase Button */}
        <Pressable onPress={itemCategory === "free" ? () => {} : async () => {
          if (!profile) {
            Alert.alert('Login Required', 'User login required.', [{ text: 'OK' }]);
            return;
          }
          await SubscriptionPayment({ itemCategory, profile, setProfile });
        }}
        style={({ pressed }) => [PricingStyles.purchaseButton, isFree ? { opacity: 0.3 } : pressed ? { opacity: 0.8 } : {}]}>
          <LinearGradient
            colors={isFree ? ['#4a4a4a', '#2a2a2a'] : ['#6dff47', '#1fae00']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={PricingStyles.purchaseGradient}
          >
            <Text style={[PricingStyles.purchaseText, isFree && { color: 'white' }]}>PURCHASE</Text>
          </LinearGradient>
        </Pressable>
        </View>
    );
    };

  return (
    <>
      {renderModal()}
    </>
  );
};

export default PremiumPricing;
