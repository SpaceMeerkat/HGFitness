import { ImageBackground } from "expo-image";
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

type ViewModeModalProps = {
  setTrackingMode: any;
  setTriggerRedirect: any;
  visible: boolean;
  onClose: () => void;
};

export default function ViewModeModal({
  setTrackingMode,
  setTriggerRedirect,
  visible,
  onClose,
}: ViewModeModalProps) {

  const arrowImage = require("@/assets/images/viewModeModal.jpg");

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <KeyboardAvoidingView
        style={styles.center}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Choose an option</Text>

          {/* Explanations side by side */}
          <View style={styles.explanationRow}>
            <View style={styles.explanationBox}>
              {/* <Text style={styles.explanationTitle}>View</Text> */}
              <Text style={styles.explanationText}>
                Take a peak at the session! Tracking is disabled
              </Text>
            </View>

            <View style={styles.explanationBox}>
              {/* <Text style={styles.explanationTitle}>Track</Text> */}
              <Text style={styles.explanationText}>
                Enter tracking data! The session will be marked as complete.
              </Text>
            </View>
          </View>

          {/* Space reserved for an image row */}
          <ImageBackground
            source={arrowImage}
            contentFit="contain"
            style={{
              flex: 0.6,
              backgroundColor: "stretch",
            }}
          />

          {/* View & Track buttons side by side */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              onPress={() => {
                setTrackingMode(false);
                setTriggerRedirect(true);
                onClose();
              }}
              style={[styles.btn, styles.flexBtn]}
            >
              <Text style={styles.btnText}>View</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setTrackingMode(true);
                setTriggerRedirect(true);
                onClose();
              }}
              style={[styles.btn, styles.flexBtn]}
            >
              <Text style={styles.btnText}>Track</Text>
            </TouchableOpacity>
          </View>

          {/* Close button below */}
          <View style={[styles.closeRow, {justifyContent: 'flex-end'}]}>
            <TouchableOpacity
              onPress={onClose}
              style={[styles.btn, styles.closeBtn]}
            >
              <Text style={[styles.btnText, {color: "white"}]}>Close</Text>
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
    height: "80%",
    padding: 16,
    backgroundColor: "black",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "grey",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  title: {
    flex: 0.4,
    fontFamily: "Edo",
    fontSize: 32,
    paddingTop: 36,
    paddingBottom: 12,
    fontWeight: "600",
    textAlign: "center",
    color: "white",
  },
  explanationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  explanationBox: {
    flex: 0.5,
    marginHorizontal: 6,
  },
  explanationTitle: {
    color: "cyan",
    fontSize: 16,
    fontWeight: "600",
    paddingBottom: 4,
    textAlign: "center",
  },
  explanationText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flexBtn: {
    flex: 1,
    marginHorizontal: 6,
    backgroundColor: "#ffffffff",
  },
  closeRow: {
    alignItems: "center",
    paddingTop: 34,
  },
  btn: {
    paddingVertical: 14,
    borderRadius: 8,
  },
  btnText: {
    color: "#000000ff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
  },
  closeBtn: { backgroundColor: "#000000ff", width: "50%" },
});
