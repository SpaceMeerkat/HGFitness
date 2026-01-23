import { ImageBackground, ScrollView, View } from "react-native";
import Toast from 'react-native-toast-message';

import { DefaultTabStyles } from "@/components/HGStyles";
import { HGHeader } from "@/components/HeaderBar";
import { ProfileOverview } from "@/components/profile/ProfileLanding";
import { LoginSignupWindow } from "@/components/users/LoginSignup";
import { LoginWindow } from "@/components/users/LoginWindow";
import { SignupWindow } from "@/components/users/SignupWindow";

import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { useAppContext } from "@/components/appContext";
import { runPaymentStatus } from "@/components/network/PollPurchase";
import { runSubscriptionPolling } from "@/components/network/PollSubscription";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfilePage() {

  const { profile, myPrograms, trackingData, setProfile, setMyPrograms, setTrackingData, setMealPrograms } = useAppContext();

  useFocusEffect(
    useCallback(() => {
      if (!profile?.purchaseQueue || Object.keys(profile?.purchaseQueue).length === 0) return;

      const processQueue = async () => {
        await runPaymentStatus(profile.purchaseQueue, {
          profile,
          myPrograms,
          trackingData,
          setProfile,
          setMyPrograms,
          setTrackingData,
        });

        await runSubscriptionPolling(profile.purchaseQueue, {
          profile,
          myPrograms,
          trackingData,
          setProfile,
          setMyPrograms,
          setTrackingData,
          setMealPrograms,
        });
      };

      processQueue();
    }, [profile?.purchaseQueue])
  );

  const image = require("@/assets/images/HGBackground.png");

  const [loggedIn, setLoggedIn] = useState(false);
  const [loginSignupActive, setLoginSignupActive] = useState(false);
  const [loginActive, setLoginActive] = useState(false);
  const [signupActive, setSignupActive] = useState(false);
  const [childTrackingData, setChildTrackingData] = useState(null);

  useEffect(() => {
    if (trackingData) {
      setChildTrackingData(trackingData);
    } else {
      setChildTrackingData(null);
    }
  }, [trackingData]); 

  useEffect(() => {
    if (!profile) {
      setLoginSignupActive(true);
      setLoggedIn(false);
      setLoginActive(false);
      setSignupActive(false);
    } else {
      setLoggedIn(true);
      setLoginSignupActive(false);
      setLoginActive(false);
      setSignupActive(false);
    }
  }, [profile]);

  const handleChildPage = (loggedIn: boolean, loginSignup: boolean, login: boolean, signup: boolean) => {
    if (loggedIn) {
      setLoggedIn(true);
      setLoginActive(false);
      setSignupActive(false);
      setLoginSignupActive(false);
    }
    if (login) {
      setLoginSignupActive(false);
      setLoggedIn(false);
      setLoginActive(true);
      setSignupActive(false);
    }
    if (signup) {
      setLoginSignupActive(false);
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

  const renderLoginSignup = () => {
    return(
      <LoginSignupWindow handleChildPage={handleChildPage}/>
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
    } else if (loginSignupActive) {
      return renderLoginSignup();
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
