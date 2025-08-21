import { PricingStyles } from '@/components/premium/PricingStyles';
import React, { useEffect, useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import PremiumPricing from './PremiumModal';

type PricingModalProps = {
  visible: boolean;
  onClose: () => void;
  defaultType: string;
};

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

    const renderModal = () => {
    return (
        <>
        <PremiumPricing typeString={accountType} />
        {/* Close Button */}
        <Pressable onPress={handleClose} style={PricingStyles.closeButton}>
            <Text style={PricingStyles.closeText}>Close</Text>
        </Pressable>
        </>
    );
    };


    const clickableTabs = () => {
        return (
            <View style={{flex: 0.1, flexDirection:'row', paddingVertical: 8, justifyContent: 'center'}}>
                <Pressable onPress={() => setAccountType('free')} style={{flex: 1, backgroundColor: 'black', justifyContent: 'center', borderRadius: 200, borderColor: accountType === "free" ? "lime" : "white", borderWidth: 1}}>
                    <Text style={{color: accountType === "free" ? "lime" : "white", textAlign: 'center'}}> Free tier </Text>
                </Pressable>
                <Pressable onPress={() => setAccountType('subscription')} style={{flex: 1, backgroundColor: 'black', justifyContent: 'center', borderRadius: 200, borderColor: accountType === "subscription" ? "lime" : "white", borderWidth: 1}}>
                    <Text style={{color: accountType === "subscription" ? "lime" : "white", textAlign: 'center'}}> Subscription </Text>
                </Pressable>
                <Pressable onPress={() => setAccountType('premium')} style={{flex: 1, backgroundColor: 'black', justifyContent: 'center', borderRadius: 200, borderColor: accountType === "premium" ? "lime" : "white", borderWidth: 1}}>
                    <Text style={{color: accountType === "premium" ? "lime" : "white", textAlign: 'center'}}> Premium </Text>
                </Pressable>
            </View>
        )
    }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={PricingStyles.modalBackground}>
        {clickableTabs()}
        {renderModal()}
      </View>
    </Modal>
  );
};

export default PricingModal;
