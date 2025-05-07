import { View, Text, ScrollView } from "react-native";
import { DefaultTabStyles, ShopStyles } from "@/components/HGStyles"

export function MealPrograms() {

    return(
      <ScrollView style={ShopStyles.shopScrollContainer}>

      <Text style={DefaultTabStyles.defaultBoldText}>Meal programs</Text>
      <View style={ShopStyles.cardBlockContainer}>
          <View style={ShopStyles.mealCard}></View>
          <View style={ShopStyles.mealCard}></View>
          <View style={ShopStyles.mealCard}></View>
          <View style={ShopStyles.mealCard}></View>
          <View style={ShopStyles.mealCard}></View>
          <View style={ShopStyles.mealCard}></View>
          <View style={ShopStyles.mealCard}></View>
          <View style={ShopStyles.mealCard}></View>
          <View style={ShopStyles.mealCard}></View>
          <View style={ShopStyles.mealCard}></View>
      </View>

    </ScrollView> 
    )
}