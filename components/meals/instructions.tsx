import { MealTrackingStyles } from "@/components/HGMealStyles";
import { MealStyles } from "@/components/meals/MealStyles";
import { addMealItem, updateActiveVersion } from "@/components/meals/mealUtils";
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground, Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";

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
            <TouchableOpacity
                onPress={() => handleInstructionsClick(false)}
                style={MealTrackingStyles.TrackingBackButton}>
                <Text style={{color: "white", fontSize: 16, fontWeight: 'bold', paddingLeft: 15}}>Back</Text>
            </TouchableOpacity>
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

                    {/* Version size indicator - centered apple icons */}
                    <View style={{flexDirection: 'row', justifyContent: 'center', paddingBottom: 8}}>
                        {Array.from({ length: activeVersion + 1 }).map((_, i) => (
                            <MaterialCommunityIcons
                                key={`apple_${i}`}
                                name="food-apple"
                                size={12}
                                color="white"
                                style={{ position: 'absolute', top: 0, left: '50%' as any, marginLeft: -((activeVersion + 1) * 12.5) / 2 + i * 12.5, zIndex: i }}
                            />
                        ))}
                        <View style={{ height: 18, width: (activeVersion + 1) * 18.5 }} />
                    </View>

                    {/* Add the addMeal button here */}
                    <View style={{flexDirection: 'row', justifyContent: 'center', paddingBottom: 20}}>
                        <TouchableOpacity onPress={() => handleAddMealClick(false)} activeOpacity={0.8}>
                            <LinearGradient
                                colors={['#1a1a1a', '#000000']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 28, borderRadius: 100, borderWidth: 1.5, borderColor: 'lime'}}
                            >
                                <Ionicons name="add-circle-outline" size={18} color="lime" />
                                <Text style={{color: 'white', fontSize: 16, fontWeight: '600', marginLeft: 6}}>Add</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    {/* Ingredients card */}
                    <LinearGradient
                        colors={['rgba(255,255,255,0.08)', '#131313', 'rgba(255,255,255,0.02)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{borderRadius: 16, borderWidth: 1, borderColor: '#333', paddingVertical: 16, paddingHorizontal: 16}}
                    >
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10}}>
                            <MaterialCommunityIcons name="basket-outline" size={18} color="lime" />
                            <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold', marginLeft: 6, letterSpacing: 0.5}}>WHAT YOU WILL NEED</Text>
                        </View>

                        {ingredients.split('/').map((item?: any, index?: any) => (
                            <View key={index} style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 7, borderTopWidth: index === 0 ? 0 : 1, borderTopColor: 'rgba(255,255,255,0.08)'}}>
                                <View style={{width: 6, height: 6, borderRadius: 3, backgroundColor: 'lime', marginRight: 10}} />
                                <Text style={{color: '#ddd', fontSize: 15, flex: 1}}>{item.trim()}</Text>
                            </View>
                        ))}
                    </LinearGradient>

                    {/* How to prepare header */}
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 24, paddingBottom: 16}}>
                        <MaterialCommunityIcons name="chef-hat" size={20} color="lime" />
                        <Text style={{color: 'white', fontSize: 17, fontWeight: 'bold', marginLeft: 8, letterSpacing: 0.5}}>HOW TO PREPARE</Text>
                    </View>

                    {/* Instruction steps timeline */}
                    <View>
                        {instructions.map((item: string, index: number) => (
                            <View key={index} style={{flexDirection: 'row', paddingBottom: index === instructions.length - 1 ? 0 : 16}}>
                                <View style={{alignItems: 'center', width: 30}}>
                                    <View style={{width: 26, height: 26, borderRadius: 13, backgroundColor: '#111', borderWidth: 1.5, borderColor: 'lime', justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={{color: 'lime', fontSize: 12, fontWeight: 'bold'}}>{index + 1}</Text>
                                    </View>
                                    {index !== instructions.length - 1 && (
                                        <View style={{flex: 1, width: 1, backgroundColor: 'rgba(255,255,255,0.15)', marginTop: 4}} />
                                    )}
                                </View>
                                <View style={{flex: 1, paddingLeft: 12, paddingTop: 3}}>
                                    <Text style={{color: 'white', fontSize: 14, lineHeight: 20}}>
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

