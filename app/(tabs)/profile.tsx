import { ImageBackground, ScrollView, View } from "react-native";
import Toast from 'react-native-toast-message';

import { DefaultTabStyles } from "@/components/HGStyles";
import { HGHeader } from "@/components/HeaderBar";
import { ProfileOverview } from "@/components/profile/ProfileLanding";
import { LoginWindow } from "@/components/users/LoginWindow";
import { SignupWindow } from "@/components/users/SignupWindow";

import { useEffect, useState } from "react";

import { useAppContext } from "@/components/appContext";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfilePage() {

  const { profile } = useAppContext(); 

  const image = require("@/assets/images/HGBackground.png");

  const [loggedIn, setLoggedIn] = useState(true);
  const [loginActive, setLoginActive] = useState(true);
  const [signupActive, setSignupActive] = useState(false);

  useEffect(() => {
    if (!profile) {
      setLoggedIn(false);
      setLoginActive(true);
    } else {
      setLoggedIn(true);
    }
  }, [profile]);

  const handleChildPage = (loggedIn: boolean, login: boolean, signup: boolean) => {
    if (loggedIn) {
      setLoginActive(false);
      setSignupActive(false);
    }
    if (login) {
      setLoggedIn(false);
      setLoginActive(true);
      setSignupActive(false);
    }
    if (signup) {
      setLoggedIn(false);
      setLoginActive(false);
      setSignupActive(true);
    } 
  };

  const renderProfile = () => {
    return (
      <ProfileOverview />
    )
  }

  const renderLogin = () => {
    return(
      <LoginWindow handleChildPage={handleChildPage}/>
    )
  }

  const renderSignup = () => {
    return(
      <SignupWindow handleChildPage={handleChildPage}/>
    )
  }

  const renderPageContent = () => {
    if (loggedIn && profile) {
      return renderProfile();
    } else if (loginActive) {
      return renderLogin();
    } else if (signupActive) {
      return renderSignup();
    }
    return null; // In case both states are false, nothing will be rendered
  };

  return (

    <SafeAreaView style={[DefaultTabStyles.defaultContainer, { flex: 1 }]} edges={['top']}>

    <HGHeader />

      <Toast />
  
      <ImageBackground source={image} resizeMode="cover" style={{ flex: 1, width: '100%', height: '100%' }}> 

        <View style={{ flex: 1, flexDirection: 'column', width: '100%' }}>
   
          <ScrollView 
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1 }}  // Ensures ScrollView takes all vertical space
            style={{ flex: 1, width: '100%' }}
          >
            {renderPageContent()}
          </ScrollView>
          
        </View>
  
      </ImageBackground>
    </SafeAreaView>

  );
}
