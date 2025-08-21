import { DefaultTabStyles, ShopStyles } from "@/components/HGStyles";
import { ScrollView, Text, View } from "react-native";

export function MealPrograms() {

    return(
      <ScrollView style={ShopStyles.shopScrollContainer}>

      <Text style={DefaultTabStyles.defaultBoldText}>Fuel your gains</Text>
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