// LoadingModal.tsx
import React from 'react';
import { ActivityIndicator, Modal, View } from 'react-native';
import { LoginStyles } from './LoginStyles';

interface LoadingModalProps {
  visible: boolean;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ visible }) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={() => {}}
    >
      <View style={LoginStyles.ModalSpinner}>
        <ActivityIndicator size="large" color="white" />
      </View>
    </Modal>
  );
};

export default LoadingModal;
