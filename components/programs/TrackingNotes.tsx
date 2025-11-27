import { TrackingNotesStyles } from "@/components/HGStyles";
import React, { useEffect, useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';

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

    // console.log("INSIDE: memoryNotes:",memoryNotes);
    // console.log("INSIDE: mutableExerciseDictionary:",mutableExerciseDictionary);
    // console.log("INSIDE: index:",index);


    useEffect(() => {
      if (index === -1) {
        setNote('');
        setPlaceholder("Enter your notes");
      }
      if (mutableExerciseDictionary[index]?.userNotes) {
        setNote(mutableExerciseDictionary[index]?.userNotes);
      }
      if (!memoryNotes) {
        setNote('');
        setPlaceholder("Enter your notes");
        return;
      }
      if (memoryNotes[index]?.userNotes) {
        setPlaceholder(memoryNotes[index]?.userNotes);
      }
      if (!memoryNotes[index]?.userNotes) {
        setNote('');
        setPlaceholder("Enter your notes");
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
            <TouchableOpacity style={TrackingNotesStyles.backButton} onPress={handleSaveNote}>
              <Text style={TrackingNotesStyles.backButtonText}>Back</Text>
            </TouchableOpacity>
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