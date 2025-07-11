import { TrackingNotesStyles } from "@/components/HGStyles";
import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { SubmitSession } from './SubmitSession';

import { useAppContext } from "@/components/appContext";

interface SaveSessionProps {
    // SubmitSession : (programID: any, token: any, exerciseDictionary: any, trackingData: any) => void;
    visible: boolean;
    onClose: () => void;
    programID: any;
    programDay: any;
    token: any;
    exerciseDictionary: any;
    trackingData: any;
    setTrackingData: (data: any) => void,
    setSaving: (saving: boolean) => void,
    handleChildPage: (page: 'programs' | 'programOverview' | 'programTracking') => void;
  }

  export default function SaveSession({ visible, onClose, programID, programDay, token, exerciseDictionary, trackingData, setTrackingData, setSaving, handleChildPage}: SaveSessionProps) {

    const { profile } = useAppContext();

    const showToast = () => {
        // console.log("showing toast");
        Toast.show({
          type: 'success',
          text1: `Nice job ${profile.username}!`,
          text2: 'Session saved...',
          visibilityTime: 3000,  // Duration the toast will be visible
          position: 'bottom',  // You can change this to 'bottom' if you prefer
          props: { zIndex: 9999 },
          text1Style: { fontSize: 16, fontWeight: 'bold' },  // Larger size for text1
          text2Style: { fontSize: 12 },  // Larger size for text2
        });
      };

    const handlePageChange = () => {
        // Use handleInputChange to update the notes in the dictionary
        // console.log("pressed child handler");
        handleChildPage("programs"); 
        // Close the modal and redirect
    };

    const handleSaveSession = () => {
        // Submit the session
        SubmitSession(programID, programDay, token, exerciseDictionary, trackingData, setTrackingData, setSaving);
      
        // Show the toast
        showToast();
      
        // Delay the page navigation slightly
        setTimeout(() => {
          handlePageChange(); 
          onClose(); // Navigate to the new page after a short delay
        }, 3000); // Adjust this delay as needed (e.g., 300-500ms)

      };
      
    return (
    <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={onClose}
    >
        {/* Set lower zIndex for modal content */}
        <View style={[TrackingNotesStyles.overlay, { zIndex: 1 }]}>
        <Toast />
        <View style={[TrackingNotesStyles.container, { zIndex: 1 }]}>
            <Pressable style={TrackingNotesStyles.backButton} onPress={onClose}>
            <Text style={TrackingNotesStyles.backButtonText}>Back</Text>
            </Pressable>
            <Text style={TrackingNotesStyles.title}>End session?</Text>
            <Text style={TrackingNotesStyles.body}>Tracking data will be stored and this session will be marked as complete...</Text>
            <Pressable style={TrackingNotesStyles.saveButton} onPress={handleSaveSession}>
            <Text style={TrackingNotesStyles.saveButtonText}>Save tracking info</Text>
            </Pressable>
        </View>
        </View>
    </Modal>
    );
}