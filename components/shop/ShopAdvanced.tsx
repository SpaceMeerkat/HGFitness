import { useAppContext } from "@/components/appContext";
import { DefaultTabStyles, ShopStyles, TrackingNotesStyles } from "@/components/HGStyles";
import { S3_API_URL } from "@/components/network/apiConfig";
import { GymCard } from "@/components/shop/ShopCard";
import { CardInfo } from "@/components/shop/ShopCardInfo";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from "react";
import { ImageBackground, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { filterAndSortPrograms } from "./ShopFilterPrograms";
import FilterSortModal from "./ShopFilterProgramsModal";

type ProgramDict = {
  [programName: string]: {
    Days: string[];
    Price: string[];
    [key: string]: any;
  };
};

type ShopProgramProps = {
    handleBackButton: () => boolean;
  };

export function AdvancedPrograms({handleBackButton}: ShopProgramProps) {
    const { advancedPrograms } = useAppContext();
    const [overlayVisible, setOverlayVisible] = useState(false);
    const [selectedCardInfo, setSelectedCardInfo] = useState(null); // New state for selected card info
    const [selectedCardName, setSelectedCardName] = useState(''); 
    const [filteredPrograms, setFilteredPrograms] = useState<ProgramDict | null>(null); 
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const image = require("@/assets/images/HGBackground.png");

    useEffect(() => {
        const initialFilteredPrograms = filterAndSortPrograms(advancedPrograms, {
            alphabetical: false,
            priceAscending: false,
            priceDescending: false,
            sex: "All",
            days: 7,
            daysAscending: true,
        });
        setFilteredPrograms(initialFilteredPrograms);
    }, [advancedPrograms]);

    // Toggle overlay visibility and set selected card info
    const handleCardPress = (programDetails: any, programName: string) => {
        setSelectedCardInfo(programDetails);
        setSelectedCardName(programName);
        setOverlayVisible(true);
    };

    return (
        <ImageBackground source={image} resizeMode="cover" style={{ flex: 1, width: "100%", height: "100%" }}>
            <ScrollView style={ShopStyles.shopScrollContainer}>
                <Pressable style={{flex: 0.15, width: "20%", paddingLeft: 8, paddingTop: 10, paddingBottom: 0, justifyContent: 'center'}} onPress={handleBackButton}>
                    <Text style={[TrackingNotesStyles.backButtonText]}>Back</Text>
                </Pressable>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', paddingTop: 16, paddingHorizontal: 8}}>
                <View style = {{flex: 0.8}}>
                    <Text style={[DefaultTabStyles.defaultBoldText, {textAlignVertical: 'center'}]}>Advanced Programs</Text>
                </View>
                <Pressable onPress={() => setFilterModalVisible(true)} style={{flex:0.2, justifyContent: 'center', alignItems: 'flex-end'}}>
                    <Ionicons name="filter" size={24} color="white" />
                </Pressable>
                </View>
                <FilterSortModal visible={filterModalVisible} onClose={() => setFilterModalVisible(false)} programs={advancedPrograms} setFilteredPrograms={setFilteredPrograms}/>
                <View style={ShopStyles.cardBlockContainer}>
                    {filteredPrograms && Object.keys(filteredPrograms).map((programKey, index) => {
                        const programDetails = filteredPrograms[programKey];
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

