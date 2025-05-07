import { BackHandler, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from 'react-native-toast-message';

import { DefaultTabStyles} from "@/components/HGStyles"
import { GymPrograms } from "@/components/shop/ShopGymPrograms";
import { MealPrograms } from "@/components/shop/ShopMealPrograms";
import { ShopLanding } from "@/components/shop/ShopLanding";
import { BeginnerPrograms } from "@/components/shop/ShopBeginner";
import { IntermediatePrograms } from "@/components/shop/ShopIntermediate";
import { AdvancedPrograms } from "@/components/shop/ShopAdvanced";
import { WhatsHot } from "@/components/shop/WhatsHot";
import { HGHeader } from "@/components/HeaderBar"; 

type PageType = 'programs' | 'mealPrograms' | 'beginner' | 'intermediate' | 'advanced' | 'hot';


export default function ShopScreen() {

  const [shopOpen, setShopOpen] = useState(true);
  const [programsOpen, setProgramsOpen] = useState(false);
  const [mealProgramsOpen, setMealProgramsOpen] = useState(false);
  const [hotOpen, setHotOpen] = useState(false);

  const [beginnerOpen, setBeginnerOpen] = useState(false);
  const [intermediateOpen, setIntermediateOpen] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const handleChildPage = (page: PageType) => {
    setShopOpen(false);
    setProgramsOpen(page === 'programs');
    setMealProgramsOpen(page === 'mealPrograms');
    setBeginnerOpen(page === 'beginner');
    setIntermediateOpen(page === 'intermediate');
    setAdvancedOpen(page === 'advanced');
    setHotOpen(page === 'hot');
  }

  const handleBackButton = () => {
    if (programsOpen) {
      // Set shop open and close all other menus
      setShopOpen(true);
      setProgramsOpen(false);
      setMealProgramsOpen(false);
      setBeginnerOpen(false);
      setIntermediateOpen(false);
      setAdvancedOpen(false);
      setHotOpen(false);
      return true;
    } else if (mealProgramsOpen) {
      // Close meals and set shop open
      setShopOpen(true);
      setProgramsOpen(false);
      setMealProgramsOpen(false);
      setBeginnerOpen(false);
      setIntermediateOpen(false);
      setAdvancedOpen(false);
      setHotOpen(false);
      return true;
    } else if (beginnerOpen || intermediateOpen || advancedOpen) {
      // Close programs and set intermediate step
      setShopOpen(false);
      setProgramsOpen(true);
      setMealProgramsOpen(false);
      setBeginnerOpen(false);
      setIntermediateOpen(false);
      setAdvancedOpen(false);
      setHotOpen(false);
      return true;
    } else if (hotOpen) {
      // Close programs and set what's hot page to open
      setShopOpen(true);
      setProgramsOpen(false);
      setMealProgramsOpen(false);
      setBeginnerOpen(false);
      setIntermediateOpen(false);
      setAdvancedOpen(false);
      setHotOpen(false);
      return true;
    } else {
      // No menus open, default behavior (exit app)
      return false;
    }
    // Prevent default behavior (exit app) for menu handling cases
    return false;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton
    );

    return () => backHandler.remove();
  }, [shopOpen, programsOpen, mealProgramsOpen, beginnerOpen, intermediateOpen, advancedOpen, hotOpen]);

  let content = null;

  if (shopOpen) {
    content = <ShopLanding handleChildPage={handleChildPage} />;
  }

  if (programsOpen) {
    content = <GymPrograms handleChildPage={handleChildPage}/>;
  }

  if (beginnerOpen) {
    content = <BeginnerPrograms />;
  }

  if (intermediateOpen) {
    content = <IntermediatePrograms />;
  }

  if (advancedOpen) {
    content = <AdvancedPrograms />;
  }

  if (mealProgramsOpen) {
    content = <MealPrograms />;
  }

  if (hotOpen) {
    content = <WhatsHot handleBackButton={handleBackButton} />
  }

  return (
    <SafeAreaView style={DefaultTabStyles.defaultContainer}>
      <HGHeader />
      <Toast />
      {content}
    </SafeAreaView>
  );
}

