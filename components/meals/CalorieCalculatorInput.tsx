import { useAppContext } from "@/components/appContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from "react";
import { ImageBackground, Modal, Platform, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { calculateCalories } from "./CalorieCalculatorFunc";
import { CalcStyles } from "./CalorieCalculatorStyles";

type Gender = "male" | "female";
type ActivityLevel = "mild" | "medium" | "hard";
type Goal = "lose weight" | "maintain" | "gain";

type CalorieCalculatorModalProps = {
  visible: boolean;
  onClose: () => void;
};

const CalorieCalculatorModal: React.FC<CalorieCalculatorModalProps> = ({
  visible,
  onClose,
}) => {

  const handleClose = () => {
      onClose();
  };

  const { profile, setProfile } = useAppContext();

  // Defaults requested: male, 180cm, 70kg, maintain, medium
  const [gender, setGender] = useState<Gender>("male");
  const [age, setAge] = useState<string>("28"); // not specified, leave blank
  const [height, setHeight] = useState<string>("180"); // cm
  const [weight, setWeight] = useState<string>("70");  // kg
  const [activity, setActivity] = useState<ActivityLevel>("medium");
  const [goal, setGoal] = useState<Goal>("maintain");
  const [buttonPressed, setButtonPressed] = useState(false);
  const [userCalorieCount, setUserCalorieCount] = useState(0);
  const [userProteinCount, setUserProteinCount] = useState(0);
  const [userWaterCount, setUserWaterCount] = useState(0);
  const [userMealCount, setUserMealCount] = useState(0);
  const [displayCalorieCount, setDisplayCalorieCount] = useState(false);

  const getUserCalories = () => {
    const [protein, calories, water] = calculateCalories(gender,  parseFloat(age), parseFloat(height), parseFloat(weight), activity, goal)
    setUserCalorieCount(calories);
    setUserProteinCount(protein);
    setUserMealCount(4);
    setUserWaterCount(water);
  };

  const numberPad =
    Platform.OS === "ios" ? ("decimal-pad" as const) : ("numeric" as const);

  const renderContent = () => {
    if (displayCalorieCount === true) {
      return renderCalculationResults();
    } else {
      return renderCalculator();
    };
  };

  const applyCalorieTracking = async () => {
    const updatedProfile = {
      ...profile,
      calorieCalculator: {
        ...profile.calorieCalculator,
        active: true,
        meals: userMealCount,
        calories: userCalorieCount,
        protein: userProteinCount,
        water: userWaterCount
      },
    };
    setProfile(updatedProfile); // Update context
    // Update AsyncStorage
    await AsyncStorage.setItem('profile', JSON.stringify(updatedProfile));
    setDisplayCalorieCount(false);
    onClose();
  }

  const renderCalculationResults = () => {
    const backgroundImageSource = require("@/assets/images/caloriecalculator.jpg")

    return (
      <>
        <ImageBackground source={backgroundImageSource} style={CalcStyles.modalContent}>

          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          >
            <View style={CalcStyles.inputBlock}>
              <View style={CalcStyles.inputTitle}>
                <Text style={[CalcStyles.inputTitleText, {paddingBottom: 12}]}>Your nutrition targets:</Text>
              </View>
              <View style={CalcStyles.inputTitle}>
                <Text style={CalcStyles.inputTitleText}>{userMealCount} meals / day</Text>
              </View>
              <View style={CalcStyles.inputTitle}>
                <Text style={CalcStyles.inputTitleText}>{userCalorieCount} calories / day</Text>
              </View>
              <View style={CalcStyles.inputTitle}>
                <Text style={CalcStyles.inputTitleText}>{userProteinCount} grams / day</Text>
              </View>
              <View style={CalcStyles.inputTitle}>
                <Text style={CalcStyles.inputTitleText}>{userWaterCount} litres / day</Text>
              </View>
            </View>
            {/* Use recommendations */}
            <Pressable 
              onPressIn={()=>{setButtonPressed(true), applyCalorieTracking()}} 
              onPressOut={()=>{setButtonPressed(false)}}
              style={[CalcStyles.recalculateButton, {borderColor: buttonPressed? 'lime' : 'grey'}]}>
              <Text style={[CalcStyles.calculateButtonText]}>Set Targets</Text>
            </Pressable>
            {/* Recalculate */}
            <Pressable 
              onPressIn={()=>setButtonPressed(true)} 
              onPressOut={()=>{setButtonPressed(false), setDisplayCalorieCount(false)}}
              style={[CalcStyles.recalculateButton, {borderColor: buttonPressed? 'lime' : 'grey'}]}>
              <Text style={[CalcStyles.calculateButtonText]}>Recalculate</Text>
            </Pressable>
          </ScrollView>
        </ImageBackground>
        
        {/* Close Button */}
        <Pressable 
          onPressIn={()=>{handleClose(); setDisplayCalorieCount(false)}} 
          onPressOut={()=>setButtonPressed(false)}
          style={CalcStyles.closeButton}>
            <Text style={CalcStyles.closeText}>Close</Text>
        </Pressable>
      </>
    );
  }

  const renderCalculator = () => {
    const backgroundImageSource = require("@/assets/images/caloriecalculator.jpg")

    const Dot = ({ selected }: { selected: boolean }) => (
      <View
        style={{
          width: 14,
          height: 14,
          borderRadius: 7,
          borderWidth: 1,
          borderColor: selected ? "lime" : "grey",
          backgroundColor: selected ? "lime" : "grey",
          alignSelf: "center"
        }}
      />
    );
    return (
      <>
      <ImageBackground source={backgroundImageSource} style={CalcStyles.modalContent}>

        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        >

        {/* Gender (toggle dots) */}
        <View style={CalcStyles.inputBlock}>
          <View style={CalcStyles.inputTitle}>
            <Text style={CalcStyles.inputTitleText}>Gender</Text>
          </View>
          <View style={CalcStyles.tickInputRow}>
            <Pressable onPress={() => setGender("male")} style={CalcStyles.tickOption}>
              <Dot selected={gender === "male"} />
              <Text style={CalcStyles.textTick}>Male</Text>
            </Pressable>

            <Pressable onPress={() => setGender("female")} style={CalcStyles.tickOption}>
              <Dot selected={gender === "female"} />
              <Text style={CalcStyles.textTick}>Female</Text>
            </Pressable>
          </View>
        </View>

        {/* Age */}
        <View style={CalcStyles.inputBlock}>
          <View style={CalcStyles.inputTitle}>
            <Text style={CalcStyles.inputTitleText}>Age</Text>
          </View>
          <View style={CalcStyles.textInputRow}>
            <TextInput
              style={CalcStyles.textInput}
              keyboardType={numberPad}
              value={age}
              onChangeText={(t: string) => setAge(t)}
              placeholder="e.g. 28"
              placeholderTextColor="lightgray"
            />
          </View>
        </View>

        {/* Height */}
        <View style={CalcStyles.inputBlock}>
          <View style={CalcStyles.inputTitle}>
            <Text style={CalcStyles.inputTitleText}>Height (cm)</Text>
          </View>
          <View style={CalcStyles.textInputRow}>
            <TextInput
              style={CalcStyles.textInput}
              keyboardType={numberPad}
              value={height}
              onChangeText={(t: string) => setHeight(t)}
              placeholder="e.g. 180"
              placeholderTextColor="lightgray"
            />
          </View>
        </View>

        {/* Weight */}
        <View style={CalcStyles.inputBlock}>
          <View style={CalcStyles.inputTitle}>
            <Text style={CalcStyles.inputTitleText}>Weight (kg)</Text>
          </View>
          <View style={CalcStyles.textInputRow}>
            <TextInput
              style={CalcStyles.textInput}
              keyboardType={numberPad}
              value={weight}
              onChangeText={(t: string) => setWeight(t)}
              placeholder="e.g. 70"
              placeholderTextColor="lightgray"
            />
          </View>
        </View>

        {/* Activity (toggle dots) */}
        <View style={CalcStyles.inputBlock}>
          <View style={CalcStyles.inputTitle}>
            <Text style={CalcStyles.inputTitleText}>Weekly Activity Level</Text>
          </View>
          <View style={CalcStyles.tickInputRow}>
            <Pressable onPress={() => setActivity("mild")} style={CalcStyles.tickOption}>
              <Dot selected={activity === "mild"} />
              <Text style={CalcStyles.textTick}>Mild</Text>
            </Pressable>

            <Pressable onPress={() => setActivity("medium")} style={CalcStyles.tickOption}>
              <Dot selected={activity === "medium"} />
              <Text style={CalcStyles.textTick}>Medium</Text>
            </Pressable>

            <Pressable onPress={() => setActivity("hard")} style={CalcStyles.tickOption}>
              <Dot selected={activity === "hard"} />
              <Text style={CalcStyles.textTick}>Hard</Text>
            </Pressable>
          </View>
        </View>

        {/* Goal (toggle dots) */}
        <View style={CalcStyles.inputBlock}>
          <View style={CalcStyles.inputTitle}>
            <Text style={CalcStyles.inputTitleText}>Exercise Goal</Text>
          </View>
          <View style={CalcStyles.tickInputRow}>
            <Pressable onPress={() => setGoal("lose weight")} style={CalcStyles.tickOption}>
              <Dot selected={goal === "lose weight"} />
              <Text style={CalcStyles.textTick}>Lose weight</Text>
            </Pressable>

            <Pressable onPress={() => setGoal("maintain")} style={CalcStyles.tickOption}>
              <Dot selected={goal === "maintain"} />
              <Text style={CalcStyles.textTick}>Maintain</Text>
            </Pressable>

            <Pressable onPress={() => setGoal("gain")} style={CalcStyles.tickOption}>
              <Dot selected={goal === "gain"} />
              <Text style={CalcStyles.textTick}>Gain</Text>
            </Pressable>
          </View>
        </View>

        
        <View style={{flexDirection: 'row', justifyContent: 'center', paddingVertical: 8}}>
          <View style={[CalcStyles.inputBlock, {maxWidth: '50%'}]}>
            <Pressable 
            onPressIn={()=>{setButtonPressed(true), getUserCalories()}}
            onPressOut={()=>{setButtonPressed(false), setDisplayCalorieCount(true)}} 
            style={[CalcStyles.calculateButton, {borderColor: buttonPressed? 'lime' : 'grey'}]}>
              <Text style={[CalcStyles.calculateButtonText]}>Submit</Text>
            </Pressable>
          </View>
        </View>

      </ScrollView>

      </ImageBackground>
      {/* Close Button */}
      <Pressable onPress={() => handleClose()} style={CalcStyles.closeButton}>
          <Text style={CalcStyles.closeText}>Close</Text>
      </Pressable>
      </>
    );
  };
    
  return (
      <Modal visible={visible} animationType="slide" transparent>
        <View style={CalcStyles.modalBackground}>
          {renderContent()}
        </View>
      </Modal>
    );
  }

export default CalorieCalculatorModal;
