import { TrackingNotesStyles } from "@/components/HGStyles";
import React, { useEffect, useState } from 'react';
import { Modal, Pressable, Text, TextInput, View } from 'react-native';

interface NotesProps {
    memoryNotes: any;
    mutableExerciseDictionary: any;
    handleInputChange: (index: number, type: 'weight' | 'reps' | 'notes', setIndex: number, value: string) => void;
    visible: boolean;
    onClose: () => void;
    index: number;  // Pass index for exercise
  }

  export default function TrackingNotes({ memoryNotes, mutableExerciseDictionary, handleInputChange, visible, onClose, index }: NotesProps) {

    const [note, setNote] = useState<string | ''>('');
    const [placeholder, setPlaceholder] = useState(String || "Enter your notes")

    console.log("index: ", index, "memory: ", memoryNotes[index]?.userNotes, "dict: ", mutableExerciseDictionary[index]?.userNotes, "note: ", note);

    useEffect(() => {
      if (memoryNotes[index]?.userNotes) {
        setPlaceholder(memoryNotes[index]?.userNotes);
      }
      if (!memoryNotes[index]?.userNotes) {
        setNote('');
        setPlaceholder("Enter your notes");
      }
      if (mutableExerciseDictionary[index]?.userNotes) {
        setNote(mutableExerciseDictionary[index]?.userNotes);
      }
    }, [index, mutableExerciseDictionary, memoryNotes]);

    const handleSaveNote = () => {
        // Use handleInputChange to update the notes in the dictionary
        handleInputChange(index, 'notes', 0, note); // Assuming setIndex is 0 for notes
        onClose(); // Close the modal after saving
    };
  
    return (
      <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={onClose}
      >
        <View style={TrackingNotesStyles.overlay}>
          <View style={TrackingNotesStyles.container}>
            <Pressable style={TrackingNotesStyles.backButton} onPress={handleSaveNote}>
              <Text style={TrackingNotesStyles.backButtonText}>Back</Text>
            </Pressable>
            <Text style={TrackingNotesStyles.title}>Notes</Text>
            <TextInput
              style={[TrackingNotesStyles.textInput, {color: "black"}]}
              value={note}
              onChangeText={setNote}
              placeholder={placeholder}
              placeholderTextColor="#999"
              multiline={true}
            />
            {/* <Pressable style={TrackingNotesStyles.saveButton} onPress={handleSaveNote}>
              <Text style={TrackingNotesStyles.saveButtonText}>Save Note</Text>
            </Pressable> */}
          </View>
        </View>
      </Modal>
    );
  }