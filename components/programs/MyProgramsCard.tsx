import { useAppContext } from "@/components/appContext";
import { DefaultTabStyles, ShopStyles } from "@/components/HGStyles";
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store';
import { useState } from "react";
import { ActivityIndicator, Image, ImageBackground, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { BASE_API_URL } from "../network/apiConfig";

type CardLevel = 'beginner' | 'advanced' | 'intermediate';

interface GymCardProps {
    imgUri: any;
    cardLevel: CardLevel;
    cardTitle: string;
    cardInfo: string;
    rerunNumber: any;
    newStatus: boolean;
    handleChildPage: (page: 'programs' | 'programOverview' | 'programTracking', 
        programID?: any, 
        programData?: any, 
        programDay?: any, 
        memoryKeys?: any,
        memoryData?: any
    ) => void;
  }

export function MyProgramCard({ imgUri, cardLevel, cardTitle, cardInfo, rerunNumber, newStatus, handleChildPage }: GymCardProps) {

    const { trackingData } = useAppContext(); 

    const imageSource = typeof imgUri === 'string' ? { uri: imgUri } : imgUri;
    const shortCardTitle = cardTitle.split('-')[0];
    const [loading, setLoading] = useState(false);
   

    const handlePress = async () => {
        const programRawData = trackingData[cardTitle]
        if (programRawData !== null && programRawData !== undefined) {
            handleChildPage('programOverview', cardTitle, programRawData["data"], null, programRawData["memoryKeys"], programRawData["memoryData"]); 
        } else {
            console.log("woops!!!");
        }
    };

    const levelColors: { [key: string]: string } = {
        beginner: 'cyan',
        intermediate: 'gold',
        advanced: 'magenta'
      };
      
    const textColor = levelColors[cardLevel] || 'defaultColor';

    let content = null;

    if (newStatus === true) {
        content = (
            <View style={{
                position: 'absolute',
                top: 8, // adjust as needed
                left: 8, // adjust as needed
            }}>
                <Text style={{ color: "red" }}>New!</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {rerunNumber > 0 && (
                <View style={{ position: "absolute", top: 8, left: 8, zIndex: 10 }}>
                    <Text style={[ShopStyles[cardLevel], { fontSize: 12}]}>Rerun: {rerunNumber}</Text>
                </View>
            )}
            <View style={[ShopStyles.myProgramsBlockContainer, ShopStyles[cardLevel], loading ? styles.overlay : null]}>
                {content}
                <View style={{ flex: 0.8 }}>
                    <Text style={[DefaultTabStyles.defaultBoldText, { color: textColor }]}>{shortCardTitle}</Text>
                    <Text style={DefaultTabStyles.defaultMediumText}>{cardInfo}</Text>
                </View>
                <View style={{ flex: 0.3 }}>
                    <Image source={imageSource} style={{ flex: 1, width: "100%", resizeMode: "contain" }} />
                </View>
                {loading && (
                    <View style={styles.spinnerContainer}>
                        <ActivityIndicator size="large" color={textColor} />
                    </View>
                )}
            </View>
            <Pressable onPress={(handlePress)} style={styles.pressableCover} />
        </View>
    );
}

const UpdateBackendRerun = async (
    cardTitle: string,
    trackingData: any,
    setTrackingData: (data: any) => void
) => {
    const retrievedToken = await SecureStore.getItemAsync("jwtToken");
    if (retrievedToken) {
        try {
            const url = `${BASE_API_URL}/rerunGymProgram`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    programID: cardTitle,
                    token: retrievedToken,
                }),
            });
            if (response.ok) {
                const jsonResponse = await response.json();
                const freshProgramTrackingData =
                    jsonResponse.freshProgramTrackingData;
                const updatedTrackingData = {
                    ...trackingData,
                    [cardTitle]: freshProgramTrackingData,
                };
                setTrackingData(updatedTrackingData);
                await AsyncStorage.setItem(
                    "trackingData",
                    JSON.stringify(updatedTrackingData)
                );
            }
        } catch (err) {
            console.error("Updating backend error:", err);
        }
    }
};


const stylesModal = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        backgroundColor: "white",
        borderRadius: 12,
        padding: 20,
        width: "85%",
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: "center",
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        flex: 1,
        marginHorizontal: 5,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: "center",
    },
    cancelButton: {
        backgroundColor: "grey",
    },
    rerunButton: {
        backgroundColor: "limegreen",
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
});


