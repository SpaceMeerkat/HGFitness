import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, ScrollView} from "react-native";
import { MyProgramCard } from "@/components/programs/MyProgramsCard";
import { ShopStyles } from "@/components/HGStyles"
import { S3_API_URL, BASE_API_URL } from "../network/apiConfig";
import { useAppContext } from "@/components/appContext";

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

        {/* Section Header */}
        <View style={{flexDirection: "row", marginVertical: 20, alignItems: "center", justifyContent: "center"}}>
          <View style={{flex:0.3, backgroundColor: "white", height: 1, marginLeft: 16}}></View>
          <View style={{flex:0.4, alignItems: "center", justifyContent: "center", marginHorizontal: 8}}>
            <Text style={{color: "white"}}>Past programs</Text>
          </View>
          <View style={{flex:0.3, backgroundColor: "white", height: 1, marginRight: 16}}></View>
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

