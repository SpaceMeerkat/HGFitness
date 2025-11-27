import React from "react";
import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TrackingNotesStyles } from "../HGStyles";

type MealProgramProps = {
  handleBackButton: () => boolean;
};

const MealPrograms = ({ handleBackButton }: MealProgramProps) => {
  return (
    <ImageBackground
      source={require("@/assets/images/caloriecalculator.jpg")}
      style={MealsMadeEasyStyles.background}
    >
      <ScrollView contentContainerStyle={MealsMadeEasyStyles.scrollContainer}>
        
        {/* Back button */}
        <TouchableOpacity
          style={{
            flex: 0.15,
            width: "20%",
            paddingLeft: 8,
            paddingTop: 10,
            paddingBottom: 10,
            justifyContent: "center",
          }}
          onPress={handleBackButton}
        >
          <Text style={[TrackingNotesStyles.backButtonText]}>Back</Text>
        </TouchableOpacity>

        {/* Row 1 (text left, image right) */}
        <View style={MealsMadeEasyStyles.rowFlex03}>
          <View style={MealsMadeEasyStyles.spanTextCol}>
            <View style={MealsMadeEasyStyles.textHalf}>
              <Text style={MealsMadeEasyStyles.featureItem}>
                <Text style={MealsMadeEasyStyles.featureTitle}>Simple Choices</Text>{"\n\n"}
                No more food FOMO or scrolling forever. Just pick from meals that actually work for your goals — tasty, simple, and stress-free.
              </Text>
            </View>
          </View>
        </View>

        {/* Row 2 (image left, text right) */}
        <View style={MealsMadeEasyStyles.rowFlex03}>
          <View style={MealsMadeEasyStyles.leftImageCol}>
            <Image
              source={require("@/assets/images/mealsMan.jpg")}
              style={MealsMadeEasyStyles.image}
              resizeMode="cover"
            />
          </View>
          <View style={MealsMadeEasyStyles.rightTextCol}>
            <View style={MealsMadeEasyStyles.textHalf}>
              <Text style={MealsMadeEasyStyles.featureItem}>
                <Text style={MealsMadeEasyStyles.featureTitle}>Easy Cooking Instructions</Text>{"\n\n"}
                Zero chef skills required. We'll tell you what to buy and exactly how to cook it (no MasterChef apron needed).
              </Text>
            </View>
          </View>
        </View>

        {/* Row 3 (text left, image right) */}
        <View style={MealsMadeEasyStyles.rowFlex03}>
          <View style={MealsMadeEasyStyles.spanTextCol}>
            <View style={MealsMadeEasyStyles.textHalf}>
              <Text style={MealsMadeEasyStyles.featureItem}>
                <Text style={MealsMadeEasyStyles.featureTitle}>Meal Variety</Text>{"\n\n"}
                Hundreds of options so you never get bored. Mix it up, try new recipes, and finally stop eating chicken and rice every… single… day.
              </Text>
            </View>
          </View>
        </View>

        {/* Row 4 (image left, text right) */}
        <View style={MealsMadeEasyStyles.rowFlex03}>
          <View style={MealsMadeEasyStyles.spanTextCol}>
            <View style={MealsMadeEasyStyles.textHalf}>
              <Text style={MealsMadeEasyStyles.featureItem}>
                <Text style={MealsMadeEasyStyles.featureTitle}>Flexible Portion Sizes</Text>{"\n\n"}
                Want to bulk up or slim down? Just hit the “upsize” button and boom — your calories adjust instantly.
              </Text>
            </View>
          </View>
        </View>

        {/* Row 5 (text left, image right) */}
        <View style={MealsMadeEasyStyles.rowFlex03}>
          <View style={MealsMadeEasyStyles.leftTextCol}>
            <View style={MealsMadeEasyStyles.textHalf}>
              <Text style={MealsMadeEasyStyles.featureItem}>
                <Text style={MealsMadeEasyStyles.featureTitle}>Smarter Tracking</Text>{"\n\n"}
                Log your meals and let the app do the math. Calories, protein, water — tracked automatically. You just eat, we crunch the numbers.
              </Text>
            </View>
          </View>
          <View style={MealsMadeEasyStyles.rightImageCol}>
            <Image
              source={require("@/assets/images/mealsWoman.jpg")}
              style={MealsMadeEasyStyles.image}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Row 6 (image left, text right) */}
        <View style={MealsMadeEasyStyles.rowFlex03}>
          <View style={MealsMadeEasyStyles.spanTextCol}>
            <View style={MealsMadeEasyStyles.textHalf}>
              <Text style={MealsMadeEasyStyles.featureItem}>
                <Text style={MealsMadeEasyStyles.featureTitle}>Calorie Calculator</Text>{"\n\n"}
                Your daily targets, customized for you — age, weight, training, goals. It's like a personal trainer for your plate.
              </Text>
            </View>
          </View>
        </View>

        {/* Row 7 (text left, image right) */}
        <View style={MealsMadeEasyStyles.rowFlex03}>
          <View style={MealsMadeEasyStyles.spanTextCol}>
            <View style={MealsMadeEasyStyles.textHalf}>
              <Text style={MealsMadeEasyStyles.featureItem}>
                <Text style={MealsMadeEasyStyles.featureTitle}>Daily Streaks</Text>{"\n\n"}
                Stay consistent and rack up streaks. Because let's be honest, seeing that little lightning bolt icon light up makes you feel unstoppable.
              </Text>
            </View>
          </View>
        </View>

        {/* Final row (full-width highlight image) */}
        <View style={[MealsMadeEasyStyles.rowFlex03, {paddingVertical: 0}]}>
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
    flexDirection: "row",
    width: "100%",
    paddingVertical: 10,
    backgroundColor: "black",
    borderColor: "grey",
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4
  },
  spanTextCol: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
    borderRadius: 8,
    paddingHorizontal: 8,
    textAlignVertical: 'center'
  },
  leftTextCol: {
    flex: 0.6,
    flexDirection: "column",
    backgroundColor: "black",
    borderRadius: 8,
    paddingHorizontal: 8,
    textAlignVertical: 'center'
  },
  rightTextCol: {
    flex: 0.6,
    flexDirection: "column",
    backgroundColor: "black",
    borderRadius: 8,
    paddingHorizontal: 8,
    textAlignVertical: 'center'
  },
  leftImageCol: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black"
  },
  rightImageCol: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black"
  },
  textHalf: {
    padding: 10,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 8,
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
