import { useAppContext } from "@/components/appContext";
import { ShopStyles } from "@/components/HGStyles";
import { CompletedGymCard, FreeSessionsCard, MyProgramCard, SubscriptionProgramCard } from "@/components/programs/MyProgramsCard";
import React, { useEffect, useState } from "react";
import { ImageBackground, ScrollView, Text, View } from "react-native";
import { S3_API_URL } from "../network/apiConfig";

type PageType = 'programs' | 'programOverview' | 'programTracking';
 
type MyProgramsLandingProps = {
  handleChildPage: (page: PageType) => void;
};

export function MyProgramsLanding({ handleChildPage }: MyProgramsLandingProps) {

  const { myPrograms, trackingData } = useAppContext(); 

  const image = require("@/assets/images/HGBackground.png");
  const [purchasedPrograms, setPurchasedPrograms] = useState<any>({}); // Store API response as an object
  const [trackingDataSoft, setTrackingDataSoft] = useState<any>({}); // Store API response as an object

  // Check if the user is logged in and if myPrograms exists
  useEffect(() => {
    if (myPrograms !== null) {
      setPurchasedPrograms(myPrograms); // Set purchased programs to myPrograms if it exists
    }
  }, [myPrograms]);

  useEffect(() => {
    if (trackingData !== null) {
      setTrackingDataSoft(trackingData); // Set purchased programs to myPrograms if it exists
    }
  }, [trackingData]);

  return (
    <ImageBackground source={image} resizeMode="cover" style={{flex: 1, width: '100%', height: '100%'}}>
      <ScrollView style={[{paddingTop: 8, paddingBottom: 20}, ShopStyles.shopScrollContainer]}>

        {/* Subscription card */}
        <SubscriptionProgramCard
          key={'subscription4'}
          cardImage={require('@/assets/images/SubscriptionCard4day.jpg')}
          cardTitle={"Subscription"}  // Display the program name
          cardInfo={`4`}  // Display number of days per week
          handleChildPage={handleChildPage}  // Assuming this function is defined elsewhere
        />

        {/* Subscription card */}
        <SubscriptionProgramCard
          key={'subscription2'}
          cardImage={require('@/assets/images/SubscriptionCard2day.jpg')}
          cardTitle={"Subscription"}  // Display the program name
          cardInfo={`2`}  // Display number of days per week
          handleChildPage={handleChildPage}  // Assuming this function is defined elsewhere
        />

        {/* Section Header Free Sessions */}
        <View style={{flexDirection: "row", paddingVertical: 20, alignItems: "center", justifyContent: "center"}}>
          <View style={{flex:0.45, backgroundColor: "white", height: 1, paddingLeft: 16}}></View>
          <View style={{flex:0.5, alignItems: "center", justifyContent: "center", paddingHorizontal: 8}}>
            <Text style={{color: "white"}}>Free Sessions</Text>
          </View>
          <View style={{flex:0.45, backgroundColor: "white", height: 1, paddingRight: 16}}></View>
        </View>

        <FreeSessionsCard 
          key={'FreeSessions'}
          cardTitle={"Free Sessions"}  // Display the program name
          cardInfo={`Single day 1-shots`}  // Display number of days per week
        />

        {/* Section Header Purchased Programs */}
        <View style={{flexDirection: "row", paddingVertical: 20, alignItems: "center", justifyContent: "center"}}>
          <View style={{flex:0.25, backgroundColor: "white", height: 1, paddingLeft: 16}}></View>
          <View style={{flex:0.5, alignItems: "center", justifyContent: "center", paddingHorizontal: 8}}>
            <Text style={{color: "white"}}>Purchased Programs</Text>
          </View>
          <View style={{flex:0.25, backgroundColor: "white", height: 1, paddingRight: 16}}></View>
        </View>

        {/* Display Purchased Programs */}
        {Object.keys(purchasedPrograms).length > 0 ? (
          Object.keys(purchasedPrograms).map((programName: string, index: number) => {
            if (programName.toLowerCase().includes('subscription')) {
              return null;
            } if (!trackingDataSoft[programName]['completed']) {
            const programDetails = purchasedPrograms[programName]; // Get the details for each program
            const reRunNumber = trackingDataSoft[programName]['rerunNumber'];
            return (
              <MyProgramCard
                key={index}
                imgUri={{ uri: `${S3_API_URL}/${programName}.jpg` }}  // Dynamically require the image
                cardLevel={programDetails.level}  // Display the level of the program
                cardTitle={programName}  // Display the program name
                cardInfo={`${programDetails.days} days/week`}  // Display number of days per week
                rerunNumber={reRunNumber}
                newStatus={false}  // Static value, modify as needed
                handleChildPage={handleChildPage}  // Assuming this function is defined elsewhere
              />
            );}
          })
        ) : (
          <Text style={{color: 'white', textAlign: 'center'}}>No purchased programs ready to use</Text>
        )}

        {/* Section Header Completed Programs */}
        <View style={{flexDirection: "row", paddingVertical: 20, alignItems: "center", justifyContent: "center"}}>
          <View style={{flex:0.25, backgroundColor: "white", height: 1, paddingLeft: 16}}></View>
          <View style={{flex:0.5, alignItems: "center", justifyContent: "center", paddingHorizontal: 8}}>
            <Text style={{color: "white"}}>Completed Programs</Text>
          </View>
          <View style={{flex:0.25, backgroundColor: "white", height: 1, paddingRight: 16}}></View>
        </View>

        {/* Display Completed Programs */}
        {Object.keys(purchasedPrograms).length > 0 ? (
          Object.keys(purchasedPrograms).map((programName: string, index: number) => {
            if (programName.toLowerCase().includes('subscription')) {
              return null;
            } if (trackingDataSoft[programName]['completed']) {
            const programDetails = purchasedPrograms[programName]; // Get the details for each program
            return (
              <CompletedGymCard
                key={index}
                imgUri={{ uri: `${S3_API_URL}/${programName}.jpg` }}  // Dynamically require the image
                cardLevel={programDetails.level}  // Display the level of the program
                cardTitle={programName}  // Display the program name
                cardInfo={`${programDetails.days} days/week`}  // Display number of days per week
              />
            );}
          })
        ) : (
          <Text style={{color: 'white', textAlign: 'center'}}>No completed programs yet, get tracking!</Text>
        )}

      </ScrollView>
    </ImageBackground>
  );
}

