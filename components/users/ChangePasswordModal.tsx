// PasswordChangeModal.tsx
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
    View,
} from "react-native";

function checkPasswordChange() {
  Alert.alert(
    "Password updated successfully.",
    "Next time you log in, your new password will be in place and ready to use.",
    [{ text: "OK", onPress: () => console.log("OK Pressed") }],
    { cancelable: true }
  );
}

type PasswordChangeModalProps = {
  visible: boolean;
  onClose: () => void;
  submitting: boolean;
  setSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PasswordChangeModal({
  visible,
  onClose,
  submitting,
  setSubmitting,
}: PasswordChangeModalProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailNotFound, setEmailNotFound] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [nonMatchingPasswords, setNonMatchingPasswords] = useState(false);


  const handleSubmit = () => {
    if (!currentPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      Alert.alert("Please fill in all fields.");
      return;
    }

    if (newPassword.trim() !== confirmPassword.trim()) {
      setNonMatchingPasswords(true);
      return;
    }

    sendEmailChange(currentPassword.trim(), newPassword.trim());
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const sendEmailChange = async (oldPassword: string, newPassword: string) => {
    try {
      setSubmitting(true);
      const retrievedToken = await SecureStore.getItemAsync('jwtToken');
      const response = await fetch(`${BASE_API_URL}/changePassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "token": retrievedToken,
            "currentPassword": oldPassword,
            "newPassword": newPassword,
        }),
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        const responseMessage = jsonResponse.message;
        const newToken = jsonResponse.token;

        if (responseMessage === "email_unkown") {
          console.log("response was not good!");
          setEmailNotFound(true);
          setSubmitting(false);
        }

        if (responseMessage === "incorrect_password") {
          console.log("response was not good!");
          setIncorrectPassword(true);
          setSubmitting(false);
        }

        if (responseMessage === "success") {
          console.log("response was good!");
          await SecureStore.setItemAsync('jwtToken', newToken);
          setSubmitting(false);
          checkPasswordChange();
          onClose(); // close modal
        }
      } else {
        setSubmitting(false);
        console.error("Password change error:", response.status);
      }
    } catch (error) {
      setSubmitting(false);
      console.error("Error sending Password change request:", error);
    }
  };

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <KeyboardAvoidingView
        style={styles.center}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Change your password</Text>

          <TextInput
            style={[styles.input, {borderColor:  incorrectPassword? "red" : 'black'}]}
            placeholder="Enter current password"
            autoCapitalize="none"
            value={currentPassword}
            onChangeText={(text) => {setCurrentPassword(text); setIncorrectPassword(false)}}
          />

          {incorrectPassword? (
            <View>
                <Text style={[styles.title, {fontSize: 10, textAlign: 'center', color: 'red'}]}>
                    * incorrect password
                </Text>
            </View>
            ) : (null)
          }

          <TextInput
            style={[styles.input, {borderColor:  nonMatchingPasswords? "red" : 'black'}]}
            placeholder="Enter new password"
            autoCapitalize="none"
            value={newPassword}
            onChangeText={(text) => {setNewPassword(text); setNonMatchingPasswords(false)}}
          />

          <TextInput
            style={[styles.input, {borderColor:  nonMatchingPasswords? "red" : 'black'}]}
            placeholder="Confirm new password"
            autoCapitalize="none"
            value={confirmPassword}
            onChangeText={(text) => {setConfirmPassword(text); setNonMatchingPasswords(false)}}
          />

          {nonMatchingPasswords? (
            <View>
                <Text style={[styles.title, {fontSize: 10, textAlign: 'center', color: 'red'}]}>
                    * new passwords do not match
                </Text>
            </View>
            ) : (null)
          }

          <View style={styles.buttons}>
            <TouchableOpacity
              onPress={onClose}
              style={[styles.btn, styles.closeBtn]}
            >
              <Text style={{ color: "#333" }}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSubmit}
              style={[styles.btn, styles.submitBtn]}
            >
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
    backgroundColor: "rgba(0,0,0,0.5)",
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
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginLeft: 8,
  },
  closeBtn: { backgroundColor: "#eee" },
  submitBtn: { backgroundColor: "#1f6feb" },
});
