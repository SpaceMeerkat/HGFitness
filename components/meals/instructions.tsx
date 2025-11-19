import { MealTrackingStyles } from "@/components/HGMealStyles";
import { MealStyles } from "@/components/meals/MealStyles";
import { addMealItem, updateActiveVersion } from "@/components/meals/mealUtils";
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ImageBackground, Modal, Pressable, ScrollView, Text, View } from "react-native";

export type TrackingData = {
  datestamp: Date;
  runningMeals: any;
  runningCalories: any;
  runningProtein: any;
  runningWater: any; } & {
  breakfast: string[];
  lunch: string[];
  dinner: string[];
  snack: string[];
  water: string[];
  [key: string]: string[]
};

type HandleInstructionsClickProps = {
    setInstructionsVisible: (visible: boolean) => void;
    setMealProgramsState: (data: any) => void;
    setCurrentInstructions: (data: any) => void;
    setCurrentIngredients: (data: any) => void;
    setDictionary: (data: any) => void;
    storeTrackingAsync: (data: any) => Promise<void>;
    setTrackingData: (data: any) => void;
    setOverlayVisible: (setting: boolean) => void;
    dictionary: TrackingData;
    trackingData: any;
    instructionsVisible: boolean;
    mealProgramState: any;
    activeMeal: any;
    currentMealIndex: number;
    versionLength: number;
    instructions: any;
    ingredients: any;
  };

