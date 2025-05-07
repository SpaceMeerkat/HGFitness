import { View, Text, Pressable, TextInput, } from "react-native";
import { useState } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { MealTrackingStyles } from "@/components/HGMealStyles";

type HandleWaterClickProps = {
    handleWaterClick: (amount: any) => void;
  };

export function Water250({ handleWaterClick }: HandleWaterClickProps) {
    const amount = 0.25;
    return(
        <View key={'250mlContainer'} style={MealTrackingStyles.WaterOptionOuterContainer}>
            <View style={MealTrackingStyles.WaterOptionLayoutContainer}>
            <View style={{flex: 1, flexDirection: 'row'}}>
                <Pressable
                key={'250mlButton'}
                onPress={() => handleWaterClick(amount)}
                style={MealTrackingStyles.AddWaterButton}
                >
                <Text style={{ color: "white", fontSize: 16, justifyContent: 'center' }}>
                <Ionicons name="add-circle-outline" size={20} color="lime" /> Add</Text>
                </Pressable>
                <View style={MealTrackingStyles.WaterAmountBlock}>
                <Text style={MealTrackingStyles.WaterAmountText}>0.25<Text style={{fontSize: 15}}> L</Text></Text>
                </View>
                <View style={MealTrackingStyles.WaterIconsBlock}>
                <View style={MealTrackingStyles.WaterIconsRow}>
                    <View style={MealTrackingStyles.WaterIconsIconContainer}> 
                    <Text style={MealTrackingStyles.WaterIconsText}> <FontAwesome6 name="bottle-water" size={20} color="cyan"/> </Text>
                    </View>
                    <View style={MealTrackingStyles.WaterIconsIconContainer}> 
                    <Text style={MealTrackingStyles.WaterIconsText}> <FontAwesome6 name="bottle-water" size={20} color="grey"/> </Text>
                    </View>
                </View>
                <View style={MealTrackingStyles.WaterIconsRow}>
                    <View style={MealTrackingStyles.WaterIconsIconContainer}> 
                    <Text style={MealTrackingStyles.WaterIconsText}> <FontAwesome6 name="bottle-water" size={20} color="grey"/> </Text>
                    </View>
                    <View style={MealTrackingStyles.WaterIconsIconContainer}> 
                    <Text style={MealTrackingStyles.WaterIconsText}> <FontAwesome6 name="bottle-water" size={20} color="grey"/> </Text>
                    </View>
                </View>
                </View>
            </View>
            </View>
        </View>
    );
}

export function Water500({ handleWaterClick }: HandleWaterClickProps) {
    const amount = 0.5;
    return(
        <View key={'500mlContainer'} style={MealTrackingStyles.WaterOptionOuterContainer}>
            <View style={MealTrackingStyles.WaterOptionLayoutContainer}>
            <View style={{flex: 1, flexDirection: 'row'}}>
                <Pressable
                key={'500mlButton'}
                onPress={() => handleWaterClick(amount)}
                style={MealTrackingStyles.AddWaterButton}
                >
                <Text style={{ color: "white", fontSize: 16, justifyContent: 'center' }}>
                <Ionicons name="add-circle-outline" size={20} color="lime" /> Add</Text>
                </Pressable>
                <View style={MealTrackingStyles.WaterAmountBlock}>
                <Text style={MealTrackingStyles.WaterAmountText}>0.5<Text style={{fontSize: 15}}> L</Text></Text>
                </View>
                <View style={MealTrackingStyles.WaterIconsBlock}>
                <View style={MealTrackingStyles.WaterIconsRow}>
                    <View style={MealTrackingStyles.WaterIconsIconContainer}> 
                    <Text style={MealTrackingStyles.WaterIconsText}> <FontAwesome6 name="bottle-water" size={20} color="cyan"/> </Text>
                    </View>
                    <View style={MealTrackingStyles.WaterIconsIconContainer}> 
                    <Text style={MealTrackingStyles.WaterIconsText}> <FontAwesome6 name="bottle-water" size={20} color="cyan"/> </Text>
                    </View>
                </View>
                <View style={MealTrackingStyles.WaterIconsRow}>
                    <View style={MealTrackingStyles.WaterIconsIconContainer}> 
                    <Text style={MealTrackingStyles.WaterIconsText}> <FontAwesome6 name="bottle-water" size={20} color="grey"/> </Text>
                    </View>
                    <View style={MealTrackingStyles.WaterIconsIconContainer}> 
                    <Text style={MealTrackingStyles.WaterIconsText}> <FontAwesome6 name="bottle-water" size={20} color="grey"/> </Text>
                    </View>
                </View>
                </View>
            </View>
            </View>
        </View>
    );
}

