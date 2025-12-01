import { MealTrackingStyles } from "@/components/HGMealStyles";
import { DefaultTabStyles } from "@/components/HGStyles";
import { HGHeader } from "@/components/HeaderBar";
import { useAppContext } from "@/components/appContext";
import CalorieCalculatorModal from "@/components/meals/CalorieCalculatorInput";
import { MealStyles } from "@/components/meals/MealStyles";
import TargetsModal from "@/components/meals/TargetsModal";
import { Water1000, Water250, Water500, WaterCustom } from "@/components/meals/WaterButtons";
import { MealInstructions } from "@/components/meals/instructions";
import { addMealItem, getMealNames, getWaterNames, handleMealPress, MealProgramsState, PremiumRibbon, removeMealItem, TrackingData, updateActiveVersion } from "@/components/meals/mealUtils";
import { LoginSignupWindow } from "@/components/users/LoginSignup";
import { LoginWindow } from "@/components/users/LoginWindow";
import { SignupWindow } from "@/components/users/SignupWindow";
import { FontAwesome } from "@expo/vector-icons";
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ImageBackground, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MealScreen() {

  const image = require("@/assets/images/HGBackground.png");
  const premiumImage = require("@/assets/images/OfficialLogo.jpg");

  const { profile, mealPrograms, trackingData, setProfile, setTrackingData } = useAppContext(); 

  const [loginSignupActive, setLoginSignupActive] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginActive, setLoginActive] = useState(false);
  const [signupActive, setSignupActive] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [activeMeal, setActiveMeal] = useState<any | null>(null);
  const [mealIndex, setMealIndex] = useState<any>(0); 
  const [versionLength, setVersionLength] = useState<any>(0); 
  const [removableIcons, setRemovableIcons] = useState(false);

  const [instructionsVisible, setInstructionsVisible] = useState(false);
  const [currentInstructions, setCurrentInstructions] = useState(null);
  const [currentIngredients, setCurrentIngredients] = useState(null);
  const [mealProgramsState, setMealProgramsState] = useState<MealProgramsState>(mealPrograms || undefined);
  const [dictionary, setDictionary] = useState<TrackingData>(trackingData?.meals || undefined); 
  const [runningWater, setRunningWater] = useState(dictionary?.runningWater || 0);
  const [runningMealCount, setRunningMealCount] = useState(dictionary?.runningMeals || 0);
  const [runningCalories, setRunningCalories] = useState(dictionary?.runningCalories || 0);
  const [runningProtein, setRunningProtein] = useState(dictionary?.runningProtein || 0);

  const [calculatorVisible, setCalculatorVisible] = useState(false);
  const [targetsModalVisible, setTargetsModalVisible] = useState(false);
  const [calorieCalculatorClicked, setCalorieCalculatorClicked] = useState(false);

  const updateCalorieCalculatorStreak = async (streakBool: boolean) => {
    const updatedProfile = {
        ...profile,
        calorieCalculator: {
          ...profile.calorieCalculator,
          streak: streakBool
        },
      };
    setProfile(updatedProfile); // Update context
    // Update AsyncStorage
    await AsyncStorage.setItem('profile', JSON.stringify(updatedProfile));
  };

  useEffect(() => {
    // Guard against empty dictionary as streak should be false by default
    if (!dictionary) return;
    // If all targets are met, update the streak boolean in profile to true
    if (runningMealCount > 0 || runningWater > 0) {
      updateCalorieCalculatorStreak(true)
    } else {
        updateCalorieCalculatorStreak(false);
    }
    // If any tracker child falls below the target, set the streak boolean to false
    if (profile.calorieCalculator.streak) {
      if (runningMealCount === 0 && runningWater === 0
      ) {
        updateCalorieCalculatorStreak(false)
      } else {
        return;
      }
    }
  }, [runningMealCount, runningWater, runningCalories, runningProtein]);

  // console.log(profile.calorieCalculator);


  useEffect(() => {
    setRunningMealCount(dictionary?.runningMeals || 0);
    setRunningCalories(dictionary?.runningCalories || 0);
    setRunningProtein(dictionary?.runningProtein || 0);
    setRunningWater(dictionary?.runningWater|| 0);
  }, [dictionary]);

  useEffect(() => {
    setMealProgramsState(mealPrograms);
  }, []); 

  useEffect(() => {
    if (trackingData) {
      setDictionary(trackingData?.meals || undefined);
    } else {
      setLoginSignupActive(true);
    }
  }, [trackingData]);
  

  useEffect(() => {
    if (profile === null) {
      setLoggedIn(false);
      setLoginActive(false);
      setLoginSignupActive(true);
    } else {
      setLoggedIn(true);
    }
  }, [profile]);

  const handleChildPage = (loggedIn: boolean, loginSignup: boolean, login: boolean, signup: boolean) => {
    if (loggedIn) {
      setLoggedIn(true);
      setLoginActive(false);
      setSignupActive(false);
    }
    if (login) {
      setLoggedIn(false);
      setLoginActive(true);
      setSignupActive(false);
      setLoginSignupActive(false);
    }
    if (signup) {
      setLoggedIn(false);
      setLoginActive(false);
      setSignupActive(true);
      setLoginSignupActive(false);
    } 
  };

  // Handle the amount of water being passed up to here by WaterButtons Add
  const handleWaterClick = (amount: any) => {
    const key = 'water';
    const itemarg = amount;
    const mealValue = 0
    const calorieValue = 0;
    const proteinValue = 0;
    const waterValue = amount;
    addMealItem({key, dictionary, itemarg, trackingData, mealValue, calorieValue, proteinValue, waterValue, setDictionary, storeTrackingAsync, setTrackingData, setOverlayVisible});
    // setRunningWater(runningWater + amount);
  };

  const storeTrackingAsync = async (item: string) => {
    await AsyncStorage.setItem('trackingData', JSON.stringify(item));
    setTrackingData(item)
  };

  useEffect(() => {
  }, [mealProgramsState]); 

  const renderOverlay = () => {
    if (instructionsVisible && currentIngredients && currentInstructions && activeMeal) {
 
      // Show MealInstructions if instructionsVisible is true
      return (
        <MealInstructions
          setInstructionsVisible={setInstructionsVisible}
          setMealProgramsState = {setMealProgramsState}
          setCurrentInstructions={setCurrentInstructions}
          setCurrentIngredients={setCurrentIngredients}
          setDictionary={setDictionary}
          storeTrackingAsync={storeTrackingAsync}
          setTrackingData={setTrackingData}
          setOverlayVisible={setOverlayVisible}
          dictionary={dictionary}
          trackingData={trackingData}
          instructionsVisible={instructionsVisible}
          mealProgramState = {mealProgramsState}
          activeMeal = {activeMeal}
          currentMealIndex = {mealIndex}
          versionLength = {versionLength}
          instructions={currentInstructions}
          ingredients={currentIngredients}
        />
      );
    } 
    if (loggedIn && overlayVisible && activeMeal) {
      // Show the default overlay if overlayVisible and activeMeal are true
      return (
      <Modal visible={overlayVisible} animationType="slide" transparent>
        <View style={MealStyles.modalBackground}>
        <TouchableOpacity
            onPress={() => setOverlayVisible(false)}
            style={MealTrackingStyles.TrackingBackButton}
          >
            <Text style={{color: "white", fontSize: 16, fontWeight: 'bold', paddingBottom: 10}}>Back</Text>
        </TouchableOpacity>
        <View style={MealTrackingStyles.TrackingOptionsContainer}>
          <ImageBackground source={image} resizeMode="cover" style={{flex: 1, overflow: "hidden"}}>

          {/* Map over activeMeal to create Pressable components */}
          <ScrollView contentContainerStyle={{ paddingTop: 10 }}>
            {activeMeal === 'water' ? (
              <>
                <Water250 handleWaterClick={handleWaterClick} />
                <Water500 handleWaterClick={handleWaterClick} />
                <Water1000 handleWaterClick={handleWaterClick} />
                <WaterCustom handleWaterClick={handleWaterClick} />
              </>
            ) : (
            Object.values(mealProgramsState[activeMeal] || {}).map((item: any, index: number) => {
              if (index > 15 && profile.premium === false) {
                return (
                  <View key={index} style={MealTrackingStyles.MealOptionOuterContainer}>
                    <View style={MealTrackingStyles.MealOptionLayoutContainer}>
                      <View style={{ flex: 1, flexDirection: 'column' }}>
                          {/* Background image layer */}
                          <View style={{ flex: 0.95, flexDirection: 'row' }}>
                            <ImageBackground source={premiumImage} resizeMode="contain" style={{...StyleSheet.absoluteFillObject, opacity: 0.15}}/>
                          </View>
                          {/* Foreground content layer */}
                          <View style={{ flex: 0.05, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', opacity: 0.75 }}>
                            <View style={{flex: 1,flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                              <Text style={{ color: 'white', fontSize: 14, marginRight: 4 }}>{item.name}</Text>
                              <Ionicons name="lock-closed" size={16} color="white" />
                            </View>
                          </View>
                        </View>
                    </View>
                  </View>
                );
              }

              // index === 15: render PremiumRibbon + simplified view
              if (index === 15 && profile.premium === false) {
                return (
                  <React.Fragment key={index}>
                    <PremiumRibbon />
                    <View key={index} style={MealTrackingStyles.MealOptionOuterContainer}>
                      <View style={MealTrackingStyles.MealOptionLayoutContainer}>
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                          {/* Background image layer */}
                          <View style={{ flex: 0.95, flexDirection: 'row' }}>
                            <ImageBackground source={premiumImage} resizeMode="contain" style={{...StyleSheet.absoluteFillObject, opacity: 0.15}} />
                          </View>
                          {/* Foreground content layer */}
                          <View style={{ flex: 0.05, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', opacity: 0.75 }}>
                            <View style={{flex: 1,flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                              <Text style={{ color: 'white', fontSize: 14, marginRight: 4 }}>{item.name}</Text>
                              <Ionicons name="lock-closed" size={16} color="white" />
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </React.Fragment>
                );
              }
              return (
                <View key={index}>
                  {/* Add the premium ribbon here */}
                  <View style={MealTrackingStyles.MealOptionOuterContainer}>
                    <Pressable
                      style={MealTrackingStyles.MealOptionLayoutContainer}
                      onPress={() => {
                        setInstructionsVisible(true);
                        setMealIndex(index);
                        setVersionLength(item.version.length);
                        setCurrentInstructions(item.how[item.activeVersion].split('/'));
                        setCurrentIngredients(item.ingredients[item.activeVersion]);
                      }}
                    >
                      {/* Meal name */}
                      <View style={{ flex: 0.5, flexDirection: 'row', backgroundColor: 'black', justifyContent: 'center' }}>
                        <Text style={{ color: "white", fontSize: 22, fontWeight: 'bold', textAlign: 'center' }}>{item.name}</Text>
                      </View>

                      {/* Protein + Calories */}
                      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'black', justifyContent: 'center', paddingBottom: 10 }}>
                        <View style={{ flex: 0.5, paddingTop: 5, paddingRight: 5 }}>
                          <Text style={{ color: "white", fontSize: 14, textAlign: 'right' }}>
                            Protein {item.protein[item.activeVersion]}
                            <MaterialCommunityIcons name="food-drumstick" size={14} color="brown" />
                          </Text>
                        </View>
                        <View style={{ flex: 0.5, paddingTop: 5, paddingLeft: 5 }}>
                          <Text style={{ color: "white", fontSize: 14, textAlign: 'left' }}>
                            Calories {item.calories[item.activeVersion]}
                            <FontAwesome6 name="fire" size={14} color="orange" />
                          </Text>
                        </View>
                      </View>

                      {/* Add button */}
                      <View style={{ flex: 0.5, flexDirection: 'row', backgroundColor: 'black', justifyContent: 'center' }}>
                        <Pressable
                          onPress={() => {
                            const currentVersion = item.activeVersion;
                            const key = activeMeal.toLowerCase();
                            const itemarg = `${index + 1}_${currentVersion + 1}`;
                            const mealValue = 1;
                            const calorieValue = item.calories[currentVersion];
                            const proteinValue = item.protein[currentVersion];
                            const waterValue = 0;
                            addMealItem({
                              key,
                              dictionary,
                              itemarg,
                              trackingData,
                              mealValue,
                              calorieValue,
                              proteinValue,
                              waterValue,
                              setDictionary,
                              storeTrackingAsync,
                              setTrackingData,
                              setOverlayVisible
                            });
                          }}
                          style={MealTrackingStyles.AddMealButton}
                        >
                          <Text style={{ color: "white", fontSize: 16, textAlign: 'center' }}>Add</Text>
                        </Pressable>
                      </View>

                      {/* Change version button */}
                      <Pressable
                        style={MealTrackingStyles.MealInfoButton}
                        onPress={() => {
                          const mealIndex = index + 1;
                          const newVersion = (item.activeVersion + 1) % item.version.length;
                          updateActiveVersion({ activeMeal, mealIndex, newVersion, setMealProgramsState });
                        }}
                      >
                        <Text style={{ color: "white", fontSize: 16, textAlign: 'center' }}>
                          <Entypo name="arrow-with-circle-up" size={22} color="lime" />
                        </Text>
                      </Pressable>
                    </Pressable>
                  </View>
                </View>
              );
            })
            )}
          </ScrollView>
        </ImageBackground>
        </View>
      </View>
      </Modal>
    )}
  };

  const renderMeals = () => {
    const iconDict: Record<string, React.ReactNode> = {
      Breakfast: <MaterialCommunityIcons name="egg-fried" size={24} color="gold" />,
      Lunch: <MaterialCommunityIcons name="hamburger" size={24} color="chocolate" />,
      Dinner: <MaterialCommunityIcons name="food-turkey" size={24} color="brown" />,
      Snack: <FontAwesome6 name="apple-whole" size={24} color="lime" />,
    };
    return (
      <>
      {/* Calorie Calculator modal */}
      <CalorieCalculatorModal 
        visible={calculatorVisible}
        onClose={() => setCalculatorVisible(false)}
      />

      {/* Calorie Calculator modal */}
      <TargetsModal 
        visible={targetsModalVisible}
        targetState={
          profile.premium
            ? (profile.calorieCalculator?.calories === 0
                ? "undefined"
                : "premium")
            : "free"
        }
        streak={profile.calorieCalculator.streakCounter}
        meals={runningMealCount}
        mealsTarget={profile.calorieCalculator.meals}
        calories={runningCalories}
        caloriesTarget={profile.calorieCalculator.calories}
        protein={runningProtein}
        proteinTarget={profile.calorieCalculator.protein}
        water={runningWater}
        waterTarget={profile.calorieCalculator.water}
        onClose={() => setTargetsModalVisible(false)}
      />
      
      <ScrollView contentContainerStyle={{ flexGrow: 1}}>

        {/* Meals header component */}

        <Pressable style={{flex: 0.15}} onPress={()=>setTargetsModalVisible(true)}>

          <View style={MealTrackingStyles.HeaderContainer}>

            {/* Column 1 */}
            <View style={MealTrackingStyles.HeaderStackedColumn}>
              <View style={MealTrackingStyles.HeaderBox}>
                <Text style={{textAlign: 'center', color: 'white', fontSize: 22, paddingBottom: 10}}>Meals</Text>
              </View>
              <View style={MealTrackingStyles.HeaderBox}>
                <Text style={{textAlign: 'center', 
                  color: profile.calorieCalculator.active? runningMealCount === 0? 'grey': runningMealCount >= profile.calorieCalculator.meals? 'lime': 'white': 'white', 
                  fontSize: 22}}>{ profile.calorieCalculator.active? runningMealCount === 0? profile.calorieCalculator.meals : runningMealCount : runningMealCount}</Text>
              </View>
            </View>
            {/* {profile.calorieCalculator.active ? `/${profile.calorieCalculator.meals}` : ""} */}

            {/* Separator 1 */}
            <View style={MealTrackingStyles.HeaderSeparator} />

            {/* Column 2 */}
            <View style={MealTrackingStyles.HeaderStackedColumn}>
              <View style={MealTrackingStyles.HeaderBox}>
                <Text style={{textAlign: 'center', color: 'white', fontSize: 22, paddingBottom: 10}}>Calories</Text>
              </View>
              <View style={MealTrackingStyles.HeaderBox}>
                <Text style={{textAlign: 'center', 
                  color: profile.calorieCalculator.active? runningCalories === 0? 'grey': runningCalories >= profile.calorieCalculator.calories? 'lime': 'white': 'white', 
                  fontSize: 22}}>{ profile.calorieCalculator.active? runningCalories === 0? profile.calorieCalculator.calories : runningCalories : runningCalories}</Text>
              </View>
            </View>

            {/* Separator 2 */}
            <View style={MealTrackingStyles.HeaderSeparator} />

            {/* Column 3 */}
            <View style={MealTrackingStyles.HeaderStackedColumn}>
              <View style={MealTrackingStyles.HeaderBox}>
                <Text style={{textAlign: 'center', color: 'white', fontSize: 22, paddingBottom: 10}}>Protein</Text>
              </View>
              <View style={MealTrackingStyles.HeaderBox}>
                <Text style={{textAlign: 'center', 
                  color: profile.calorieCalculator.active? runningProtein === 0? 'grey': runningProtein >= profile.calorieCalculator.protein? 'lime': 'white': 'white', 
                  fontSize: 22}}>{ profile.calorieCalculator.active? runningProtein === 0? profile.calorieCalculator.protein : runningProtein : runningProtein}g</Text>
              </View>
            </View>

            {/* Separator 3 */}
            <View style={MealTrackingStyles.HeaderSeparator} />

            {/* Column 4 */}
            <View style={MealTrackingStyles.HeaderStackedColumn}>
              <View style={MealTrackingStyles.HeaderBox}>
                <Text style={{textAlign: 'center', color: 'white', fontSize: 22, paddingBottom: 10}}>Water</Text>
              </View>
              <View style={MealTrackingStyles.HeaderBox}>
                <Text style={{textAlign: 'center', 
                  color: profile.calorieCalculator.active? runningWater === 0? 'grey': runningWater >= profile.calorieCalculator.water? 'lime': 'white': 'white', 
                  fontSize: 22}}>{ profile.calorieCalculator.active? runningWater === 0? profile.calorieCalculator.water : runningWater : runningWater}L</Text>
              </View>
            </View>
          </View>

          {/* Divider */}
          <View style={{paddingTop:8, paddingBottom: 24}}>
            {/* Lightening bolt component for streaks */}
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 0.1, flexDirection: 'row', justifyContent: 'center',
                position: "absolute",
                        left: 0,
                        right: 0,
                        top: -24,
                        zIndex: 1000,
              }}>
                <View style={{flexDirection: 'row', justifyContent: 'center', backgroundColor: 'black',
                  borderColor: 'white', borderWidth: 2, borderRadius: 200, height: 50, width: 50 
                }}>
                    <FontAwesome name="bolt" size={30} color="orange" style= {{textAlign: 'center', textAlignVertical: 'center'}}/>
                    <Text style={{color: 'orange', fontSize: 12, textAlignVertical: 'center', paddingTop: 8}}>{profile.calorieCalculator.streak? profile.calorieCalculator.streakCounter + 1 : profile.calorieCalculator.streakCounter}</Text>
                </View>
              </View>
            </View> 
            <View style={{height: 1, backgroundColor: 'white'}} />
          </View>    

          {removableIcons === true ? (
            <View style={{flex: 1, paddingHorizontal: 10, paddingTop: 10, justifyContent: 'center'}}>
              <Pressable onPress={() => setRemovableIcons(false)}>
                <Text style={{color: 'cyan', textAlign: 'right', fontSize: 20}}>Done <FontAwesome6 name="circle-check" size={20} color="cyan" /></Text>
              </Pressable>
            </View>
          ) : null }

        </Pressable>

        {/* Meals section */}

        {["Breakfast", "Lunch", "Dinner", "Snack"].map(meal => (

          <Pressable onLongPress={() => setRemovableIcons(true)} key={meal} style={{flex: 0.16, flexDirection: 'column', width: '100%', paddingHorizontal: 10, paddingVertical: 6}}>
            <View style={{flex: 1, backgroundColor: 'black', borderWidth: 1, borderRadius: 4, borderColor: 'grey', paddingHorizontal: 10, paddingVertical: 4}}>
              <Text style={{textAlign: 'left', color: 'white', fontSize: 22}}>{iconDict[meal]} {meal}</Text>
              <View style={{height: 1, backgroundColor: 'white'}} />
              {getMealNames(meal, dictionary, mealPrograms).map(({ mealName, calorieValue, proteinValue }, index) => (
                <View key={`${meal}_${index}`} style={{ paddingVertical: 8, paddingHorizontal: 5, flexDirection: 'row' }}>
                  {removableIcons === true ? (
                  <Pressable onPress={() => {
                    const mealarg = meal;
                    const mealValue = 1;
                    const waterValue = 0;
                    removeMealItem({mealarg, index, dictionary, trackingData, mealValue, calorieValue, proteinValue, waterValue, setDictionary, storeTrackingAsync, setTrackingData})
                    }} style={{flex:0.15, flexDirection:'column'}}>
                    <Ionicons name="remove-circle-outline" size={24} color="red" />
                  </Pressable>
                  ) : null }
                  <View style={{flex:1, flexDirection:'row'}}>
                    <View style={{flex:0.7, flexDirection:'column'}}>
                      <Text style={{ color: "white", fontSize: 18 }}>{mealName}</Text>
                    </View>
                    <View style={{flex:0.3, flexDirection:'column'}}>
                      <Text style={{ color: "white", fontSize: 18, textAlign: 'right'}}>{calorieValue} <FontAwesome6 name="fire" size={14} color="orange" /></Text>
                    </View>
                  </View>
                </View>
              ))}
              <TouchableOpacity onPress={() => {
                const mealarg = meal;
                handleMealPress({mealarg, setActiveMeal, setOverlayVisible})}
                }>
                <Text style={{color: 'grey', fontSize: 20, paddingTop: 8}}> <Ionicons name="add-circle-outline" size={20} color="grey" textAlignVertical='center' /> Add food</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        ))}

        <Pressable onLongPress={() => setRemovableIcons(true)} style={{flex: 0.16, flexDirection: 'column', width: '100%', paddingHorizontal: 10, paddingVertical: 6}}>
          <View style={{flex: 1, backgroundColor: 'black', borderWidth: 1, borderRadius: 4, borderColor: 'grey', paddingHorizontal: 10, paddingVertical: 4}}>
            <Text style={{textAlign: 'left', color: 'white', fontSize: 22}}><FontAwesome6 name="bottle-water" size={20} color="cyan" textAlignVertical='bottom' /> Water</Text>
            <View style={{height: 1, backgroundColor: 'white'}} />
            {getWaterNames('water', dictionary).map((mealName?: any, index?: any) => (
                <View key={`${'water'}_${index}`} style={{ paddingVertical: 8, paddingHorizontal: 5, flexDirection: 'row' }}>
                  {removableIcons === true ? (
                  <Pressable onPress={() => {
                    const mealarg = 'water'
                    const mealValue = 0;
                    const calorieValue = 0;
                    const proteinValue = 0;
                    const waterValue = mealName;
                    removeMealItem({mealarg, index, dictionary, trackingData, mealValue, calorieValue, proteinValue, waterValue, setDictionary, storeTrackingAsync, setTrackingData}) 
                  }} style={{flex:0.15, flexDirection:'column'}}>
                    <Ionicons name="remove-circle-outline" size={24} color="red" />
                  </Pressable>
                  ) : null}
                  <View style={{flex:0.85, flexDirection:'column'}}>
                    <Text style={{ color: "white", fontSize: 18 }}>{mealName} litres</Text>
                  </View>
                </View>
              ))}
            <Pressable onPress={() => {
              const mealarg = 'water';
              handleMealPress({mealarg, setActiveMeal, setOverlayVisible})}
            }>
             <Text style={{color: 'grey', fontSize: 20, paddingTop: 8}}> <Ionicons name="add-circle-outline" size={20} color="grey" textAlignVertical='bottom' /> Add water</Text>
            </Pressable>
          </View>
        </Pressable>

        <Pressable onPress={() => profile.premium? setCalculatorVisible(true) : null} 
          onPressIn={()=>setCalorieCalculatorClicked(true)} 
          onPressOut={()=>setCalorieCalculatorClicked(false)}
          style={{flex: 0.16, flexDirection: 'column', width: '100%', paddingHorizontal: 60, paddingVertical: 6}}>
          <View style={{flex: 1, backgroundColor: 'black', borderWidth: 1, borderRadius: 100, borderColor: calorieCalculatorClicked? 'lime': 'white', paddingHorizontal: 10, paddingVertical: 8, alignItems: 'center'}}>

            <Text style={{color: 'white', fontSize: 20, textAlignVertical: 'center'}}> Calorie calculator</Text>
          </View>
        </Pressable>

      </ScrollView>
      </>
    )
  }

  const renderLoginSignup = () => {
    return(
      <LoginSignupWindow handleChildPage={handleChildPage}/>
    )
  }

  const renderLogin = () => {
    return(
      <LoginWindow handleChildPage={handleChildPage}/>
    )
  }

  const renderSignup = () => {
    return(
      <SignupWindow handleChildPage={handleChildPage}/>
    )
  }

  const renderPageContent = () => {
    if (loggedIn && profile && mealPrograms && trackingData && dictionary) {
      return renderMeals()
    } else if (loginSignupActive) {
      return renderLoginSignup();
    } else if (loginActive) {
      return renderLogin();
    } else if (signupActive) {
      return renderSignup();
    } else if (loggedIn && !profile && !mealPrograms && !trackingData && !dictionary) {
      console.log('in limbo loading...')
    }
    return null; // In case both states are false, nothing will be rendered
  };

  return (
    <SafeAreaView style={DefaultTabStyles.defaultContainer} edges={['top']}>
      <HGHeader />
      <ImageBackground source={image} resizeMode="cover" style={{ flex: 1, width: '100%', height: '100%' }}>
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }} 
        keyboardShouldPersistTaps="handled"
      >
      
      {renderPageContent()}
      {renderOverlay()}

      </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
