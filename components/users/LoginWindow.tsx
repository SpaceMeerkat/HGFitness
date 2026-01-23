import { isToday, LAST_UPDATE_KEY, useAppContext } from "@/components/appContext";
import { BASE_API_URL } from "@/components/network/apiConfig";
import LoadingModal from "@/components/users/LoadingModal";
import { LoginStyles } from "@/components/users/LoginStyles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { useState } from "react";
import { ImageBackground, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import PasswordResetModal from "./ForgottenPasswordModal";

type LoginWindowProps = {
    handleChildPage: (loggedIn: boolean, loginSignup: boolean, login: boolean, signup: boolean) => void;
  };

export function LoginWindow({ handleChildPage }: LoginWindowProps) {

  const { setProfile, setTrackingData, setMyPrograms, setBestSellers, setMealPrograms, setprofileImagePaths, setMasterGymProgramsDictionary, updateData } = useAppContext();

  const image = require("@/assets/images/BlackTransparentLogo.png");

  const [emailIsFocused, setEmailIsFocused] = useState(false);
  const [passwordIsFocused, setPasswordIsFocused] = useState(false);
  const [loginIsPressed, setLoginIsPressed] = useState(false);
  const [signupIsPressed, setSignupIsPressed] = useState(false);
  const [email, setEmail] = useState("");  // Track username
  const [password, setPassword] = useState("");  // Track password
  const [open, setOpen] = useState(false);

  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [unknownEmail, setUnknownEmail] = useState(false);
  const [invalidAuthentication, setInvalidAuthentication] = useState(false);

  const handleSubmit = async () => {
    // const retrievedToken = await SecureStore.getItemAsync('jwtToken');
    const loginData = {
      // token: retrievedToken,
      email: email,
      password: password,
    };

    const emailValidity = isValidEmail(email);
    const passwordValidity = isValidPassword(password);

    if (passwordValidity && emailValidity) {
    // Send this loginData in a fetch request to the backend
      sendLoginRequest(loginData);
    } else {
      if (!passwordValidity) {
        setInvalidPassword(true);
      }
      if (!emailValidity) {
        setInvalidEmail(true);
      }
    }
  };

  const [submitting, setSubmitting] = useState(false);

  const isValidEmail = (email: string): boolean => {
    // Very basic regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (input: string): boolean => {
    // Check for at least 8 characters
    if (input.length < 8) {
      return false;
    }
    // Check for at least one digit
    const hasNumber = /\d/.test(input);
    return hasNumber;
  };

  const sendLoginRequest = async (loginData: { email: string; password: string }) => {
    try {
      setSubmitting(true)
      const response = await fetch(`${BASE_API_URL}/accountsLogin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
  
      if (response.ok) {
        const jsonResponse = await response.json();
        const responseMessage = jsonResponse.message;
        if (responseMessage === "not_found") {
          setUnknownEmail(true);
          setSubmitting(false);
        };
        if (responseMessage === "invalid_password") {
          setInvalidAuthentication(true);
          setSubmitting(false);
        };
        if (responseMessage === "success") {
          // Store the JWT (using AsyncStorage or any state management you prefer)
          await SecureStore.setItemAsync('jwtToken', jsonResponse.token);

          // Check if last update was today
          const lastUpdateDate = await AsyncStorage.getItem(LAST_UPDATE_KEY);

          if (lastUpdateDate && isToday(lastUpdateDate)) {
            // Last update was today, use login response data
            await AsyncStorage.setItem('profile', JSON.stringify(jsonResponse.profile));
            await AsyncStorage.setItem('myPrograms', JSON.stringify(jsonResponse.myPrograms));
            await AsyncStorage.setItem('trackingData', JSON.stringify(jsonResponse.trackingData));
            await AsyncStorage.setItem('masterGymProgramsDictionary', JSON.stringify(jsonResponse.gymMasterDictionary));
            await AsyncStorage.setItem('bestSellers', JSON.stringify(jsonResponse.bestSellers));
            await AsyncStorage.setItem('mealPrograms', JSON.stringify(jsonResponse.mealPrograms));
            await AsyncStorage.setItem('profileImagePaths', JSON.stringify(jsonResponse.profileImagePaths));
            await AsyncStorage.setItem(LAST_UPDATE_KEY, new Date().toISOString());
            setProfile(jsonResponse.profile);
            setMyPrograms(jsonResponse.myPrograms);
            setTrackingData(jsonResponse.trackingData);
            setMasterGymProgramsDictionary(jsonResponse.gymMasterDictionary);
            setBestSellers(jsonResponse.bestSellers);
            setMealPrograms(jsonResponse.mealPrograms);
            setprofileImagePaths(jsonResponse.profileImagePaths);
            setSubmitting(false);
            handleChildPage(true, false, false, false);
          } else {
            // Last update was not today, run full context request to sync data
            console.log("running full context from Login date check.");
            await updateData();
            setSubmitting(false);
            handleChildPage(true, false, false, false);
          }
        };
      } else {
        setSubmitting(false)
        console.error("Login failed with status A:", response.status);
        // Handle error, e.g., display an error message
      }
    } catch (error) {
      setSubmitting(false);
      console.error("Error sending login request:", error);
    }
  };

    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={LoginStyles.ParentContainer}>
            <PasswordResetModal
          visible={open}
          onClose={() => setOpen(false)}
          submitting={submitting}
          setSubmitting={setSubmitting}
        />
        <LoadingModal visible={submitting} />
        <View style={LoginStyles.ChildContainer}>
            <View style={LoginStyles.ImageParentContainer}>
                <View style={LoginStyles.ImageChildContainer}>
                  <ImageBackground source={image} resizeMode="contain" style={{ flex: 1, width: '100%', height: '100%' }}/>
                </View>
            </View>
            {/* slogan */}
            <View style={{flex: 0.1, flexDirection: "row"}}>
              <Text style={{ color: "grey", fontSize: 15, textAlign: 'center', textAlignVertical: 'center'}}>Get back to business and log in!</Text>
            </View>

            {/* Username block */}
            <View style={LoginStyles.InputParentContainer}>
              <View style={LoginStyles.InputChildContainer}>
                <View style={LoginStyles.InputTextTitle}>
                  <Text style={LoginStyles.InputTextTitleText}>Email</Text>
                </View>

                <View style={LoginStyles.TextInputParentContainer}>
                  <View style={[LoginStyles.TextInputContainer, {borderColor:  invalidEmail || invalidAuthentication || unknownEmail? "red" : emailIsFocused? 'black' : 'grey'}]}>
                    <TextInput
                                cursorColor={'white'}
                                textAlign={'left'}
                                style={LoginStyles.TextInputBox}
                                value={email}
                                onChangeText={(text) => {setEmail(text); setUnknownEmail(false); setInvalidAuthentication(false); setInvalidEmail(false);}}
                                placeholderTextColor="grey"
                                onFocus={() => setEmailIsFocused(true)}
                                onBlur={() => setEmailIsFocused(false)}
                              />
                  </View>
                </View>

                {invalidEmail? (
                <View style={LoginStyles.InputTextTitle}>
                  <Text style={[LoginStyles.InputTextTitleText, {fontSize: 10, textAlign: 'center', color: 'red'}]}>
                    * invalid email address
                  </Text>
                </View>
                ) : (null)}

                {unknownEmail? (
                <View style={LoginStyles.InputTextTitle}>
                  <Text style={[LoginStyles.InputTextTitleText, {fontSize: 10, textAlign: 'center', color: 'red'}]}>
                    * email address not found on record
                  </Text>
                </View>
                ) : (null)}

              </View>
            </View>

            {/* Password block */}
            <View style={LoginStyles.InputParentContainer}>
              <View style={LoginStyles.InputChildContainer}>
                <View style={LoginStyles.InputTextTitle}>
                  <Text style={LoginStyles.InputTextTitleText}>Password</Text>
                </View>

                <View style={LoginStyles.TextInputParentContainer}>
                  <View style={[LoginStyles.TextInputContainer, {borderColor:  invalidPassword || invalidAuthentication? "red" : passwordIsFocused? 'black' : 'grey'}]}>
                    <TextInput
                                cursorColor={'white'}
                                textAlign={'left'}
                                style={LoginStyles.TextInputBox}
                                value={password}
                                onChangeText={(text) => {setPassword(text); setInvalidAuthentication(false); setInvalidPassword(false);}}
                                placeholderTextColor="grey"
                                onFocus={() => setPasswordIsFocused(true)}
                                onBlur={() => setPasswordIsFocused(false)}
                              />
                  </View>
                </View>

                {invalidPassword? (
                <View style={LoginStyles.InputTextTitle}>
                  <Text style={[LoginStyles.InputTextTitleText, {fontSize: 10, textAlign: 'center', color: 'red'}]}>
                    * invalid password
                  </Text>
                </View>
                ) : (null)}

                {invalidAuthentication? (
                <View style={LoginStyles.InputTextTitle}>
                  <Text style={[LoginStyles.InputTextTitleText, {fontSize: 10, textAlign: 'center', color: 'red'}]}>
                    * invalid email and password combination
                  </Text>
                </View>
                ) : (null)}

              </View>
            </View>

            {/* Submit button block */}
            <View style={LoginStyles.ButtonParentContainer}>
                <Pressable 
                    onPressIn={() => { setLoginIsPressed(true);}}
                    onPressOut={() => {setLoginIsPressed(false); handleSubmit();}} 
                    style={[LoginStyles.ButtonPressable, {backgroundColor: loginIsPressed ? 'white' : 'black'}]}
                >
                    <Text style={[LoginStyles.ButtonText, {color: loginIsPressed ? 'black' : 'white'}]}>Submit</Text>
                </Pressable>
            </View>

            
            {/* Make new account text block */}
            <View style={{flex: 0.05, flexDirection: "row", justifyContent: "center", alignItems: "flex-end"}}>
              <Text style={{color: "grey", fontSize: 16}}>
                Don't have an account?
              </Text>
            </View>

            <View style={LoginStyles.ButtonParentContainer}>
                <Pressable 
                    onPressIn={() => { setSignupIsPressed(true);}}
                    onPressOut={() => [setSignupIsPressed(false), handleChildPage(false, false, false, true)]} 
                    style={[LoginStyles.ButtonPressable, {backgroundColor: signupIsPressed ? 'black' : 'white'}]} 
                >
                    <Text style={[LoginStyles.ButtonText, {color: signupIsPressed ? 'white' : 'black'}]}>Sign Up</Text>
                </Pressable>
            </View>

            <Pressable onPress={() => setOpen(true)} style={[LoginStyles.ButtonParentContainer, {flex: 0.01}]}>
              <View style={LoginStyles.InputTextTitle}>
                <Text style={[LoginStyles.InputTextTitleText, {fontSize: 10, textAlign: 'center', color: 'blue'}]}>
                  Forgot password?
                </Text>
              </View>
            </Pressable>


            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
}  
