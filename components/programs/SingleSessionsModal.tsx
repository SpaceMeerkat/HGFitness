import Ionicons from '@expo/vector-icons/Ionicons';
import React from "react";
import { ImageBackground, TextInput } from 'react-native';

import {
  KeyboardAvoidingView,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

type SingleSessionsModalProps = {
  programsInfo: Record<string, { name: string; type: string; level: string; sex: string }>;
  trackingData: any;
  handleChildPage: (page: 'programs' | 'programOverview' | 'programTracking', programLevel?: any, programID?: any, programData?: any, programDay?: any, completedKeys?: any) => void;
  visible: boolean;
  onClose: () => void;
  setFullName: any;
  setSelectedData: any;
  setViewModeVisible: any;
};

export default function SingleSessionsModal({
  programsInfo,
  trackingData,
  handleChildPage,
  visible,
  onClose,
  setFullName,
  setSelectedData,
  setViewModeVisible,
}: SingleSessionsModalProps) {

  const beginnerImage = require("@/assets/images/singleSessionCardBeginner.jpg");
  const intermediateImage = require("@/assets/images/singleSessionCardIntermediate.jpg");
  const advancedImage = require("@/assets/images/singleSessionCardAdvanced.jpg");

  // Map level to border colors
  const levelColors: Record<string, string> = {
    beginner: "cyan",
    intermediate: "gold",
    advanced: "magenta",
  };

  const levelImages: Record<string, any> = {
    beginner: beginnerImage,
    intermediate: intermediateImage,
    advanced: advancedImage,
  };

  if (!programsInfo || !trackingData) {
  return null; // modal won't render until props are ready
  }

  // console.log('trackingData.fullName: ', trackingData["SingleSession-Advanced-Arm Blaster -Arm Day-1-Men"]);

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <KeyboardAvoidingView
        style={styles.center}
        enabled={false}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Choose your session</Text>

          <View style={{flex: 0.15, flexDirection: 'row', paddingRight: 8}}>
            <View style={{flex: 0.9, flexDirection: 'column', justifyContent: 'center', paddingRight: 8}}>
              <TextInput
                cursorColor={'black'}
                textAlign={'left'}
                textAlignVertical="center"
                style={{ fontSize: 20, flex: 1, color: "white", backgroundColor: 'white', borderRadius: 8, borderWidth: 1, paddingLeft: 16}}
                placeholder={"Program search"}
              />
            </View>
            <View style={{flex: 0.1, flexDirection: 'column'}}>
              <Pressable onPress={() => console.log("pressed!")} style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <Ionicons name="filter" size={28} color="white" />
              </Pressable>
            </View>
          </View>

          <View style={{flex:0.05, justifyContent: 'center'}}>
            <View style={{height: 3, backgroundColor: "grey", borderRadius: 100, borderWidth: 1}}/>
          </View>

          <View style={{flex: 0.1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <View style={{flex: 0.9, flexDirection: 'row', justifyContent: 'center', paddingLeft: 6, alignItems: 'center'}}>
              <View style={{flex: 0.2, alignItems: 'flex-end', justifyContent: 'center'}}>
                <View style={{backgroundColor: levelColors["beginner"], borderRadius: 10, height: 6, width: 6}}/>
              </View>
              <View style={{flex: 0.8, flexDirection: 'column', justifyContent: 'center'}}>
                <Text style={{color: "white", fontSize: 10, paddingLeft: 10, textAlign: 'left'}}>beginner</Text>
              </View>
            </View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', paddingLeft: 6, alignItems: 'center'}}>
              <View style={{flex: 0.2, alignItems: 'flex-end', justifyContent: 'center'}}>
                <View style={{backgroundColor: levelColors["intermediate"], borderRadius: 10, height: 6, width: 6}}/>
              </View>
              <View style={{flex: 0.8, flexDirection: 'column', justifyContent: 'center'}}>
                <Text style={{color: "white", fontSize: 10, paddingLeft: 10, textAlign: 'left'}}>intermediate</Text>
              </View>
            </View>
            <View style={{flex: 0.9, flexDirection: 'row', justifyContent: 'center', paddingLeft: 6, alignItems: 'center'}}>
              <View style={{flex: 0.2, alignItems: 'flex-end', justifyContent: 'center'}}>
                <View style={{backgroundColor: levelColors["advanced"], borderRadius: 10, height: 6, width: 6}}/>
              </View>
              <View style={{flex: 0.8, flexDirection: 'column', justifyContent: 'center'}}>
                <Text style={{color: "white", fontSize: 10, paddingLeft: 10, textAlign: 'left'}}>advanced</Text>
              </View>
            </View>

          </View>

          <ScrollView style={{ flex: 1 }}>
            {Object.entries(programsInfo).map(([fullName, info]) => (
              <Pressable
                onPress={() => {
                  setFullName(fullName);
                  setSelectedData(trackingData[fullName].data)
                  setViewModeVisible(true);
                  // handleChildPage('programTracking', fullName, trackingData[fullName].data, ["1", "1"]);
                }}
                key={fullName}
                style={[
                  styles.programBox,
                  {
                    borderColor: "grey",
                  },
                ]}
              >

                <ImageBackground source={levelImages[info.level]} resizeMode="contain" style={{flex: 1, width: '100%', height: '100%'}}>

                <View style={{flex: 1, flexDirection: "row", padding: 4}}>
                  <View style={{flex: 0.075, flexDirection: 'column', backgroundColor: levelColors[info.level], borderRadius: 6, opacity: 0.8}}/>
                  <View style={{flex:0.65, flexDirection: 'column', justifyContent: 'center', paddingVertical: 10, paddingLeft: 24}}>
                    <Text style={styles.programText}><Text style={{fontSize: 20, fontWeight: 'bold'}}>{info.name}</Text></Text>
                  </View>
                  <View style={{flex:0.25, flexDirection: 'column', justifyContent: 'flex-end', paddingVertical: 4, paddingRight: 6}}>
                    <Text style={[styles.programTextMinor, {textAlignVertical: 'bottom'}]}>{info.type}</Text>
                  </View>
                </View>

                </ImageBackground>
                
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
    paddingVertical: 0,
    paddingHorizontal: 0,
    marginVertical: 4,
    backgroundColor: "black",
    borderWidth: 1,
    overflow: 'hidden'
  },
  programText: {
    color: "white",
    fontSize: 16,
    textAlign: "left",
  },
  programTextMinor: {
    color: "white",
    fontSize: 12,
    textAlign: "right",
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
