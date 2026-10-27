import { DefaultTabStyles } from "@/components/HGStyles";
import { useFocusEffect } from "expo-router/react-navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { ScrollView, type ScrollViewInstance } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ImageBackground } from "react-native";

import { useAppContext } from "@/components/appContext";
import { HGHeader } from "@/components/HeaderBar";
import { MyProgramsLanding } from "@/components/programs/MyPrograms";
import { ProgramOverview } from "@/components/programs/ProgramOverview";
import { ProgramTracker } from "@/components/programs/ProgramTracking";
import { LoginSignupWindow } from "@/components/users/LoginSignup";
import { LoginWindow } from "@/components/users/LoginWindow";
import { SignupWindow } from "@/components/users/SignupWindow";


type PageType = 'programs' | 'programOverview' | 'programTracking';

export default function MyPrograms() {

  // const [purchaseQueue, setPurchaseQueue] = useState<Record<string, string> | null>(null);

  const [loggedIn, setLoggedIn] = useState(false);
  const [loginSignupActive, setLoginSignupActive] = useState(false);
  const [loginActive, setLoginActive] = useState(false);
  const [signupActive, setSignupActive] = useState(false);
  const [userProfile, setUserProfile] = useState<string | null>(null);
  
  const [myProgramsOpen, setMyProgramsOpen] = useState(true);
  const [programOverviewOpen, setProgramOverviewOpen] = useState(false);
  const [programTrackingOpen, setProgramTrackingOpen] = useState(false);
  const [selectedProgramID, setSelectedProgramID] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  const [trackingMode, setTrackingMode] = useState(false);
  const [singleSessionsVisible, setSingleSessionsVisible] = useState(false);


  const scrollViewRef = useRef<ScrollViewInstance>(null); // Add reference

  const { profile, myPrograms, trackingData, advancedPrograms, intermediatePrograms, beginnerPrograms, checkPendingPayments } =
    useAppContext();

  // Pick up purchases PayFast has confirmed since the last visit
  useFocusEffect(
    useCallback(() => {
      checkPendingPayments();
    }, [profile?.purchaseQueue])
  );

  useEffect(() => {
    if (!profile) {
      setLoginSignupActive(true);
      setLoggedIn(false);
      setLoginActive(false);
      // Logout clears profile and trackingData, so close any open program and return to the landing page
      setUserProfile(null);
      setSelectedProgramID(null);
      setSelectedProgram(null);
      setMyProgramsOpen(true);
      setProgramOverviewOpen(false);
      setProgramTrackingOpen(false);
    } else if (myPrograms !== null) {
      setLoginSignupActive(false);
      setLoggedIn(true);
      setLoginActive(false);
      setUserProfile(profile);
    }
  }, [profile, myPrograms]);

  const handleLoginChildPage = (loggedIn: boolean, loginSignup: boolean, login: boolean, signup: boolean) => {
    if (loggedIn) {
      setLoginSignupActive(false);
      setLoggedIn(true);
      setLoginActive(false);
      setSignupActive(false);
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

  const getProgramLevel = (selectedProgramID: string): 'advanced' | 'intermediate' | 'beginner' | null => {
    if (advancedPrograms.hasOwnProperty(selectedProgramID)) {
      return 'advanced';
    } else if (intermediatePrograms.hasOwnProperty(selectedProgramID)) {
      return 'intermediate';
    } else if (beginnerPrograms.hasOwnProperty(selectedProgramID)) {
      return 'beginner';
    }
    if (advancedPrograms.hasOwnProperty(selectedProgramID)) {
      return 'advanced';
    } else if (intermediatePrograms.hasOwnProperty(selectedProgramID)) {
      return 'intermediate';
    } else if (beginnerPrograms.hasOwnProperty(selectedProgramID)) {
      return 'beginner';
    }
    const lower = selectedProgramID.toLowerCase();
    if (lower.includes("singlesession")) {
      const level = selectedProgramID.split('-')[1]?.toLowerCase();
      if (level === 'advanced' || level === 'intermediate' || level === 'beginner') {
        return level;
      }
    }
    return 'beginner';
  };

  const handleChildPage = (
    page: PageType, 
    programID: any = null, 
    programData: any = null, 
    programDay: any = null,
  ) => {
    if (programData) {
      setSelectedProgram(programData);
      setSelectedProgramID(programID);
    }
    if (programDay) {
      setSelectedDay(programDay);
    }

    // Scroll to the top when changing pages
    scrollViewRef.current?.scrollTo({ y: 0, animated: false });

    setMyProgramsOpen(page === 'programs');
    setProgramOverviewOpen(page === 'programOverview');
    setProgramTrackingOpen(page === 'programTracking');
  };

  const renderLoginSignup = () => {
      return(
        <LoginSignupWindow handleChildPage={handleLoginChildPage}/>
      )
    }

  const renderLogin = () => {
    return <LoginWindow handleChildPage={handleLoginChildPage} />;
  };

  const renderSignup = () => {
    return <SignupWindow handleChildPage={handleLoginChildPage} />;
  };

  const renderPageContent = () => {
    if (loginActive) {
      return renderLogin();
    } else if (loginSignupActive) {
      return renderLoginSignup();
    } else if (signupActive) {
      return renderSignup();
    } else if (loggedIn && userProfile && profile && trackingData) {
      if (myProgramsOpen) {
        return <MyProgramsLanding handleChildPage={handleChildPage} setTrackingMode={setTrackingMode}
                singleSessionsVisible={singleSessionsVisible} setSingleSessionsVisible={setSingleSessionsVisible}/>;
      }
      if (selectedProgramID) {
        // Find the Week_Day IDs to keep track of tracked sets 
        const completedIDs = Object.keys(trackingData?.[selectedProgramID]?.memoryData || {}).map(key => {
          const match = key.match(/week-(\d+)-day-(\d+)/);
          return match ? `${match[1]}_${match[2]}` : null;
        }).filter(Boolean);

        
  
        if (programOverviewOpen && selectedProgram) {
          const selectedLevel = getProgramLevel(selectedProgramID);
          const streakDates = trackingData?.[selectedProgramID]?.streakDates;
          return <ProgramOverview programLevel={selectedLevel} programID={selectedProgramID} programData={selectedProgram} 
            programDay={selectedDay} completedKeys={completedIDs} handleChildPage={handleChildPage} streakDates={streakDates}
            setTrackingMode={setTrackingMode}/>
        }
  
        if (programTrackingOpen) {
          const selectedLevel = getProgramLevel(selectedProgramID);
          return <ProgramTracker programLevel={selectedLevel || 'beginner'} programID={selectedProgramID} programData={selectedProgram} 
          programDay={selectedDay} completedKeys={completedIDs} handleChildPage={handleChildPage} trackingMode={trackingMode} setSingleSessionsVisible={setSingleSessionsVisible}/>;
        }
      }
    }
  
    return null;
  };

  const image = require("@/assets/images/HGBackground.jpg");

  return (
    <SafeAreaView style={DefaultTabStyles.defaultContainer} edges={['top']}>
      <HGHeader />
        <ImageBackground source={image} resizeMode="cover" style={{ flex: 1, width: '100%', height: '100%' }}>
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }} 
          keyboardShouldPersistTaps="handled" 
          ref={scrollViewRef} // Attach the ref
        >
          {renderPageContent()}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
