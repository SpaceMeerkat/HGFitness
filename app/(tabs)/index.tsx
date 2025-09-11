import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from 'react-native-toast-message';

import { HGHeader } from "@/components/HeaderBar";
import { DefaultTabStyles } from "@/components/HGStyles";
import { AdvancedPrograms } from "@/components/shop/ShopAdvanced";
import { BeginnerPrograms } from "@/components/shop/ShopBeginner";
import { GymPrograms } from "@/components/shop/ShopGymPrograms";
import { IntermediatePrograms } from "@/components/shop/ShopIntermediate";
import { ShopLanding } from "@/components/shop/ShopLanding";
import MealPrograms from "@/components/shop/ShopMealPrograms";
import { SubscriptionPage } from "@/components/shop/Subscription";
import { WhatsHot } from "@/components/shop/WhatsHot";

type PageType = 'programs' | 'mealPrograms' | 'beginner' | 'intermediate' | 'advanced' | 'hot' | 'subscription';

export default function ShopScreen() {

  const [shopOpen, setShopOpen] = useState(true);
  const [programsOpen, setProgramsOpen] = useState(false);
  const [mealProgramsOpen, setMealProgramsOpen] = useState(false);
  const [hotOpen, setHotOpen] = useState(false);
  const [subscriptionOpen, setSubscriptionOpen] = useState(false);

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
    setSubscriptionOpen(page === 'subscription');
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
      setSubscriptionOpen(false);
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
      setSubscriptionOpen(false);
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
      setSubscriptionOpen(false);
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
      setSubscriptionOpen(false);
      return true;
    } else if (subscriptionOpen) {
      // Close programs and set what's hot page to open
      setShopOpen(true);
      setProgramsOpen(false);
      setMealProgramsOpen(false);
      setBeginnerOpen(false);
      setIntermediateOpen(false);
      setAdvancedOpen(false);
      setHotOpen(false);
      setSubscriptionOpen(false);
      return true;
    } else {
      // No menus open, default behavior (exit app)
      return false;
    }
  };


  // useEffect(() => {
  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     handleBackButton
  //   );

  //   return () => backHandler.remove();
  // }, [shopOpen, programsOpen, mealProgramsOpen, beginnerOpen, intermediateOpen, advancedOpen, hotOpen, subscriptionOpen]);

  let content = null;

  if (shopOpen) {
    content = <ShopLanding handleChildPage={handleChildPage} />;
  }

  if (programsOpen) {
    content = <GymPrograms handleChildPage={handleChildPage} handleBackButton={handleBackButton}/>;
  }

  if (beginnerOpen) {
    content = <BeginnerPrograms handleBackButton={handleBackButton}/>;
  }

  if (intermediateOpen) {
    content = <IntermediatePrograms handleBackButton={handleBackButton}/>;
  }

  if (advancedOpen) {
    content = <AdvancedPrograms handleBackButton={handleBackButton}/>;
  }

  if (mealProgramsOpen) {
    content = <MealPrograms handleBackButton={handleBackButton}/>;
  }

  if (hotOpen) {
    content = <WhatsHot handleBackButton={handleBackButton} />;
  }

  if (subscriptionOpen) {
    content = <SubscriptionPage handleBackButton={handleBackButton} />;
  }

  return (
    <SafeAreaView style={DefaultTabStyles.defaultContainer} edges={['top']}>
      <HGHeader />
      <Toast />
      {content}
    </SafeAreaView>
  );
}

