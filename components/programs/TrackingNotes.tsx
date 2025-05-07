import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, TextInput, StyleSheet, Modal } from 'react-native';
import { TrackingNotesStyles } from "@/components/HGStyles"

interface NotesProps {
    memoryNotes: string | null;
    handleInputChange: (index: number, type: 'weight' | 'reps' | 'notes', setIndex: number, value: string) => void;
    visible: boolean;
    onClose: () => void;
    index: number;  // Pass index for exercise
  }

  export default function TrackingNotes({ memoryNotes, handleInputChange, visible, onClose, index }: NotesProps) {
    
    const [note, setNote] = useState(memoryNotes || '');

    // Synchronize note state with memoryNotes prop
    useEffect(() => {
        setNote(memoryNotes || '');
    }, [memoryNotes]); // This will run whenever memoryNotes changes

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
              value={note}
              onChangeText={setNote}
              placeholder="Enter your notes"
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