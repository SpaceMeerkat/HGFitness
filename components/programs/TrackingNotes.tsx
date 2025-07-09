import { TrackingNotesStyles } from "@/components/HGStyles";
import React, { useEffect, useState } from 'react';
import { Modal, Pressable, Text, TextInput, View } from 'react-native';

interface NotesProps {
    memoryNotes: string | null;
    handleInputChange: (index: number, type: 'weight' | 'reps' | 'notes', setIndex: number, value: string) => void;
    visible: boolean;
    onClose: () => void;
    index: number;  // Pass index for exercise
  }

  export default function TrackingNotes({ memoryNotes, handleInputChange, visible, onClose, index }: NotesProps) {
    
    const [note, setNote] = useState(memoryNotes || '');
    const [placeholder, setPlaceholder] = useState(memoryNotes || "Enter your notes")

    // Synchronize note state with memoryNotes prop
    useEffect(() => {
        setNote(memoryNotes || '');
        setPlaceholder(memoryNotes || "Enter your notes");
    }, [memoryNotes]); // This will run whenever memoryNotes changes, but preserves the placeholder

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
            <Pressable style={TrackingNotesStyles.backButton} onPress={onClose}>
              <Text style={TrackingNotesStyles.backButtonText}>Back</Text>
            </Pressable>
            <Text style={TrackingNotesStyles.title}>Notes</Text>
            <TextInput
              style={TrackingNotesStyles.textInput}
              onChangeText={setNote}
              placeholder={placeholder}
              placeholderTextColor="#999"
              multiline={true}
            />
            <Pressable style={TrackingNotesStyles.saveButton} onPress={handleSaveNote}>
              <Text style={TrackingNotesStyles.saveButtonText}>Save Note</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  }