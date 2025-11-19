import { LoginStyles } from "@/components/users/LoginStyles";
import { useState } from "react";
import { ImageBackground, Pressable, Text, View } from "react-native";

type SignupWindowProps = {
    handleChildPage: (loggedIn: boolean, loginSignup: boolean, login: boolean, signup: boolean) => void;
  };

export function LoginSignupWindow({ handleChildPage }: SignupWindowProps) {

  const image = require("@/assets/images/BlackTransparentLogo.png");
  const [loginIsPressed, setLoginIsPressed] = useState(false);
  const [signupIsPressed, setSignupIsPressed] = useState(false);

  return (
      <View style={LoginStyles.ParentContainer}>
        <View style={LoginStyles.ChildContainer}>
            <View style={LoginStyles.ImageParentContainer}>
                <View style={LoginStyles.ImageChildContainer}>
                  <ImageBackground source={image} resizeMode="contain" style={{ flex: 1, width: '100%', height: '100%' }}/>
                </View>
            </View>

            <View style={LoginStyles.TextParentContainer}>
              <View style={LoginStyles.WelcomeTextContainer}>
                <Text style={LoginStyles.WelcomeText}>Welcome to  </Text>
              </View>
              <View style={LoginStyles.WelcomeTextContainer}>
                <Text style={LoginStyles.HGFitnessText}>HG Fitness</Text>
              </View>
            </View>

            <View style={LoginStyles.SubTextContainer}>
              <Text style={LoginStyles.SubText}>Before you can start tracking and training...</Text>
            </View>

            <View style={LoginStyles.ButtonParentContainer}>
                <Pressable 
                    onPressIn={() => { setLoginIsPressed(true); console.log('pressed');}}
                    onPressOut={() => [setLoginIsPressed(false), handleChildPage(false, false, true, false)]} 
                    style={[LoginStyles.ButtonPressable, {backgroundColor: loginIsPressed ? 'white' : 'black'}]}
                >
                    <Text style={[LoginStyles.ButtonText, {color: loginIsPressed ? 'black' : 'white'}]}>Login</Text>
                </Pressable>
            </View>

            <View style={LoginStyles.ButtonParentContainer}>
                <Pressable 
                    onPressIn={() => { setSignupIsPressed(true); console.log('pressed');}}
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
