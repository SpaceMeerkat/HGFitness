import React from "react";
import { Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { TrackingNotesStyles } from "../HGStyles";

type MealProgramProps = {
    handleBackButton: () => boolean;
  };

const MealPrograms = ({handleBackButton}: MealProgramProps) => {
  return (
    <ImageBackground
      source={require("@/assets/images/caloriecalculator.jpg")}
      style={MealsMadeEasyStyles.background}
    >
      <ScrollView contentContainerStyle={MealsMadeEasyStyles.scrollContainer}>

        <Pressable style={{flex: 0.15, width: "20%", paddingLeft: 8, paddingTop: 10, paddingBottom: 10, justifyContent: 'center'}} onPress={handleBackButton}>
            <Text style={[TrackingNotesStyles.backButtonText]}>Back</Text>
        </Pressable>

        {/* Row 1 (image on right) */}
        <View style={MealsMadeEasyStyles.rowFlex03}>
          {/* Top content row */}
          <View style={MealsMadeEasyStyles.topContent}>
            {/* Left text column (0.6 width, split into 2 halves vertically) */}
            <View style={MealsMadeEasyStyles.leftTextCol}>
              <View style={MealsMadeEasyStyles.textHalf}>
                <Text style={MealsMadeEasyStyles.featureItem}>
                  <Text style={MealsMadeEasyStyles.featureTitle}>Simple Choices</Text> 
                  No more food FOMO or scrolling forever. Just pick from meals that actually work for your goals — tasty, simple, and stress-free.
                </Text>
              </View>
              <View style={MealsMadeEasyStyles.textHalf}>
                <Text style={MealsMadeEasyStyles.featureItem}>
                  <Text style={MealsMadeEasyStyles.featureTitle}>Easy Cooking Instructions</Text> 
                  Zero chef skills required. We’ll tell you what to buy and exactly how to cook it (no MasterChef apron needed).
                </Text>
              </View>
            </View>
            <View style={MealsMadeEasyStyles.rightTextCol}>
              <View style={MealsMadeEasyStyles.textHalf}>
                  <Text style={MealsMadeEasyStyles.featureItem}>
                    <Text style={MealsMadeEasyStyles.featureTitle}>Meal Variety</Text> 
                    Hundreds of options so you never get bored. Mix it up, try new recipes, and finally stop eating chicken and rice every… single… day.
                  </Text>
                </View>
                <View style={MealsMadeEasyStyles.textHalf}>
                  <Text style={MealsMadeEasyStyles.featureItem}>
                    <Text style={MealsMadeEasyStyles.featureTitle}>Flexible Portion Sizes</Text> 
                    Want to bulk up or slim down? Just hit the “upsize” button and boom — your calories adjust instantly.
                  </Text>
                </View>
              </View>
            </View>
            <View style={MealsMadeEasyStyles.rightTextCol}>
            {/* Right image (0.4 width, spans full height) */}
            <View style={MealsMadeEasyStyles.rightImageCol}>
              <Image
                source={require("@/assets/images/mealsWoman.jpg")}
                style={MealsMadeEasyStyles.image}
                resizeMode="contain"
              />
            </View>
          </View>
          {/* Bottom text (0.2 height, full width) */}
          <View style={MealsMadeEasyStyles.bottomText}>
            <Text style={MealsMadeEasyStyles.featureItem}>
              <Text style={MealsMadeEasyStyles.featureTitle}>Smarter Tracking</Text> 
              Log your meals and let the app do the math. Calories, protein, water — tracked automatically. You just eat, we crunch the numbers.
            </Text>
          </View>
        </View>

        {/* Row 2 (image on left) */}
        <View style={MealsMadeEasyStyles.rowFlex03}>
          {/* Top content row */}
          <View style={MealsMadeEasyStyles.topContent}>
            {/* Left image (0.4 width, spans full height) */}
            <View style={MealsMadeEasyStyles.leftImageCol}>
              <Image
                source={require("@/assets/images/mealsMan.jpg")}
                style={MealsMadeEasyStyles.image}
                resizeMode="contain"
              />
            </View>
            {/* Right text column (0.6 width, split into 2 halves vertically) */}
            <View style={MealsMadeEasyStyles.rightTextCol}>
              <View style={MealsMadeEasyStyles.textHalf}>
                <Text style={MealsMadeEasyStyles.featureItem}>
                  <Text style={MealsMadeEasyStyles.featureTitle}>Calorie Calculator</Text> 
                  Your daily targets, customized for you — age, weight, training, goals. It's like a personal trainer for your plate.
                </Text>
              </View>
              <View style={MealsMadeEasyStyles.textHalf}>
                <Text style={MealsMadeEasyStyles.featureItem}>
                  <Text style={MealsMadeEasyStyles.featureTitle}>Daily Streaks</Text> 
                  Stay consistent and rack up streaks. Because let's be honest, seeing that little lightning bolt icon light up makes you feel unstoppable.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Row 3 (normal height, full-width image) */}
        <View style={MealsMadeEasyStyles.rowFlex03}>
          <Image
            source={require("@/assets/images/mealsManAndWoman.jpg")}
            style={MealsMadeEasyStyles.image}
            resizeMode="contain"
          />
        </View>

      </ScrollView>
    </ImageBackground>
  );
};

const MealsMadeEasyStyles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 10,
  },
  rowFlex03: {
    // flex: 0.3,
    width: "100%",
    paddingVertical: 10,
  },
  topContent: {
    flexDirection: "row",
    flex: 0.8, // top 80% of the row
  },
  bottomText: {
    // flex: 0.2, // bottom 20% of the row
    justifyContent: "center",
    padding: 8,
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: 'black',
    borderRadius: 8
  },
  leftTextCol: {
    flex: 0.7,
    flexDirection: "column",
    backgroundColor: 'black',
    borderRadius: 8
  },
  rightTextCol: {
    flex: 0.6,
    flexDirection: "column",
    padding: 8,
    backgroundColor: 'black'
  },
  textHalf: {
    flex: 0.5,
    justifyContent: "center",
    padding: 8,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 8
  },
  rightImageCol: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  leftImageCol: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 0,
  },
  featureItem: {
    fontSize: 12,
    color: "#fff",
    lineHeight: 18,
  },
  featureTitle: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 14,
  },
});

export default MealPrograms;
