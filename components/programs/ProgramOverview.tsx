import { DefaultTabStyles, ProgramStyles, ShopStyles } from "@/components/HGStyles";
import Ionicons from '@expo/vector-icons/Ionicons';
import { ImageBackground, Pressable, ScrollView, Text, View } from "react-native";

type Exercise = any; // Define the type of exercises if you have more details

type Day = {
exercises: Exercise[];
type: string;
};

type Week = {
[day: string]: Day;
};

type ProgramData = {
[week: string]: Week;
};

type ProgramLevel = 'advanced' | 'intermediate' | 'beginner';

type PageType = 'programs' | 'programOverview' | 'programTracking';

type ProgramOverviewProps = {
  programLevel: any;
  programID: any;
  programData: any;
  programDay: any;
  completedKeys: any;
  handleChildPage: (page: 'programs' | 'programOverview' | 'programTracking', programLevel?: any, programID?: any, programData?: any, programDay?: any, completedKeys?: any) => void;
};

export function ProgramOverview({ programLevel, programData, programDay, programID, completedKeys, handleChildPage }: ProgramOverviewProps) {
  
  const image = require("@/assets/images/HGBackground.png");

  const renderDays = (weekData: Week, weekNumber: string, completedKeys?: any) => {
    return Object.keys(weekData).map(day => {
      const key = `${weekNumber}_${day}`;
      const isCompleted = completedKeys.includes(key);
      const opacity = isCompleted ? 0.5 : 1;
      const iconOpacity = isCompleted ? 1 : 0; // Independent opacity for tick
  
      return (
        <View key={key} style={{ position: "relative" }}>
          <Pressable 
            onPress={() => handleChildPage('programTracking', programID, programData, [weekNumber, day])}
          >
            <View style={[ProgramStyles.programOverviewDay, { height: 50, opacity }]}>
              <Text style={[DefaultTabStyles.defaultMediumText, ProgramStyles.programText]}>
                Day {day} - {weekData[day].type}
              </Text>
            </View>
          </Pressable>
  
          {/* Tick mark placed separately so it is NOT affected by Pressable's opacity */}
          <Ionicons 
            name="checkmark-circle" 
            size={24} 
            color="lime" 
            style={[ProgramStyles.completedTickIcon, { opacity: iconOpacity }]} 
          />
        </View>
      );
    });
  };


  const renderWeeks = (programData?: any, completedKeys?: any) => {
    return Object.keys(programData).map(week => (
      <View key={`week-${week}`}>
        <View style={ProgramStyles.programOverviewWeek}>
          <Text style={[{fontFamily: 'Edo', fontSize: 28}, ShopStyles[(programLevel || 'beginner') as ProgramLevel]]}>
            Week {week}
          </Text>
        </View>
        {renderDays(programData[week], week, completedKeys)}
        <View style={{height: 30}}></View>
      </View>
    ));
  };


  return (
    <ImageBackground source={image} resizeMode="cover" style={{flex: 1, width: '100%', height: '100%'}}>
      <ScrollView contentContainerStyle={{ paddingTop: 8, paddingBottom: 20, paddingHorizontal: 16 }}>
        <View>
          {renderWeeks(programData, completedKeys)}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
