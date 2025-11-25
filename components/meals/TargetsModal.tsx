import { FontAwesome } from "@expo/vector-icons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import React from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { CalcStyles } from "./CalorieCalculatorStyles";

type Gender = "male" | "female";
type ActivityLevel = "sedentry" | "moderate" | "active" | "very_active" | "athlete";
type Goal = "lose weight" | "maintain" | "gain";

type TargetsModalProps = {
  visible: boolean;
  streak: number,
  meals: number,
  mealsTarget: number | undefined,
  calories: number,
  caloriesTarget: number | undefined,
  protein: number,
  proteinTarget: number | undefined,
  water: number,
  waterTarget: number | undefined,

  onClose: () => void;
};

const TargetsModal: React.FC<TargetsModalProps> = ({
  visible,
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

  console.log(streak,
  meals,
  mealsTarget,
  calories,
  caloriesTarget,
  protein,
  proteinTarget,
  water,
  waterTarget,);


  const renderContent = () => {

    return (
      <>
      <View style={[CalcStyles.modalContent]}>

        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        >

            <View style={{flex:0.2, justifyContent: 'center', backgroundColor: 'black', alignItems: 'center'}}>
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

                <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', backgroundColor: 'grey', alignItems: 'center',
                    borderRadius: 8, marginBottom: 8
                }}>
                    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{flex: 0.3, flexDirection: 'column', justifyContent: 'center'}}>
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black',
                                borderColor: 'white', borderWidth: 2, borderRadius: 200, height: 32, width: 32 
                            }}>
                                <Text style={{textAlign: 'center'}}><MaterialCommunityIcons name="food-apple" size={20} color="lime" /></Text>
                            </View>
                            <View style={{flex: 0.7, flexDirection: 'row', justifyContent: 'center'}}>
                            <Text style={{color: 'white', fontSize: 10, textAlign: 'center'}}>Meals</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'column'}}>
                        <Text style={{textAlign: 'center', fontSize: 32, color: 'white'}}>{calories}</Text>
                    </View>
                    <View style={{flex: 0.05, flexDirection: 'column', height:50, maxWidth: 2, backgroundColor: 'black', paddingVertical: 0,
                        borderRadius: 100
                    }}/>
                    <View style={{flex: 1, flexDirection: 'column'}}>
                        <Text style={{textAlign: 'center', fontSize: 32, color: 'white'}}>{calories}</Text>
                    </View>
                </View>

                <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', backgroundColor: 'grey', alignItems: 'center',
                    borderRadius: 8, marginBottom: 8
                }}>
                    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{flex: 0.3, flexDirection: 'column', justifyContent: 'center'}}>
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black',
                                borderColor: 'white', borderWidth: 2, borderRadius: 200, height: 32, width: 32 
                            }}>
                                <Text style={{textAlign: 'center'}}><MaterialCommunityIcons name="food-apple" size={20} color="lime" /></Text>
                            </View>
                            <View style={{flex: 0.7, flexDirection: 'row', justifyContent: 'center'}}>
                            <Text style={{color: 'white', fontSize: 10, textAlign: 'center'}}>Meals</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'column'}}>
                        <Text style={{textAlign: 'center', fontSize: 32, color: 'white'}}>{meals}</Text>
                    </View>
                    <View style={{flex: 0.05, flexDirection: 'column', height:50, maxWidth: 2, backgroundColor: 'black', paddingVertical: 0,
                        borderRadius: 100
                    }}/>
                    <View style={{flex: 1, flexDirection: 'column'}}>
                        <Text style={{textAlign: 'center', fontSize: 32, color: 'white'}}>{mealsTarget}</Text>
                    </View>
                </View>

                <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', backgroundColor: 'grey', alignItems: 'center',
                    borderRadius: 8, marginBottom: 8
                }}>
                    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{flex: 0.3, flexDirection: 'column', justifyContent: 'center'}}>
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black',
                                borderColor: 'white', borderWidth: 2, borderRadius: 200, height: 32, width: 32 
                            }}>
                                <Text style={{textAlign: 'center'}}><MaterialCommunityIcons name="food-apple" size={20} color="lime" /></Text>
                            </View>
                            <View style={{flex: 0.7, flexDirection: 'row', justifyContent: 'center'}}>
                            <Text style={{color: 'white', fontSize: 10, textAlign: 'center'}}>Meals</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'column'}}>
                        <Text style={{textAlign: 'center', fontSize: 32, color: 'white'}}>{meals}</Text>
                    </View>
                    <View style={{flex: 0.05, flexDirection: 'column', height:50, maxWidth: 2, backgroundColor: 'black', paddingVertical: 0,
                        borderRadius: 100
                    }}/>
                    <View style={{flex: 1, flexDirection: 'column'}}>
                        <Text style={{textAlign: 'center', fontSize: 32, color: 'white'}}>{mealsTarget}</Text>
                    </View>
                </View>

                <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', backgroundColor: 'grey', alignItems: 'center',
                    borderRadius: 8, marginBottom: 8
                }}>
                    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{flex: 0.3, flexDirection: 'column', justifyContent: 'center'}}>
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black',
                                borderColor: 'white', borderWidth: 2, borderRadius: 200, height: 32, width: 32 
                            }}>
                                <Text style={{textAlign: 'center'}}><MaterialCommunityIcons name="food-apple" size={20} color="lime" /></Text>
                            </View>
                            <View style={{flex: 0.7, flexDirection: 'row', justifyContent: 'center'}}>
                            <Text style={{color: 'white', fontSize: 10, textAlign: 'center'}}>Meals</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'column'}}>
                        <Text style={{textAlign: 'center', fontSize: 32, color: 'white'}}>{meals}</Text>
                    </View>
                    <View style={{flex: 0.05, flexDirection: 'column', height:50, maxWidth: 2, backgroundColor: 'black', paddingVertical: 0,
                        borderRadius: 100
                    }}/>
                    <View style={{flex: 1, flexDirection: 'column'}}>
                        <Text style={{textAlign: 'center', fontSize: 32, color: 'white'}}>{mealsTarget}</Text>
                    </View>
                </View>
                
            </View>

        </ScrollView>

      </View>
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

export default TargetsModal;
