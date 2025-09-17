import { useAppContext } from "@/components/appContext";
import { PricingStyles } from '@/components/premium/PricingStyles';
import React, { useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useLogout } from "./users/LogoutUser";

type SettingsModalProps = {
  visible: boolean;
  onClose: () => void;

};

const SettingsModal: React.FC<SettingsModalProps> = ({
  visible,
  onClose,
}) => {

    const { profile,
            trackingData,
            setProfile,
            setMyPrograms,
            setTrackingData,
            setMealPrograms,
            setprofileImagePaths,
            setMasterGymProgramsDictionary,
    } = useAppContext();

    const { logout } = useLogout({
        trackingData,
        setProfile,
        setMyPrograms,
        setTrackingData,
        setMealPrograms,
        setprofileImagePaths,
        setMasterGymProgramsDictionary,
    });

    const [isSubscriber, setIsSubscriber] = useState(false)

    useEffect(() => {
        if (profile?.premium) {
        setIsSubscriber(true);
        } else if (profile?.gymSubscription) {
        setIsSubscriber(true);
        }
    }, [profile]); 

    const renderModal = () => {
    return (
        <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
                Settings
            </Text>

            <Pressable onPress={() => console.log("pressed!")} style={[styles.row]}>
                <Text style={[styles.title]}>Contact support</Text>
            </Pressable>

            <Pressable onPress={() => console.log("pressed!")} style={[styles.row]}>
                <Text style={[styles.title, !profile? {opacity: 0.3} : {}]}>Change email</Text>
            </Pressable>

            <Pressable onPress={() => console.log("pressed!")} style={[styles.row]}>
                <Text style={[styles.title, !profile? {opacity: 0.3} : {}]}>Change password</Text>
            </Pressable>

            <Pressable onPress={() => isSubscriber? console.log("pressed!") : {}} style={[styles.row]}>
                <Text style={[styles.title, !isSubscriber? {opacity: 0.3, color: 'black'} : {color: 'coral'}, !profile? {opacity: 0.3, color: 'black'} : {}]}>Cancel subscription</Text>
            </Pressable>  

            <Pressable onPress={profile? logout : () => console.log('pressed!')} style={[styles.row]}>
                <Text style={[styles.title, !profile? {opacity: 0.3, color: 'black'} : {color: 'coral'}]}>Logout</Text>
            </Pressable>
            

            {/* Close Button */}
            <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Close</Text>
            </Pressable>
        </View>
    );
    };


  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={PricingStyles.modalBackground}>
        {renderModal()}
      </View>
    </Modal>
  );
};

export default SettingsModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    maxHeight: '80%',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    paddingVertical: 10,
    textAlign: 'center',
    borderRadius: 8,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white'
  },
  row: {
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    flex: 1,
  },
  date: {
    fontSize: 14,
    color: '#888',
    paddingLeft: 10,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'grey',
    paddingBottom: 22,
  },
  messageLine: {
    fontSize: 16,
    paddingBottom: 6,
  },
  closeButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#000000ff',
    borderRadius: 100,
    alignItems: 'center',
  },
  closeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
});

