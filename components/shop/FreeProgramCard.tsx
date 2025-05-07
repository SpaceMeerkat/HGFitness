import { View, Text, Image, Pressable} from "react-native";
import { DefaultTabStyles, ShopStyles } from "@/components/HGStyles"

type FreeProgramCardProps = {
    cardTitle: string;
    cardLevel: "beginner" | "advanced" | "intermediate";
    cardDays: any;
  };

export function FreeProgramCard({ cardTitle, cardLevel, cardDays }: FreeProgramCardProps) {

    const levelColors: { [key: string]: string } = {
        beginner: 'cyan',
        intermediate: 'gold',
        advanced: 'magenta'
      };
      
    const textColor = levelColors[cardLevel] || 'defaultColor';

    const imageSource = require("@/assets/images/OfficialLogo.jpg");

    return (

        <Pressable onPress={() => console.log('pressed')} style={[ShopStyles.myProgramsBlockContainer, ShopStyles[cardLevel], {paddingRight: 20}]}>

                <View style={{ flex: 0.8 }}>
                    <Text style={[DefaultTabStyles.defaultBoldText, { color: textColor }]}>{cardTitle}</Text>
                    <Text style={DefaultTabStyles.defaultMediumText}>{cardDays} days/week</Text>
                </View>
                <View style={{ flex: 0.3 }}>
                    <Image source={imageSource} style={{ flex: 1, width: "100%", resizeMode: "contain" }} />
                </View>

        </Pressable>


    );
}