interface RerunProgramModalProps {
    cardTitle: string;
    visible: boolean;
    onClose: () => void;
}

export function RerunProgramModal({ cardTitle, visible, onClose }: RerunProgramModalProps) {
    const { profile, trackingData, setTrackingData } = useAppContext();

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={stylesModal.modalBackground}>
                <View style={stylesModal.modalContainer}>
                    <Text style={stylesModal.modalText}>
                        Would you like to rerun this program? {"\n\n"}
                        Clicking "Rerun" will allow you to rerun the program with a fresh start!
                        But don't worry, all previously tracked gym progress will remain in your
                        profile and stats.
                    </Text>

                    <View style={stylesModal.buttonRow}>
                        <Pressable
                            style={[stylesModal.button, stylesModal.cancelButton]}
                            onPress={onClose}
                        >
                            <Text style={stylesModal.buttonText}>Cancel</Text>
                        </Pressable>

                        <Pressable
                            style={[stylesModal.button, stylesModal.rerunButton]}
                            onPress={async () => {
                                await UpdateBackendRerun(cardTitle, trackingData, setTrackingData);
                                onClose();
                            }}
                        >
                            <Text style={stylesModal.buttonText}>Rerun</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

interface CompletedGymCardProps {
    imgUri: any;
    cardTitle: string;
    cardLevel: CardLevel;
    cardInfo: string;
}

export function CompletedGymCard({ imgUri, cardLevel, cardTitle, cardInfo }: CompletedGymCardProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const { profile } = useAppContext();

    const imageSource = typeof imgUri === "string" ? { uri: imgUri } : imgUri;
    const shortCardTitle = cardTitle.split("-")[0];

    const levelColors: { [key: string]: string } = {
        beginner: "cyan",
        intermediate: "gold",
        advanced: "magenta",
    };

    const textColor = levelColors[cardLevel] || "defaultColor";

    return (
        <View style={styles.container}>
            <View style={{ position: "absolute", top: -10, right: -10, zIndex: 10 }}>
                <Ionicons name="checkmark-circle" size={24} color="lime" />
            </View>

            <View style={[ShopStyles.myProgramsBlockContainer, { borderColor: "grey", opacity: 0.7 }]}>
                <View style={{ flex: 0.8 }}>
                    <Text style={[DefaultTabStyles.defaultBoldText, { color: textColor, opacity: 0.7 }]}>
                        {shortCardTitle}
                    </Text>
                    <Text style={[DefaultTabStyles.defaultMediumText, { opacity: 0.7 }]}>{cardInfo}</Text>
                </View>
                <View style={{ flex: 0.3 }}>
                    <Image
                        source={imageSource}
                        style={{ flex: 1, width: "100%", resizeMode: "contain", opacity: 0.7 }}
                    />
                </View>
            </View>

            {/* Overlay pressable that opens modal */}
            <Pressable onPress={profile.premium !== true ? undefined : () => setModalVisible(true)} style={styles.pressableCover} />

            {/* Rerun modal */}
            <RerunProgramModal
                cardTitle={cardTitle}
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
            />
        </View>
    );
}

interface SubscriptionOptionsProps {
    cardImage: any;
    cardTitle: string;
    cardInfo: string;
    setSubscriptionsVisible: (data: any) => void
  }


export function SubscriptionOptionsCard({ cardImage, cardTitle, setSubscriptionsVisible }: SubscriptionOptionsProps) {

    let shortCardTitle = "None";
    let noImage = false;

    if (cardTitle === "NotPremium") {
        shortCardTitle = "Get New Programs Every Month";
        noImage = true;
    } else {
        shortCardTitle = "Days a week";
        noImage = false;
    }
      
    const images: Record<string, any> = {
    "4": require("@/assets/images/4Days.png"),
    "2": require("@/assets/images/2Days.png"),
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={cardImage} resizeMode="cover" style={[ShopStyles.myProgramsBlockContainer, 
                {overflow: 'hidden', borderColor: 'grey', backgroundColor: 'transparent', 
                height: 70, paddingBottom: 5}]
                }>
                <View style={{ flex: 1, paddingLeft: 4}}>
                    <Text style={{ fontFamily: 'Edo', color: 'white', fontSize:20 }}>{shortCardTitle}</Text>
                </View>
            </ImageBackground>
            <Pressable onPress={() => setSubscriptionsVisible(true)} style={styles.pressableCover} />
        </View>
    );
}

interface SubscriptionCardProps {
    cardImage: any;
    cardTitle: string;
    cardInfo: string;
    handleChildPage: (page: 'programs' | 'programOverview' | 'programTracking', 
        programID?: any, 
        programData?: any, 
        programDay?: any, 
        memoryKeys?: any,
        memoryData?: any
    ) => void;
  }

export function SubscriptionProgramCard({ cardImage, cardTitle, cardInfo, handleChildPage }: SubscriptionCardProps) {

    const { trackingData } = useAppContext(); 

    let shortCardTitle = "None";
    let noImage = false;

    if (cardTitle === "NotPremium") {
        shortCardTitle = "Get New Programs Every Month";
        noImage = true;
    } else {
        shortCardTitle = "Days a week";
        noImage = false;
    }
      

    const images: Record<string, any> = {
    "4": require("@/assets/images/4Days.png"),
    "2": require("@/assets/images/2Days.png"),
    };

    const handlePress = async () => {
        const programRawData = trackingData[cardTitle]
        console.log(cardTitle);
        if (programRawData !== null && programRawData !== undefined) {
            handleChildPage('programOverview', cardTitle, programRawData["data"], null, programRawData["memoryKeys"], programRawData["memoryData"]); 
        } else {
            // Open up the modal here for the subscription purchase options
            console.log("woops!!!");
        }
    };

    let content = null;

    return (
        <View style={styles.container}>
            <ImageBackground source={cardImage} resizeMode="cover" style={[ShopStyles.myProgramsBlockContainer, 
                {overflow: 'hidden', borderColor: 'grey', backgroundColor: 'transparent', 
                height: cardTitle != "NotPremium" ? 70 : 70, paddingBottom: cardTitle != "NotPremium" ? 8 : 5}]
                }>
                {content}
                {cardTitle != "NotPremium" && (
                    <View style={{ flex: 0.25 }}>
                        <Image source={images[cardInfo]} style={{ flex: 1, width: "100%", resizeMode: "contain" }} />
                    </View>
                )}
                <View style={{ flex: 1, paddingLeft: cardTitle != "NotPremium"? 16 : 4}}>
                    <Text style={{ fontFamily: 'Edo', color: 'white', fontSize: cardTitle != "NotPremium"? 26 :20 }}>{shortCardTitle}</Text>
                </View>
                {cardTitle != "NotPremium" && (
                    <View style={{ flex: 0.3, paddingRight: 10 }}>
                        <Image source={require("@/assets/images/WhiteTransparentLogo.png")} style={{ flex: 1, width: "100%", resizeMode: "contain" }} />
                    </View>
                )}
            </ImageBackground>
            <Pressable onPress={handlePress} style={styles.pressableCover} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
        position: 'relative',
    },
    spinnerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for the spinner
    },
    pressableCover: {
        ...StyleSheet.absoluteFillObject,
        // This will make the Pressable cover the entire area, adjust if needed
        zIndex: 1, // Ensure it's on top
    },
});


interface FreeSessionsProps {
    cardTitle: string;
    modalPress: React.Dispatch<React.SetStateAction<boolean>>;
  }
export function FreeSessionsCard({ cardTitle, modalPress }: FreeSessionsProps) {

    return (
        <View style={[styles.container]}>
            <View style={[ShopStyles.myProgramsBlockContainer, {height: 140, borderColor: 'lightgray', backgroundColor: 'rgba(0, 0, 0, 1)'}]}>
                <View style={{ flex: 0.6 }}>
                    <Text style={{fontWeight: "bold", color: 'rgba(72, 185, 1, 1)', fontSize: 24 }}>
                        Time to <Text style={{fontFamily: "Edo", fontWeight: "normal", fontSize: 32, color: "white"}}>Train</Text>
                    </Text>
                </View>
                <View style={{ flex: 0.4, paddingRight: 0 }}>
                    <Image source={require("@/assets/images/cards/FreeCard2.jpg")} style={{ flex: 1, width: "100%", resizeMode: "contain" }} />
                </View>
            </View>
            <Pressable onPress={() =>modalPress(true)} style={styles.pressableCover} />
        </View>
    );
}

