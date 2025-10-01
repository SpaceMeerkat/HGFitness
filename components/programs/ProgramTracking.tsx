import { DefaultTabStyles, ProgramStyles, ShopStyles, TrackingNotesStyles } from "@/components/HGStyles";
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { S3_API_URL } from "@/components/network/apiConfig";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { Modal, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { WebView } from 'react-native-webview';
import { FindPrecedingNumber } from './FindPrecedingNumber';
import { InitializeExerciseDictionary } from './InitializeExerciseDictionary';
import SaveSession from "./SaveSession";
import TrackingNotes from "./TrackingNotes";
import { ExerciseDescriptions } from "./TrackingStyles";

import { useAppContext } from "@/components/appContext";

type PageType = 'programs' | 'programOverview' | 'programTracking';

type ProgramTrackerProps = {
  programLevel: string,
  programID: any;
  programData: any;
  programDay: any;
  completedKeys: any;
  handleChildPage: (page: 'programs' | 'programOverview' | 'programTracking', programLevel?: string, programID?: any, programData?: any, programDay?: any, completedKeys?: any) => void;
  trackingMode: any;
  setSingleSessionsVisible: any;
};

type ProgramLevel = 'advanced' | 'intermediate' | 'beginner';

interface TrackingData {
  [key: string]: {
    activeStatus: boolean;
    subsetExercises: string[];
    subsetReps: number[];
    type: string;
    uniqueSetKey: string;
    userInputReps: string[];
    userInputWeights: string[];
    userNotes: string;
  };
}

interface Placeholders {
  day: string;
  trackingData: TrackingData;
  week: string;
}

type GymProgramEntry = [string, string, string, string];

export const getDescriptionByExerciseName = (
  exerciseName: string,
  masterGymProgramsDictionary: GymProgramEntry[]
): string | null => {
  const match = masterGymProgramsDictionary.find(
    ([, name]) => name.trim().toLowerCase() === exerciseName.trim().toLowerCase()
  );
  return match ? match[3] : null;
};

export const getAlternativeByExerciseName = (
  exerciseName: string,
  masterGymProgramsDictionary: GymProgramEntry[]
): string => {
  // First: find the match by name (column 2)
  const initialMatch = masterGymProgramsDictionary.find(
    ([, name]) => name.trim().toLowerCase() === exerciseName.trim().toLowerCase()
  );
  if (!initialMatch) return '';
  const alternativeId = initialMatch[2];
  // Second: find the entry whose ID (column 1) matches alternativeId
  const alternativeMatch = masterGymProgramsDictionary.find(
    ([id]) => id === alternativeId
  );
  // Return the name (column 2) of the matched alternative
  return alternativeMatch ? alternativeMatch[1] : '';
};

export function ProgramTracker({programLevel, programID, programData, programDay, completedKeys, handleChildPage, trackingMode, setSingleSessionsVisible }: ProgramTrackerProps) {

  const { setTrackingData, trackingData, masterGymProgramsDictionary } = useAppContext();
  // Handle the memory keys/data for tracker placeholders
  const memoryKeys = trackingData[programID]["memoryKeys"];
  const memoryData = trackingData[programID]["memoryData"];
  const oneShot = programID.toLowerCase().includes("singlesession");
  const completedDay = completedKeys.includes(`${programDay[0]}_${programDay[1]}`);
  const [placeholders, setPlaceHolders] = useState<Placeholders | null>(null);
  // Handle the dictionary of exercises and keys from reading in
  const exercises = programData[programDay[0]][programDay[1]]["exercises"];
  const exerciseKeys = Object.keys(exercises);
  const [token, setToken] = useState<string | null>(null);
  // Set the notes visibility to false to initialise
  const [isNotesVisible, setIsNotesVisible] = useState(false);
  const [exerciseDictionary, setExerciseDictionary] = useState(InitializeExerciseDictionary(exerciseKeys, exercises));
  // state for the 'next' button being pressed for color changes etc.
  const [isPressed, setIsPressed] = useState(false);
  // state for the save session button being pressed for color changes etc.
  const [saveIsPressed, setSaveIsPressed] = useState(false);
  const [isSaveVisible, setIsSaveVisible] = useState(false);
  // Handle any saving overlays
  const [saving, setSaving] = useState(false);
  // Styling
  const image = require("@/assets/images/HGBackground.png");
  
  const [modalVisible, setModalVisible] = useState(false);
  const [modalExercise, setModalExercise] = useState<string | ''>('');
  const [modalDescription, setModalDescription] = useState<string[]>([]);
  const [alternativeIsPressed, setAlternativeIsPressed] = useState(false);
  // State to hold the index of the exercise for which notes are being edited
  const [currentExerciseIndexForNotes, setCurrentExerciseIndexForNotes] = useState<number | null>(0);

  const showExerciseModal = (exercise: string) => {
    // For showing the exercise descriptions step by step guides
    const description = getDescriptionByExerciseName(exercise, masterGymProgramsDictionary);
    if (description) {
      const splitDescription = description.split('/');
      setModalExercise(exercise);
      setModalDescription(splitDescription);
      setModalVisible(true);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const retrievedToken = await SecureStore.getItemAsync('jwtToken');
      if (retrievedToken) {
        setToken(retrievedToken); 
      } else {
        console.log('No ID found in SecureStore');
        setToken(null); 
      }
    };
    fetchProfile(); 
  }, []);
  
  const handleExerciseClick = (index: number) => {
    setCurrentExerciseIndexForNotes(index);
    setExerciseDictionary(prevState => {
      const newState = { ...prevState };
      Object.keys(newState).forEach(key => {
        newState[parseInt(key)].activeStatus = parseInt(key) === index;
      });
      return newState;
    });
  }; 

  const handleInputChange = (index: number, type: 'weight' | 'reps' | 'notes', setIndex: number, value: string) => {
    setExerciseDictionary(prevState => {
      const newState = { ...prevState };
      if (type === 'weight') {
        newState[index].userInputWeights[setIndex] = value;
      } else if (type === 'reps') {
        newState[index].userInputReps[setIndex] = value;
      } else if (type === 'notes') {
        if (value === '') {
          newState[index].userNotes = null;
        } else {
          newState[index].userNotes = value;
        }
      }
      return newState;
    });
  };

  useEffect(() => {
    const result = FindPrecedingNumber(memoryKeys, programDay[0]);

    let newPlaceholders: Placeholders | null = null;

    if (result !== 0 && !completedDay) {
      newPlaceholders = memoryData[`week-${result}-day-${programDay[1]}`];
    } else if (completedDay) {
      newPlaceholders = memoryData[`week-${programDay[0]}-day-${programDay[1]}`];
    }

    // set placeholders (this is async)
    setPlaceHolders(newPlaceholders);

    // Force a shallow update of exerciseDictionary so components that depend on it re-render.
    // This avoids any stale closures / mutated-object problems.
    setExerciseDictionary(prev => {
      if (!prev) return prev;
      return { ...prev };
    });

  }, [memoryKeys, programDay, memoryData]);

  const renderExercises = () => {

    return Object.keys(exerciseDictionary).map(key => {
      const index = parseInt(key);
      const exerciseSet = exerciseDictionary[index];

      return (
        <View key={exerciseSet.uniqueSetKey} style={{ paddingBottom: 5 }}>
          {exerciseSet.activeStatus ? (
            <View style={ProgramStyles.trackingActive}>
              <Pressable style={ProgramStyles.trackingType} onPress={()=>handleExerciseClick(-1)}>
                <Text style={[DefaultTabStyles.defaultTypeText, {textAlign: "center"}]}>
                  {exerciseSet.type}
                </Text>
              </Pressable>
              <View style={ProgramStyles.trackingChildContainer}>
                <View style={ProgramStyles.trackingExerciseHeader}>
                  <Text style={[DefaultTabStyles.defaultTrackingText, ShopStyles[(programLevel) as ProgramLevel]]}>
                    Exercise
                  </Text>
                </View>
                <View style={ProgramStyles.trackingWeight}>
                  <Text style={[DefaultTabStyles.defaultTrackingText, ShopStyles[(programLevel) as ProgramLevel]]}>
                    Rep range
                  </Text>
                </View>
                <View style={ProgramStyles.trackingInputHeader}>
                  <View style={{flexDirection: "row", justifyContent: "center", alignContent: "center", alignItems: "flex-end"}}>
                    <View>
                      <Text style={[DefaultTabStyles.defaultTrackingText, ShopStyles[(programLevel) as ProgramLevel]]}>
                        Weight
                      </Text>
                    </View>
                    <View style={{paddingLeft:3}}>
                      <Text style={[DefaultTabStyles.defaultTrackingText, {fontSize:9}, ShopStyles[(programLevel) as ProgramLevel]]}>
                        (kg)
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={ProgramStyles.trackingInputHeader}>
                  <Text style={[DefaultTabStyles.defaultTrackingText, ShopStyles[(programLevel) as ProgramLevel]]}>
                    Reps
                  </Text>
                </View>
              </View>
              {(exerciseSet.subsetExercises.map((exercise, setIndex) => {
                let weightPlaceholder: string;
                let repsPlaceholder: string;
                let rowColour = 'black';
                const uniqueCount = new Set(exerciseSet.subsetExercises).size;
                
                if (setIndex % 2 === 0 && uniqueCount > 1)  {
                  rowColour = '#232423'
                } else {
                  rowColour = 'black'
                }

                if (placeholders !== null) {
                  // console.log("PLACEHOLDERS are not null");
                  // Use the placeholders if they exist
                  try {
                    weightPlaceholder = placeholders.trackingData[exerciseSet.uniqueSetKey]?.userInputWeights[setIndex] || '';
                    repsPlaceholder = placeholders.trackingData[exerciseSet.uniqueSetKey]?.userInputReps[setIndex] || '';
                  } catch {
                    weightPlaceholder = ''; // Default to an empty string
                    repsPlaceholder = '';   // Default to an empty string
                  }
                } else {
                  // Define blank placeholders based on the length of subsetExercises
                  // console.log("defaulting placeholders!");
                  weightPlaceholder = ''; // Default to an empty string
                  repsPlaceholder = '';   // Default to an empty string
                }

                return (
                  <Pressable onPress={() => showExerciseModal(exercise)} key={`${exerciseSet.uniqueSetKey}-${setIndex}`} style={[ProgramStyles.trackingChildContainer, {backgroundColor: rowColour}]}>
                    <View style={[ProgramStyles.trackingExercise, {backgroundColor: rowColour}]}>
                      <Text style={[DefaultTabStyles.defaultTrackingExerciseText, { textAlign: 'right' }]}>
                        {exercise}
                      </Text>
                    </View>
                    <View style={[ProgramStyles.trackingWeight, {backgroundColor: rowColour}]}>
                      <Text style={DefaultTabStyles.defaultBoldText}>
                        {exerciseSet.subsetReps[setIndex]}
                      </Text>
                    </View>
                    <View style={[ProgramStyles.trackingContainer, {backgroundColor: rowColour}]}>
                      <View style={ProgramStyles.trackingExerciseInput}>
                        <TextInput
                          keyboardType="number-pad"
                          cursorColor={'black'}
                          textAlign={'center'}
                          textAlignVertical="center"
                          style={{ fontSize: 20, flex: 1, color: "white"}}
                          placeholder={weightPlaceholder}
                          value={exerciseSet.userInputWeights[setIndex] || ''}
                          onChangeText={value => handleInputChange(index, 'weight', setIndex, value)}
                          editable={!completedDay && trackingMode || oneShot}
                        />
                      </View>
                    </View>
                    <View style={[ProgramStyles.trackingContainer, {backgroundColor: rowColour}]}>
                      <View style={ProgramStyles.trackingWeightInput}>
                        <TextInput
                          keyboardType="number-pad"
                          cursorColor={"black"}
                          textAlign={'center'}
                          textAlignVertical={'center'}
                          style={{ fontSize: 20, flex: 1, width: '100%', color: "white" }}
                          placeholder={repsPlaceholder}
                          value={exerciseSet.userInputReps[setIndex] || ''}
                          onChangeText={value => handleInputChange(index, 'reps', setIndex, value)}
                          editable={!completedDay && trackingMode || oneShot}
                        />
                      </View>
                    </View>
                  </Pressable>
                );
              }))}
              <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={() => setModalVisible(false)}>
                <View style={ExerciseDescriptions.ModalBackground}>
                  <Pressable onPress={() => setModalVisible(false)} style={{paddingVertical: 20 }}>
                    <Text style={ExerciseDescriptions.ModalCloseText}>Back</Text>
                  </Pressable>
                  <ScrollView style={ExerciseDescriptions.ModalScrollBox}>
                    <View style={ExerciseDescriptions.ModalDescriptionBox}>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={ExerciseDescriptions.ModalTitleParentBox}>
                          <View style={[ExerciseDescriptions.ModalTitleBox, {borderColor: alternativeIsPressed ? 'gold' : 'grey'}]}>
                            <Text style={ExerciseDescriptions.ModalTitle}>
                              {modalExercise}
                            </Text>
                          </View>
                        </View>
                        <Pressable style={ExerciseDescriptions.ModalSwitchBox} 
                          onPressIn={() => {
                            setAlternativeIsPressed(true);
                            setExerciseDictionary(prevDict => {
                              const newDict = { ...prevDict };
                              const index = parseInt(exerciseSet.uniqueSetKey); // use uniqueSetKey as the lookup key
                              const currentSet = { ...newDict[index] };

                              const newSubsetExercises = [...currentSet.subsetExercises];
                              const newAlternativeExercises = [...currentSet.alternativeExercises];
                              const alternativeIDs = currentSet.alternativeIDs;

                              // Find which ID matches the modalExercise (either in subset or alt)
                              let targetID: string | null = null;
                              for (let i = 0; i < newSubsetExercises.length; i++) {
                                if (
                                  newSubsetExercises[i].trim() === modalExercise.trim() ||
                                  newAlternativeExercises[i].trim() === modalExercise.trim()
                                ) {
                                  targetID = alternativeIDs[i];
                                  break;
                                }
                              }

                              if (!targetID) return newDict; // no match found

                              // Swap all entries with the matching ID
                              for (let i = 0; i < newSubsetExercises.length; i++) {
                                if (alternativeIDs[i] === targetID) {
                                  const temp = newSubsetExercises[i];
                                  newSubsetExercises[i] = newAlternativeExercises[i];
                                  newAlternativeExercises[i] = temp;
                                }
                              }

                              // Update the set in the dictionary
                              currentSet.subsetExercises = newSubsetExercises;
                              currentSet.alternativeExercises = newAlternativeExercises;
                              newDict[index] = currentSet;

                              // Update modalExercise to the toggled version
                              const updatedModal = newSubsetExercises.find((e, i) =>
                                alternativeIDs[i] === targetID &&
                                e.trim() !== modalExercise.trim()
                              );

                              if (updatedModal) {
                                setModalExercise(updatedModal);
                                const description = getDescriptionByExerciseName(updatedModal, masterGymProgramsDictionary);
                                if (description) {
                                  const splitDescription = description.split('/');
                                  setModalDescription(splitDescription);
                                }
                              }

                              return newDict;
                            });
                          }}

                        onPressOut={() => setAlternativeIsPressed(false)}
                        >
                            <FontAwesome5 name="exchange-alt" size={20} color={alternativeIsPressed ? 'gold' : 'white'} />
                        </Pressable>
                      </View>
                    <View style={ExerciseDescriptions.ModalGifParentBox}>
                      <View style={ExerciseDescriptions.ModalGifChildBox}>
                        <WebView
                          source={{ uri: `${S3_API_URL}/testgif.gif` }}
                          style={{ flex: 1, backgroundColor: 'transparent' }}
                          scrollEnabled={false}
                          scalesPageToFit={true}
                        />
                      </View>
                    </View>
                      <View style={ExerciseDescriptions.ModalSubtitleBox}>
                        <Text style={ExerciseDescriptions.ModalSubtitleText}>
                          How to perform this exercise...
                        </Text>
                      </View>
                      {modalDescription.map((line, index) => (
                        <>
                          <View style={ExerciseDescriptions.ModalMappingBox}>
                            <Text style={ExerciseDescriptions.ModalStepNumber}>
                                <MaterialCommunityIcons name={`numeric-${index + 1}-circle` as any} size={20} color="lime" />
                            </Text>
                          </View>
                          <Text key={index} style={ExerciseDescriptions.ModalText}>
                            {line.trim()}
                          </Text>
                        </>
                      ))}
                    </View>
                  </ScrollView>
                </View>
              </Modal>
              {/* user notes pressable icon */}
              <View style={{backgroundColor: "black", flex: 1, flexDirection: "row", justifyContent : 'space-between', paddingRight: 24, paddingLeft:8, paddingTop: 12}}>
                <View style={{flex:0.665, flexDirection: 'row', paddingTop: 15}}> 
                  <Pressable 
                    style={{flex: 0.3, flexDirection: "row"}} 
                    onPress={() => { // Set the index of the exercise whose notes are being edited
                      setIsNotesVisible(true);
                    }}
                  >
                    {(() => {
                      let memoryNotes: string | null = null;
                      let notesIconColor = 'white';

                      if (placeholders !== null && exerciseSet) {
                        try {
                          memoryNotes = placeholders.trackingData[exerciseSet.uniqueSetKey]?.userNotes;
                          if (memoryNotes !== null && memoryNotes !== '') { // Check for empty string too
                            notesIconColor = 'red';
                          }
                        } catch (error) {
                          memoryNotes = exerciseSet.userNotes;
                        }
                      } else {
                        memoryNotes = exerciseSet.userNotes;
                      }

                      // Update icon color based on exerciseSet.userNotes as well for current session notes
                      if (exerciseSet.userNotes && exerciseSet.userNotes !== '') {
                        notesIconColor = 'red';
                      }

                      return (
                        <>
                          <TabBarIcon name={'document-text-outline'} color={notesIconColor} size={20} />
                          <Text 
                            style={[
                              DefaultTabStyles.defaultBodyText, 
                              { paddingLeft: 2, paddingTop: 5, color: notesIconColor, fontWeight: "bold" }
                            ]}
                          >
                            NOTES
                          </Text>
                        </>
                      );
                    })()}
                  </Pressable>
                </View>
                {/* user pressable next set button */}
                <Pressable style={{flex:0.335, 
                flexDirection: 'row', 
                justifyContent:"center", 
                alignItems: "center", 
                borderRadius:4, 
                backgroundColor: isPressed? 'black' : 'black',
                borderColor: isPressed ? 'lime' : 'grey',
                borderWidth: 1,
                paddingBottom:4}} 
                onPressIn={() => setIsPressed(true)}
                onPressOut={() => setIsPressed(false)}
                onPress={() => {handleExerciseClick(index + 1); setIsPressed(false)}}>
                  <Text style={[DefaultTabStyles.defaultBodyText, {paddingRight: 4, paddingBottom:6, color: 'lime', fontWeight: "bold", fontSize:12}]}>NEXT</Text>
                  <TabBarIcon name={'arrow-forward-circle-outline'} color="lime" size={20} />
                </Pressable>
              </View>
            </View>
          ) : (
            exerciseDictionary &&
            exerciseDictionary[index] &&
            exerciseDictionary[index].userInputReps &&
            exerciseDictionary[index].userInputWeights &&
            exerciseDictionary[index].subsetExercises &&
            exerciseDictionary[index].userInputReps.length === exerciseDictionary[index].subsetExercises.length &&
            exerciseDictionary[index].userInputWeights.length === exerciseDictionary[index].subsetExercises.length &&
            exerciseDictionary[index].userInputReps.every((val: any) => val !== null) &&
            exerciseDictionary[index].userInputWeights.every((val: any) => val !== null) ? 
            (
              <Pressable onPress={() => handleExerciseClick(index)} style={{borderColor: 'lime'}}>
                <Ionicons 
                  name="checkmark-circle" 
                  size={24} 
                  color="lime" 
                  style={[ProgramStyles.completedTickIcon, { position: 'absolute', right: -10, top: -4, zIndex: 100 }]} 
                />
                <View style={[ProgramStyles.trackingInactive, {borderColor: 'lime'}]}>
                      <Text style={[DefaultTabStyles.defaultMediumText, {color: 'black'}]}>{exerciseSet.type}</Text>
                </View>
              </Pressable>
            ) : (
              <Pressable onPress={() => handleExerciseClick(index)} style={{borderColor: 'lime'}}>
                <View style={ProgramStyles.trackingInactive}>
                      <Text style={[DefaultTabStyles.defaultMediumText, {color: 'black'}]}>{exerciseSet.type}</Text>
                </View>
              </Pressable>
            )
          )}
        </View>
      );
    }); 
  };

  const saveOpacity = completedDay && !oneShot || !trackingMode ? 0.5 : 1;

  console.log(completedDay, oneShot, !trackingMode); 

  return (
    <>
      <ScrollView style={ShopStyles.shopScrollContainer}>
        { (((completedDay && !oneShot) && !trackingMode) || 
        ((!completedDay && !oneShot) && !trackingMode) || 
        ((completedDay && !oneShot) && trackingMode) ||
        (oneShot && !trackingMode)) && (
          <Pressable style={{flex: 0.15, width: "20%", paddingLeft: 2, paddingTop: 10, paddingBottom: 28, justifyContent: 'center'}} 
          onPress={() => oneShot ? [setSingleSessionsVisible(true), handleChildPage('programs')] : handleChildPage('programOverview')}>
            <Text style={[TrackingNotesStyles.backButtonText]}>Back</Text>
          </Pressable>
        )}
        
        <View>
          {renderExercises()}
          <Pressable 
          style={[ProgramStyles.trackingSaveButton, {opacity: saveOpacity, backgroundColor: saveIsPressed? 'grey': 'black'}]}
          onPressIn={completedDay && !oneShot || !trackingMode ? undefined : () => { setSaveIsPressed(true) }}
          onPressOut={completedDay && !oneShot || !trackingMode ? undefined : () => { setSaveIsPressed(false) }}
          onPress={completedDay && !oneShot || !trackingMode ? undefined : () => { setIsSaveVisible(true); setSaveIsPressed(false); }}
          >
            <Text style={{color: "white"}}>Save session</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* TrackingNotes modal moved outside ScrollView and ImageBackground */}

      {currentExerciseIndexForNotes !== null && (
        <TrackingNotes
          // memoryNotes={exerciseDictionary[currentExerciseIndexForNotes]?.userNotes || 
          //   placeholders?.trackingData[currentExerciseIndexForNotes]?.userNotes || 
          //   ''}
          memoryNotes = {placeholders?.trackingData}
          mutableExerciseDictionary={exerciseDictionary} 
          handleInputChange={handleInputChange}
          visible={isNotesVisible}
          onClose={() => setIsNotesVisible(false)}
          index={currentExerciseIndexForNotes}
        />
      )}

      {/* SaveSession modal */}
      <SaveSession
        visible={isSaveVisible}
        onClose={() => setIsSaveVisible(false)}
        programID={programID}
        programDay={programDay}
        token={token}
        exerciseDictionary={exerciseDictionary}
        trackingData = {trackingData}
        setTrackingData = {setTrackingData}
        setSaving = {setSaving}
        handleChildPage={handleChildPage}
        setSingleSessionsVisible={setSingleSessionsVisible}
      />
      </>
  );
}