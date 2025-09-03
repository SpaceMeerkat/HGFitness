import React from "react";
import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";

const MealPrograms = () => {
  return (
    <ImageBackground
      source={require("@/assets/images/caloriecalculator.jpg")}
      style={MealsMadeEasyStyles.background}
    >
      <ScrollView contentContainerStyle={MealsMadeEasyStyles.scrollContainer}>

        {/* Row 1 (image on right) */}
        <View style={MealsMadeEasyStyles.rowFlex03}>
          {/* Top content row */}
          <View style={MealsMadeEasyStyles.topContent}>
            {/* Left text column (0.6 width, split into 2 halves vertically) */}
            <View style={MealsMadeEasyStyles.leftTextCol}>
              <View style={MealsMadeEasyStyles.textHalf}>
                <Text style={MealsMadeEasyStyles.featureItem}>
                  <Text style={MealsMadeEasyStyles.featureTitle}>Simple Choices</Text> – Select meals from a curated list designed for real results. No endless searching or typing every ingredient.
                </Text>
              </View>
              <View style={MealsMadeEasyStyles.textHalf}>
                <Text style={MealsMadeEasyStyles.featureItem}>
                  <Text style={MealsMadeEasyStyles.featureTitle}>Flexible Options</Text> – Want a little extra fuel? Just tap the up arrow to “upsize” your meal for more nutrition without breaking your plan.
                </Text>
              </View>
            </View>
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
              <Text style={MealsMadeEasyStyles.featureTitle}>Smarter Tracking</Text> – See your calories, protein, water intake, and meals update instantly at the top of the page. Stay on target without the stress.
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
                  <Text style={MealsMadeEasyStyles.featureTitle}>Calorie Calculator</Text> – Personalized daily targets based on your age, weight, height, training intensity, and goals.
                </Text>
              </View>
              <View style={MealsMadeEasyStyles.textHalf}>
                <Text style={MealsMadeEasyStyles.featureItem}>
                  <Text style={MealsMadeEasyStyles.featureTitle}>Daily Streaks</Text> – Hit your targets consistently and stay motivated with streak rewards.
                </Text>
              </View>
            </View>
          </View>
          {/* Bottom text (0.2 height, full width) */}
          <View style={MealsMadeEasyStyles.bottomText}>
            <Text style={MealsMadeEasyStyles.featureItem}>
              <Text style={MealsMadeEasyStyles.featureTitle}>More Meal Variety</Text> – Extra meal options to keep your nutrition fun and flexible.
            </Text>
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
