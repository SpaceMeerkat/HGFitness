import { TrackingNotesStyles } from "@/components/HGStyles";
import React, { useEffect, useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { normalizeNotes, parseAlternativeTriggerNote, splitNotes } from './NotesUtils';

interface NotesProps {
    memoryNotes: any;
    mutableExerciseDictionary: any;
    handleInputChange: (index: number, type: 'weight' | 'reps' | 'notes', setIndex: number, value: string) => void;
    visible: boolean;
    onClose: () => void;
    index: number;  // Pass index for exercise
    mutable: boolean;
    levelColor: string;
  }

  export default function TrackingNotes({ memoryNotes, mutableExerciseDictionary, handleInputChange, visible, onClose, index, mutable, levelColor }: NotesProps) {

    const [note, setNote] = useState<string | ''>('');
    const [placeholder, setPlaceholder] = useState(String || "Enter your notes")

    // Safe to index now
    const dictItem = mutableExerciseDictionary?.[index];
    const currentNotesArr = normalizeNotes(dictItem?.userNotes);
    const memNotesArr = normalizeNotes(memoryNotes?.[index]?.userNotes);
    const { freeTextNote: memFreeTextNote } = splitNotes(memNotesArr);

    // Nothing has happened in this viewing/tracking session yet (no swap, no typed note) -
    // fall back to whatever was actually saved previously (or this same completed session,
    // when viewing a finished day) so the notes remain visible instead of silently vanishing.
    const usingMemoryFallback = currentNotesArr.length === 0 && memNotesArr.length > 0;
    const sourceNotesArr = usingMemoryFallback ? memNotesArr : currentNotesArr;
    const { triggerNotes: displayTriggerNotes, freeTextNote: sourceFreeTextNote } = splitNotes(sourceNotesArr);
    const dictFreeTextNote = usingMemoryFallback ? '' : sourceFreeTextNote;

    useEffect(() => {
      // If nothing is passed in yet, just set placeholder and exit early
      if (!mutableExerciseDictionary && !memoryNotes) {
        setNote('');
        setPlaceholder("Enter your notes");
        return;
      }

      if (dictFreeTextNote) {
        setNote(dictFreeTextNote);
      } else if (memFreeTextNote) {
        setPlaceholder(`Previous note: ${memFreeTextNote}`);
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
            {displayTriggerNotes.length > 0 && (
              <View style={{width: '100%', marginBottom: 12}}>
                {displayTriggerNotes.map((triggerNote, i) => {
                  const parsed = parseAlternativeTriggerNote(triggerNote);
                  return (
                    <Text key={i} style={{fontSize: 13, marginBottom: 4}}>
                      {parsed ? (
                        <>
                          <Text style={{color: levelColor}}>{parsed.original}</Text>
                          <Text style={{color: 'white'}}> was swapped for </Text>
                          <Text style={{color: levelColor}}>{parsed.alternative}</Text>
                        </>
                      ) : (
                        <Text style={{color: 'white'}}>{triggerNote}</Text>
                      )}
                    </Text>
                  );
                })}
              </View>
            )}
            <TextInput
              style={[TrackingNotesStyles.textInput, {color: "black"}]}
              value={note}
              onChangeText={setNote}
              placeholder={placeholder}
              placeholderTextColor="#999"
              multiline={true}
              editable={mutable}
            />
            {(memFreeTextNote && mutable === true) ? (
              <TouchableOpacity onPress={() => {
                  if (memFreeTextNote) {
                    setNote(memFreeTextNote);
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