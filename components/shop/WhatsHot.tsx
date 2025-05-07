import { View, Text, ScrollView, ImageBackground, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import { DefaultTabStyles, ShopStyles, TrackingNotesStyles } from "@/components/HGStyles";
import { useState, useEffect } from "react";
import { useAppContext } from "@/components/appContext";
import { S3_API_URL } from "@/components/network/apiConfig";
import { GymCard } from "@/components/shop/ShopCard";
import { CardInfo } from "@/components/shop/ShopCardInfo";
import { SubscriptionCard } from "./SubscriptionCard";
import { FreeProgramCard } from "./FreeProgramCard";

type WhatsHotProps = {
    handleBackButton: () => void;
  };

export function WhatsHot({handleBackButton}: WhatsHotProps) {

    const { bestSellers, beginnerPrograms, intermediatePrograms, advancedPrograms } = useAppContext();

    const [menCardInfo, setMenCardInfo] = useState<any | null>(null);
    const [womenCardInfo, setWomenCardInfo] = useState<any | null>(null);

    const image = require("@/assets/images/HGBackground.png");
    const imageLines = require("@/assets/images/HGBackgroundHotLines.png");

    const [isWindowVisible, setisWindowVisible] = useState(false);
    const [content, setContent] = useState<any | null>(null);
    const [overlayVisible, setOverlayVisible] = useState(false);
    const [selectedCardInfo, setSelectedCardInfo] = useState(null); // New state for selected card info

    // Section for handling the Free Programs overlay @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

    const showFreePrograms = async () => {
        setContent(
            <>
            <View style={{flex: 0.1, width: '100%', paddingBottom: 20}}>
                <Text style={{fontFamily: 'Edo', color: 'gold', fontSize: 30, textAlign: 'center'}}>
                    Free programs
                </Text>
            </View>
            <View style={{flex: 0.15, width: '100%', paddingHorizontal: 30, paddingBottom: 20}}>
                <Text style={{color: 'white', fontSize: 15, textAlign: 'center'}}>
                    Browse our range of free once-off programs, ready to use and free forever!
                </Text>
            </View>
            <ScrollView contentContainerStyle={{flexGrow: 1}} style={{flex: 0.75, width: '100%', paddingHorizontal: 10}}>
            {/* <View style={{flex: 0.75, width: '100%', paddingHorizontal: 10, justifyContent: 'center'}}> */}
                <FreeProgramCard cardTitle="Free program" cardDays="3" cardLevel="beginner" />
                <FreeProgramCard cardTitle="Free program" cardDays="4" cardLevel="advanced" />
                <FreeProgramCard cardTitle="Free program" cardDays="2" cardLevel="intermediate" />
                <FreeProgramCard cardTitle="Free program" cardDays="2" cardLevel="intermediate" />
                <FreeProgramCard cardTitle="Free program" cardDays="2" cardLevel="intermediate" />
            {/* </View> */}
            </ScrollView>
            </>
        )
    };

    // Section for handling the Challenges overlay //////////////////////////////////////////////////////////

    const showChallenges = async () => {
        setContent(
            <>
            <View style={{flex:1, width: '100%', justifyContent: 'center', paddingHorizontal: 50}}>
                <Text style={{color: "white", fontSize: 15, textAlign: 'center'}}>
                    No challenges right now, but soon to come!    
                </Text> 
            </View>
            </>
        )
    };

    // Section for handling the Monthly Subscription overlay %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

    const showSubscriptions = async () => {
        setContent(
            <>
            <View style={{flex: 0.1, width: '100%', paddingBottom: 20}}>
                <Text style={{fontFamily: 'Edo', color: 'gold', fontSize: 30, textAlign: 'center'}}>
                    Monthly subscription
                </Text>
            </View>
            <View style={{flex: 0.15, width: '100%', paddingHorizontal: 30, paddingBottom: 20}}>
                <Text style={{color: 'white', fontSize: 15, textAlign: 'center'}}>
                    If you want a new and exciting gym program each month, that builds upon the previous program, you're in the right place!
                </Text>
            </View>
            <View style={{flex: 0.3, width: '100%', paddingHorizontal: 10, justifyContent: 'center'}}>
                <SubscriptionCard cardTitle="Subscription plan" cardDays="~ 2 days/week" />
            </View>
            <View style={{flex: 0.3, width: '100%', paddingHorizontal: 10, justifyContent: 'center'}}>
                <SubscriptionCard cardTitle="Subscription plan" cardDays="4 days/week" />
            </View>
            <View style={{flex: 0.15}} />
            </>
        )
    };

    // Section for handling the Best Sellers overlay ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    const handleCardPress = (programDetails: any) => {
        setSelectedCardInfo(programDetails);
        setOverlayVisible(true);
    };

    const showBestSellers = () => {
        try {
            if (bestSellers) {
                const maleBestSeller = bestSellers['men'];
                const femaleBestSeller = bestSellers['women'];
    
                if (beginnerPrograms[maleBestSeller]) {
                    setMenCardInfo(beginnerPrograms[maleBestSeller]);
                } else if (intermediatePrograms[maleBestSeller]) {
                    setMenCardInfo(intermediatePrograms[maleBestSeller]);
                } else if (advancedPrograms[maleBestSeller]) {
                    setMenCardInfo(advancedPrograms[maleBestSeller]);
                }
    
                if (beginnerPrograms[femaleBestSeller]) {
                    setWomenCardInfo(beginnerPrograms[femaleBestSeller]);
                } else if (intermediatePrograms[femaleBestSeller]) {
                    setWomenCardInfo(intermediatePrograms[femaleBestSeller]);
                } else if (advancedPrograms[femaleBestSeller]) {
                    setWomenCardInfo(advancedPrograms[femaleBestSeller]);
                }
            } else {
                console.log('No bestSellers data found in AsyncStorage.');
            }
        } catch (error) {
            console.error('Error retrieving bestSellers data:', error);
        }
    };
    
    // Effect to update content after card info is set
    useEffect(() => {
        if (menCardInfo && womenCardInfo) {
            const maleBestSeller = bestSellers['men'];
            const femaleBestSeller = bestSellers['women'];
            const menImgUri = `${S3_API_URL}/${maleBestSeller.replace(/ /g, "+")}.jpg`;
            const womenImgUri = `${S3_API_URL}/${femaleBestSeller.replace(/ /g, "+")}.jpg`;
    
            setContent(
                <>
                <View style={{flex: 0.1, width: '100%', paddingBottom: 30}}>
                    <Text style={{fontFamily: 'Edo', color: 'gold', fontSize: 44, textAlign: 'center'}}>
                        Best sellers!
                    </Text>
                    <Text style={{color: 'white', fontSize: 15, textAlign: 'center', paddingTop: 10}}>
                        As chosen by you...
                    </Text>
                </View>
                <View style={{ flex: 0.8, width: '100%', backgroundColor: 'black', paddingTop: 10 }}>
                    <View style={[ShopStyles.cardBlockContainer, { backgroundColor: 'black' }]}>
                        <GymCard
                            key={1}
                            imgUri={menImgUri}
                            cardInfo={menCardInfo}
                            onPress={() => handleCardPress(menCardInfo)}
                        />
                        <GymCard
                            key={2}
                            imgUri={womenImgUri}
                            cardInfo={womenCardInfo}
                            onPress={() => handleCardPress(womenCardInfo)}
                        />
                    </View>
                </View>
                </>
            );
        }
    }, [menCardInfo, womenCardInfo]);

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    
    return (
        <ImageBackground source={image} resizeMode="stretch" style={{ flex: 1, width: "100%", height: "100%" }}>
            
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              
                <View style={{width: "100%", height: '100%'}}>

                    <Pressable style={{flex: 0.1, width: "20%", paddingLeft: 20, paddingTop: 5, paddingBottom: 5, justifyContent: 'center'}} onPress={handleBackButton}>
                        <Text style={[TrackingNotesStyles.backButtonText]}>Back</Text>
                    </Pressable>

                        <View style={{flex: 1, flexDirection: 'column', width: "100%", height: '100%', paddingHorizontal: 10, paddingBottom: 20}}>

                            <View style={[ShopStyles.shopHotRowContainer, {flex: 2}]}>
                                <View style={[ShopStyles.shopHotSpacer, {flex: 1}]}/>
                                <Pressable style={[ShopStyles.shopHotButton, {flex: 4}]} onPress={() => [showBestSellers(), setisWindowVisible(true)]}>
                                    <Text style={{color: 'white', fontSize: 22, textDecorationLine: 'underline'}}>Best sellers</Text>
                                    <Text style={{color: 'white'}}>What people love</Text>
                                </Pressable>
                                <View style={[ShopStyles.shopHotSpacer, {flex: 2, backgroundColor: 'cyan'}]}/>
                            </View>
                            <View style={[ShopStyles.shopHotRowContainer, {flex: 1}]}>
                                <View style={[ShopStyles.shopHotSpacer, {flex: 1, backgroundColor: 'magenta'}]}/>
                                <Pressable style={[ShopStyles.shopHotButton, {flex: 2}]} onPress={() => [showSubscriptions(), setisWindowVisible(true)]}>
                                    <Text style={{color: 'white', fontSize: 22, textDecorationLine: 'underline'}}>Monthly subscription</Text>
                                    <Text style={{color: 'white'}}>New programs every month</Text>
                                </Pressable>
                            </View>
                            <View style={[ShopStyles.shopHotRowContainer, {flex: 2}]}>
                                <View style={[ShopStyles.shopHotSpacer, {flex: 0.2}]}/>
                                <Pressable style={[ShopStyles.shopHotButton, {flex: 2}]} onPress={() => [showChallenges(), setisWindowVisible(true)]}>
                                    <Text style={{color: 'white', fontSize: 22, textDecorationLine: 'underline'}}>Challenges</Text>
                                    <Text style={{color: 'white'}}>Get involved</Text>
                                </Pressable>
                                <View style={[ShopStyles.shopHotSpacer, {flex: 2, backgroundColor: 'gold'}]}/>
                            </View>
                            <View style={[ShopStyles.shopHotRowContainer, {flex: 1}]}>
                                <View style={[ShopStyles.shopHotSpacer, {flex: 1, backgroundColor: 'cyan'}]}/>
                                <Pressable style={[ShopStyles.shopHotButton, {flex: 5}]} onPress={() => [showFreePrograms(), setisWindowVisible(true)]}>
                                    <Text style={{color: 'white', fontSize: 22, textDecorationLine: 'underline'}}>Free programs</Text>
                                    <Text style={{color: 'white'}}>Get a real feel without paying</Text>
                                </Pressable>
                                <View style={[ShopStyles.shopHotSpacer, {flex: 1}]}/>
                            </View>

                        </View>


                    {/* Full-screen image picker overlay */}
                    {isWindowVisible && (
                        <View style={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        right: 0, 
                        bottom: 0, 
                        height: '100%',
                        width: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 1)', 
                        justifyContent: "center", 
                        alignItems: "center", 
                        zIndex: 10,
                        }}>
                        <View style={{ 
                            position: 'absolute', 
                            top: 0, 
                            left: 0, 
                            right: 0, 
                            bottom: 0, 
                            height: '100%',
                            backgroundColor: 'rgba(255, 0, 0, 0)', 
                            justifyContent: "flex-start", 
                            alignItems: "flex-start", 
                            paddingTop: 10,
                            zIndex: 10,
                        }}>

                        <Pressable style={{flex: 0.1, width: "20%", paddingLeft: 20, marginTop: 0, 
                            marginBottom: 30, justifyContent: 'flex-end'}} onPress={() => [
                                setisWindowVisible(false), 
                                setContent(null), 
                                setMenCardInfo(null), 
                                setWomenCardInfo(null)]}>
                            <Text style={[TrackingNotesStyles.backButtonText]}>Back</Text>
                        </Pressable>

                        {content}

                        {overlayVisible && (
                            <View style={ShopStyles.CardInfoOverlayContainer}>
                                <TouchableOpacity onPress={() => setOverlayVisible(false)}>
                                    <Text style={[TrackingNotesStyles.backButtonText, { marginBottom: 20 }]}>Back</Text>
                                </TouchableOpacity>
                                {selectedCardInfo && <CardInfo cardInfo={selectedCardInfo} />}
                            </View>
                        )}

                        </View>
                        </View>
                    )}
                    
                </View>

            </ScrollView>
        </ImageBackground>
    );
}



