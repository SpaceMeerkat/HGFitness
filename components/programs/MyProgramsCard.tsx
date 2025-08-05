import { useAppContext } from "@/components/appContext";
import { DefaultTabStyles, ShopStyles } from "@/components/HGStyles";
import { useState } from "react";
import { ActivityIndicator, Image, ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";

type CardLevel = 'beginner' | 'advanced' | 'intermediate';

interface GymCardProps {
    imgUri: any;
    cardLevel: CardLevel;
    cardTitle: string;
    cardInfo: string;
    newStatus: boolean;
    handleChildPage: (page: 'programs' | 'programOverview' | 'programTracking', 
        programID?: any, 
        programData?: any, 
        programDay?: any, 
        memoryKeys?: any,
        memoryData?: any
    ) => void;
  }

export function MyProgramCard({ imgUri, cardLevel, cardTitle, cardInfo, newStatus, handleChildPage }: GymCardProps) {

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
            <Pressable onPress={handlePress} style={styles.pressableCover} />
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

    const { trackingData, profile } = useAppContext(); 
    const shortCardTitle = cardTitle.split('-')[0];  
    const premiumStatus = profile.premium;

    const handlePress = async () => {
        const programRawData = trackingData[cardTitle]
        if (programRawData !== null && programRawData !== undefined) {
            handleChildPage('programOverview', cardTitle, programRawData["data"], null, programRawData["memoryKeys"], programRawData["memoryData"]); 
        } else {
            console.log("woops!!!");
        }
    };

    let content = null;

    return (
        <View style={styles.container}>
            <ImageBackground source={cardImage} resizeMode="cover" style={[ShopStyles.myProgramsBlockContainer, {overflow: 'hidden', borderColor: 'grey', backgroundColor: 'transparent'}]}>
                {content}
                <View style={{ flex: 0.8 }}>
                    <Text style={[DefaultTabStyles.defaultBoldText, { color: 'white' }]}>{shortCardTitle}</Text>
                    <Text style={[DefaultTabStyles.defaultMediumText, { color: 'white' }]}>{cardInfo}</Text>
                </View>
                <View style={{ flex: 0.3, paddingRight: 10 }}>
                    <Image source={require("@/assets/images/WhiteTransparentLogo.png")} style={{ flex: 1, width: "100%", resizeMode: "contain" }} />
                </View>
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