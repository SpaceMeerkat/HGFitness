import { MealTrackingStyles } from "@/components/HGMealStyles";
import { DefaultTabStyles } from "@/components/HGStyles";
import { HGHeader } from "@/components/HeaderBar";
import { useAppContext } from "@/components/appContext";
import { Water1000, Water250, Water500, WaterCustom } from "@/components/meals/WaterButtons";
import { MealInstructions } from "@/components/meals/instructions";
import { addMealItem, getMealNames, getWaterNames, handleMealPress, iconColors, MealProgramsState, removeMealItem, TrackingData } from "@/components/meals/mealUtils";
import { LoginWindow } from "@/components/users/LoginWindow";
import { SignupWindow } from "@/components/users/SignupWindow";
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ImageBackground, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MealScreen() {

  const image = require("@/assets/images/HGBackground.png");

  const { profile, mealPrograms, trackingData, setTrackingData } = useAppContext(); 
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginActive, setLoginActive] = useState(true);
  const [signupActive, setSignupActive] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [activeMeal, setActiveMeal] = useState<any | null>(null);
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
      setLoginActive(true);
    }
  }, [trackingData]);
  

  useEffect(() => {
    if (profile === null) {
      setLoggedIn(false);
      setLoginActive(true);
    } else {
      setLoggedIn(true);
    }
  }, [profile]);

  const handleChildPage = (loggedIn: boolean, login: boolean, signup: boolean) => {
    if (loggedIn) {
      setLoggedIn(true);
      setLoginActive(false);
      setSignupActive(false);
    }
    if (login) {
      setLoggedIn(false);
      setLoginActive(true);
      setSignupActive(false);
    }
    if (signup) {
      setLoggedIn(false);
      setLoginActive(false);
      setSignupActive(true);
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
    if (instructionsVisible && currentIngredients && currentInstructions) {
 
      // Show MealInstructions if instructionsVisible is true
      return (
        <MealInstructions
          setInstructionsVisible={setInstructionsVisible}
          setCurrentInstructions={setCurrentInstructions}
          setCurrentIngredients={setCurrentIngredients}
          instructions={currentInstructions}
          ingredients={currentIngredients}
        />
      );
    } 
    if (loggedIn && overlayVisible && activeMeal) {
      // Show the default overlay if overlayVisible and activeMeal are true
      return (
      <View style={MealTrackingStyles.TrackingOverlay}>
        <View style={MealTrackingStyles.TrackingOptionsContainer}>
          <ImageBackground source={image} resizeMode="cover" style={{flex: 1, overflow: "hidden"}}>
          <Pressable
            onPress={() => setOverlayVisible(false)}
            style={MealTrackingStyles.TrackingBackButton}
          >
            <Text style={{ color: "white", fontSize: 16 }}>Back</Text>
          </Pressable>

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
                return (
                  <View key={index} style={MealTrackingStyles.MealOptionOuterContainer}>
                    <Pressable style={MealTrackingStyles.MealOptionLayoutContainer} onPress={() => [
                          setInstructionsVisible(true), 
                          setCurrentInstructions(item.how[item.activeVersion].split('/')),
                          setCurrentIngredients(item.ingredients[item.activeVersion])]}>
                      <View style={{ flex: 0.5, flexDirection: 'row', backgroundColor: 'black', justifyContent: 'center' }}>
                        <Text style={{ color: "white", fontSize: 22, fontWeight: 'bold' }}>{item.name}</Text>
                      </View>
                      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'black', justifyContent: 'center', paddingBottom: 10 }}>
                        <View style={{ flex: 0.5, flexDirection: 'column', paddingTop: 5, paddingRight: 5, justifyContent: 'flex-start' }}>
                          <Text style={{ color: "white", fontSize: 14, textAlign: 'right' }}>
                            Protein {item.protein[item.activeVersion]}
                            <MaterialCommunityIcons name="food-drumstick" size={14} color="brown" />
                          </Text>
                        </View>

                        <View style={{ flex: 0.5, flexDirection: 'column', paddingTop: 5, paddingLeft: 5, justifyContent: 'flex-start' }}>
                          <Text style={{ color: "white", fontSize: 14, textAlign: 'left' }}>
                            Calories {item.calories[item.activeVersion]}
                            <FontAwesome6 name="fire" size={14} color="orange" />
                          </Text>
                        </View>
                      </View>

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
                            addMealItem({key, dictionary, itemarg, trackingData, mealValue, calorieValue, proteinValue, waterValue, setDictionary, storeTrackingAsync, setTrackingData, setOverlayVisible});
                          }}
                          style={MealTrackingStyles.AddMealButton}
                        >
                          <Text style={{ color: "white", fontSize: 16, justifyContent: 'center', textAlign: 'center' }}>Add</Text>
                        </Pressable>
                      </View>

                      <Pressable style={MealTrackingStyles.MealInfoButton}
                        onPress={() => [
                          setInstructionsVisible(true), 
                          setCurrentInstructions(item.how[item.activeVersion].split('/')),
                          setCurrentIngredients(item.ingredients[item.activeVersion])]}>
                          <Text style={{ color: "white", fontSize: 16, textAlign: 'center' }}>
                            {/* <Ionicons name="information-circle-outline" size={22} color="lime" /> */}
                            <Entypo name="arrow-with-circle-up" size={22} color="lime" />
                          </Text>
                      </Pressable>

                      {/* <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'black', justifyContent: 'center' }}>
                      <Pressable
                          onPress={() => {
                            const mealIndex = index + 1;
                            const newVersion = (item.activeVersion + 1) % item.version.length;
                            updateActiveVersion({activeMeal, mealIndex, newVersion, setMealProgramsState})}}
                          style={{
                            flex: 0.6,
                            flexDirection: 'column',
                            backgroundColor: 'black',
                            justifyContent: 'center',
                            paddingHorizontal: 0,
                            paddingTop: 10,
                            paddingBottom: 2
                          }}
                        >
                          <View
                            style={{
                              flex: 1,
                              borderRadius: 4,
                              borderWidth: 1,
                              borderColor: 'grey',
                              backgroundColor: 'grey',
                              justifyContent: 'center',
                            }}
                          >
                            <Text style={{ color: "white", fontSize: 16, textAlign: 'center' }}>
                              Meal size {item.activeVersion + 1 || 1}
                            </Text>
                          </View>
                        </Pressable>
                      </View> */}

                      <View style={{ flex: 0.5, flexDirection: 'row' }}>

                        {/* <Pressable style={{flex: 0.2, 
                          flexDirection: 
                          'column', 
                          justifyContent: 
                          'center', 
                          backgroundColor: 'black'}} 
                          onPress={() => [
                            setInstructionsVisible(true), 
                            setCurrentInstructions(item.how[item.activeVersion].split('/')),
                            setCurrentIngredients(item.ingredients[item.activeVersion])]}>
                            <Text style={{ color: "white", fontSize: 16, textAlign: 'center' }}>
                              <Ionicons name="information-circle-outline" size={22} color="white" />
                            </Text>
                        </Pressable> */}

                        
                      </View>
                    </Pressable>
                  </View>
                );
              })
            )}
          </ScrollView>
        </ImageBackground>
        </View>
      </View>
    )}
  };

  const renderMeals = () => {
    return (
      <ScrollView style={{flex: 1, backgroundColor: "plum"}}>
        <ImageBackground source={image} resizeMode="cover" style={{flex: 1}}>

        {/* Meals header component */}

        <View style={{flex: 0.15, paddingBottom:10}}>

          <View style={MealTrackingStyles.HeaderContainer}>
            {/* Column 1 */}
            <View style={MealTrackingStyles.HeaderStackedColumn}>
              <View style={MealTrackingStyles.HeaderBox}>
                <Text style={{textAlign: 'center', color: 'white', fontSize: 22, paddingBottom: 10}}>Meals</Text>
              </View>
              <View style={MealTrackingStyles.HeaderBox}>
                <Text style={{textAlign: 'center', color: 'white', fontSize: 24}}>{runningMealCount}</Text>
              </View>
            </View>

            {/* Separator 1 */}
            <View style={MealTrackingStyles.HeaderSeparator} />

            {/* Column 2 */}
            <View style={MealTrackingStyles.HeaderStackedColumn}>
              <View style={MealTrackingStyles.HeaderBox}>
                <Text style={{textAlign: 'center', color: 'white', fontSize: 22, paddingBottom: 10}}>Calories</Text>
              </View>
              <View style={MealTrackingStyles.HeaderBox}>
                <Text style={{textAlign: 'center', color: 'white', fontSize: 24}}>{runningCalories.toFixed(0)}</Text>
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
                <Text style={{textAlign: 'center', color: 'white', fontSize: 24}}>{runningProtein.toFixed(0)}</Text>
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
                <Text style={{textAlign: 'center', color: 'white', fontSize: 24}}>{runningWater}L</Text>
              </View>
            </View>
          </View>

          {/* Divider */}

          <View style={{paddingVertical: 10}}>
            <View style={{height: 1, backgroundColor: 'white'}} />
          </View>

          {removableIcons === true ? (
            <View style={{flex: 1, paddingHorizontal: 10, paddingTop: 10, justifyContent: 'center'}}>
              <Pressable onPress={() => setRemovableIcons(false)}>
                <Text style={{color: 'cyan', textAlign: 'right', fontSize: 20}}>Done <FontAwesome6 name="circle-check" size={20} color="cyan" /></Text>
              </Pressable>
            </View>
          ) : null }

        </View>

        {/* Meals section */}

        {["Breakfast", "Lunch", "Dinner", "Snack"].map(meal => (

          <Pressable onLongPress={() => setRemovableIcons(true)} key={meal} style={{flex: 0.16, flexDirection: 'column', width: '100%', paddingHorizontal: 10, paddingVertical: 6}}>
            <View style={{flex: 1, backgroundColor: 'black', borderWidth: 1, borderRadius: 4, borderColor: 'grey', paddingHorizontal: 10, paddingVertical: 4}}>
              <Text style={{textAlign: 'left', color: 'white', fontSize: 22}}><Ionicons name={"restaurant-outline"} size={20} color={iconColors[meal as keyof typeof iconColors]} textAlignVertical='bottom' /> {meal}</Text>
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
                  <View style={{flex:0.85, flexDirection:'column'}}>
                    <Text style={{ color: "white", fontSize: 18 }}>{mealName}</Text>
                  </View>
                </View>
              ))}
              <Pressable onPress={() => {
                const mealarg = meal;
                handleMealPress({mealarg, setActiveMeal, setOverlayVisible})}
                }>
                <Text style={{color: 'grey', fontSize: 20, paddingTop: 8}}> <Ionicons name="add-circle-outline" size={20} color="grey" textAlignVertical='center' /> Add food</Text>
              </Pressable>
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
        </ImageBackground>
      </ScrollView>
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
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }} 
        keyboardShouldPersistTaps="handled"
      >
      
      {renderPageContent()}
      {renderOverlay()}

      </ScrollView>
    </SafeAreaView>
  );
}
