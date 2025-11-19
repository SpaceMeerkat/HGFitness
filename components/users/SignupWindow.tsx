import { BASE_API_URL } from "@/components/network/apiConfig";
import LoadingModal from "@/components/users/LoadingModal";
import { LoginStyles } from "@/components/users/LoginStyles";
import * as SecureStore from 'expo-secure-store';
import { useState } from "react";
import { ImageBackground, Pressable, Text, TextInput, View } from "react-native";

type SignupWindowProps = {
    handleChildPage: (loggedIn: boolean, loginSignup: boolean, login: boolean, signup: boolean) => void;
  };

export function SignupWindow({ handleChildPage }: SignupWindowProps) {

  const image = require("@/assets/images/BlackTransparentLogo.png");

  const [emailIsFocused, setEmailIsFocused] = useState(false);
  const [usernameIsFocused, setUsernameIsFocused] = useState(false);
  const [passwordIsFocused, setPasswordIsFocused] = useState(false);
  const [username, setUsername] = useState("");  // Track username
  const [password, setPassword] = useState("");  // Track password
  const [email, setEmail] = useState("");  // Track email
  const [loginIsPressed, setLoginIsPressed] = useState(false);
  const [signupIsPressed, setSignupIsPressed] = useState(false);

  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [emailInUse, setEmailInUse] = useState(false);
  

  const handleSubmit = () => {
    const SignupData = {
      username: username,
      password: password,
      email: email,
    };

    const emailValidity = isValidEmail(email);
    const passwordValidity = isValidPassword(password);
    const usernameValidity = isValidUsername(username);
    if (passwordValidity && usernameValidity && !emailInUse && emailValidity) {
      // Send this loginData in a fetch request to the backend
      sendSignupRequest(SignupData);
    } else {
      if (!passwordValidity) {
        setInvalidPassword(true);
      }
      if (!usernameValidity) {
        setInvalidUsername(true);
      }
      if (!emailValidity) {
        setInvalidEmail(true);
      }
    }
  };

  const isValidEmail = (email: string): boolean => {
    // Very basic regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidUsername = (input: string): boolean => {
    // Check for at least 8 characters
    if (input.length < 3) {
      return false;
    }
    return true;
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

  const [submitting, setSubmitting] = useState(false);

  const sendSignupRequest = async (SignupData: { username: string; password: string; email: string }) => {
    try {
      setSubmitting(true)
      const response = await fetch(`${BASE_API_URL}/accountsSignup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(SignupData),
      });
  
      if (response.ok) {
        const data = await response.json();
        const token = data.token;  // Assuming the JWT is returned as 'token' in the response body   
        const message = data.message; 
        if (message !== "success") {
          // Catch the duplicate email response message here
          if (message === "duplicate_email") {
            setEmailInUse(true);
            setSubmitting(false);
          } else {
            console.log("unknown signup response");
            setSubmitting(false);
          }
        }
        if (message === "success") {
          // Message OK is the default success response message from signup API
          // Store the JWT (using AsyncStorage or any state management you prefer)
          await SecureStore.setItemAsync('jwtToken', token);
          setSubmitting(false)
          handleChildPage(false, false, true, false); // Moves the user to the login page having successfully signed up
        }
      } else {
        setSubmitting(false)
        console.error("Signup failed with status:", response.status);
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
              <Text style={{ color: "grey", fontSize: 15, textAlign: 'center', textAlignVertical: 'center'}}>Before you can start tracking and training...</Text>
            </View>

            {/* Email block */}
            <View style={LoginStyles.InputParentContainer}>
              <View style={LoginStyles.InputChildContainer}>
                <View style={LoginStyles.InputTextTitle}>
                  <Text style={LoginStyles.InputTextTitleText}>Email</Text>
                </View>

                <View style={LoginStyles.TextInputParentContainer}>
                  <View style={[LoginStyles.TextInputContainer, {borderColor:  invalidEmail || emailInUse? "red" : emailIsFocused? 'black' : 'grey'}]}>
                    <TextInput
                                cursorColor={'white'}
                                textAlign={'left'}
                                style={LoginStyles.TextInputBox}
                                value={email}
                                onChangeText={(text) => {setEmail(text); setEmailInUse(false); setInvalidEmail(false);}}
                                placeholderTextColor="grey"
                                onFocus={() => setEmailIsFocused(true)}
                                onBlur={() => setEmailIsFocused(false)}
                              />
                  </View>
                </View>

                {emailInUse? (
                <View style={LoginStyles.InputTextTitle}>
                  <Text style={[LoginStyles.InputTextTitleText, {fontSize: 10, textAlign: 'center', color: 'red'}]}>
                    * email address already in use
                  </Text>
                </View>
                ) : (null)}

                {invalidEmail? (
                <View style={LoginStyles.InputTextTitle}>
                  <Text style={[LoginStyles.InputTextTitleText, {fontSize: 10, textAlign: 'center', color: 'red'}]}>
                    * invalid email address
                  </Text>
                </View>
                ) : (null)}

              </View>
            </View>
            {/* Username block */}
            <View style={LoginStyles.InputParentContainer}>
              <View style={LoginStyles.InputChildContainer}>
                <View style={LoginStyles.InputTextTitle}>
                  <Text style={LoginStyles.InputTextTitleText}>Username</Text>
                </View>

                <View style={LoginStyles.TextInputParentContainer}>
                  <View style={[LoginStyles.TextInputContainer, {borderColor:  invalidUsername? "red" : usernameIsFocused? 'black' : 'grey'}]}>
                    <TextInput
                                cursorColor={'white'}
                                textAlign={'left'}
                                style={LoginStyles.TextInputBox}
                                value={username}
                                onChangeText={(text) => {setUsername(text); setInvalidUsername(false);}}
                                placeholderTextColor="grey"
                                onFocus={() => setUsernameIsFocused(true)}
                                onBlur={() => setUsernameIsFocused(false)}
                              />
                  </View>
                </View>

                {invalidUsername? (
                <View style={LoginStyles.InputTextTitle}>
                  <Text style={[LoginStyles.InputTextTitleText, {fontSize: 10, textAlign: 'center', color: 'red'}]}>
                    * username must contain 3 or more characters
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
                  <View style={[LoginStyles.TextInputContainer, {borderColor:  invalidPassword? "red" : passwordIsFocused? 'black' : 'grey'}]}>
                    <TextInput
                                cursorColor={'white'}
                                textAlign={'left'}
                                style={LoginStyles.TextInputBox}
                                value={password}
                                onChangeText={(text) => {setPassword(text); setInvalidPassword(false);}}
                                placeholderTextColor="grey"
                                onFocus={() => setPasswordIsFocused(true)}
                                onBlur={() => setPasswordIsFocused(false)}
                              />
                  </View>
                </View>

                <View style={LoginStyles.InputTextTitle}>
                  <Text style={[LoginStyles.InputTextTitleText, {fontSize: 10, textAlign: 'center', color: invalidPassword? 'red' : 'grey'}]}>
                    * must contain: a minimum of 8 characters and 1 number 
                  </Text>
                </View>
              </View>
            </View>

            {/* Submit button block */}
            <View style={LoginStyles.ButtonParentContainer}>
                <Pressable 
                    onPressIn={() => { setSignupIsPressed(true);}}
                    onPressOut={() => {setSignupIsPressed(false); handleSubmit();}} 
                    style={[LoginStyles.ButtonPressable, {backgroundColor: signupIsPressed ? 'white' : 'black'}]}
                >
                    <Text style={[LoginStyles.ButtonText, {color: signupIsPressed ? 'black' : 'white'}]}>Submit</Text>
                </Pressable>
            </View>

            {/* Login to existing account button */}
            <View style={{flex: 0.05, flexDirection: "row", justifyContent: "center", alignItems: "flex-end"}}>
              <Text style={{color: "grey", fontSize: 16}}>
                Already have an account?
              </Text>
            </View>

            <View style={LoginStyles.ButtonParentContainer}>
                <Pressable 
                    onPressIn={() => { setLoginIsPressed(true);}}
                    onPressOut={() => [setLoginIsPressed(false), handleChildPage(false, false, true, false)]} 
                    style={[LoginStyles.ButtonPressable, {backgroundColor: loginIsPressed ? 'black' : 'white'}]} 
                >
                    <Text style={[LoginStyles.ButtonText, {color: loginIsPressed ? 'white' : 'black'}]}>Login</Text>
                </Pressable>
            </View>
          </View>
      </View>
      
  );
}
