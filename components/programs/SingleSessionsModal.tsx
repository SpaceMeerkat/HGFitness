import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useEffect, useState } from "react";
import {
  ImageBackground, KeyboardAvoidingView,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text, TextInput, TouchableOpacity,
  View
} from 'react-native';

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

  // --- Filtering states ---
  const [searchText, setSearchText] = useState("");
  const [debouncedText, setDebouncedText] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [filteredPrograms, setFilteredPrograms] = useState(Object.entries(programsInfo));
  
  // --- Debounce effect for search ---
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedText(searchText);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchText]);

  // --- Filtering effect (runs when debounce finishes or level changes) ---
  useEffect(() => {
    const lowerSearch = debouncedText.toLowerCase();

    const newFiltered = Object.entries(programsInfo).filter(([_, info]) => {
      const matchesText =
        info.name.toLowerCase().includes(lowerSearch) ||
        info.type.toLowerCase().includes(lowerSearch);

      const matchesLevel =
        !selectedLevel || info.level.toLowerCase() === selectedLevel.toLowerCase();

      return matchesText && matchesLevel;
    });

    // Always sort beginner → intermediate → advanced
    const levelOrder: Record<string, number> = {
        beginner: 0,
        intermediate: 1,
        advanced: 2,
      };

    newFiltered.sort(([, a], [, b]) => {
      return levelOrder[a.level] - levelOrder[b.level];
    });

    setFilteredPrograms(newFiltered);
  }, [debouncedText, selectedLevel, programsInfo]);


  if (!programsInfo || !trackingData) return null;

  const handleLevelPress = (level: string) => {
    setSelectedLevel(prev => (prev === level ? null : level));
  };

    // Reset all filters
  const resetFilters = () => {
    setSelectedLevel(null);
    setSearchText("");
  };

  const handleClose = () => {
    resetFilters();
    onClose();
  };

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <KeyboardAvoidingView style={styles.center} enabled={false}>
        <View style={styles.card}>
          <Text style={styles.title}>Choose your session</Text>

          {/* Search Bar */}
          <View style={{ flex: 0.15, flexDirection: 'row', paddingRight: 8 }}>
            <View style={{ flex: 0.9, flexDirection: 'column', justifyContent: 'center', paddingRight: 8 }}>
              <TextInput
                cursorColor={'black'}
                textAlign={'left'}
                textAlignVertical="center"
                style={{
                  fontSize: 20,
                  flex: 1,
                  color: "black",
                  backgroundColor: 'white',
                  borderRadius: 8,
                  borderWidth: 1,
                  paddingLeft: 16
                }}
                placeholder={"Program search"}
                placeholderTextColor={"grey"}
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>
            <View style={{ flex: 0.1, flexDirection: 'column' }}>
              <TouchableOpacity
                onPress={() => resetFilters()}
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
              >
                <Ionicons name="close-circle-outline" size={28} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ flex: 0.05, justifyContent: 'center' }}>
            <View style={{ height: 3, backgroundColor: "grey", borderRadius: 100, borderWidth: 1 }} />
          </View>

          {/* Level Selectors */}
          <View style={{ flex: 0.1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            {["beginner", "intermediate", "advanced"].map(level => (
              <Pressable
                key={level}
                onPress={() => handleLevelPress(level)}
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: 4,
                  paddingVertical: 6,
                  borderWidth: selectedLevel === level ? 2 : 1,
                  borderColor: selectedLevel === level ? levelColors[level] : "grey",
                  borderRadius: 10,
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{
                    backgroundColor: levelColors[level],
                    borderRadius: 10,
                    height: 6,
                    width: 6
                  }} />
                  <Text style={{ color: "white", fontSize: 10, paddingLeft: 10 }}>
                    {level}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>

          {/* Filtered Program List */}
          <ScrollView style={{ flex: 1 }}>
            {filteredPrograms.map(([fullName, info]) => (
              <Pressable
                onPress={() => {
                  setFullName(fullName);
                  setSelectedData(trackingData[fullName].data);
                  setViewModeVisible(true);
                }}
                key={fullName}
                style={[
                  styles.programBox,
                  { borderColor: "grey" },
                ]}
              >
                <ImageBackground
                  source={levelImages[info.level]}
                  resizeMode="contain"
                  style={{ flex: 1, width: '100%', height: '100%' }}
                >
                  <View style={{ flex: 1, flexDirection: "row", padding: 4 }}>
                    <View
                      style={{
                        flex: 0.075,
                        flexDirection: 'column',
                        backgroundColor: levelColors[info.level],
                        borderRadius: 6,
                        opacity: 0.8,
                        justifyContent: 'center'
                      }}
                    >
                        <MaterialIcons name="loop" size={16} color="black" style={{textAlign: 'center'}} />
                        <Text style={{color: 'black', textAlignVertical: 'center', textAlign: 'center', fontSize: 12}}>{trackingData[fullName]['rerunNumber']}</Text>
                      </View>
                    <View style={{
                      flex: 0.65,
                      flexDirection: 'column',
                      justifyContent: 'center',
                      paddingVertical: 10,
                      paddingLeft: 24
                    }}>
                      <Text style={styles.programText}>
                        <Text style={{ fontSize: 20}}>{info.name}</Text>
                      </Text>
                    </View>
                    <View style={{
                      flex: 0.25,
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      paddingVertical: 4,
                      paddingRight: 6
                    }}>
                      <Text style={[styles.programTextMinor, { textAlignVertical: 'bottom' }]}>
                        {info.type}
                      </Text>
                    </View>
                  </View>
                </ImageBackground>
              </Pressable>
            ))}
          </ScrollView>

          <View style={{ flex: 0.01, borderRadius: 8, paddingVertical: 0 }} />

          <View style={styles.buttons}>
            <TouchableOpacity onPress={handleClose} style={[styles.btn, styles.closeBtn]}>
              <Text style={{ color: "#ffffffff", fontWeight: "bold" }}>Close</Text>
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
    paddingTop: 0,
    marginBottom: 12,
    fontWeight: "600",
    textAlign: "center",
    color: "white",
  },
  programBox: {
    flex: 0.1,
    borderRadius: 8,
    marginVertical: 4,
    backgroundColor: "black",
    borderWidth: 1,
    overflow: 'hidden'
  },
  programText: {
    fontFamily: 'Edo',
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
    paddingTop: 4,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginLeft: 8,
  },
  closeBtn: { backgroundColor: "black" },
});
