import { useAppContext } from "@/components/appContext";
import { ShopStyles } from "@/components/HGStyles";
import { CompletedGymCard, FreeSessionsCard, MyProgramCard, SubscriptionProgramCard } from "@/components/programs/MyProgramsCard";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { S3_API_URL } from "../network/apiConfig";
import SingleSessionsModal from "./SingleSessionsModal";
import SubscriptionOptionsModal from "./SubscriptionOptions";
import ViewModeModal from "./ViewModeModal";

type PageType = 'programs' | 'programOverview' | 'programTracking';
 
type MyProgramsLandingProps = {
  handleChildPage: (
    page: PageType, 
    programId?: string,
    programData?: any,
    programDay?: any
  ) => void;
  setTrackingMode: any; 
  singleSessionsVisible: any;
  setSingleSessionsVisible: any;
};

export function MyProgramsLanding({ handleChildPage, setTrackingMode, singleSessionsVisible, setSingleSessionsVisible}: MyProgramsLandingProps) {

  const { myPrograms, trackingData, profile } = useAppContext(); 
  if (!profile) return null;
  // const [singleSessionsVisible, setSingleSessionsVisible] = useState(false);

  // console.log(myPrograms);

  console.log(trackingData['Subscription2Day-2026_5_4-1-Men']); 
  // console.log(trackingData); 

  const image = require("@/assets/images/HGBackground.png");
  const [purchasedPrograms, setPurchasedPrograms] = useState<any>({}); // Store API response as an object
  const [trackingDataSoft, setTrackingDataSoft] = useState<any>({}); // Store API response as an object
  const [singlePrograms, setSinglePrograms] = useState<any>({});

  const [viewModeVisible, setViewModeVisible] = useState(false);
  const [fullName, setFullName] = useState<string | null>(null);
  const [selectedData, setSelectedData] = useState<any>(null);
  const [triggerRedirect, setTriggerRedirect] = useState(false);
  const [subscriptionOptionsVisible, setSubscriptionOptionsVisible] = useState(false);

  useEffect (() => {
    if (fullName && selectedData) {
      setViewModeVisible(false);
      handleChildPage('programTracking', fullName, selectedData, ["1", "1"]);
    }
  }, [triggerRedirect])

  useEffect(() => {
    if (trackingData !== null && myPrograms !== null) {
      setTrackingDataSoft(trackingData);
      setPurchasedPrograms(myPrograms);
      // Step 1: Filter programs containing "singlesession"
      const singles: any = {};
      Object.keys(myPrograms).forEach((programName) => {
        if (programName.toLowerCase().includes("singlesession")) {
          // Step 2: Parse according to convention
          // Format: SingleSession-level-name-1-sex
          const parts = programName.split("-");
          if (parts.length >= 4) {
            const level = parts[1].toLowerCase(); // e.g., beginner, intermediate, advanced
            const name = parts[2]; // e.g., Arm Blaster
            const type = parts[3]; // e.g., chest, back, etc.
            const sex = parts[parts.length - 1]; // Men or Women (last element)

            singles[programName] = {
              name,
              type,
              level,
              sex,
            };
          }
        } 
      });
      // Step 3: Set state with parsed singles
      setSinglePrograms(singles);
    } else {
      setTrackingDataSoft({});
      setSinglePrograms({});
      setPurchasedPrograms({});
    }
  }, [trackingData]); // PollPurchase awaits setting new myPrograms before setting new trackingData, so wait for trackingData for this useEffect trigger

  return (
      <ScrollView style={[ShopStyles.shopScrollContainer, {flex: 1, paddingTop: 8, paddingBottom: 20}]}>

        <SubscriptionOptionsModal visible={subscriptionOptionsVisible} onClose={() => setSubscriptionOptionsVisible(false)}/>

        <ViewModeModal setTrackingMode={setTrackingMode} setTriggerRedirect={setTriggerRedirect} visible={viewModeVisible} onClose={() => setViewModeVisible(false)}/>

        {Object.keys(singlePrograms).length > 0 && Object.keys(trackingDataSoft).length > 0 && (
          <SingleSessionsModal programsInfo={singlePrograms} trackingData={trackingDataSoft} handleChildPage={handleChildPage} 
          visible={singleSessionsVisible} onClose={() => setSingleSessionsVisible(false)} setFullName={setFullName} setSelectedData={setSelectedData}
          setViewModeVisible={setViewModeVisible}/>
        )}

        {console.log(myPrograms)}
          <>
            {Object.keys(myPrograms)
              .filter(key =>
                key.toLowerCase().includes("subscription2day") ||
                key.toLowerCase().includes("subscription4day")
              )
              .map((key) => {
                const lower = key.toLowerCase();
                const is4Day = lower.includes("subscription4day");
                const is2Day = lower.includes("subscription2day");

                const cardInfo = is4Day ? "4" : "2";
                const cardImage = is4Day
                  ? require('@/assets/images/SubscriptionCard4day.jpg')
                  : require('@/assets/images/SubscriptionCard2day.jpg');

                return (
                  <SubscriptionProgramCard
                    key={key}
                    cardImage={cardImage}
                    cardTitle={key}          // full dynamic program title
                    cardInfo={cardInfo}
                    handleChildPage={handleChildPage}
                  />
                );
              })}
          </>

        {/* Section Header Free Sessions */}
        <View style={{flexDirection: "row", paddingVertical: 10, alignItems: "center", justifyContent: "center"}}>
          <View style={{flex:0.45, backgroundColor: "white", height: 1, paddingLeft: 16}}></View>
          <View style={{flex:0.5, alignItems: "center", justifyContent: "center", paddingHorizontal: 8}}>
            <Text style={{color: "white"}}>Gym Sessions</Text>
          </View>
          <View style={{flex:0.45, backgroundColor: "white", height: 1, paddingRight: 16}}></View>
        </View>

        <FreeSessionsCard 
          key={'FreeSessions'}
          cardTitle={"Time to train"}  // Display the program name
          modalPress = {setSingleSessionsVisible}
        />

        {/* Section Header Purchased Programs */}
        <View style={{flexDirection: "row", paddingVertical: 10, alignItems: "center", justifyContent: "center"}}>
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
            } if (programName.toLowerCase().includes('singlesession')) {
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
        <View style={{flexDirection: "row", paddingVertical: 10, alignItems: "center", justifyContent: "center"}}>
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
            } if (programName.toLowerCase().includes('singlesession')) {
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
  );
}

