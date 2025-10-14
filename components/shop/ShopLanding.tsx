import { DefaultTabStyles, ShopStyles } from "@/components/HGStyles";
import { Image, ImageBackground, Pressable, ScrollView, Text, View } from "react-native";

// Define the type for the props
type ShopLandingProps = {
    handleChildPage: (page: 'programs' | 'mealPrograms' | 'hot' | 'subscription' | 'apparel' | 'coaching') => void;
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
                <Text style={{fontFamily: 'Edo', fontSize: 28, color: 'white'}}>
                  Checkout What's <Text style={{fontFamily: 'Edo', fontSize: 40, color: 'white', textDecorationLine: 'underline'}}>HOT!</Text>
                </Text>
                <Text style={[DefaultTabStyles.defaultBodyText, {fontSize: 16, paddingLeft: 8}]}>For the latest news and updates</Text>
              </View>
            </ImageBackground>
          </View>
        </Pressable>

        <Pressable onPress={() => handleChildPage('programs')}>
        <View style={ShopStyles.shopProgramsContainer}>
          <ImageBackground source={require("@/assets/images/shopprograms2.jpg")} resizeMode="cover" style={{flex: 1, width: '100%', height: '100%'}}>
            <View style={{flex:1, justifyContent:"center", alignItems:"center", paddingTop: 10}}>
              <Text style={{fontFamily: 'Edo', fontSize: 24, color: 'white', paddingBottom: 24}}>Gym Programs</Text>
            </View>
          </ImageBackground>
          </View>
        </Pressable>
        <Pressable onPress={() => handleChildPage('mealPrograms')}>
        <View style={ShopStyles.shopMealsContainer}>
          <ImageBackground source={require("@/assets/images/mealprograms.jpg")} resizeMode="cover" style={{flex: 1, width: '100%', height: '100%', borderRadius: 8, borderWidth: 0}}>
            <View style={{flex:1, justifyContent:"flex-start", alignItems:"flex-start", paddingTop:20, paddingLeft:12}}>
              <Text style={[DefaultTabStyles.defaultBodyText, {paddingTop: 0, fontSize: 18, paddingLeft: 0}]}>This app makes</Text> 
              <Text style={{fontFamily: 'Edo', fontSize: 20, color: 'white'}}>Tracking Calories</Text>
              <Text style={[DefaultTabStyles.defaultBodyText, {paddingTop: 0, fontSize: 18, paddingLeft: 10}]}>easy</Text> 
            </View>
          </ImageBackground>
          </View>
        </Pressable>

        <Pressable onPress={() => handleChildPage('subscription')}>
          <View style={[ShopStyles.shopBlockContainer, {height: 200}]}>
            <ImageBackground source={require("@/assets/images/Subscription.jpg")} resizeMode="cover" style={{flex: 1, flexDirection: 'row', width: '100%', height: '100%', borderRadius: 8, borderWidth: 0}}>
              <View style={{flex:0.5, paddingLeft: 10, justifyContent: 'center', alignItems: 'center'}}>
                  <Image source={require("@/assets/images/calendar.png")} style={{ flex: 1, width: "100%", resizeMode: "contain", opacity: 0.7}} />
              </View>
              <View style={{flex:0.6, justifyContent: 'flex-start', paddingTop: 20}}>
                <Text style={[DefaultTabStyles.defaultBodyText, {textAlign: 'center', fontFamily: 'Edo', fontSize: 26}]}>get</Text>
                <Text style={[DefaultTabStyles.defaultBodyText, {textAlign: 'center', fontFamily: 'Edo', fontSize: 30, textDecorationLine: 'underline'}]}>NEW</Text>
                <Text style={[DefaultTabStyles.defaultBodyText, {textAlign: 'center', fontFamily: 'Edo', fontSize: 20}]}>programs</Text>
                <Text style={[DefaultTabStyles.defaultBodyText, {textAlign: 'center', fontFamily: 'Edo', fontSize: 20}]}>every month</Text>
              </View>
            </ImageBackground>
          </View>
        </Pressable>

        <Pressable onPress={() => handleChildPage('coaching')}>
        <View style={ShopStyles.shopMealsContainer}>
          <ImageBackground source={require("@/assets/images/onlineCoachingBackground.jpg")} resizeMode="cover" style={{flex: 1, width: '100%', height: '100%', borderRadius: 8, borderWidth: 0}}>
            <View style={{flex:1, justifyContent:"flex-start", alignItems:"flex-start", paddingTop:10, paddingLeft:6}}>
              <View style={{flex:1, flexDirection: "row", justifyContent:"center", alignItems:"center"}}>
                <View style={{flex:0.5, flexDirection: "column", justifyContent:"center", alignItems:"center"}}>
                  <Text style={[DefaultTabStyles.defaultBodyText, {paddingTop: 0, fontSize: 20}]}>For</Text>
                  <Text style={[DefaultTabStyles.defaultBodyText, {paddingTop: 0, fontFamily: 'Edo', fontSize: 24}]}>personalised</Text>
                  <Text style={[DefaultTabStyles.defaultBodyText, {paddingTop: 0, fontFamily: 'Edo', fontSize: 24}]}>help</Text>
                  <Text style={[DefaultTabStyles.defaultBodyText, {paddingTop: 8, fontSize: 18}]}>click here</Text>
                </View>
                <View style={{flex:0.5, flexDirection: "column"}}>
                  <ImageBackground source={require("@/assets/images/personalisedHelp.png")} resizeMode="cover" 
                  style={{flex:1, flexDirection: "column", width: '100%', height: '100%'}}/>
                </View>
              </View>
            </View>
          </ImageBackground>
          </View>
        </Pressable>

        <Pressable onPress={() => handleChildPage('apparel')} style={{paddingBottom: 16}}>
          <View style={[ShopStyles.shopBlockContainer, {height: 300}]}>
            <ImageBackground source={require("@/assets/images/apparel.jpg")} resizeMode="contain" imageStyle={{left:55}} style={{flex: 1, width: '100%', height: '100%'}}>
              <View style={{flex:1, justifyContent:"flex-start", alignItems:"flex-start", paddingTop:70, paddingLeft:15}}>
                <Text style={[DefaultTabStyles.defaultBoldText, {fontSize: 16}]}>HOOLIGAINS apparel</Text>
                <Text style={DefaultTabStyles.defaultBodyText}>Coming soon...</Text>
              </View>
            </ImageBackground>
          </View>
        </Pressable>
      </ScrollView> 
      </ImageBackground>
    )
}