import { useAppContext } from "@/components/appContext";
import { DefaultTabStyles, ShopStyles } from "@/components/HGStyles";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";


interface GymCardProps {
    cardFullName: string;
    imgUri: string;
    cardInfo: any;
    onPress: () => void;
}

export function GymCard({ cardFullName, imgUri, cardInfo, onPress }: GymCardProps) {
    const imageSource = typeof imgUri === "string" ? { uri: imgUri } : imgUri;
    const cardName = cardInfo.Name[0];
    const cardLevel = cardInfo.Level[0] as "beginner" | "advanced" | "intermediate";
    const cardPrice = cardInfo.Price[0];
    const cardDays = cardInfo.Days[0];
    const [isPurchased, setIsPurchased] = useState(false);
    const { myPrograms } = useAppContext();

    useEffect(() => {
        const keys = Object.keys(myPrograms);
        const found = keys.some((key) => key === cardFullName);
        setIsPurchased(found);
    }, [cardFullName, myPrograms]);  

    return (
        // <View style={{ flex: 1, opacity: isPurchased ? 0.5 : 1 }}>
        <Pressable onPress={onPress} style={[ShopStyles.gymCard, ShopStyles[cardLevel], isPurchased? { borderColor: `rgba(128, 128, 128, 0.5)` }: {}]}>
            {isPurchased && (
            <View style={{ position: "absolute", top: -10, left: -10, zIndex: 10 }}>
                <Ionicons name="checkmark-circle" size={24} color="lime"/>
            </View>
            )}
            
            <View style={{ flex: 0.1, flexDirection: "row", paddingHorizontal: 4, paddingTop: 4, paddingBottom: 4, opacity: isPurchased ? 0.5 : 1 }}>
                <View style={{ flex: 0.58 }} />
                    <View style={[ShopStyles.gymCardTextTop, ShopStyles[`${cardLevel}Fill`], isPurchased? { backgroundColor: "grey" }: {}, { flexDirection: "row" }]}>
                        <Text style={{ color: "black", fontWeight: "bold" }}>R{cardPrice}</Text>
                    </View>
                </View>
            <View style={{ flex: 0.7 }}>
                <Image source={imageSource} resizeMode="cover" style={[ShopStyles.gymCardImage, {opacity: isPurchased ? 0.5 : 1}]} />
            </View>
            {/* <View style={{ height: 1, backgroundColor: 'black' }}/> */}
            <View style={ShopStyles.gymCardTextName}>
                <Text style={[DefaultTabStyles.defaultCardNameText, {textAlign: 'center', opacity: isPurchased ? 0.7 : 1}]}>{cardName}</Text>
            </View>
            <View style={ShopStyles.gymCardTextDays}>
                <Text style={{ color: "white", opacity: isPurchased ? 0.7 : 1}}>{cardDays} days/week</Text>
            </View>
        </Pressable>
    );
}
