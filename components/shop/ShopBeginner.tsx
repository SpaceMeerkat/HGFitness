import { useState } from "react";
import { View, Text, ScrollView, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { DefaultTabStyles, ShopStyles, TrackingNotesStyles } from "@/components/HGStyles";
import { GymCard } from "@/components/shop/ShopCard";
import { CardInfo } from "@/components/shop/ShopCardInfo";
import { S3_API_URL } from "@/components/network/apiConfig";
import { useAppContext } from "@/components/appContext";

export function BeginnerPrograms() {
    const { beginnerPrograms } = useAppContext();
    const [overlayVisible, setOverlayVisible] = useState(false);
    const [selectedCardInfo, setSelectedCardInfo] = useState(null); // New state for selected card info
    const image = require("@/assets/images/HGBackground.png");

    // Toggle overlay visibility and set selected card info
    const handleCardPress = (programDetails: any) => {
        setSelectedCardInfo(programDetails);
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
                                imgUri={`${S3_API_URL}/${programKey.replace(/ /g, "+")}.jpg`}
                                cardInfo={programDetails}
                                onPress={() => handleCardPress(programDetails)} // Pass programDetails on press
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
                    {selectedCardInfo && <CardInfo cardInfo={selectedCardInfo} />}
                </View>
            )}
        </ImageBackground>
    );
}

