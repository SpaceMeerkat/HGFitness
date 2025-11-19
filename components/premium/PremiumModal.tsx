import { PricingStyles } from '@/components/premium/PricingStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { ImageBackground, Pressable, Text, View } from 'react-native';
import { useAppContext } from "../appContext";
import { SubscriptionPayment } from "../premium/PremiumPayment";

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
      subscription: "70",
      premium: "100",
    };

    const itemCategory = item_category_dict[typeString];
    const itemPrice = price_category_dict[typeString];

      // Dictionary of benefits
      const premiumBenefits: { yes: string[]; no: string[] } = {
        yes: [
          "Gym program progress tracking",
          "One shot gym program tracking",
          "Meal nutrition tracking",
          "Individual exercise progress monitoring",
          "Fresh gym programs every month",
          "Unlimited gym program re-tracking",
          "Expanded meal options",
          "Guided nutrition tracking",
          "Expanded exercise progress monitoring"
        ],
        no: [
        ],
      };

      const subscriptionBenefits: { yes: string[]; no: string[] } = {
        yes: [
          "Gym program progress tracking",
          "One shot gym program tracking",
          "Meal nutrition tracking",
          "Individual exercise progress monitoring",
          "Fresh gym programs every month",
        ],
        no: [
          "Unlimited gym program re-tracking",
          "Expanded meal options",
          "Guided nutrition tracking",
          "Expanded exercise progress monitoring"
        ],
      };

      const freeBenefits: { yes: string[]; no: string[] } = {
        yes: [
          "Gym program progress tracking",
          "One shot gym program tracking",
          "Meal nutrition tracking",
          "Individual exercise progress monitoring",
        ],
        no: [
          "Fresh gym programs every month",
          "Unlimited gym program re-tracking",
          "Expanded meal options",
          "Guided nutrition tracking",
          "Expanded exercise progress monitoring"
        ],
      };

      const benefitsMap: Record<string, { yes: string[]; no: string[] }> = {
        premium: premiumBenefits,
        subscription: subscriptionBenefits,
        free: freeBenefits,
      };

      const renderBenefit = (text: string, type: "yes" | "no", index: number) => {
        const iconName = type === "yes" ? "checkmark" : "close-outline";
        const iconColor = type === "yes" ? "lime" : "red";

        return (
          <View key={`${type}-${index}`} style={PricingStyles.cell}>
            <View style={PricingStyles.infoRow}>
              <View style={PricingStyles.infoIcon}>
                <Ionicons name={iconName} size={24} color={iconColor} />
              </View>
              <View style={PricingStyles.infoTextContainer}>
                <Text style={PricingStyles.infoText}>{text}</Text>
              </View>
            </View>
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
      const benefits = benefitsMap[typeString] || { yes: [], no: [] };
      
    return (
        <View style={PricingStyles.modalContent}>
        {/* Color block imageBackground */}
        <ImageBackground source={imageSourceString(typeString)} resizeMode="stretch" style={[PricingStyles.colorCell, {overflow: 'hidden'}]}>
          {/* Title */}
          <View style={PricingStyles.titleRow}>
              <View style={PricingStyles.cell}>
              <Text style={PricingStyles.titleText}>{typeString}</Text>
              </View>
          </View>

          {/* Price */}
          <View style={PricingStyles.priceRow}>
              <View style={PricingStyles.cell}>
              <Text style={PricingStyles.cellPriceText}>R{itemPrice}</Text>
              </View>
          </View>

          {/* Price cadence */}
          <View style={PricingStyles.cadenceRow}>
              <View style={PricingStyles.cell}>
              <Text style={PricingStyles.cellPriceSubText}>per month</Text>
              </View>
          </View>
        </ImageBackground>

        <View style={PricingStyles.infoContainer}>
          {/* Yes benefits */}
          {benefits.yes.map((benefit, index) => renderBenefit(benefit, "yes", index))}
          {/* No benefits */}
          {benefits.no.map((benefit, index) => renderBenefit(benefit, "no", index))}
        </View>

        {/* Purchase Button */}
        <Pressable onPress={itemCategory === "free"? () => {} : async () =>  await SubscriptionPayment({itemCategory, profile, setProfile})} 
        style={[PricingStyles.purchaseButton, itemCategory === "free"? {opacity: 0.3}: {}]}>
            <Text style={PricingStyles.purchaseText}>PURCHASE</Text>
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
