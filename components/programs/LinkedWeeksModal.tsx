import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
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

type LinkedWeeksModalProps = {
  linkedWeeks?: string[];
  visible: boolean;
  onClose: () => void;
};

export default function LinkedWeeksModal({
  linkedWeeks = [],
  visible,
  onClose,
}: LinkedWeeksModalProps) {

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <KeyboardAvoidingView
        style={styles.center}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.card}>
          <Text style={styles.title}>What are repeat weeks?</Text>

          <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center' }}>
            <FontAwesome5 name="link" size={14} color="grey" style={{ marginRight: 4 }} />
            <Text style={{ fontSize: 14, color: 'grey' }}>
              {linkedWeeks.map((linkedWeek, i) => (
                <Text key={linkedWeek}>
                  {linkedWeek}
                  {i < linkedWeeks.length - 1 ? '-' : ''}
                </Text>
              ))}
            </Text>
          </View>

          {/* <Text style={styles.subtitle}>Repeat Weeks</Text> */}

          <Text style={styles.bodyText}>
            The numbers indicate which weeks repeat the same workout.
          </Text>

          <Text style={styles.bodyText}>
            Previously tracked data is shown during repeat workouts, so aim to improve each time.
          </Text>

          <View style={styles.closeRow}>
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
    paddingTop: 8,
    paddingBottom: 4,
    paddingHorizontal: 8,
    backgroundColor: "black",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "grey",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  closeRow: {
    alignItems: "center",
    paddingTop: 16,
  },
  title: {
    fontFamily: "Edo",
    fontSize: 32,
    paddingTop: 12,
    paddingBottom: 12,
    fontWeight: "600",
    textAlign: "center",
    color: "white",
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
  closeBtn: { backgroundColor: "#000000ff", width: "30%" },
  subtitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    paddingTop: 16,
    paddingHorizontal: 12,
  },
  bodyText: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
    paddingTop: 8,
    paddingHorizontal: 12,
  },
});
