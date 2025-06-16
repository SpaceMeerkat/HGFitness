import { MealTrackingStyles } from "@/components/HGMealStyles";
// import { updateActiveVersion } from "@/components/meals/mealUtils";
import Ionicons from '@expo/vector-icons/Ionicons';
import { ImageBackground, Pressable, Text, View } from "react-native";


type HandleInstructionsClickProps = {
    setInstructionsVisible: (visible: boolean) => void;
    setCurrentInstructions: (data: any) => void;
    setCurrentIngredients: (data: any) => void;
    instructions: any;
    ingredients: any;
  };

export function MealInstructions({ setInstructionsVisible, setCurrentInstructions, setCurrentIngredients, 
    instructions, ingredients }: HandleInstructionsClickProps) {

    const handleInstructionsClick = (openWindow: boolean) => {
        setInstructionsVisible(openWindow);
        setCurrentInstructions(null);
        setCurrentIngredients(null);
      }

    const image = require("@/assets/images/HGBackground.png");
      
    return(
        <View style={MealTrackingStyles.InstructionsOverlay}>
            <View style={MealTrackingStyles.TrackingOptionsContainer}>
                <ImageBackground source={image} resizeMode="cover" style={{flex: 1, overflow: "hidden"}}>
                    <View style={{flex: 1, padding: 12}}>
                    <Pressable
                        onPress={() => handleInstructionsClick(false)}
                        style={MealTrackingStyles.TrackingBackButton}
                    >
                        <Text style={{ color: "white", fontSize: 16 }}>Back</Text>
                    </Pressable>

                    {/* Ingredients title row */}
                    <View style={{flex: 0.1, flexDirection: 'column', paddingTop: 10, paddingBottom: 10}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 0.6}}>
                                <Text style={{color: 'white', fontSize: 24, fontWeight: 'bold', fontStyle: 'italic'}}>Ingredients:</Text>
                            </View>
                            <View style={{flex: 0.1}}/>
                            <View style={{flex: 0.4, justifyContent: 'center'}}>
                                <Text style={{color: 'white', textAlign: 'center'}}>Meal size</Text>
                            </View>
                            <Pressable 
                                // onPress={() => {
                                //     const mealIndex = index + 1;
                                //     const newVersion = (item.activeVersion + 1) % item.version.length;  
                                //     updateActiveVersion({activeMeal, mealIndex, newVersion, setMealProgramsState})
                                // }}
                                style={{flex: 0.15,backgroundColor: 'black', borderColor: 'grey', borderWidth: 1, borderRadius: 8, justifyContent: 'center'}}>
                                <Ionicons name="chevron-up" size={24} color="lime" style={{textAlign: 'center'}} />
                            </Pressable>
                        </View>
                    </View>

                    {/* Ingredients bullet list */}
                    <View style={{flex: 0.2, justifyContent: 'center'}}>
                        <View style={{flex: 1, flexDirection: 'column'}}>
                            {ingredients.split('/').map((item?: any, index?: any) => (
                                <View key={index} style={{flexDirection: 'row'}}>
                                    <View style={{flex: 0.05, flexDirection: 'row'}}>
                                        <Text style={{ color: 'white', fontSize: 12, textAlign: 'left', paddingVertical: 0 }} >&#8226;</Text>
                                    </View>

                                    <View style={{flex: 0.95, flexDirection: 'row'}}>
                                        <Text key={index} style={{ color: 'white', fontSize: 12, textAlign: 'left', paddingVertical: 0 }}>
                                            {item.trim()}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                    <View style={{flex: 0.1, flexDirection: 'row', paddingVertical: 20}}>
                        <Text style={{color: 'white', fontSize: 24, fontWeight: 'bold', fontStyle: 'italic'}}>How to prepare:</Text>
                    </View>
                    <View style={{flex: 0.5, justifyContent: 'center'}}>
                        {instructions.map((item?: any, index?: any) => (
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={{ flex: 0.17, flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    <Text key='step_${index}' style={{ color: 'lime', fontSize: 12, textAlignVertical: 'top', marginHorizontal: 5 }}>
                                        Step {index + 1}:
                                    </Text>
                                </View>
                                <View style={{ flex: 0.83, flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    <Text key={index} style={{ color: 'white', fontSize: 12, textAlignVertical: 'top', marginHorizontal: 5 }}>
                                        {item}
                                    </Text>
                                </View>
                            </View>
                            ))}
                    </View>
                    </View>
                    </ImageBackground>
                    </View>
        </View>
    );
}

