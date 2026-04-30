import { useAppContext } from "@/components/appContext";
import { ShopStyles } from "@/components/HGStyles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from "react";
import { Alert, ImageBackground, Pressable, ScrollView, Text, View } from "react-native";
import { BASE_API_URL } from "../network/apiConfig";
// import { Linking } from 'react-native';
import * as Linking from 'expo-linking';

interface CardInfoProps {
    cardFullName: string;
    cardInfo: {
        Name: string[];
        Level: ("beginner" | "advanced" | "intermediate")[];
        Price: number[];
        Days: number[];
        Split: string[];
        Slogan: string[];
        Overview: string[];
        Features: string[];
        Goals: string[];
        Why: string[];

    };
}

export function CardInfo({ cardFullName, cardInfo }: CardInfoProps) {
    const cardName = cardInfo.Name[0];
    const cardSlogan = cardInfo.Slogan[0];
    const cardLevel = cardInfo.Level[0];
    const cardPrice = cardInfo.Price[0];
    const cardDays = cardInfo.Days[0];
    const cardOverview = cardInfo.Overview[0];
    const cardFeatures = cardInfo.Features;
    const cardGoals = cardInfo.Goals;
    const cardWhy = cardInfo.Why[0];    
    const { myPrograms, profile, setProfile } = useAppContext(); // needed for the client being logged in
    const [isPurchased, setIsPurchased] = useState(false);
    const image = require("@/assets/images/HGBackground.png");

    useEffect(() => {
        if (myPrograms) {
            const keys = Object.keys(myPrograms);
            const found = keys.some((key) => key === cardFullName);
            setIsPurchased(found);
        }
    }, [cardFullName, myPrograms]);  

    const SubmitPayFastQuery = async (programName: String, programPrice: Number, profile: any) => { 
        // Fetch the jwt from securestore
        const retrievedToken = await SecureStore.getItemAsync('jwtToken');
        if (retrievedToken && profile) {
          try {
              const url = `${BASE_API_URL}/query_payment`;
              const response = await fetch(url, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      item_name: programName,
                      item_price: programPrice,
                      item_category: "gymplan",
                      token: retrievedToken,
                  }),
              });
              if (response.ok) {
                const jsonResponse = await response.json();
                const query = jsonResponse.PayFastQuery;
                // Set the profile purchaseQuery dict to match the separately updated backend profile -----------
                const updatedProfile = {
                    ...profile,
                    purchaseQueue: {
                        ...profile.purchaseQueue, // Spreads the existing items in purchaseQueue
                        [query.m_payment_id]: "PENDING", // Adds the new key-value pair
                    },
                };
                setProfile(updatedProfile);
                await AsyncStorage.setItem("profile", JSON.stringify(updatedProfile));
                // ----------------------------------------------------------------------------------------------
                const urlParams = new URLSearchParams(query).toString();
                const url = `https://sandbox.payfast.co.za/eng/process?${urlParams}`;
                // const url = `https://www.payfast.co.za/eng/process?${urlParams}`;
                console.log('Opening URL: ', url);
                const supported = await Linking.canOpenURL(url);
                if (supported) {
                    await Linking.openURL(url);
                } else {
                    console.error("Cannot open PayFast URL:", url);
                }
              } else {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
          } catch (error) {
              console.error('Error making payment:', error);
             return null; 
          }
        } else {
            Alert.alert('Login Required', 'User login required.', [{ text: 'OK' }]);
        }
      }

    return (
        <ScrollView style={[ShopStyles.cardInfoContainer, ShopStyles[cardLevel]]}>
            <ImageBackground source={image} resizeMode="cover" style={{flex: 1, width: "100%", height: "100%", borderRadius: 4, borderWidth: 1, borderColor: 'grey', overflow: "hidden"}}>
            <View style={ShopStyles.cardInfoStackContainerCentered}>

                    <Text style={[ShopStyles.cardName, {paddingTop: 18}]}>{cardName}</Text>
                    <View style={{paddingHorizontal: 8}}>
                        <Text style={ShopStyles.cardSlogan}>{cardSlogan}</Text>
                    </View>
            </View>
            </ImageBackground>
            <View style={{paddingTop: 16}}/>

            {/* <View style={{paddingTop: 0, backgroundColor: 'white', height: 1}}/>
            <View style={{paddingTop: 16}}/> */}

            <View style={ShopStyles.cardInfoStackContainerLeft}>
                {/* <Text style={ShopStyles.cardLevel}>
                    &#8226; Level: {cardLevel}
                </Text> */}
            {/* <Text style={ShopStyles.cardPrice}>&#8226; Price: R{cardPrice}</Text>
            <Text style={ShopStyles.cardDays}>&#8226; Days per week: {cardDays}</Text> */}
            <Text style={ShopStyles.cardOverview}><Text style={[ShopStyles[cardLevel], {fontWeight: 'bold', fontStyle: 'italic', fontSize: 20}]}>Overview:</Text>  {cardOverview}</Text>
            <Text style={[{fontWeight: 'bold', fontStyle: 'italic', fontSize: 20, color: 'cyan'}, ShopStyles[cardLevel]]}>Features:</Text>
                {cardFeatures.map((feature, index) => (
                    <Text
                        key={index}
                        style={[
                            ShopStyles.cardFeatures,
                            feature.startsWith("~") && ShopStyles.indentedFeature,
                        ]}
                    >
                        &#8226; {feature.startsWith("~") ? feature.slice(1) : feature}
                    </Text>
                ))}

            <View style={{paddingTop: 26}}/>
            <Text style={[{fontWeight: 'bold', fontStyle: 'italic', fontSize: 20, color: 'cyan'}, ShopStyles[cardLevel]]}>Goals:</Text>
                {cardGoals.map((goal, index) => (
                    <Text
                        key={index}
                        style={[
                            ShopStyles.cardGoals,
                        ]}
                    >
                        &#8226; {goal}
                    </Text>
                ))}

            <View style={{paddingTop: 26}}/>

            <Text style={ShopStyles.cardWhy}><Text style={[{fontWeight: 'bold', fontStyle: 'italic', fontSize: 20, color: 'cyan'}, ShopStyles[cardLevel]]}>Why this program?</Text>  {cardWhy}</Text>

            <View style={[ShopStyles.cardLevel, {flex: 1, flexDirection: 'row', backgroundColor: 'black', justifyContent: 'center', alignContent: 'center',
                borderWidth: 1, borderRadius: 8
            }]}>
            <ImageBackground source={image} resizeMode="cover" style={{ flex: 1, width: "100%", height: "100%", paddingBottom: 25 }}>
                <Pressable style={[{
                    flex: 1, flexDirection: 'column', 
                    justifyContent: 'center', alignItems: 'center',
                    borderWidth: 1, borderRadius: 8, borderColor: 'white', paddingVertical: 12,
                    opacity: isPurchased? 0.5: 1}]} 
                    onPress={
                        isPurchased
                        ? undefined // 👈 do nothing
                        : () => SubmitPayFastQuery(cardFullName, cardPrice, profile)
                    }>
                    <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>PURCHASE THIS PROGRAM!</Text>
                </Pressable>
            </ImageBackground>
            </View>

            </View>
            
        </ScrollView>
    );
}


