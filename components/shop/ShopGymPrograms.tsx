import { DefaultTabStyles, ShopStyles } from "@/components/HGStyles";
import { Image, ImageBackground, Pressable, ScrollView, Text, View } from "react-native";

type GymProgramProps = {
    handleChildPage: (page: 'beginner' | 'intermediate' | 'advanced') => void;
  };

export function GymPrograms({ handleChildPage }: GymProgramProps) {

    const image = require("@/assets/images/HGBackground.png");

    return(
        <ImageBackground source={image} resizeMode="cover" style={{flex: 1, width: '100%', height: '100%'}}>
        <ScrollView style={ShopStyles.shopScrollContainer}>
          <Pressable onPress={() => handleChildPage('beginner')}>
          <View style={[ShopStyles.shopLevelContainer, {paddingLeft: 20}]}>
              <View style={{flex:0.4}}>
                <Text style={[DefaultTabStyles.defaultBoldText, {color:'cyan'}]}>Beginner programs</Text>
                <Text style={DefaultTabStyles.defaultBodyText}>This is where the fun begins</Text>
              </View>
              <View style={{flex:0.6}}>
                  <Image source={require("@/assets/images/cards/BeginnerCardBlue.jpg")} style={{ flex: 1, width: "100%", resizeMode: "contain"}} />
              </View>
            </View>
          </Pressable>
          <Pressable onPress={() => handleChildPage('intermediate')}>
          <View style={[ShopStyles.shopBlockContainer]}>
              <View style={{flex:0.5}}>
                  <Image source={require("@/assets/images/cards/IntermediateCardGold.jpg")} style={{ flex: 1, height: 155, width: 155}} />
              </View>
              <View style={{flex:0.5, paddingLeft: 30}}>
                <Text style={[DefaultTabStyles.defaultBoldText, {color:'gold'}]}>Intermediate programs</Text>
                <Text style={DefaultTabStyles.defaultBodyText}>Getting serious now...</Text>
              </View>
            </View>
          </Pressable>
          <Pressable onPress={() => handleChildPage('advanced')}>
          <View style={[ShopStyles.shopLevelContainer, {paddingLeft: 20}]}>
            <View style={{flex:0.4}}>
              <Text style={[DefaultTabStyles.defaultBoldText, {color:'magenta'}]}>Advanced programs</Text>
              <Text style={DefaultTabStyles.defaultBodyText}>It's your funeral...</Text>
            </View>
            <View style={{flex:0.6}}>
                  <Image source={require("@/assets/images/cards/AdvancedCardMagenta.jpg")} style={{ flex: 1, width: "100%", resizeMode: "contain" }} />
              </View>
          </View>
          </Pressable>
          <Pressable onPress={() => console.log("pressed")}>
          <View style={[ShopStyles.shopBlockContainer]}>
              <View style={{flex:0.5}}>
                  <Image source={require("@/assets/images/cards/FreeCard.jpg")} style={{ flex: 1, height: 155, width: 155}} />
              </View>
              <View style={{flex:0.5, paddingLeft: 30}}>
                <Text style={[DefaultTabStyles.defaultBoldText, {color:'white'}]}>Free programs</Text>
                <Text style={DefaultTabStyles.defaultBodyText}>Cheap skate...</Text>
              </View>
            </View>
          </Pressable>
      </ScrollView> 
      </ImageBackground>
    )
}