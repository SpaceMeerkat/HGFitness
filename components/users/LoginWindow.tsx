import { useAppContext } from "@/components/appContext";
import { BASE_API_URL } from "@/components/network/apiConfig";
import LoadingModal from "@/components/users/LoadingModal";
import { LoginStyles } from "@/components/users/LoginStyles";
import * as SecureStore from 'expo-secure-store';
import { useState } from "react";
import { ImageBackground, Pressable, Text, TextInput, View } from "react-native";

type LoginWindowProps = {
    handleChildPage: (loggedIn: boolean, loginSignup: boolean, login: boolean, signup: boolean) => void;
  };

export function LoginWindow({ handleChildPage }: LoginWindowProps) {

  const { setProfile, setTrackingData, setMyPrograms, setBestSellers, setMealPrograms, setprofileImagePaths } = useAppContext();

  const image = require("@/assets/images/BlackTransparentLogo.png");

  const [emailIsFocused, setEmailIsFocused] = useState(false);
  const [passwordIsFocused, setPasswordIsFocused] = useState(false);
  const [loginIsPressed, setLoginIsPressed] = useState(false);
  const [signupIsPressed, setSignupIsPressed] = useState(false);
  const [email, setEmail] = useState("");  // Track username
  const [password, setPassword] = useState("");  // Track password

  const handleSubmit = async () => {
    // const retrievedToken = await SecureStore.getItemAsync('jwtToken');
    const loginData = {
      // token: retrievedToken,
      email: email,
      password: password,
    };
    // Send this loginData in a fetch request to the backend
    sendLoginRequest(loginData);
  };

  const [submitting, setSubmitting] = useState(false);

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

        // Store the JWT (using AsyncStorage or any state management you prefer)
        await SecureStore.setItemAsync('jwtToken', jsonResponse.token);
        setProfile(jsonResponse.profile);
        setMyPrograms(jsonResponse.myPrograms);
        setTrackingData(jsonResponse.trackingData);
        setBestSellers(jsonResponse.bestSellers);
        setMealPrograms(jsonResponse.mealPrograms);
        setprofileImagePaths(jsonResponse.profileImagePaths);
        setSubmitting(false);
        handleChildPage(true, false, false, false);
      } else {
        setSubmitting(false)
        console.error("Login failed with status:", response.status);
        // Handle error, e.g., display an error message
      }
    } catch (error) {
      setSubmitting(false);
      console.error("Error sending login request:", error);
    }
  };

    return (
      <View style={LoginStyles.ParentContainer}>
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
                  <View style={[LoginStyles.TextInputContainer, {borderColor: emailIsFocused ? 'black' : 'grey'}]}>
                    <TextInput
                                cursorColor={'white'}
                                textAlign={'left'}
                                style={LoginStyles.TextInputBox}
                                value={email}
                                onChangeText={setEmail}
                                placeholderTextColor="grey"
                                onFocus={() => setEmailIsFocused(true)}
                                onBlur={() => setEmailIsFocused(false)}
                              />
                  </View>
                </View>
              </View>
            </View>

            {/* Password block */}
            <View style={LoginStyles.InputParentContainer}>
              <View style={LoginStyles.InputChildContainer}>
                <View style={LoginStyles.InputTextTitle}>
                  <Text style={LoginStyles.InputTextTitleText}>Password</Text>
                </View>

                <View style={LoginStyles.TextInputParentContainer}>
                  <View style={[LoginStyles.TextInputContainer, {borderColor: passwordIsFocused ? 'black' : 'grey'}]}>
                    <TextInput
                                cursorColor={'white'}
                                textAlign={'left'}
                                style={LoginStyles.TextInputBox}
                                value={password}
                                onChangeText={setPassword}
                                placeholderTextColor="grey"
                                onFocus={() => setPasswordIsFocused(true)}
                                onBlur={() => setPasswordIsFocused(false)}
                              />
                  </View>
                </View>
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

          </View>
      </View>
    );
}  
