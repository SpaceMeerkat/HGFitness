import { useAppContext } from "@/components/appContext";
import { ShopStyles, TrackingNotesStyles } from "@/components/HGStyles";
import { S3_API_URL } from "@/components/network/apiConfig";
import { PremiumButton } from "@/components/profile/PremiumButton";
import { GymCard } from "@/components/shop/ShopCard";
import { CardInfo } from "@/components/shop/ShopCardInfo";
import { useEffect, useState } from "react";
import { ImageBackground, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import PricingModal from "../premium/PricingModal";
import { FreeProgramCard } from "./FreeProgramCard";

type WhatsHotProps = {
    handleBackButton: () => void;
  };

export function WhatsHot({handleBackButton}: WhatsHotProps) {

    const { bestSellers, beginnerPrograms, intermediatePrograms, advancedPrograms } = useAppContext();

    const [menCardInfoBeginners, setMenCardInfoBeginners] = useState<any | null>(null);
    const [menCardInfoIntermediate, setMenCardInfoIntermediate] = useState<any | null>(null);
    const [menCardInfoAdvanced, setMenCardInfoAdvanced] = useState<any | null>(null);
    const [womenCardInfoBeginners, setWomenCardInfoBeginners] = useState<any | null>(null);
    const [womenCardInfoIntermediate, setWomenCardInfoIntermediate] = useState<any | null>(null);
    const [womenCardInfoAdvanced, setWomenCardInfoAdvanced] = useState<any | null>(null);

    const [menCardNameBeginners, setMenCardNameBeginners] = useState<string | ''>('');
    const [menCardNameIntermediate, setMenCardNameIntermediate] = useState<string | ''>('');
    const [menCardNameAdvanced, setMenCardNameAdvanced] = useState<string | ''>('');
    const [womenCardNameBeginners, setWomenCardNameBeginners] = useState<string | ''>('');
    const [womenCardNameIntermediate, setWomenCardNameIntermediate] = useState<string | ''>('');
    const [womenCardNameAdvanced, setWomenCardNameAdvanced] = useState<string | ''>('');
    
    const image = require("@/assets/images/WhatsHot2.jpg");
    const image2 = require("@/assets/images/WhatsHot4.jpg");
    const image3 = require("@/assets/images/WhatsHot5.jpg");
    const bestSellersImage = require("@/assets/images/bestSellers.jpg");
    const challengesImage = require("@/assets/images/challenges.jpg");
    const backgroundImage = require("@/assets/images/HGBackground.png");

    const [isWindowVisible, setisWindowVisible] = useState(false);
    const [content, setContent] = useState<any | null>(null);
    const [overlayVisible, setOverlayVisible] = useState(false);
    const [selectedCardInfo, setSelectedCardInfo] = useState(null); // New state for selected card info
    const [selectedCardName, setSelectedCardName] = useState('');

    const [premiumVisible, setPremiumVisible] = useState(false);
    const [defaultPricing, setDefaultPricing] = useState<string|any>("premium");

    useEffect(() => {
        setMenCardInfoBeginners(beginnerPrograms[bestSellers.beginner.men]);
        setWomenCardInfoBeginners(beginnerPrograms[bestSellers.beginner.women]);
        setMenCardInfoIntermediate(intermediatePrograms[bestSellers.intermediate.men]);
        setWomenCardInfoIntermediate(intermediatePrograms[bestSellers.intermediate.women]);
        setMenCardInfoAdvanced(advancedPrograms[bestSellers.advanced.men]);
        setWomenCardInfoAdvanced(advancedPrograms[bestSellers.advanced.women]);
        setMenCardNameBeginners(bestSellers.beginner.men);
        setWomenCardNameBeginners(bestSellers.beginner.women);
        setMenCardNameIntermediate(bestSellers.intermediate.men);
        setWomenCardNameIntermediate(bestSellers.intermediate.women);
        setMenCardNameAdvanced(bestSellers.advanced.men);
        setWomenCardNameAdvanced(bestSellers.advanced.women);
    }, [bestSellers, beginnerPrograms, intermediatePrograms, advancedPrograms]);

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
            <View style={{flex: 0.5, width: '100%', paddingHorizontal: 8}}>
            <View style={{flex: 0.2, width: '100%', paddingBottom: 20}}>
                <Text style={{fontFamily: 'Edo', color: 'white', fontSize: 30, textAlign: 'center'}}>
                    Premium - free trial
                </Text>
            </View>
            <View style={{flex: 0.5, width: '100%', paddingHorizontal: 8, paddingBottom: 30}}>
                <PremiumButton />       
            </View>
            <View style={{flex: 0.5, width: '100%', paddingHorizontal: 30, paddingBottom: 0}}>
                <Text style={{color: 'white', fontSize: 15, textAlign: 'center'}}>
                    If you want a new and exciting gym program each month, that builds upon the previous program, you're in the right place!
                </Text>
            </View>
            </View>
            <View style={{flex: 0.15}} />
            </>
        )
    };

    // Section for handling the Best Sellers overlay ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    const handleCardPress = (programName: any, programDetails: any) => {
        setSelectedCardName(programName);
        setSelectedCardInfo(programDetails);
        setOverlayVisible(true);
    };

    const showBestSellers = () => { 
        
        const menImgUriBeginner = `${S3_API_URL}/${menCardNameBeginners?.replace(/ /g, "+")}.jpg`;
        const menImgUriIntermediate = `${S3_API_URL}/${menCardNameIntermediate?.replace(/ /g, "+")}.jpg`;
        const menImgUriAdvanced = `${S3_API_URL}/${menCardNameAdvanced?.replace(/ /g, "+")}.jpg`;

        const womenImgUriBeginner = `${S3_API_URL}/${womenCardNameBeginners?.replace(/ /g, "+")}.jpg`;
        const womenImgUriIntermediate = `${S3_API_URL}/${womenCardNameIntermediate?.replace(/ /g, "+")}.jpg`;
        const womenImgUriAdvanced = `${S3_API_URL}/${womenCardNameAdvanced?.replace(/ /g, "+")}.jpg`;

        setContent(
            <ScrollView style={{flex: 1, width: '100%'}}> 
            <View style={{flex: 0.1, width: '100%', paddingBottom: 30}}>
                <Text style={{fontFamily: 'Edo', color: 'gold', fontSize: 44, textAlign: 'center'}}>
                    Best sellers!
                </Text>
                <Text style={{color: 'white', fontSize: 15, textAlign: 'center', paddingTop: 10}}>
                    As chosen by you...
                </Text>
            </View>
            <View style={{flex: 0.1}}>
                <Text style={{color: 'white', textAlign: 'center'}}>Beginners</Text>
            </View>
            <View style={{ flex: 0.8, width: '100%', backgroundColor: 'black', paddingTop: 10 }}>
                <View style={[ShopStyles.cardBlockContainer, { backgroundColor: 'black' }]}>
                    <GymCard key={1} cardFullName={menCardNameBeginners} imgUri={menImgUriBeginner} cardInfo={menCardInfoBeginners} onPress={() => handleCardPress(menCardNameBeginners, menCardInfoBeginners)}/>
                    <GymCard key={2} cardFullName={womenCardNameBeginners} imgUri={womenImgUriBeginner} cardInfo={womenCardInfoBeginners} onPress={() => handleCardPress(womenCardNameBeginners, womenCardInfoBeginners)}/>
                </View>
            </View>
            <View style={{flex: 0.1}}>
                <Text style={{color: 'white', textAlign: 'center'}}>Intermediate</Text>
            </View>
            <View style={{ flex: 0.8, width: '100%', backgroundColor: 'black', paddingTop: 10 }}>
                <View style={[ShopStyles.cardBlockContainer, { backgroundColor: 'black' }]}>
                    <GymCard key={1} cardFullName={menCardNameIntermediate} imgUri={menImgUriIntermediate} cardInfo={menCardInfoIntermediate} onPress={() => handleCardPress(menCardNameIntermediate, menCardInfoIntermediate)}/>
                    <GymCard key={2} cardFullName={womenCardNameIntermediate} imgUri={womenImgUriIntermediate} cardInfo={womenCardInfoIntermediate} onPress={() => handleCardPress(womenCardNameIntermediate, womenCardInfoIntermediate)}/>
                </View>
            </View>
            <View style={{flex: 0.1}}>
                <Text style={{color: 'white', textAlign: 'center'}}>Advanced</Text>
            </View>
            <View style={{ flex: 0.8, width: '100%', backgroundColor: 'black', paddingTop: 10 }}>
                <View style={[ShopStyles.cardBlockContainer, { backgroundColor: 'black' }]}>
                    <GymCard key={1} cardFullName={menCardNameAdvanced} imgUri={menImgUriAdvanced} cardInfo={menCardInfoAdvanced} onPress={() => handleCardPress(menCardNameAdvanced, menCardInfoAdvanced)}/>
                    <GymCard key={2} cardFullName={womenCardNameAdvanced} imgUri={womenImgUriAdvanced} cardInfo={womenCardInfoAdvanced} onPress={() => handleCardPress(womenCardNameAdvanced, womenCardInfoAdvanced)}/>
                </View>
            </View>
            </ScrollView> 
        )
    };

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    
    return (
        <ImageBackground source={backgroundImage} resizeMode="cover" style={{ flex: 1, width: "100%", height: "100%" }}>

            <PricingModal
                visible={premiumVisible}
                onClose={() => setPremiumVisible(false)} 
                defaultType={defaultPricing}
            />
            
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              
                <View style={{width: "100%", height: '100%'}}>

                    <TouchableOpacity style={{flex: 0.1, width: "20%", paddingLeft: 20, paddingTop: 5, paddingBottom: 5, justifyContent: 'center'}} onPress={handleBackButton}>
                        <Text style={[TrackingNotesStyles.backButtonText]}>Back</Text>
                    </TouchableOpacity>

                        <View style={{flex: 1, flexDirection: 'column', width: "100%", height: '100%', paddingHorizontal: 10, paddingBottom: 20}}>

                            <View style={[ShopStyles.shopHotRowContainer, {flex: 2}]}>
                                <Pressable style={[ShopStyles.shopHotButton, {flex: 4}]} onPress={() => [showBestSellers(), setisWindowVisible(true)]}>
                                    <ImageBackground source={image} resizeMode="contain" style={{ flex: 1, width: "100%", height: "100%", justifyContent: 'center'}}>
                                        <Text style={{color: 'white', fontSize: 22, textDecorationLine: 'underline', paddingLeft: 20}}>Best sellers</Text>
                                        <Text style={{color: 'white', paddingLeft: 20}}>What people love</Text>
                                    </ImageBackground>
                                </Pressable>
                                <ImageBackground source={bestSellersImage} style={[ShopStyles.shopHotSpacer, {flex: 3}]}/>
                            </View>
                            <View style={[ShopStyles.shopHotRowContainer, {flex: 1}]}>
                                {/* <View style={[ShopStyles.shopHotSpacer, {flex: 1}]}/> */}
                                <Pressable style={[ShopStyles.shopHotButton, {flex: 2}]} onPress={() => [showSubscriptions(), setisWindowVisible(true)]}>
                                    <ImageBackground source={image3} resizeMode="contain" style={{ flex: 1, width: "100%", height: "100%", justifyContent: 'center'}}>
                                        <Text style={{color: 'white', fontSize: 22, textDecorationLine: 'underline', paddingLeft: 50}}>Free trial</Text>
                                        <Text style={{color: 'white', paddingLeft: 50}}>Try premium for one month</Text>
                                    </ImageBackground>
                                </Pressable>
                            </View>
                            <View style={[ShopStyles.shopHotRowContainer, {flex: 2}]}>
                                <ImageBackground source={challengesImage} style={[ShopStyles.shopHotSpacer, {flex: 3}]}/>
                                <Pressable style={[ShopStyles.shopHotButton, {flex: 3}]} onPress={() => [showChallenges(), setisWindowVisible(true)]}>
                                <ImageBackground source={image2} resizeMode="contain" style={{ flex: 1, width: "100%", height: "100%", justifyContent: 'center'}}>
                                        <Text style={{color: 'white', fontSize: 22, textDecorationLine: 'underline', paddingLeft: 20}}>Challenges</Text>
                                        <Text style={{color: 'white', paddingLeft: 20}}>Get involved</Text>
                                </ImageBackground>
                                </Pressable>
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

                        <TouchableOpacity style={{flex: 0.1, width: "20%", paddingLeft: 20, marginTop: 0, 
                            marginBottom: 30, justifyContent: 'flex-end'}} onPress={() => [
                                setisWindowVisible(false), 
                                setContent(null)]}>
                            <Text style={[TrackingNotesStyles.backButtonText]}>Back</Text>
                        </TouchableOpacity>

                        {content}

                        {overlayVisible && (
                            <View style={ShopStyles.CardInfoOverlayContainer}>
                                <TouchableOpacity onPress={() => setOverlayVisible(false)}>
                                    <Text style={[TrackingNotesStyles.backButtonText, { marginBottom: 20 }]}>Back</Text>
                                </TouchableOpacity>
                                {selectedCardInfo && <CardInfo cardFullName={selectedCardName} cardInfo={selectedCardInfo} />}
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