export function MealInstructions({ setInstructionsVisible, setMealProgramsState, setCurrentInstructions, setCurrentIngredients,
    setDictionary, storeTrackingAsync, setTrackingData, setOverlayVisible, dictionary, trackingData,
    instructionsVisible, mealProgramState, activeMeal, currentMealIndex, versionLength, instructions, ingredients }: HandleInstructionsClickProps) {

    const handleInstructionsClick = (openWindow: boolean) => {
        setInstructionsVisible(openWindow);
        setCurrentInstructions(null);
        setCurrentIngredients(null); 
      }

    const handleAddMealClick = (openWindow: boolean) => {
        setInstructionsVisible(openWindow);
        setCurrentInstructions(null);
        setCurrentIngredients(null); 
        addMealItem({key, dictionary, itemarg, trackingData, mealValue, calorieValue, proteinValue, waterValue, setDictionary, storeTrackingAsync, setTrackingData, setOverlayVisible})
      }

    const mealVersions = versionLength;
    const image = require("@/assets/images/HGBackground.png");
    const activeVersion = mealProgramState[activeMeal][currentMealIndex + 1].activeVersion
    const headerProtein = mealProgramState[activeMeal][currentMealIndex + 1].protein[activeVersion];
    const headerCalories = mealProgramState[activeMeal][currentMealIndex + 1].calories[activeVersion];
    const mealTitle = mealProgramState[activeMeal][currentMealIndex + 1].name;

    // addMeal args setup
    const key = activeMeal.toLowerCase();
    const itemarg = `${currentMealIndex + 1}_${activeVersion + 1}`
    const mealValue = 1;
    const calorieValue = headerCalories;
    const proteinValue = headerProtein;
    const waterValue = 0;
      
    return(
        <Modal visible={instructionsVisible} animationType="slide" transparent>
            <View style={MealStyles.modalBackground}>
            <Pressable
                onPress={() => handleInstructionsClick(false)}
                style={MealTrackingStyles.TrackingBackButton}>
                <Text style={{color: "white", fontSize: 16, fontWeight: 'bold', paddingLeft: 15}}>Back</Text>
            </Pressable>
            <View style={MealTrackingStyles.TrackingOptionsContainer}>
                <ImageBackground source={image} resizeMode="cover" style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1}}>
                    <View style={{paddingTop: 12, paddingHorizontal: 12, paddingBottom: 15 }}>

                    <View style={{flex: 0.25, flexDirection: 'column'}}>
                    {/* Prtein and calries bar */}
                    <Pressable 
                        onPress={() => {
                            const mealIndex = currentMealIndex + 1;
                            const newVersion = (mealProgramState[activeMeal][mealIndex].activeVersion + 1) % mealVersions; 
                            updateActiveVersion({activeMeal, mealIndex, newVersion, setMealProgramsState})
                            setCurrentInstructions(mealProgramState[activeMeal][mealIndex].how[newVersion].split('/')),
                            setCurrentIngredients(mealProgramState[activeMeal][mealIndex].ingredients[newVersion])
                        }}
                        style={({ pressed }) => ({
                        flex: 1,
                        flexDirection: 'column',
                        paddingTop: 10,
                        paddingBottom: 10,
                        borderWidth: 2,
                        borderRadius: 8,
                        borderColor: pressed ? 'limegreen' : 'grey',
                        backgroundColor: pressed ? 'green' : 'black',
                        overflow: 'hidden'
                        })}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 1}}/>
                            <View style={{flex: 2}}>
                                <View style={{flex: 1, flexDirection: 'column'}}>
                                    <View style={{flex: 0.7, justifyContent: 'flex-end'}}>
                                        <Text style={{color:'white', textAlign: 'center', fontSize: 20}}>Protein</Text>
                                    </View>
                                    <View style={{flex: 0.5}}>
                                        <Text style={{color:'white', textAlign: 'center'}}>
                                            {headerProtein} <MaterialCommunityIcons name="food-drumstick" size={14} color="brown" />
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{flex: 1.5}}>
                                <View style={{flex: 1, flexDirection: 'column'}}>
                                    <View style={{flex: 1, paddingHorizontal: 15, justifyContent: 'center'}}>
                                        <Entypo name="arrow-with-circle-up" size={30} color="lime" style={{textAlign: 'center'}} />
                                    </View>
                                </View>
                            </View>
                            <View style={{flex: 2}}>
                                <View style={{flex: 1, flexDirection: 'column'}}>
                                    <View style={{flex: 1, justifyContent: 'flex-end'}}>
                                        <Text style={{color:'white', textAlign: 'center', fontSize: 20}}>Calories</Text>
                                    </View>
                                    <View style={{flex: 0.5}}>
                                        <Text style={{color:'white', textAlign: 'center'}}>{headerCalories} <FontAwesome6 name="fire" size={14} color="orange" /></Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{flex: 1}}/>
                        </View>
                    </Pressable>
                    </View>

                    <View style={{flex: 0.1, flexDirection: 'column', paddingVertical: 10}}>
                        <Text style={{textAlign: 'center', textAlignVertical: 'center', fontSize: 18, color: 'grey'}}>{mealTitle}</Text>
                    </View>

                    {/* Add the addMeal button here */}
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', paddingBottom: 8}}>
                        <Pressable onPress={() => handleAddMealClick(false)} 
                        style={{flex: 0.4, flexDirection: 'column', borderColor:'lime', borderRadius: 4, borderWidth: 1, paddingVertical: 2}}>
                            <View style={{flex: 0.1, flexDirection: 'row', justifyContent: 'center', backgroundColor: 'black'}}>
                                <Text style={{color: "white", fontSize: 18}}> Add </Text>
                            </View>
                        </Pressable>
                    </View>


                    <View style={{flex: 0.3, flexDirection: 'column', backgroundColor: 'rgba(68, 68, 68, 0.5)', borderRadius: 8, borderWidth: 1, paddingVertical: 10}}>

                    {/* Ingredients title row */}
                    <View style={{flex: 0.1, flexDirection: 'column', paddingTop: 0, paddingBottom: 5}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 1}}>
                                <Text style={{color: 'white', fontSize: 24, fontWeight: 'bold', textAlign: 'center', textDecorationLine: 'underline'}}>What You Will Need</Text>
                            </View>
                        </View>
                    </View>

                    {/* Ingredients bullet list */}
                    <View style={{flex: 0.15, justifyContent: 'center'}}>
                        <View style={{flexDirection: 'column'}}>
                            {ingredients.split('/').map((item?: any, index?: any) => (
                                <View key={index} style={{flexDirection: 'row'}}>
                                    {/* <View style={{paddingHorizontal: 10}}>
                                        <Text style={{ color: 'white', fontSize: 14, textAlign: 'center', paddingVertical: 0 }} >&#8226;</Text>
                                    </View> */}

                                    <View style={{flex: 0.95, flexDirection: 'row', justifyContent: 'center'}}>
                                        <Text key={index} style={{ color: 'white', fontSize: 18, textAlign: 'center', paddingVertical: 4 }}>
                                            {item.trim()}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>

                    </View>

                    <View style={{ flex: 0.1, paddingTop: 16, paddingBottom: 5 }}>
                        <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
                            How to prepare
                        </Text>
                    </View>

                    <View style={{ flex: 0.4 }}>
                        {instructions.map((item: string, index: number) => (
                            <View key={index} style={{ paddingBottom: 2 }}>
                                {/* Step Label Row */}
                                <View style={{ alignItems: 'center', paddingTop: 10, paddingBottom: 5 }}>
                                    <Text style={{ color: 'lime', fontSize: 14, fontWeight: 'bold', alignContent: 'center' }}>
                                        <MaterialCommunityIcons name={`numeric-${index + 1}-circle` as any} size={20} color="lime" />
                                    </Text>
                                </View>

                                {/* Instruction Text Row */}
                                <View style={{ paddingHorizontal: 60, paddingTop: 4 }}>
                                    <Text style={{ color: 'white', fontSize: 14, textAlign: 'center' }}>
                                    {item}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
            </ImageBackground>
        </View>
        </View>
    </Modal>
    );
}

