import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import React from "react";
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CalcStyles } from "./CalorieCalculatorStyles";

type StatRowProps = {
    icon: any,
    label: string,
    value: number,
    target: any
};

const StatRow: React.FC<StatRowProps> = ({ icon, label, value, target }) => (
  <View style={[styles.container, {opacity: value >= target ? 0.5 : 1}]}>
    <View style={styles.leftColumn}>
      <View style={styles.iconContainerOuter}>
        <View style={styles.iconCircle}>
          <Text>{icon}</Text>
        </View>

        <View style={styles.iconLabel}>
          <Text style={styles.iconText}>{label}</Text>
        </View>
      </View>
    </View>

    <View style={styles.valueColumn}>
      <Text style={[styles.valueText, {color: value >= target ? 'lime' : 'white'}]}>{value}</Text>
    </View>

    <View style={styles.divider} />

    <View style={styles.valueColumn}>
      <Text style={[styles.valueText, {color: value >= target ? 'lime' : 'white'}]}>{target}</Text>
      {React.isValidElement(target) && target.type === FontAwesome? (<Text style={[styles.valueText, {fontSize: 12}]}>premium</Text>) : (null)}
    </View>
  </View>
);


type Gender = "male" | "female";
type ActivityLevel = "sedentry" | "moderate" | "active" | "very_active" | "athlete";
type Goal = "lose weight" | "maintain" | "gain";

type TargetsModalProps = {
  visible: boolean,
  targetState: any,
  streak: number,
  meals: number,
  mealsTarget: any,
  calories: number,
  caloriesTarget: any,
  protein: number,
  proteinTarget: any,
  water: number,
  waterTarget: any,

  onClose: () => void;
};

const TargetsModal: React.FC<TargetsModalProps> = ({
  visible,
  targetState, 
  streak,
  meals,
  mealsTarget,
  calories,
  caloriesTarget,
  protein,
  proteinTarget,
  water,
  waterTarget,
  onClose,
}) => {

  const handleClose = () => {
      onClose();
  };

  const renderContent = () => { 

    return (
      <>
      <View style={[CalcStyles.modalContent]}>

        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        >

            <View style={{flex:0.2, justifyContent: 'center', backgroundColor: 'black', alignItems: 'center', paddingVertical: 20}}>
                <View style={{flexDirection: 'row', justifyContent: 'center', backgroundColor: 'black',
                  borderColor: 'white', borderWidth: 2, borderRadius: 200, height: 150, width: 150 
                }}>
                    <FontAwesome name="bolt" size={70} color="orange" style= {{textAlign: 'center', textAlignVertical: 'center'}}/>
                    <Text style={{color: 'orange', fontSize: 24, textAlignVertical: 'center', paddingTop: 8}}>{streak}</Text>
                </View>
            </View>

            <View style={{flex:0.8, justifyContent: 'center', backgroundColor: 'black', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 16}}>
                
                <View style={{flex: 0.05, flexDirection: 'row', justifyContent:'center'}}>
                    <View style={{flex:1, flexDirection: 'column'}}/>
                    <View style={{flex:1, flexDirection: 'column'}}>
                        <Text style={{color: 'white', textAlign: 'center'}}>Current</Text>
                    </View>
                    <View style={{flex:1, flexDirection: 'column'}}>
                        <Text style={{color: 'white', textAlign: 'center'}}>Target</Text>
                    </View>
                </View>

                <StatRow
                icon={<MaterialCommunityIcons name="food-apple" size={20} color="lime" />}
                label="Meals"
                value={meals}
                target={targetState !== "free"? 
                  (targetState !== "undefined"? 
                  mealsTarget: <Text style={{ color: "white", fontSize: 12 }}>Set Calorie Calculator</Text>):(<FontAwesome name="lock" size={24} color="white" />)}
                />

                <StatRow
                icon={<FontAwesome6 name="fire" size={14} color="orange" />}
                label="Calories"
                value={calories}
                target={targetState !== "free"? 
                  (targetState !== "undefined"? 
                  caloriesTarget: <Text style={{ color: "white", fontSize: 12 }}>Set Calorie Calculator</Text>):(<FontAwesome name="lock" size={24} color="white" />)}
                />

                <StatRow
                icon={<MaterialCommunityIcons name="food-drumstick" size={14} color="brown" />}
                label="Protein"
                value={protein}
                target={targetState !== "free"? 
                  (targetState !== "undefined"? 
                  proteinTarget: <Text style={{ color: "white", fontSize: 12 }}>Set Calorie Calculator</Text>):(<FontAwesome name="lock" size={24} color="white" />)}
                />

                <StatRow
                icon={<FontAwesome6 name="bottle-water" size={20} color="cyan" />}
                label="Water"
                value={water}
                target={targetState !== "free"? 
                  (targetState !== "undefined"? 
                  waterTarget: <Text style={{ color: "white", fontSize: 12 }}>Set Calorie Calculator</Text>):(<FontAwesome name="lock" size={24} color="white" />)}
                />

                
            </View>

        </ScrollView>

      </View>
      {/* Close Button */}
      <TouchableOpacity onPress={() => handleClose()} style={CalcStyles.closeButton}>
          <Text style={CalcStyles.closeText}>Close</Text>
      </TouchableOpacity>
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

export default TargetsModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "grey",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 8,
  },

  leftColumn: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  iconContainerOuter: {
    flex: 0.3,
    flexDirection: "column",
    justifyContent: "center",
  },

  iconCircle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 200,
    height: 32,
    width: 32,
  },

  iconLabel: {
    flex: 0.7,
    flexDirection: "row",
    justifyContent: "center",
  },

  iconText: {
    color: "white",
    fontSize: 10,
    textAlign: "center",
  },

  valueColumn: {
    flex: 1,
    flexDirection: "column",
  },

  valueText: {
    textAlign: "center",
    fontSize: 32,
    color: "white",
  },

  divider: {
    flex: 0.05,
    flexDirection: "column",
    height: 50,
    maxWidth: 2,
    backgroundColor: "black",
    paddingVertical: 0,
    borderRadius: 100,
  },
});

