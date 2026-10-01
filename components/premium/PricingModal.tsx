import { PricingStyles } from '@/components/premium/PricingStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import PremiumPricing from './PremiumModal';

type AccountType = "free" | "subscription" | "premium";

type PricingModalProps = {
  visible: boolean;
  onClose: () => void;
  defaultType: AccountType;
};

const tabs: { type: AccountType; label: string }[] = [
  { type: 'free', label: 'Free tier' },
  { type: 'subscription', label: 'Subscription' },
  { type: 'premium', label: 'Premium' },
];

const PricingModal: React.FC<PricingModalProps> = ({
  visible,
  onClose,
  defaultType
}) => {

    const handleClose = () => {
        setAccountType(defaultType);
        onClose();
    };

    const [accountType, setAccountType] = useState(defaultType);

    useEffect(() => {
        setAccountType(defaultType);
    }, [defaultType, visible]);

    const clickableTabs = () => {
        return (
            <View style={PricingStyles.tabTrack}>
                {tabs.map(({ type, label }) => {
                    const active = accountType === type;
                    return (
                        <Pressable key={type} onPress={() => setAccountType(type)} style={PricingStyles.tab}>
                            {active && (
                                <LinearGradient
                                    colors={['rgba(0, 255, 0, 0.22)', '#0d0d0d', 'rgba(0, 255, 0, 0.22)']}
                                    start={{ x: 0, y: 0.5 }}
                                    end={{ x: 1, y: 0.5 }}
                                    style={PricingStyles.tabActive}
                                />
                            )}
                            <Text style={[PricingStyles.tabText, active && PricingStyles.tabTextActive]}>{label}</Text>
                        </Pressable>
                    );
                })}
            </View>
        )
    }

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <View style={PricingStyles.backdrop}>
        {/* Tapping outside the sheet closes the modal */}
        <Pressable style={PricingStyles.backdropDismiss} onPress={handleClose} />
        <LinearGradient
          colors={['#1c1c1c', '#0a0a0a', '#050505']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={PricingStyles.sheet}
        >
          {/* Header */}
          <View style={PricingStyles.headerRow}>
            <Text style={PricingStyles.headerText}>CHOOSE YOUR PLAN</Text>
            <Pressable onPress={handleClose} hitSlop={12} style={PricingStyles.closeIcon}>
              <Ionicons name="close" size={20} color="white" />
            </Pressable>
          </View>

          {clickableTabs()}
          <PremiumPricing typeString={accountType} />
        </LinearGradient>
      </View>
    </Modal>
  );
};

export default PricingModal;
