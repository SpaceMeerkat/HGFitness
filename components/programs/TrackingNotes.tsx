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
    mutable: boolean;
  }

  export default function TrackingNotes({ memoryNotes, mutableExerciseDictionary, handleInputChange, visible, onClose, index, mutable }: NotesProps) {

    const [note, setNote] = useState<string | ''>('');
    const [placeholder, setPlaceholder] = useState(String || "Enter your notes")

    // Safe to index now
    const dictItem = mutableExerciseDictionary?.[index];
    const memItem  = memoryNotes?.[index]?.userNotes;

    useEffect(() => {
      // If nothing is passed in yet, just set placeholder and exit early
      if (!mutableExerciseDictionary && !memoryNotes) {
        setNote('');
        setPlaceholder("Enter your notes");
        return;
      }

      if (dictItem?.userNotes) {
        setNote(dictItem.userNotes);
      } else if (memItem) {
        setPlaceholder(`Previous note: ${memItem}`);
        setNote('')
      } else {
        setPlaceholder("Enter your notes");
        setNote('');
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
              <Text style={TrackingNotesStyles.backButtonText}>{note === ''? 'Back' : 'Save'}</Text>
            </TouchableOpacity>
            <Text style={TrackingNotesStyles.title}>Notes</Text>
            <TextInput
              style={[TrackingNotesStyles.textInput, {color: "black"}]}
              value={note}
              onChangeText={setNote}
              placeholder={placeholder}
              placeholderTextColor="#999"
              multiline={true}
              editable={mutable}
            />
            {(memoryNotes?.[index]?.userNotes && mutable === true) ? (
              <TouchableOpacity onPress={() => {
                  if (memoryNotes?.[index]?.userNotes) {
                    setNote(memoryNotes[index].userNotes);
                  }
                }}
                style={{backgroundColor: 'grey', justifyContent: 'center', paddingVertical: 8, paddingHorizontal: 16,
                borderRadius: 16, borderColor: 'white', borderWidth: 1, alignItems: 'center'
              }}>
                <Text style={{color: 'white', textAlign: 'center', textAlignVertical: 'center', fontSize: 12}}>Copy/repeat</Text>
              </TouchableOpacity>
            ) : null}            
          </View>
        </View>
      </Modal>
    );
  }