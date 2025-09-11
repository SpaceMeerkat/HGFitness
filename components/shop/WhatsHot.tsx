import { useAppContext } from "@/components/appContext";
import { ShopStyles, TrackingNotesStyles } from "@/components/HGStyles";
import { S3_API_URL } from "@/components/network/apiConfig";
import { GymCard } from "@/components/shop/ShopCard";
import { CardInfo } from "@/components/shop/ShopCardInfo";
import { useEffect, useState } from "react";
import { ImageBackground, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import PricingModal from "../premium/PricingModal";
import { FreeProgramCard } from "./FreeProgramCard";
import { SubscriptionCard } from "./SubscriptionCard";

type WhatsHotProps = {
    handleBackButton: () => void;
  };

export function WhatsHot({handleBackButton}: WhatsHotProps) {

    const { bestSellers, beginnerPrograms, intermediatePrograms, advancedPrograms } = useAppContext();

    const [menCardInfo, setMenCardInfo] = useState<any | null>(null);
    const [menCardInfoBeginners, setMenCardInfoBeginners] = useState<any | null>(null);
    const [menCardInfoIntermediate, setMenCardInfoIntermediate] = useState<any | null>(null);
    const [menCardInfoAdvanced, setMenCardInfoAdvanced] = useState<any | null>(null);
    const [womenCardInfoBeginners, setWomenCardInfoBeginners] = useState<any | null>(null);
    const [womenCardInfoIntermediate, setWomenCardInfoIntermediate] = useState<any | null>(null);
    const [womenCardInfoAdvanced, setWomenCardInfoAdvanced] = useState<any | null>(null);
    
    const [womenCardInfo, setWomenCardInfo] = useState<any | null>(null);

    const image = require("@/assets/images/WhatsHot2.jpg");
    const backgroundImage = require("@/assets/images/HGBackground.png");

    const [isWindowVisible, setisWindowVisible] = useState(false);
    const [content, setContent] = useState<any | null>(null);
    const [overlayVisible, setOverlayVisible] = useState(false);
    const [selectedCardInfo, setSelectedCardInfo] = useState(null); // New state for selected card info
    const [selectedCardName, setSelectedCardName] = useState('');

    const [premiumVisible, setPremiumVisible] = useState(false);
    const [defaultPricing, setDefaultPricing] = useState("premium");

    useEffect(() => {
    if (!bestSellers) return;

    setMenCardInfoBeginners(beginnerPrograms[bestSellers.beginner.men]);
    setWomenCardInfoBeginners(beginnerPrograms[bestSellers.beginner.women]);
    setMenCardInfoIntermediate(intermediatePrograms[bestSellers.intermediate.men]);
    setWomenCardInfoIntermediate(intermediatePrograms[bestSellers.intermediate.women]);
    setMenCardInfoAdvanced(advancedPrograms[bestSellers.advanced.men]);
    setWomenCardInfoAdvanced(advancedPrograms[bestSellers.advanced.women]);

    // build your content directly here...
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
                <Text style={{fontFamily: 'Edo', color: 'gold', fontSize: 30, textAlign: 'center'}}>
                    Monthly subscription
                </Text>
            </View>
            <View style={{flex: 0.8, width: '100%', paddingHorizontal: 30, paddingBottom: 20}}>
                <Text style={{color: 'white', fontSize: 15, textAlign: 'center'}}>
                    If you want a new and exciting gym program each month, that builds upon the previous program, you're in the right place!
                </Text>
            </View>
            </View>
            <View style={{flex: 0.5, width: '100%', paddingHorizontal: 8}}>
                <View style={{flex: 0.5, width: '100%', paddingHorizontal: 8, paddingVertical: 4}}>
                    <Pressable onPress={() => {setDefaultPricing('subscription'), setPremiumVisible(true)}} style={{flex: 0.3, width: '100%', justifyContent: 'center'}}>
                        <SubscriptionCard cardImage={require('@/assets/images/SubscriptionCard2day.jpg')} cardTitle="Gym plan subscription" cardDays="2 days/week" />
                    </Pressable>
                </View>
                <View style={{flex: 0.5, width: '100%', paddingHorizontal: 8, paddingVertical: 4}}>
                <Pressable onPress={() => {setDefaultPricing('subscription'), setPremiumVisible(true)}} style={{flex: 0.3, width: '100%', justifyContent: 'center'}}>
                    <SubscriptionCard cardImage={require('@/assets/images/SubscriptionCard4day.jpg')} cardTitle="Gym plan subscription" cardDays="4 days/week" />
                </Pressable>
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
    
    // Effect to update content after card info is set

    const maleBestSellerBeginner = bestSellers.beginner.men;
    const menImgUriBeginner = `${S3_API_URL}/${maleBestSellerBeginner.replace(/ /g, "+")}.jpg`;
    const maleBestSellerIntermediate = bestSellers.intermediate.men;
    const menImgUriIntermediate = `${S3_API_URL}/${maleBestSellerIntermediate.replace(/ /g, "+")}.jpg`;
    const maleBestSellerAdvanced = bestSellers.advanced.men;
    const menImgUriAdvanced = `${S3_API_URL}/${maleBestSellerAdvanced.replace(/ /g, "+")}.jpg`;

    const womenBestSellerBeginner = bestSellers.beginner.women;
    const womenImgUriBeginner = `${S3_API_URL}/${womenBestSellerBeginner.replace(/ /g, "+")}.jpg`;
    const womenBestSellerIntermediate = bestSellers.intermediate.women;
    const womenImgUriIntermediate = `${S3_API_URL}/${womenBestSellerIntermediate.replace(/ /g, "+")}.jpg`;
    const womenBestSellerAdvanced = bestSellers.advanced.women;
    const womenImgUriAdvanced = `${S3_API_URL}/${womenBestSellerAdvanced.replace(/ /g, "+")}.jpg`;

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
                <GymCard key={1} cardFullName={maleBestSellerBeginner} imgUri={menImgUriBeginner} cardInfo={menCardInfoBeginners} onPress={() => handleCardPress(maleBestSellerBeginner, menCardInfoBeginners)}/>
                <GymCard key={2} cardFullName={womenBestSellerBeginner} imgUri={womenImgUriBeginner} cardInfo={womenCardInfoBeginners} onPress={() => handleCardPress(womenBestSellerBeginner, womenCardInfoBeginners)}/>
            </View>
        </View>
        <View style={{flex: 0.1}}>
            <Text style={{color: 'white', textAlign: 'center'}}>Intermediate</Text>
        </View>
        <View style={{ flex: 0.8, width: '100%', backgroundColor: 'black', paddingTop: 10 }}>
            <View style={[ShopStyles.cardBlockContainer, { backgroundColor: 'black' }]}>
                <GymCard key={1} cardFullName={maleBestSellerIntermediate} imgUri={menImgUriIntermediate} cardInfo={menCardInfoIntermediate} onPress={() => handleCardPress(maleBestSellerIntermediate, menCardInfoIntermediate)}/>
                <GymCard key={2} cardFullName={womenBestSellerIntermediate} imgUri={womenImgUriIntermediate} cardInfo={womenCardInfoIntermediate} onPress={() => handleCardPress(womenBestSellerIntermediate, womenCardInfoIntermediate)}/>
            </View>
        </View>
        <View style={{flex: 0.1}}>
            <Text style={{color: 'white', textAlign: 'center'}}>Advanced</Text>
        </View>
        <View style={{ flex: 0.8, width: '100%', backgroundColor: 'black', paddingTop: 10 }}>
            <View style={[ShopStyles.cardBlockContainer, { backgroundColor: 'black' }]}>
                <GymCard key={1} cardFullName={maleBestSellerAdvanced} imgUri={menImgUriAdvanced} cardInfo={menCardInfoAdvanced} onPress={() => handleCardPress(maleBestSellerAdvanced, menCardInfoAdvanced)}/>
                <GymCard key={2} cardFullName={womenBestSellerAdvanced} imgUri={womenImgUriAdvanced} cardInfo={womenCardInfoAdvanced} onPress={() => handleCardPress(womenBestSellerAdvanced, womenCardInfoAdvanced)}/>
            </View>
        </View>
        </ScrollView> 
    )};

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

                    <Pressable style={{flex: 0.1, width: "20%", paddingLeft: 20, paddingTop: 5, paddingBottom: 5, justifyContent: 'center'}} onPress={handleBackButton}>
                        <Text style={[TrackingNotesStyles.backButtonText]}>Back</Text>
                    </Pressable>

                        <View style={{flex: 1, flexDirection: 'column', width: "100%", height: '100%', paddingHorizontal: 10, paddingBottom: 20}}>

                            <View style={[ShopStyles.shopHotRowContainer, {flex: 2}]}>
                                <Pressable style={[ShopStyles.shopHotButton, {flex: 4}]} onPress={() => [showBestSellers(), setisWindowVisible(true)]}>
                                    <ImageBackground source={image} resizeMode="cover" style={{ flex: 1, width: "100%", height: "100%", justifyContent: 'center'}}>
                                        <Text style={{color: 'white', fontSize: 22, textDecorationLine: 'underline'}}>Best sellers</Text>
                                        <Text style={{color: 'white'}}>What people love</Text>
                                    </ImageBackground>
                                </Pressable>
                                <View style={[ShopStyles.shopHotSpacer, {flex: 2}]}/>
                            </View>
                            <View style={[ShopStyles.shopHotRowContainer, {flex: 1}]}>
                                <View style={[ShopStyles.shopHotSpacer, {flex: 1}]}/>
                                <Pressable style={[ShopStyles.shopHotButton, {flex: 2}]} onPress={() => [showSubscriptions(), setisWindowVisible(true)]}>
                                    <Text style={{color: 'white', fontSize: 22, textDecorationLine: 'underline'}}>Monthly subscription</Text>
                                    <Text style={{color: 'white'}}>New programs every month</Text>
                                </Pressable>
                            </View>
                            <View style={[ShopStyles.shopHotRowContainer, {flex: 2}]}>
                                <Pressable style={[ShopStyles.shopHotButton, {flex: 2}]} onPress={() => [showChallenges(), setisWindowVisible(true)]}>
                                    <Text style={{color: 'white', fontSize: 22, textDecorationLine: 'underline'}}>Challenges</Text>
                                    <Text style={{color: 'white'}}>Get involved</Text>
                                </Pressable>
                                <View style={[ShopStyles.shopHotSpacer, {flex: 2}]}/>
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



