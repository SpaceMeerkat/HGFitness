import { useAppContext } from "@/components/appContext";
import { ShopStyles } from "@/components/HGStyles";
import { MyProgramCard, SubscriptionProgramCard } from "@/components/programs/MyProgramsCard";
import React, { useEffect, useState } from "react";
import { ImageBackground, ScrollView, Text, View } from "react-native";
import { S3_API_URL } from "../network/apiConfig";

type PageType = 'programs' | 'programOverview' | 'programTracking';
 
type MyProgramsLandingProps = {
  handleChildPage: (page: PageType) => void;
};

export function MyProgramsLanding({ handleChildPage }: MyProgramsLandingProps) {

  const { myPrograms } = useAppContext(); 

  const image = require("@/assets/images/HGBackground.png");
  const [purchasedPrograms, setPurchasedPrograms] = useState<any>({}); // Store API response as an object

  // Check if the user is logged in and if myPrograms exists
  useEffect(() => {
    if (myPrograms !== null) {
      setPurchasedPrograms(myPrograms); // Set purchased programs to myPrograms if it exists
    }
  }, [myPrograms]);

  return (
    <ImageBackground source={image} resizeMode="cover" style={{flex: 1, width: '100%', height: '100%'}}>
      <ScrollView style={[{paddingTop: 8, paddingBottom: 20}, ShopStyles.shopScrollContainer]}>

        {/* Subscription card */}
        <SubscriptionProgramCard
          key={'subscription4'}
          cardImage={require('@/assets/images/SubscriptionCard4day.jpg')}
          cardTitle={"Monthly Subscription"}  // Display the program name
          cardInfo={`4 days/week`}  // Display number of days per week
          handleChildPage={handleChildPage}  // Assuming this function is defined elsewhere
        />

        {/* Subscription card */}
        <SubscriptionProgramCard
          key={'subscription2'}
          cardImage={require('@/assets/images/SubscriptionCard2day.jpg')}
          cardTitle={"Monthly Subscription"}  // Display the program name
          cardInfo={`2 days/week`}  // Display number of days per week
          handleChildPage={handleChildPage}  // Assuming this function is defined elsewhere
        />

        {/* Section Header */}
        <View style={{flexDirection: "row", paddingVertical: 20, alignItems: "center", justifyContent: "center"}}>
          <View style={{flex:0.25, backgroundColor: "white", height: 1, paddingLeft: 16}}></View>
          <View style={{flex:0.5, alignItems: "center", justifyContent: "center", paddingHorizontal: 8}}>
            <Text style={{color: "white"}}>Purchased programs</Text>
          </View>
          <View style={{flex:0.25, backgroundColor: "white", height: 1, paddingRight: 16}}></View>
        </View>

        {/* Display Purchased Programs */}
        {Object.keys(purchasedPrograms).length > 0 ? (
          Object.keys(purchasedPrograms).map((programName: string, index: number) => {
            const programDetails = purchasedPrograms[programName]; // Get the details for each program

            return (
              <MyProgramCard
                key={index}
                imgUri={{ uri: `${S3_API_URL}/${programName}.jpg` }}  // Dynamically require the image
                cardLevel={programDetails.level}  // Display the level of the program
                cardTitle={programName}  // Display the program name
                cardInfo={`${programDetails.days} days/week`}  // Display number of days per week
                newStatus={false}  // Static value, modify as needed
                handleChildPage={handleChildPage}  // Assuming this function is defined elsewhere
              />
            );
          })
        ) : (
          <Text style={{color: 'white', textAlign: 'center'}}>No programs available</Text>
        )}

      </ScrollView>
    </ImageBackground>
  );
}

