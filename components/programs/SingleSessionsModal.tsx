import React from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type SingleSessionsModalProps = {
  programsInfo: Record<string, { name: string; type: string; level: string; sex: string }>;
  trackingData: any;
  handleChildPage: (page: 'programs' | 'programOverview' | 'programTracking', programLevel?: any, programID?: any, programData?: any, programDay?: any, completedKeys?: any) => void;
  visible: boolean;
  onClose: () => void;
};

export default function SingleSessionsModal({
  programsInfo,
  trackingData,
  handleChildPage,
  visible,
  onClose,
}: SingleSessionsModalProps) {

  // Map level to border colors
  const levelColors: Record<string, string> = {
    beginner: "cyan",
    intermediate: "gold",
    advanced: "magenta",
  };

  if (!programsInfo || !trackingData) {
  return null; // modal won't render until props are ready
  }

  // console.log('trackingData.fullName: ', trackingData["SingleSession-Advanced-Arm Blaster -Arm Day-1-Men"]);

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <KeyboardAvoidingView
        style={styles.center}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.card}>
          <Text style={styles.title}>One-shot sessions</Text>

          <ScrollView style={{ flex: 1 }}>
            {Object.entries(programsInfo).map(([fullName, info]) => (
              <Pressable
                onPress={() => {
                  handleChildPage('programTracking', fullName, trackingData[fullName].data, ["1", "1"]);
                }}
                key={fullName}
                style={[
                  styles.programBox,
                  {
                    borderColor: levelColors[info.level] || "white",
                  },
                ]}
              >
                <Text style={styles.programText}><Text style={{fontSize: 20, fontWeight: 'bold'}}>{info.name}</Text> - {info.type}</Text>
              </Pressable>
            ))}
          </ScrollView>

          <View style={{ flex: 0.01, borderRadius: 8, paddingVertical: 4 }} />

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
  title: {
    fontFamily: 'Edo',
    fontSize: 32,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: "600",
    textAlign: "center",
    color: "white",
  },
  programBox: {
    flex: 0.1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginVertical: 4,
    backgroundColor: "grey",
    borderWidth: 2,
  },
  programText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
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
