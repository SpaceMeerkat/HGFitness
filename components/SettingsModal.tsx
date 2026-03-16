import { useAppContext } from "@/components/appContext";
import { BASE_API_URL } from "@/components/network/apiConfig";
import { PricingStyles } from '@/components/premium/PricingStyles';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { runSubscriptionCancellation } from "./network/CancelSubscription";
import PasswordChangeModal from "./users/ChangePasswordModal";
import LoadingModal from "./users/LoadingModal";
import { useLogout } from "./users/LogoutUser";

type SettingsModalProps = {
  visible: boolean;
  onClose: () => void;

};

const SettingsModal: React.FC<SettingsModalProps> = ({
  visible,
  onClose,
}) => {

    const [open, setOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [contactVisible, setContactVisible] = useState(false);
    const [contactMessage, setContactMessage] = useState('');
    const [contactLoading, setContactLoading] = useState(false);
    const [contactResult, setContactResult] = useState<'success' | 'error' | null>(null);

    const { profile,
            myPrograms,
            trackingData,
            setProfile,
            setMyPrograms,
            setTrackingData,
            setMealPrograms,
            setprofileImagePaths,
            setMasterGymProgramsDictionary,
    } = useAppContext();

    const transactionQueue = profile?.purchaseQueue
    const cancelledSubscription = Object.keys(profile?.purchaseQueue || {}).includes("CANCELLED")

    const { logout } = useLogout({
        profile,
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
      if (Object.keys(profile?.purchaseQueue || {}).includes("CANCELLED")) {
        setIsSubscriber(false);
      } else {
          if (profile?.premium) {
          setIsSubscriber(true);
          } else if (profile?.gymSubscription) {
          setIsSubscriber(true);
          }
      }
    }, [profile]); 

    const sendEmail = async () => {
      console.log("sending email request...");
      const response = await fetch(`${BASE_API_URL}/send_email`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      return null;
    };

    const handleContactSubmit = async () => {
      if (!contactMessage.trim()) return;
      setContactLoading(true);
      try {
        // SKIP: simulate API call — replace with real fetch when endpoint is ready
        await new Promise(resolve => setTimeout(resolve, 2000));
        const status = 200;
        // END SKIP

        // Real call (uncomment when endpoint is ready):
        // const response = await fetch(`${BASE_API_URL}/contactSupport`, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ message: contactMessage.trim(), username: profile?.username }),
        // });
        // const status = response.status;

        setContactResult(status === 200 ? 'success' : 'error');
      } catch {
        setContactResult('error');
      } finally {
        setContactLoading(false);
      }
    };

    const handleContactClose = () => {
      setContactVisible(false);
      setContactMessage('');
      setContactResult(null);
    };

    const renderModal = () => {
    return (
        <View style={styles.modalContent}>

            <LoadingModal visible={submitting} />

            <PasswordChangeModal
              visible={open}
              onClose={() => setOpen(false)}
              submitting={submitting}
              setSubmitting={setSubmitting}
            />

            <Text style={styles.modalTitle}>
                Settings
            </Text>

            {/* Contact Support modal */}
            <Modal visible={contactVisible} transparent animationType="fade">
              <Pressable
                style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.75)', justifyContent: 'center', alignItems: 'center' }}
                onPress={handleContactClose}>
                <Pressable
                  style={{ width: '88%', backgroundColor: 'black', borderWidth: 2, borderColor: 'grey', borderRadius: 8, padding: 24 }}
                  onPress={() => {}}>

                  {/* Spinner overlay */}
                  {contactLoading && (
                    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(128,128,128,0.4)', borderRadius: 8, justifyContent: 'center', alignItems: 'center', zIndex: 10 }}>
                      <ActivityIndicator size="large" color="white" />
                    </View>
                  )}

                  <Text style={{ fontFamily: 'Edo', fontSize: 24, color: 'white', marginBottom: 16 }}>Contact Support</Text>

                  {contactResult === 'success' ? (
                    <View style={{ alignItems: 'center', paddingVertical: 12 }}>
                      <Text style={{ color: 'white', fontSize: 15, textAlign: 'center', lineHeight: 22 }}>
                        Your message has been received.{'\n'}Support will be in touch soon!
                      </Text>
                      <TouchableOpacity
                        onPress={handleContactClose}
                        style={{ marginTop: 20, paddingHorizontal: 32, paddingVertical: 10, backgroundColor: 'white', borderRadius: 100 }}>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 14 }}>Close</Text>
                      </TouchableOpacity>
                    </View>
                  ) : contactResult === 'error' ? (
                    <View style={{ alignItems: 'center', paddingVertical: 12 }}>
                      <Text style={{ color: 'white', fontSize: 15, textAlign: 'center' }}>Unable to send message right now, please try again later.</Text>
                      <TouchableOpacity
                        onPress={handleContactClose}
                        style={{ marginTop: 20, paddingHorizontal: 32, paddingVertical: 10, backgroundColor: 'white', borderRadius: 100 }}>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 14 }}>Close</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View>
                      <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginBottom: 12 }}>
                        Describe your issue and we'll get back to you as soon as possible.
                      </Text>
                      <TextInput
                        value={contactMessage}
                        onChangeText={setContactMessage}
                        placeholder="Describe your issue..."
                        placeholderTextColor="rgba(255,255,255,0.3)"
                        multiline
                        numberOfLines={5}
                        style={{ backgroundColor: '#111', borderWidth: 1, borderColor: 'grey', borderRadius: 8, color: 'white', fontSize: 14, padding: 12, minHeight: 120, textAlignVertical: 'top' }}
                      />
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
                        <TouchableOpacity
                          onPress={handleContactClose}
                          style={{ flex: 0.45, paddingVertical: 10, borderRadius: 100, borderWidth: 2, borderColor: 'grey', alignItems: 'center' }}>
                          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={handleContactSubmit}
                          disabled={!contactMessage.trim()}
                          style={{ flex: 0.45, paddingVertical: 10, borderRadius: 100, backgroundColor: 'white', alignItems: 'center', opacity: contactMessage.trim() ? 1 : 0.4 }}>
                          <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 14 }}>Submit</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </Pressable>
              </Pressable>
            </Modal>

            <TouchableOpacity onPress={() => setContactVisible(true)} style={[styles.row]}>
                <Text style={[styles.title]}>Contact support</Text>
            </TouchableOpacity>

            <Pressable style={[styles.row]}>
                <Text style={[styles.title, { opacity: 0.3 }]}>Change email</Text>
            </Pressable>

            <Pressable onPress={() => setOpen(true)} style={[styles.row]}>
                <Text style={[styles.title, !profile? {opacity: 0.3} : {}]}>Change password</Text>
            </Pressable>

            <Pressable onPress={async () => {
              if (isSubscriber) {
               await runSubscriptionCancellation({profile, setProfile})
              }
              }} style={[styles.row]}>
                <Text style={[styles.title, !isSubscriber? {opacity: 0.3, color: 'black'} : {color: 'coral'}, !profile? {opacity: 0.3, color: 'black'} : {}]}>Cancel subscription</Text>
            </Pressable>  

            <Pressable onPress={profile? () => {onClose; logout();} : () => console.log('pressed!')} style={[styles.row]}>
                <Text style={[styles.title, !profile? {opacity: 0.3, color: 'black'} : {color: 'coral'}]}>Logout</Text>
            </Pressable>
            

            {/* Close Button */}
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
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