export function Water1000({ handleWaterClick }: HandleWaterClickProps) {
    const amount = 1;
    return(
        <View key={'1000mlContainer'} style={MealTrackingStyles.WaterOptionOuterContainer}>
            <View style={MealTrackingStyles.WaterOptionLayoutContainer}>
            <View style={{flex: 1, flexDirection: 'row'}}>
                <Pressable
                key={'1000mlButton'}
                onPress={() => handleWaterClick(amount)}
                style={MealTrackingStyles.AddWaterButton}
                >
                <Text style={{ color: "white", fontSize: 16, justifyContent: 'center' }}>
                <Ionicons name="add-circle-outline" size={20} color="lime" /> Add</Text>
                </Pressable>
                <View style={MealTrackingStyles.WaterAmountBlock}>
                <Text style={MealTrackingStyles.WaterAmountText}>1<Text style={{fontSize: 15}}> L</Text></Text>
                </View>
                <View style={MealTrackingStyles.WaterIconsBlock}>
                <View style={MealTrackingStyles.WaterIconsRow}>
                    <View style={MealTrackingStyles.WaterIconsIconContainer}> 
                    <Text style={MealTrackingStyles.WaterIconsText}> <FontAwesome6 name="bottle-water" size={20} color="cyan"/> </Text>
                    </View>
                    <View style={MealTrackingStyles.WaterIconsIconContainer}> 
                    <Text style={MealTrackingStyles.WaterIconsText}> <FontAwesome6 name="bottle-water" size={20} color="cyan"/> </Text>
                    </View>
                </View>
                <View style={MealTrackingStyles.WaterIconsRow}>
                    <View style={MealTrackingStyles.WaterIconsIconContainer}> 
                    <Text style={MealTrackingStyles.WaterIconsText}> <FontAwesome6 name="bottle-water" size={20} color="cyan"/> </Text>
                    </View>
                    <View style={MealTrackingStyles.WaterIconsIconContainer}> 
                    <Text style={MealTrackingStyles.WaterIconsText}> <FontAwesome6 name="bottle-water" size={20} color="cyan"/> </Text>
                    </View>
                </View>
                </View>
            </View>
            </View>
        </View>
    );
}

export function WaterCustom({ handleWaterClick }: HandleWaterClickProps) {
    const [amount, setAmount] = useState<number | null>(null);

    const handlePress = () => {
        if (amount !== null) {
            handleWaterClick(amount);
        }
    };
    return(
        <View key={'CustomContainer'} style={MealTrackingStyles.WaterOptionOuterContainer}>
            <View style={MealTrackingStyles.WaterOptionLayoutContainer}>
            <View style={{flex: 1, flexDirection: 'row'}}>
                <Pressable
                key={'CustomButton'}
                onPress={handlePress}
                style={MealTrackingStyles.AddWaterButton}
                >
                <Text style={{ color: "white", fontSize: 16, justifyContent: 'center' }}>
                <Ionicons name="add-circle-outline" size={20} color="lime" /> Add</Text>
                </Pressable>
                <View style={MealTrackingStyles.WaterCustomBlock}>
                    <TextInput
                        keyboardType="number-pad"
                        cursorColor={"black"} 
                        textAlign={'center'}
                        textAlignVertical={'center'}
                        style={{ fontSize: 18, flex: 1, color: "grey", backgroundColor: 'white', maxHeight: 50,
                            borderRadius: 4, borderColor: 'black', borderWidth: 1
                        }}
                        placeholder={"Custom value"}
                        onChangeText={(text) =>
                            setAmount(text ? parseFloat(text) : null)
                        }
                    />
                </View>
                <View style={MealTrackingStyles.WaterCustomUnitsBlock}>
                    <Text style={{color: 'white'}}> L</Text>
                </View>
            </View>
            </View>
        </View>
    );
}