import { useAppContext } from "@/components/appContext";
import { DefaultTabStyles, ShopStyles, TrackingNotesStyles } from "@/components/HGStyles";
import { S3_API_URL } from "@/components/network/apiConfig";
import { GymCard } from "@/components/shop/ShopCard";
import { CardInfo } from "@/components/shop/ShopCardInfo";
import { useState } from "react";
import { ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";

export function BeginnerPrograms() {
    const { beginnerPrograms } = useAppContext();
    const [overlayVisible, setOverlayVisible] = useState(false);
    const [selectedCardInfo, setSelectedCardInfo] = useState(null); // New state for selected card info
    const [selectedCardName, setSelectedCardName] = useState('');
    const image = require("@/assets/images/HGBackground.png");

    // Toggle overlay visibility and set selected card info
    const handleCardPress = (programDetails: any, programName: string) => {
        setSelectedCardInfo(programDetails);
        setSelectedCardName(programName);
        setOverlayVisible(true);
    };

    return (
        <ImageBackground source={image} resizeMode="cover" style={{ flex: 1, width: "100%", height: "100%" }}>
            <ScrollView style={ShopStyles.shopScrollContainer}>
                <Text style={[DefaultTabStyles.defaultBoldText, {paddingTop: 16}]}>Beginner Programs</Text>
                <View style={ShopStyles.cardBlockContainer}>
                    {beginnerPrograms && Object.keys(beginnerPrograms).map((programKey, index) => {
                        const programDetails = beginnerPrograms[programKey];
                        return (
                            <GymCard
                                key={index}
                                cardFullName={programKey}
                                imgUri={`${S3_API_URL}/${programKey.replace(/ /g, "+")}.jpg`}
                                cardInfo={programDetails}
                                onPress={() => handleCardPress(programDetails, programKey)} // Pass programDetails on press
                            />
                        );
                    })}
                </View>
            </ScrollView>

            {overlayVisible && (
                <View style={ShopStyles.CardInfoOverlayContainer}>
                    <TouchableOpacity onPress={() => setOverlayVisible(false)}>
                    <Text style={[TrackingNotesStyles.backButtonText, {paddingBottom: 20}]}>Back</Text>
                    </TouchableOpacity>
                    {/* Display CardInfo with the selected card details */}
                    {selectedCardInfo && <CardInfo cardFullName={selectedCardName} cardInfo={selectedCardInfo} />}
                </View>
            )}
        </ImageBackground>
    );
}

