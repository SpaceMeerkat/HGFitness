import { DefaultTabStyles, ShopStyles } from "@/components/HGStyles";
import { Image, Pressable, Text, View } from "react-native";

interface GymCardProps {
    imgUri: string;
    cardInfo: any;
    onPress: () => void;
}

export function GymCard({ imgUri, cardInfo, onPress }: GymCardProps) {
    const imageSource = typeof imgUri === "string" ? { uri: imgUri } : imgUri;
    const cardName = cardInfo.Name[0];
    const cardLevel = cardInfo.Level[0] as "beginner" | "advanced" | "intermediate";
    const cardPrice = cardInfo.Price[0];
    const cardDays = cardInfo.Days[0];

    return (
        <Pressable onPress={onPress} style={[ShopStyles.gymCard, ShopStyles[cardLevel]]}>
                <View style={{ flex: 0.1, flexDirection: "row", paddingHorizontal: 4, paddingTop: 4, paddingBottom: 4 }}>
                    <View style={{ flex: 0.58 }} />
                        <View style={[ShopStyles.gymCardTextTop, ShopStyles[`${cardLevel}Fill`], { flexDirection: "row" }]}>
                            <Text style={{ color: "black", fontWeight: "bold" }}>R{cardPrice}</Text>
                        </View>
                    </View>
                <View style={{ flex: 0.7 }}>
                    <Image source={imageSource} resizeMode="cover" style={ShopStyles.gymCardImage} />
                </View>
                {/* <View style={{ height: 1, backgroundColor: 'black' }}/> */}
                <View style={ShopStyles.gymCardTextName}>
                    <Text style={[DefaultTabStyles.defaultCardNameText, {textAlign: 'center'}]}>{cardName}</Text>
                </View>
                <View style={ShopStyles.gymCardTextDays}>
                    <Text style={{ color: "white" }}>{cardDays} days/week</Text>
                </View>
        </Pressable>
    );
}
