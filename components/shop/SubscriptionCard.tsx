import { View, Text, Image, Pressable} from "react-native";
import { DefaultTabStyles, ShopStyles } from "@/components/HGStyles"

type SubscriptionCardProps = {
    cardTitle: string,
    cardDays: any,
  };

export function SubscriptionCard({ cardTitle, cardDays }: SubscriptionCardProps) {

    const imageSource = require("@/assets/images/OfficialLogo.jpg");
    const shortCardTitle = cardTitle 
    let content = null;

    return (

        <View style={[ShopStyles.myProgramsBlockContainer]}>
            {content}
            <View style={{ flex: 0.8 }}>
                <Text style={[DefaultTabStyles.defaultBoldText, { color: 'white' }]}>{shortCardTitle}</Text>
                <Text style={DefaultTabStyles.defaultMediumText}>{cardDays}</Text>
            </View>
            <View style={{ flex: 0.3, paddingRight: 10 }}>
                <Image source={imageSource} style={{ flex: 1, width: "100%", resizeMode: "contain" }} />
            </View>
        </View>
    );
}