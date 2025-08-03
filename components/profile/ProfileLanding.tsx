import { useAppContext } from "@/components/appContext";
import { DefaultTabStyles, ProfileStyles } from "@/components/HGStyles";
import { BASE_API_URL } from "@/components/network/apiConfig";
import LogoutButton from "@/components/profile/Logout";
// import { MealChart, NoMealsChart } from "@/components/profile/MealChart";
import { PremiumButton } from "@/components/profile/PremiumButton";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from "react";
import { Alert, Image, Pressable, ScrollView, Text, View } from "react-native";

export function ProfileOverview() {

  const { profileImagePaths, profile, trackingData, setProfile } = useAppContext();

  const [isImagePickerVisible, setIsImagePickerVisible] = useState(false);
  const [profileAvatar, setProfileAvatar] = useState(profileImagePaths["avatarDefault"]);
  const [dictionary, setDictionary] = useState(trackingData?.profileStats || undefined); 
  const [selected, setSelected] = useState<number | 0>(0);
  const [premiumButton, setPremiumButton] = useState(true);

  // console.log(trackingData?.profileStats);

  useEffect(() => {
    if (profile?.premium) {
      setPremiumButton(false);
    } else {
      setPremiumButton(true);
    }
  }, [trackingData]);

  useEffect(() => {
    if (trackingData) {
      setDictionary(trackingData?.profileStats || undefined);
    } else {
    }
  }, [trackingData]);

  useEffect(() => {
    if (profile?.avatar && profile.avatar !== 'None') {
      setProfileAvatar(profile.avatar);
    } else if (profileImagePaths?.avatarDefault) {
      setProfileAvatar(profileImagePaths["avatarDefault"]);
    }
  }, [profile, profileImagePaths]);

  const handleProfileImageClick = () => {
    Alert.alert(
      "Change profile picture?",
      "",
      [
        { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
        { text: "Yes", onPress: () => setIsImagePickerVisible(true) }
      ]
    );
  };

  const handleImagePress = async (url?: any) => {
    Alert.alert(
        'Confirm Avatar Change',
        'Are you sure you want to change your avatar?',
        [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Confirm',
                onPress: async () => {

                    setProfileAvatar(url);

                    // Update profile avatar
                    const updatedProfile = { ...profile, avatar: url };
                    setProfile(updatedProfile); // Update context
                    

                    // // Update AsyncStorage
                    await AsyncStorage.setItem('profile', JSON.stringify(updatedProfile));

                    // // Get JWT token
                    const retrievedToken = await SecureStore.getItemAsync('jwtToken');

                    // Send POST request to the Flask API
                    try {
                        const response = await fetch(`${BASE_API_URL}/updateProfile`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ 
                              avatarURL: url,
                              token: retrievedToken
                             }),
                        });

                        if (response.ok) {
                          setIsImagePickerVisible(false);
                        } else {
                            console.error('Failed to update profile:', response.status);
                            // Handle error response
                        }
                    } catch (error) {
                        console.error('Error updating profile:', error);
                        // Handle fetch error
                    }
                },
            },
        ],
        { cancelable: false }
    );
  };

  // Values to help the meal stats plots take props depending on meals/calories/protein/water
  const buttons: { label: string; color: [string, string, string]; prefix: string; decimal: number }[] = [
    { label: "Calories", color: ['207','197','0'], prefix: " Cal", decimal: 0 },
    { label: "Protein", color: ['255','58','32'], prefix: " Cal", decimal: 0 },
    { label: "Water", color: ['0','195','165'], prefix: " L", decimal: 2 },
    { label: "Meals", color: ['70','195','0'], prefix: "", decimal: 0 },
  ];

  if (!profile) return <Text style={{color:'cyan'}}>Loading profile...</Text>;

  return (
    <View style={{ flex: 1, width: '100%', zIndex: 9}}>
      <ScrollView style={[{ paddingTop: 8, paddingBottom: 20, paddingHorizontal: 20 }]}>

        <PremiumButton />

        <View style={{flex: 0.25, borderWidth: 2, borderRadius: 4, borderColor: 'grey'}}>
        {/* Main header component */}
        <View style={{
          borderWidth: 1,
          borderRadius: 4,
          flexDirection: "row",
          paddingVertical: 8,
          paddingHorizontal: 12,
          backgroundColor: "black",
        }}>
          {/* Profile image - pressable */}
          <Pressable onPress={handleProfileImageClick} style={{flex: 0.5}}>
            <View>
              <Image source={profileAvatar ? { uri: profileAvatar } : require("@/assets/images/appIcon.png")} style={{ width: 100, height: 100, borderRadius: 50, borderWidth: 2, borderColor: 'white' }} />
            </View>
          </Pressable>

          {/* Profile mini info - username and sex */}
          <View style={{ flex: 0.8, justifyContent: "center" }}>
            <Text style={DefaultTabStyles.defaultBoldText}>{profile.username}</Text>
            <Text style={DefaultTabStyles.defaultBodyText}>Program types: {profile.sex}</Text>
          </View>
        </View>

        {/* Row for displaying badges */}
        <View style={{ backgroundColor: "black", height: 50, flexDirection: "row", paddingHorizontal: 26 }}>
          <View style={{ flex: 0.25, justifyContent: "center", alignItems: "center" }}>
            <Ionicons name="star-outline" size={30} color="magenta" />
          </View>
          <View style={{ flex: 0.25, justifyContent: "center", alignItems: "center" }}>
            <Ionicons name="medal-outline" size={24} color="gold" />
          </View>
          <View style={{ flex: 0.25, justifyContent: "center", alignItems: "center" }}>
            <Ionicons name="water-outline" size={30} color="cyan" />
          </View>
          <View style={{ flex: 0.25, justifyContent: "center", alignItems: "center" }}>
            <Ionicons name="repeat-outline" size={30} color="white" />
          </View>
        </View>

        <LogoutButton />
        </View>

        {/* Gap between the Profile header and the stats */}
        <View style={ProfileStyles.ProfileSpacer}/>

        {/* Meal stats parent container */}
        <View style={ProfileStyles.MealStatsParentContanier}>
          {/* Meal stats header/title */}
          <View style={ProfileStyles.StatsHeaderContainer}>
            <Text style={ProfileStyles.StatsHeaderText}>MEAL STATS</Text>
          </View>
          {/* Meal stats button selector for meals/calories/protein/water */}
          <View style={ProfileStyles.MealChartButtonsContainer}>
            {buttons.map((button, index) => (
              <Pressable
                key={button.label}
                onPress={() => setSelected(index)}
                style={[
                  ProfileStyles.MealChartButtons,
                  selected === index && { backgroundColor: 'rgba(70,195,0, 1)' }, // Fixed button color on press
                ]}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  {button.label}
                </Text>
              </Pressable>
            ))}
          </View>
          {/* Meal chart if dictionary exists, or else an empty warning box to get tracking */}
          {/* {dictionary && Object.keys(dictionary).length > 0 ? <MealChart dictionary={dictionary} 
          mealType={`running${buttons[selected].label}`} 
          color={buttons[selected].color} 
          prefix={buttons[selected].prefix} 
          decimal = {buttons[selected].decimal} />: <NoMealsChart/>} */}
          <Text style={{color: 'cyan'}}>Meal charts go here</Text>
        </View>
        

      </ScrollView>
      

      {/* Full-screen image picker overlay */}
      {isImagePickerVisible && (
        <View style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          height: '100%',
          width: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.75)', 
          justifyContent: "center", 
          alignItems: "center", 
          zIndex: 10,
        }}>
          <View style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            height: '90%',
            backgroundColor: 'rgba(255, 0, 0, 0)', 
            justifyContent: "center", 
            alignItems: "center", 
            paddingTop: 30,
            zIndex: 10,
          }}>
            <ScrollView 
              style={{ 
                flex: 1,
                backgroundColor: 'black', 
                width: '95%', 
                height: '90%', 
                borderRadius: 10, 
                borderWidth: 2,
                borderColor: 'grey',
                overflow: 'hidden' 
              }} 
              contentContainerStyle={{ alignItems: 'center', paddingVertical: 10 }}
            >
              <Pressable onPress={() => setIsImagePickerVisible(false)} style={{ paddingVertical: 20, width: '90%' }}>
                <Text style={{ color: "cyan", fontSize: 16, fontWeight: 'bold' }}>Back</Text>
              </Pressable>
              <View style={{ flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 15 }}>
                {Object.entries(profileImagePaths).map(([key, imageUrl], index) => (
                  <Pressable key={key} onPress={() => handleImagePress(imageUrl)}>
                    <View style={{ padding: 1 }}>
                      <Image source={{ uri: imageUrl }} style={{ width: 100, height: 100, borderRadius: 10, borderWidth: 2, borderColor: 'white' }} />
                    </View>
                  </Pressable>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
}
