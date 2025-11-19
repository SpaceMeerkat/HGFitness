import { DefaultTabStyles, ShopStyles } from "@/components/HGStyles";
import { Image, ImageBackground, Text, View } from "react-native";

type SubscriptionCardProps = {
    cardImage: any;
    cardTitle: string,
    cardDays: any,
  };

export function SubscriptionCard({ cardImage, cardTitle, cardDays }: SubscriptionCardProps) {

    const imageSource = require("@/assets/images/WhiteTransparentLogo.png");
    const shortCardTitle = cardTitle 
    let content = null;

    return (

        <ImageBackground source={cardImage} resizeMode="cover" style={[ShopStyles.myProgramsBlockContainer, {overflow: 'hidden'}]}>
            {content}
            <View style={{ flex: 0.8 }}>
                <Text style={[DefaultTabStyles.defaultBoldText, { color: 'white' }]}>{shortCardTitle}</Text>
                <Text style={DefaultTabStyles.defaultMediumText}>{cardDays}</Text>
            </View>
            <View style={{ flex: 0.3, paddingRight: 10 }}>
                <Image source={imageSource} style={{ flex: 1, width: "100%", resizeMode: "contain" }} />
            </View>
        </ImageBackground>
    );
}