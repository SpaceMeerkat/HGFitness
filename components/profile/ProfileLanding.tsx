import { useAppContext } from "@/components/appContext";
import { DefaultTabStyles, ProfileStyles } from "@/components/HGStyles";
import { BASE_API_URL } from "@/components/network/apiConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageBackground } from "expo-image";
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, Modal, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { getTotalPrograms, getTotalSessions } from "./CalculateAchievements";
import ProgressBarWithDots from "./LevelLoadingBar";

export function ProfileOverview() {

  const { profileImagePaths, profile, trackingData, setProfile, myPrograms } = useAppContext();

  const [isImagePickerVisible, setIsImagePickerVisible] = useState(false);
  const [profileAvatar, setProfileAvatar] = useState(profileImagePaths["avatarDefault"]);
  const [dictionary, setDictionary] = useState(trackingData?.profileStats || undefined); 
  const [selected, setSelected] = useState<number | 0>(0);
  const [premium, setPremium] = useState(false);
  const [accountLevel, setAccountLevel] = useState('free tier');
  const [achievements, setAchievements] = useState<number[]>([0,0,0]);
  const [changeUsernameVisible, setChangeUsernameVisible] = useState(false);
  const [changeAvatarConfirmVisible, setChangeAvatarConfirmVisible] = useState(false);
  const [pendingAvatarUrl, setPendingAvatarUrl] = useState<any>(null);
  const [confirmAvatarVisible, setConfirmAvatarVisible] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [usernameResult, setUsernameResult] = useState<'success' | 'error' | null>(null);

  useEffect(() => {
    if (profile?.premium) {
      setPremium(true);
      setAccountLevel('premium');
    } else if (profile?.gymSubscription) {
      setPremium(false);
      setAccountLevel('subscription');
    } else {
      setPremium(false);
      setAccountLevel('free tier');
    }
  }, [profile]);

  // console.log(myPrograms); 

  useEffect(() => {
    if (trackingData?.profileStats) { 
      setDictionary(trackingData?.profileStats || undefined);
      const completedProgramsCount = getTotalPrograms(trackingData);
      const completedSessionsCount = getTotalSessions(trackingData);
      const achievementsList = [completedProgramsCount, 0, completedSessionsCount];
      setAchievements(achievementsList);
    } else {
    }
  }, [trackingData]);

  useEffect(() => {
    if (profile?.avatar && profile?.avatar !== 'None') {
      setProfileAvatar(profile.avatar);
    } else if (profileImagePaths?.avatarDefault) {
      setProfileAvatar(profileImagePaths["avatarDefault"]);
    }
  }, [profile, profileImagePaths]);

  const handleProfileImageClick = () => {
    setChangeAvatarConfirmVisible(true);
  };

  const handleImagePress = (url?: any) => {
    setPendingAvatarUrl(url);
    setConfirmAvatarVisible(true);
  };

  const confirmAvatarChange = async () => {
    setConfirmAvatarVisible(false);
    const retrievedToken = await SecureStore.getItemAsync('jwtToken');
    try {
      const response = await fetch(`${BASE_API_URL}/updateProfileAvatar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ avatarURL: pendingAvatarUrl, token: retrievedToken }),
      });
      if (response.ok) {
        setIsImagePickerVisible(false);
        setProfileAvatar(pendingAvatarUrl);
        const updatedProfile = { ...profile, avatar: pendingAvatarUrl };
        setProfile(updatedProfile);
        await AsyncStorage.setItem('profile', JSON.stringify(updatedProfile));
      } else {
        console.error('Failed to update profile:', response.status);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
    setPendingAvatarUrl(null);
  };

  // Values to help the meal stats plots take props depending on meals/calories/protein/water
  const buttons: { label: string; color: [string, string, string]; prefix: string; decimal: number }[] = [
    { label: "Calories", color: ['207','197','0'], prefix: " Cal", decimal: 0 },
    { label: "Protein", color: ['255','58','32'], prefix: " Cal", decimal: 0 },
    { label: "Water", color: ['0','195','165'], prefix: " L", decimal: 2 },
    { label: "Meals", color: ['70','195','0'], prefix: "", decimal: 0 },
  ];

  const handleUsernameSubmit = async () => {
    if (!newUsername.trim() || newUsername.trim() === profile.username) return;
    setUsernameLoading(true);
    try {
      // SKIP: simulate API call — replace with real fetch when endpoint is ready
      await new Promise(resolve => setTimeout(resolve, 2000));
      const status = 200;
      // END SKIP

      // Real call (uncomment when endpoint is ready):
      // const retrievedToken = await SecureStore.getItemAsync('jwtToken');
      // const response = await fetch(`${BASE_API_URL}/changeUsername`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ newUsername: newUsername.trim(), token: retrievedToken }),
      // });
      // const status = response.status;

      if (status === 200) {
        const updatedProfile = { ...profile, username: newUsername.trim() };
        await AsyncStorage.setItem('profile', JSON.stringify(updatedProfile));
        setProfile(updatedProfile);
        setUsernameResult('success');
      } else {
        setUsernameResult('error');
      }
    } catch {
      setUsernameResult('error');
    } finally {
      setUsernameLoading(false);
    }
  };

  const handleUsernameClose = () => {
    setChangeUsernameVisible(false);
    setNewUsername('');
    setUsernameResult(null);
  };

  if (!profile) return <Text style={{color:'cyan'}}>Loading profile...</Text>;

  const Wrapper = premium ? ImageBackground : View;

  return (
    <View style={{ flex: 1, width: '100%', zIndex: 9}}>
      <ScrollView style={[{ paddingTop: 8, paddingBottom: 20, paddingHorizontal: 20 }]}>

        {/* <PremiumButton /> */}

        {/* Confirm avatar change modal */}
        <Modal visible={confirmAvatarVisible} transparent animationType="fade">
          <Pressable
            style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.75)', justifyContent: 'center', alignItems: 'center' }}
            onPress={() => setConfirmAvatarVisible(false)}>
            <Pressable
              style={{ width: '88%', backgroundColor: 'black', borderWidth: 2, borderColor: 'grey', borderRadius: 8, padding: 24, alignItems: 'center' }}
              onPress={() => {}}>
              <Ionicons name="person-circle-outline" size={36} color="white" style={{ marginBottom: 12 }} />
              <Text style={{ fontFamily: 'Edo', fontSize: 22, color: 'white', marginBottom: 6 }}>Confirm Avatar Change</Text>
              <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, textAlign: 'center', marginBottom: 4 }}>Are you sure you want to change your avatar?</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16, width: '100%' }}>
                <TouchableOpacity
                  onPress={() => setConfirmAvatarVisible(false)}
                  style={{ flex: 0.45, paddingVertical: 10, borderRadius: 100, borderWidth: 2, borderColor: 'grey', alignItems: 'center' }}>
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={confirmAvatarChange}
                  style={{ flex: 0.45, paddingVertical: 10, borderRadius: 100, backgroundColor: 'white', alignItems: 'center' }}>
                  <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 14 }}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </Pressable>
        </Modal>

        {/* Change profile picture confirm modal */}
        <Modal visible={changeAvatarConfirmVisible} transparent animationType="fade">
          <Pressable
            style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.75)', justifyContent: 'center', alignItems: 'center' }}
            onPress={() => setChangeAvatarConfirmVisible(false)}>
            <Pressable
              style={{ width: '88%', backgroundColor: 'black', borderWidth: 2, borderColor: 'grey', borderRadius: 8, padding: 24, alignItems: 'center' }}
              onPress={() => {}}>
              <Ionicons name="image-outline" size={36} color="white" style={{ marginBottom: 12 }} />
              <Text style={{ fontFamily: 'Edo', fontSize: 22, color: 'white', marginBottom: 8 }}>Change Profile Picture?</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16, width: '100%' }}>
                <TouchableOpacity
                  onPress={() => setChangeAvatarConfirmVisible(false)}
                  style={{ flex: 0.45, paddingVertical: 10, borderRadius: 100, borderWidth: 2, borderColor: 'grey', alignItems: 'center' }}>
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => { setChangeAvatarConfirmVisible(false); setIsImagePickerVisible(true); }}
                  style={{ flex: 0.45, paddingVertical: 10, borderRadius: 100, backgroundColor: 'white', alignItems: 'center' }}>
                  <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 14 }}>Yes</Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </Pressable>
        </Modal>

        {/* Change Username modal */}
        <Modal visible={changeUsernameVisible} transparent animationType="fade">
          <Pressable
            style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.75)', justifyContent: 'center', alignItems: 'center' }}
            onPress={handleUsernameClose}>
            <Pressable
              style={{ width: '88%', backgroundColor: 'black', borderWidth: 2, borderColor: 'grey', borderRadius: 8, padding: 24 }}
              onPress={() => {}}>

              {/* Spinner overlay */}
              {usernameLoading && (
                <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(128,128,128,0.4)', borderRadius: 8, justifyContent: 'center', alignItems: 'center', zIndex: 10 }}>
                  <ActivityIndicator size="large" color="white" />
                </View>
              )}

              <Text style={{ fontFamily: 'Edo', fontSize: 24, color: 'white', marginBottom: 16 }}>Change Username</Text>

              {usernameResult === 'success' ? (
                <View style={{ alignItems: 'center', paddingVertical: 12 }}>
                  <Ionicons name="checkmark-circle-outline" size={48} color="lime" style={{ marginBottom: 12 }} />
                  <Text style={{ color: 'white', fontSize: 15, textAlign: 'center' }}>Username changed successfully!</Text>
                  <TouchableOpacity
                    onPress={handleUsernameClose}
                    style={{ marginTop: 20, paddingHorizontal: 32, paddingVertical: 10, backgroundColor: 'white', borderRadius: 100 }}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 14 }}>Close</Text>
                  </TouchableOpacity>
                </View>
              ) : usernameResult === 'error' ? (
                <View style={{ alignItems: 'center', paddingVertical: 12 }}>
                  <Ionicons name="close-circle-outline" size={48} color="red" style={{ marginBottom: 12 }} />
                  <Text style={{ color: 'white', fontSize: 15, textAlign: 'center' }}>Unable to change username right now.</Text>
                  <TouchableOpacity
                    onPress={handleUsernameClose}
                    style={{ marginTop: 20, paddingHorizontal: 32, paddingVertical: 10, backgroundColor: 'white', borderRadius: 100 }}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 14 }}>Close</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginBottom: 12 }}>Current: {profile.username}</Text>
                  <TextInput
                    value={newUsername}
                    onChangeText={setNewUsername}
                    placeholder="New username..."
                    placeholderTextColor="rgba(255,255,255,0.3)"
                    style={{ backgroundColor: '#111', borderWidth: 1, borderColor: 'grey', borderRadius: 8, color: 'white', fontSize: 15, padding: 12 }}
                  />
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
                    <TouchableOpacity
                      onPress={handleUsernameClose}
                      style={{ flex: 0.45, paddingVertical: 10, borderRadius: 100, borderWidth: 2, borderColor: 'grey', alignItems: 'center' }}>
                      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={handleUsernameSubmit}
                      disabled={!newUsername.trim() || newUsername.trim() === profile.username}
                      style={{ flex: 0.45, paddingVertical: 10, borderRadius: 100, backgroundColor: 'white', alignItems: 'center', opacity: (!newUsername.trim() || newUsername.trim() === profile.username) ? 0.4 : 1 }}>
                      <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 14 }}>Submit</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Pressable>
          </Pressable>
        </Modal>

        <View style={{ position: 'relative' }}>
          <TouchableOpacity
            onPress={() => setChangeUsernameVisible(true)}
            style={{ position: 'absolute', top: 8, right: 8, zIndex: 10 }}>
            <Ionicons name="pencil-outline" size={20} color="white" />
          </TouchableOpacity>

        <Wrapper
          {...(premium
            ? {
                source: require("@/assets/images/profileBackground.jpg"),
                contentFit: "fill",
              }
            : {})}
          style={{
            flex: 0.25,
            borderWidth: 1,
            borderRadius: 4,
            borderColor: "grey",
            backgroundColor: 'black',
            overflow: 'hidden'
          }}
        >
        {/* Main header component */}
        <View style={{
          flexDirection: "row",
          paddingTop: 12,
          paddingHorizontal: 14,
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
            <Text style={[DefaultTabStyles.defaultBodyText, {fontSize: 14}]}>Account level: {accountLevel}</Text>
          </View>
        </View>

        {/* Main stats bar */}
        <View style={{flex: 1, paddingVertical: 8}}>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
            <View style={{flex: 0.35, flexDirection: 'column'}}>
              <View style={{flex: 0.7}}>
                <Text style={{color: 'white', fontSize: 32, textAlign: 'center', fontFamily: 'Edo'}}>{achievements[2]}</Text>
              </View>
              <View style={{flex: 0.3}}>
                <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>Sessions</Text>
              </View>
            </View>
            <View style={{flex: 0.01, flexDirection: 'column', backgroundColor: 'white', maxWidth: 2}}/>
            <View style={{flex: 0.3, flexDirection: 'column'}}>
              <View style={{flex: 0.7}}>
                <Text style={{color: 'white', fontSize: 32, textAlign: 'center', fontFamily: 'Edo'}}>{achievements[1]}</Text>
              </View>
              <View style={{flex: 0.3}}>
                <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>Level</Text>
              </View>
            </View>
            <View style={{flex: 0.01, flexDirection: 'column', backgroundColor: 'white', maxWidth: 2}}/>
            <View style={{flex: 0.35, flexDirection: 'column'}}>
              <View style={{flex: 0.7}}>
                <Text style={{color: 'white', fontSize: 32, textAlign: 'center', fontFamily: 'Edo'}}>{achievements[0]}</Text>
              </View>
              <View style={{flex: 0.3}}>
                <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>Programs</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Row for displaying badges */}
        {/* <View style={{ flex: 1, flexDirection: "row", paddingHorizontal: 12, paddingVertical: 12}}>
          <View style={{flex: 0.5, flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>
              Medals:
            </Text>
          </View>
          <View style={{flex: 0.4, flexDirection: 'row'}}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <Ionicons name="star-outline" size={30} color="magenta" />
            </View>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <Ionicons name="medal-outline" size={30} color="gold" />
            </View>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <Ionicons name="water-outline" size={30} color="cyan" />
            </View>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <Ionicons name="repeat-outline" size={30} color="white" />
            </View>
          </View>
        </View> */}

        <ProgressBarWithDots
          level={achievements[1]}
          horizontalPadding={30}
          dotPositions={[0, 100]}
          fillPercentage={20}
        />

        </Wrapper>
        </View>

        {/* Gap between the Profile header and the stats */}
        <View style={ProfileStyles.ProfileSpacer}/>

        {/* Personal exercise stats coming soon */}
        <View style={{ backgroundColor: 'black', borderWidth: 1, borderColor: 'grey', borderRadius: 4, paddingVertical: 36, paddingHorizontal: 24, alignItems: 'center' }}>
          <View style={{ width: 90, height: 90, borderRadius: 12, backgroundColor: 'rgba(150,150,150,0.15)', justifyContent: 'center', alignItems: 'center' }}>
            <Ionicons name="stats-chart" size={46} color="white" />
          </View>
          <Text style={{ fontFamily: 'Edo', fontSize: 28, color: 'white', textAlign: 'center', marginTop: 18 }}>
            Exercise Stats
          </Text>
          <Text style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginTop: 10, lineHeight: 22 }}>
            Coming soon! Track your personal exercise stats and monitor your progress over time.
          </Text>
        </View>

        {/* <View style={ProfileStyles.MealStatsParentContanier}>
          <View style={ProfileStyles.StatsHeaderContainer}>
            <Text style={ProfileStyles.StatsHeaderText}>MEAL STATS</Text>
          </View>
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
          {dictionary && Object.keys(dictionary).length > 0 ? (
          <MealChart dictionary={dictionary} 
            mealType={`running${buttons[selected].label}`} 
            color={buttons[selected].color} 
            prefix={buttons[selected].prefix} 
            decimal = {buttons[selected].decimal} 
          /> 
          )
          : (
          <View style={{flex: 0.25,flexDirection: 'column',backgroundColor: 'black',justifyContent: 'center',alignContent: 'center',
            paddingVertical: 50,borderRadius: 4,borderColor: 'grey',borderWidth: 2,}}>
            <Text style={{ color: "white", textAlign: "center", textAlignVertical: 'center' }}>Get nomming to see meal stats!</Text>
          </View>
          )}
        </View>   

        <View style={ProfileStyles.ProfileSpacer}/>

        <View style={[ProfileStyles.MealStatsParentContanier, {alignItems: 'center'}]}>
          <View style={[ProfileStyles.StatsHeaderContainer, {paddingBottom: 10}]}>
            <Text style={ProfileStyles.StatsHeaderText}>Weight goals</Text>
          <Pressable
            key={"add-weight-button"}
            onPress={() => console.log("pressed")}
            style={[
              ProfileStyles.MealChartButtons,
              {flex: 0.5, width: 200}
            ]}
          >
            <Text style={{ color: "white", textAlign: "center" }}>Add Weigh-in</Text>
          </Pressable>
          </View>
          {dictionary && Object.keys(dictionary).length > 0 ? (
          <MealChart dictionary={dictionary} 
            mealType={`running${buttons[selected].label}`} 
            color={buttons[selected].color} 
            prefix={buttons[selected].prefix} 
            decimal = {buttons[selected].decimal} 
          /> 
          )
          : (
          <View style={{flex: 0.25,flexDirection: 'column',backgroundColor: 'black',justifyContent: 'center',alignContent: 'center',
            paddingVertical: 50,borderRadius: 4,borderColor: 'grey',borderWidth: 2,}}>
            <Text style={{ color: "white", textAlign: "center", textAlignVertical: 'center' }}>Get nomming to see meal stats!</Text>
          </View>
          )}
        </View>      */}

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
