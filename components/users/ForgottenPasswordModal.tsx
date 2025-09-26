// PasswordResetModal.tsx
import { BASE_API_URL } from "@/components/network/apiConfig";
import * as SecureStore from 'expo-secure-store';
import React, { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Modal,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

function unKnownEmailAlert() {
  Alert.alert(
    "Oops!",
    "It looks like your email is not on our records, please try again.",
    [{ text: "OK", onPress: () => console.log("OK Pressed") }],
    { cancelable: true }
  );
}

function checkEmailPassword() {
  Alert.alert(
    "We're on it!",
    "We've sent a new password to your email address. If your email address is on our records, you can login using the provided password.",
    [{ text: "OK", onPress: () => console.log("OK Pressed") }],
    { cancelable: true }
  );
};

type PasswordResetModalProps = {
  visible: boolean;
  onClose: () => void;
  submitting: boolean;
  setSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PasswordResetModal({
  visible,
  onClose,
  submitting,
  setSubmitting,
}: PasswordResetModalProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (email.trim()) {
      sendPasswordReset(email.trim());
      onClose(); // close modal
      setEmail(""); // clear field
    }
  };

  const sendPasswordReset = async (email: string) => {
    try {
      setSubmitting(true)
      const response = await fetch(`${BASE_API_URL}/resetPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "email": email
        }),
      });
  
      if (response.ok) {
        const jsonResponse = await response.json();
        const responseMessage = jsonResponse.message;
        const token = jsonResponse.token;
        if (responseMessage === "email_send_error") {
          console.log("response was not good!")
          unKnownEmailAlert();
          setSubmitting(false);
        };
        if (responseMessage === "success") {
          console.log("response was good!")
          await SecureStore.setItemAsync('jwtToken', token);
          setSubmitting(false);
          checkEmailPassword();
        };
      } else {
        setSubmitting(false)
        console.error("Password reset:", response.status);
        // Handle error, e.g., display an error message
      }
    } catch (error) {
      setSubmitting(false);
      console.error("Error sending password reset request:", error);
    }
  };

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <KeyboardAvoidingView
        style={styles.center}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Reset your password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <View style={styles.buttons}>
            <TouchableOpacity onPress={onClose} style={[styles.btn, styles.closeBtn]}>
              <Text style={{ color: "#333" }}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit} style={[styles.btn, styles.submitBtn]}>
              <Text style={{ color: "white" }}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  center: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "rgba(0,0,0,0.5)" // <-- semi-transparent background
  },
  card: {
    width: "86%",
    padding: 16,
    backgroundColor: "white",
    borderRadius: 12,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  title: { fontSize: 18, marginBottom: 12, fontWeight: "600" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 16,
  },
  buttons: { flexDirection: "row", justifyContent: "flex-end" },
  btn: { paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8, marginLeft: 8 },
  closeBtn: { backgroundColor: "#eee" },
  submitBtn: { backgroundColor: "#1f6feb" },
});

