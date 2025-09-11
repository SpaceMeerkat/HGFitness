import { DefaultTabStyles, ShopStyles, TrackingNotesStyles } from "@/components/HGStyles";
import { Image, ImageBackground, Pressable, ScrollView, Text, View } from "react-native";

type GymProgramProps = {
    handleChildPage: (page: 'beginner' | 'intermediate' | 'advanced') => void;
    handleBackButton: () => boolean;
  };

export function GymPrograms({ handleChildPage, handleBackButton }: GymProgramProps) {

    const image = require("@/assets/images/HGBackground.png");

    return(
        <ImageBackground source={image} resizeMode="cover" style={{flex: 1, width: '100%', height: '100%'}}>
        <ScrollView style={ShopStyles.shopScrollContainer}>
          {/* Back button */}
          <Pressable style={{flex: 0.15, width: "20%", paddingLeft: 8, paddingTop: 10, paddingBottom: 20, justifyContent: 'center'}} onPress={handleBackButton}>
              <Text style={[TrackingNotesStyles.backButtonText]}>Back</Text>
          </Pressable>
          <View style={{flex: 1, paddingBottom: 14}}>
          {/*  Beginner programs */}
          <View style={{flex: 0.25, paddingVertical: 4}}>
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
          </View>
          {/* Intermediate programs */}
          <View style={{flex: 0.25, paddingVertical: 4}}>
          <Pressable style={{flex: 0.25}} onPress={() => handleChildPage('intermediate')}>
            <View style={[ShopStyles.shopLevelContainer]}>
              <View style={{flex:0.5}}>
                  <Image source={require("@/assets/images/cards/IntermediateCardGold.jpg")} style={{ flex: 1, width: "100%", resizeMode: "contain" }} />
              </View>
              <View style={{flex:0.5, paddingLeft: 30}}>
                <Text style={[DefaultTabStyles.defaultBoldText, {color:'gold'}]}>Intermediate programs</Text>
                <Text style={DefaultTabStyles.defaultBodyText}>Getting serious now...</Text>
              </View>
            </View>
          </Pressable>
          </View>
          {/* Advanced Programs */}
          <View style={{flex: 0.25, paddingVertical: 4}}>
          <Pressable style={{flex: 0.25}} onPress={() => handleChildPage('advanced')}>
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
          </View>
          {/* Free Programs */}
          <View style={{flex: 0.25, paddingVertical: 4}}>
          <Pressable style={{flex: 0.25}} onPress={() => console.log("pressed")}>
            <View style={[ShopStyles.shopLevelContainer]}>
              <View style={{flex:0.5}}>
                  <Image source={require("@/assets/images/cards/FreeCard.jpg")} style={{ flex: 1, width: "100%", resizeMode: "contain" }} />
              </View>
              <View style={{flex:0.6, paddingLeft: 30}}>
                <Text style={[DefaultTabStyles.defaultBoldText, {color:'white'}]}>Free programs</Text>
                <Text style={DefaultTabStyles.defaultBodyText}>Cheap skate...</Text>
              </View>
            </View>
          </Pressable>
          </View>
          </View>
      </ScrollView> 
      </ImageBackground>
    )
}