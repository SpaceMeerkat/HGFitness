import { useAppContext } from "@/components/appContext";
import { BASE_API_URL } from "@/components/network/apiConfig";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { ActivityIndicator, Modal, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";

type SuggestProgramModalProps = {
    visible: boolean;
    onClose: () => void;
};

export function SuggestProgramModal({ visible, onClose }: SuggestProgramModalProps) {
    const { profile } = useAppContext();
    const [suggestion, setSuggestion] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const isLoggedIn = !!profile;

    const handleSubmit = async () => {
        if (!suggestion.trim()) return;
        setLoading(true);

        try {
            // SKIP: simulate API call — replace with real fetch when endpoint is ready
            await new Promise(resolve => setTimeout(resolve, 2000));
            const status = 200;
            // END SKIP

            // Real call (uncomment when endpoint is ready):
            // const response = await fetch(`${BASE_API_URL}/programSuggestion`, {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ suggestion, username: profile?.username }),
            // });
            // const status = response.status;

            if (status === 200) {
                setSubmitted(true);
            }
        } catch (error) {
            console.error('Error submitting suggestion:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setSuggestion('');
        setSubmitted(false);
        onClose();
    };

    return (
        <Modal visible={visible} animationType="fade" transparent>
            <Pressable
                style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.75)', justifyContent: 'center', alignItems: 'center' }}
                onPress={handleClose}>
                <Pressable
                    style={{ width: '88%', backgroundColor: 'black', borderWidth: 2, borderColor: 'grey', borderRadius: 8, padding: 24 }}
                    onPress={() => {}}>

                    {/* Spinner overlay */}
                    {loading && (
                        <View style={{
                            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                            backgroundColor: 'rgba(0,0,0,0.6)',
                            borderRadius: 8,
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 10,
                        }}>
                            <ActivityIndicator size="large" color="white" />
                        </View>
                    )}

                    {/* Header */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                        <Ionicons name="bulb-outline" size={26} color="yellow" style={{ marginRight: 10 }} />
                        <Text style={{ fontFamily: 'Edo', fontSize: 24, color: 'white' }}>Suggest a Program</Text>
                    </View>

                    {isLoggedIn ? (
                        submitted ? (
                            /* Post-submit confirmation */
                            <View style={{ alignItems: 'center', paddingVertical: 16 }}>
                                <Ionicons name="checkmark-circle-outline" size={48} color="lime" style={{ marginBottom: 12 }} />
                                <Text style={{ color: 'white', fontSize: 16, textAlign: 'center', lineHeight: 24 }}>
                                    Thanks for the suggestion, {profile.username}!{'\n'}We'll take a look.
                                </Text>
                                <TouchableOpacity
                                    onPress={handleClose}
                                    style={{ marginTop: 24, paddingHorizontal: 32, paddingVertical: 10, borderRadius: 500, borderWidth: 2, borderColor: 'grey' }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            /* Suggestion form */
                            <View>
                                <Text style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14, marginBottom: 12, lineHeight: 20 }}>
                                    Got a program idea? Let us know what you'd like to see and we'll consider adding it to the shop.
                                </Text>
                                <TextInput
                                    value={suggestion}
                                    onChangeText={(text) => setSuggestion(text.slice(0, 500))}
                                    placeholder="Describe your program idea..."
                                    placeholderTextColor="rgba(255,255,255,0.3)"
                                    multiline
                                    numberOfLines={5}
                                    maxLength={500}
                                    style={{
                                        backgroundColor: '#111',
                                        borderWidth: 1,
                                        borderColor: 'grey',
                                        borderRadius: 8,
                                        color: 'white',
                                        fontSize: 14,
                                        padding: 12,
                                        minHeight: 120,
                                        textAlignVertical: 'top',
                                    }}
                                />
                                <Text style={{ color: suggestion.length >= 500 ? 'white' : 'grey', fontSize: 12, textAlign: 'right', marginTop: 4 }}>
                                    {suggestion.length}/500
                                </Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
                                    <TouchableOpacity
                                        onPress={handleClose}
                                        style={{ flex: 0.45, paddingVertical: 10, borderRadius: 500, borderWidth: 2, borderColor: 'grey', alignItems: 'center' }}>
                                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={handleSubmit}
                                        style={{ flex: 0.45, paddingVertical: 10, borderRadius: 500, backgroundColor: 'white', alignItems: 'center', opacity: suggestion.trim() ? 1 : 0.4 }}
                                        disabled={!suggestion.trim()}>
                                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 14 }}>Submit</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    ) : (
                        /* Not logged in */
                        <View style={{ alignItems: 'center', paddingVertical: 16 }}>
                            <Ionicons name="lock-closed-outline" size={40} color="grey" style={{ marginBottom: 12 }} />
                            <Text style={{ color: 'white', fontSize: 15, textAlign: 'center', lineHeight: 22 }}>
                                Log in to suggest a gym program.{'\n'}
                                <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>
                                    Your ideas help shape what we build next!
                                </Text>
                            </Text>
                            <TouchableOpacity
                                onPress={handleClose}
                                style={{ marginTop: 24, paddingHorizontal: 32, paddingVertical: 10, borderRadius: 500, borderWidth: 2, borderColor: 'grey' }}>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Pressable>
            </Pressable>
        </Modal>
    );
}
