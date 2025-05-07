import { View, Text, Pressable, ScrollView, Image, ImageBackground} from "react-native";
import { DefaultTabStyles, ShopStyles } from "@/components/HGStyles"

// Define the type for the props
type ShopLandingProps = {
    handleChildPage: (page: 'programs' | 'mealPrograms' | 'hot') => void;
  };

export function ShopLanding({ handleChildPage }: ShopLandingProps) {

    const image = require("@/assets/images/HGBackground.png");

    return(
        <ImageBackground source={image} resizeMode="cover" style={{flex: 1, width: '100%', height: '100%'}}>
        <ScrollView style={ShopStyles.shopScrollContainer}>
        <Pressable onPress={() => handleChildPage('hot')}>
          <View style={[ShopStyles.shopBlockContainer, {height: 300}]}>
            <ImageBackground source={require("@/assets/images/WhatsHot.jpg")} resizeMode="cover" style={{flex: 1, width: '100%', height: '100%'}}>
              <View style={{flex:1, justifyContent:"flex-start", alignItems:"flex-start", paddingTop:50, paddingLeft:22}}>
                <Text style={{fontFamily: 'Edo', fontSize: 28, color: 'white'}}>What's Hot...</Text>
                <Text style={DefaultTabStyles.defaultBodyText}>Checkout the latest news and updates!</Text>
              </View>
            </ImageBackground>
          </View>
        </Pressable>
        <Pressable onPress={() => console.log("no subscription page yet")}>
          <View style={[ShopStyles.shopBlockContainer, {height: 200}]}>
              <View style={{flex:0.5, paddingLeft: 20}}>
                  <Image source={require("@/assets/images/OfficialLogo.jpg")} style={{ flex: 1, width: "80%", resizeMode: "contain"}} />
              </View>
              <View style={{flex:0.5}}>
                <Text style={[DefaultTabStyles.defaultBoldText, {color:'white'}]}>Monthly Subscription</Text>
                <Text style={DefaultTabStyles.defaultBodyText}>NEW programs every month</Text>
              </View>
          </View>
        </Pressable>
        <Pressable onPress={() => handleChildPage('programs')}>
        <View style={ShopStyles.shopProgramsContainer}>
          <ImageBackground source={require("@/assets/images/shopprograms2.jpg")} resizeMode="cover" style={{flex: 1, width: '100%', height: '100%'}}>
            <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
              <Text style={{fontFamily: 'Edo', fontSize: 20, color: 'white'}}>Gym Programs</Text>
              <Text style={DefaultTabStyles.defaultBodyText}>blah blah</Text>
            </View>
          </ImageBackground>
          </View>
        </Pressable>
        <Pressable onPress={() => handleChildPage('mealPrograms')}>
        <View style={ShopStyles.shopMealsContainer}>
          <ImageBackground source={require("@/assets/images/mealprograms.jpg")} resizeMode="cover" style={{flex: 1, width: '100%', height: '100%', borderRadius: 8, borderWidth: 0}}>
            <View style={{flex:1, justifyContent:"flex-start", alignItems:"flex-start", paddingTop:65, paddingLeft:12}}>
              <Text style={{fontFamily: 'Edo', fontSize: 20, color: 'white'}}>Meal programs</Text>
              <Text style={DefaultTabStyles.defaultBodyText}>nom nom nom</Text>
            </View>
          </ImageBackground>
          </View>
        </Pressable>
        <View style={[ShopStyles.shopBlockContainer, {height: 300}]}>
          <ImageBackground source={require("@/assets/images/apparel.jpg")} resizeMode="contain" imageStyle={{left:55}} style={{flex: 1, width: '100%', height: '100%'}}>
            <View style={{flex:1, justifyContent:"flex-start", alignItems:"flex-start", paddingTop:70, paddingLeft:15}}>
              <Text style={[DefaultTabStyles.defaultBoldText, {fontSize: 16}]}>HOOLIGAINS apparel</Text>
              <Text style={DefaultTabStyles.defaultBodyText}>Coming soon...</Text>
            </View>
          </ImageBackground>
        </View>
      </ScrollView> 
      </ImageBackground>
    )
}