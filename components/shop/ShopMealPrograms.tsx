import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React from "react";
import { Dimensions, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type MealProgramProps = {
  handleBackButton: () => boolean;
};

const { width } = Dimensions.get('window');
const GRID_GAP = 8;
const GRID_ITEM_WIDTH = (width - 40 - GRID_GAP) / 2;

const MealPrograms = ({ handleBackButton }: MealProgramProps) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <ImageBackground
            source={require("@/assets/images/mealsManAndWoman.jpg")}
            style={styles.heroImage}
            resizeMode="cover"
          >
            <View style={styles.heroOverlay}>
              <TouchableOpacity style={styles.backButton} onPress={handleBackButton}>
                <Ionicons name="arrow-back" size={24} color="white" />
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>
              <View style={styles.heroTextContainer}>
                <Text style={styles.heroTitle}>Meals Made Easy</Text>
                <Text style={styles.heroSubtitle}>Your guide to smarter eating</Text>
              </View>
            </View>
          </ImageBackground>
        </View>

        {/* Intro Callout - Simple Choices */}
        <View style={styles.introCard}>
          <View style={styles.accentBar} />
          <View style={styles.introContent}>
            <Text style={styles.introTitle}>Simple Choices</Text>
            <Text style={styles.introText}>
              No more food FOMO or scrolling forever. Just pick from meals that actually work for your goals — tasty, simple, and stress-free.
            </Text>
          </View>
        </View>

        {/* 2-Column Grid */}
        <View style={styles.grid}>
          {/* Row 1 */}
          <View style={styles.gridRow}>
            {/* Easy Cooking Instructions - with image */}
            <View style={styles.gridItem}>
              <ImageBackground
                source={require("@/assets/images/mealsMan.jpg")}
                style={styles.gridImageBg}
                resizeMode="contain"
              >
                <View style={styles.gridImageOverlay}>
                  <Text style={styles.gridTitle}>Easy Cooking Instructions</Text>
                  <Text style={styles.gridText}>
                    Zero chef skills required. We'll tell you what to buy and exactly how to cook it.
                  </Text>
                </View>
              </ImageBackground>
            </View>

            {/* Meal Variety */}
            <View style={[styles.gridItem, styles.gridItemDark]}>
              <Ionicons name="restaurant-outline" size={28} color="#22C55E" style={styles.gridIcon} />
              <Text style={styles.gridTitle}>Meal Variety</Text>
              <Text style={styles.gridText}>
                Hundreds of options so you never get bored. Mix it up and try new recipes.
              </Text>
            </View>
          </View>

          {/* Row 2 */}
          <View style={styles.gridRow}>
            {/* Flexible Portion Sizes */}
            <View style={[styles.gridItem, styles.gridItemDark]}>
              <Ionicons name="resize-outline" size={28} color="#22C55E" style={styles.gridIcon} />
              <Text style={styles.gridTitle}>Flexible Portions</Text>
              <Text style={styles.gridText}>
                Want to bulk up or slim down? Just hit "upsize" and your calories adjust instantly.
              </Text>
            </View>

            {/* Smarter Tracking - with image */}
            <View style={styles.gridItem}>
              <ImageBackground
                source={require("@/assets/images/mealsWoman.jpg")}
                style={styles.gridImageBg}
                resizeMode="contain"
              >
                <View style={styles.gridImageOverlay}>
                  <Text style={styles.gridTitle}>Smarter Tracking</Text>
                  <Text style={styles.gridText}>
                    Log your meals and let the app do the math. You eat, we crunch the numbers.
                  </Text>
                </View>
              </ImageBackground>
            </View>
          </View>
        </View>

        {/* Bottom Features */}
        <View style={styles.featureRow}>
          <View style={styles.featureIconContainer}>
            <Ionicons name="calculator-outline" size={32} color="#22C55E" />
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Calorie Calculator</Text>
            <Text style={styles.featureText}>
              Your daily targets, customized for you — age, weight, training, goals. It's like a personal trainer for your plate.
            </Text>
          </View>
        </View>

        <View style={styles.featureRow}>
          <View style={styles.featureIconContainer}>
            <MaterialCommunityIcons name="fire" size={32} color="#22C55E" />
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Daily Streaks</Text>
            <Text style={styles.featureText}>
              Stay consistent and rack up streaks. Because seeing that little lightning bolt icon light up makes you feel unstoppable.
            </Text>
          </View>
        </View>

        {/* Bottom spacing */}
        <View style={{ height: 20 }} />

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  scrollContainer: {
    flexGrow: 1,
  },

  // Hero Section
  heroContainer: {
    height: 280,
    width: '100%',
  },
  heroImage: {
    flex: 1,
    width: '100%',
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'space-between',
    padding: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 4,
    fontWeight: '500',
  },
  heroTextContainer: {
    marginBottom: 20,
  },
  heroTitle: {
    fontFamily: 'Edo',
    fontSize: 36,
    color: 'white',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 4,
  },

  // Intro Card
  introCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  accentBar: {
    width: 4,
    backgroundColor: '#22C55E',
  },
  introContent: {
    flex: 1,
    padding: 16,
  },
  introTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#22C55E',
    marginBottom: 8,
  },
  introText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 20,
  },

  // Grid
  grid: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: GRID_GAP,
  },
  gridItem: {
    width: GRID_ITEM_WIDTH,
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
  },
  gridItemDark: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    justifyContent: 'center',
  },
  gridImageBg: {
    flex: 1,
    width: '100%',
  },
  gridImageOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 12,
    justifyContent: 'flex-end',
  },
  gridIcon: {
    marginBottom: 8,
  },
  gridTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  gridText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 16,
  },

  // Feature Rows
  featureRow: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  featureIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: 'rgba(255,184,0,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  featureText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 18,
  },
});

export default MealPrograms;
