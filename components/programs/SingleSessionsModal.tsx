// PasswordChangeModal.tsx
import React from "react";
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";


type SingleSessionsModalProps = {
  visible: boolean;
  onClose: () => void;
};

export default function SingleSessionsModal({
  visible,
  onClose,
}: SingleSessionsModalProps) {


  return (
    <Modal transparent animationType="fade" visible={visible}>
      <KeyboardAvoidingView
        style={styles.center}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Single session 1-shots</Text>

          <View style={{flex: 0.1, borderRadius: 8, paddingVertical: 4}}>
            <View style={{flex: 1, backgroundColor: "grey", borderRadius: 8}}/>
          </View>

          <View style={{flex: 0.1, borderRadius: 8, paddingVertical: 4}}>
            <View style={{flex: 1, backgroundColor: "grey", borderRadius: 8}}/>
          </View>

          <View style={{flex: 0.1, borderRadius: 8, paddingVertical: 4}}>
            <View style={{flex: 1, backgroundColor: "grey", borderRadius: 8}}/>
          </View>

          <View style={{flex: 0.1, borderRadius: 8, paddingVertical: 4}}>
            <View style={{flex: 1, backgroundColor: "grey", borderRadius: 8}}/>
          </View>

          <View style={{flex: 0.1, borderRadius: 8, paddingVertical: 4}}>
            <View style={{flex: 1, backgroundColor: "grey", borderRadius: 8}}/>
          </View>

          <View style={{flex: 0.01, borderRadius: 8, paddingVertical: 4}}/>

          <View style={styles.buttons}>
            <TouchableOpacity
              onPress={onClose}
              style={[styles.btn, styles.closeBtn]}
            >
              <Text style={{ color: "#333" }}>Close</Text>
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
    width: "94%",
    height: "90%",
    padding: 10,
    backgroundColor: "black",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "grey",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  title: { fontSize: 18, paddingTop: 16, marginBottom: 12, fontWeight: "600", textAlign: "center", color: "white" },
  buttons: { flexDirection: "row", justifyContent: "center" },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginLeft: 8,
  },
  closeBtn: { backgroundColor: "#eee" },
  submitBtn: { backgroundColor: "#1f6feb" },
});
