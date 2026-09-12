import { useAppContext } from "@/components/appContext";
import { DefaultTabStyles, ProgramStyles, ShopStyles, TrackingNotesStyles } from "@/components/HGStyles";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import LinkedWeeksModal from "./LinkedWeeksModal";
import Calendar from "./StreakCalendar";
import ViewModeModal from "./ViewModeModal";

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
  streakDates: any;
  setTrackingMode: any; 
};

export function ProgramOverview({ programLevel, programData, programDay, programID, completedKeys, handleChildPage, streakDates, setTrackingMode}: ProgramOverviewProps) {

  const { profile, trackingData } = useAppContext();
  const isPremium = profile?.premium === true || profile?.gymSubscription === true;

  // memoryKeys holds groups of linked weeks (e.g. "1,3,5" / "2,4,6,8") that share
  // tracking memory/notes with one another - see FindPrecedingNumber.
  const memoryKeys: string[] = trackingData?.[programID]?.["memoryKeys"] || [];
  const getLinkedWeeksGroup = (week: string): string[] | null => {
    for (const keyString of memoryKeys) {
      const weeksArray = keyString.split(",");
      if (weeksArray.includes(week)) {
        return weeksArray;
      }
    }
    return null;
  };

  const [viewModeVisible, setViewModeVisible] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [triggerRedirect, setTriggerRedirect] = useState(false);
  const [premiumAlertVisible, setPremiumAlertVisible] = useState(false);
  const [linkedWeeksModalVisible, setLinkedWeeksModalVisible] = useState(false);
  const [selectedLinkedWeeks, setSelectedLinkedWeeks] = useState<string[]>([]);

  const calendarBoolean = programID.toLowerCase().includes("subscription");
  let streakThreshold = 0;
  if (calendarBoolean) {
    streakThreshold = programID.match(/Subscription(\d+)Day/)[1];
  } else {
    streakThreshold = 0
  }
  
  const renderCalendar = () => {
    // Renders the streak calendar if the user is showing the subscription page

    if (calendarBoolean && streakThreshold) {
    return (
      <View style={{flex: 1, paddingBottom: 16, paddingTop: 6}}>
        <Calendar streakDates={streakDates} streakThreshold={streakThreshold} />
      </View>
    )
  } else {
    return (
      null
    )
  }}

  const setViewModeTrue = (week: string, day: string) => {
    setViewModeVisible(true);
    setSelectedWeek(week);
    setSelectedDay(day);
  }

  useEffect (() => {
    if (selectedWeek && selectedDay) {
      setViewModeVisible(false);
      handleChildPage('programTracking', programID, programData, [selectedWeek, selectedDay]);
    }
  }, [triggerRedirect])

  const renderDays = (weekData: Week, weekNumber: string, completedKeys?: any) => {
    return Object.keys(weekData).map(day => {
      const key = `${weekNumber}_${day}`;
      const isCompleted = completedKeys.includes(key);
      const opacity = isCompleted ? 0.5 : 1;
      const iconOpacity = isCompleted ? 1 : 0; // Independent opacity for tick
  
      return (
        <View key={key} style={{ position: "relative" }}>
          <Pressable
            onPress={() => isPremium
              ? setViewModeTrue(weekNumber, day)
              : setPremiumAlertVisible(true)}
            // onPress={() => handleChildPage('programTracking', programID, programData, [weekNumber, day])}
          >
            <View style={[ProgramStyles.programOverviewDay, { height: 50, opacity }]}>
              <Text style={[DefaultTabStyles.defaultMediumText, ProgramStyles.programText]}>
                Day {day} - {weekData[day].type}
              </Text>
            </View>
          </Pressable>

          {/* Locked overlay for non-premium / non-subscribed users, touches pass through to the Pressable above */}
          {!isPremium && (
            <View
              pointerEvents="none"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="lock-closed" size={22} color="white" />
            </View>
          )}

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
    return Object.keys(programData).map(week => {
      const linkedWeeks = getLinkedWeeksGroup(week);

      return (
        <View key={`week-${week}`}>
          <View style={[ProgramStyles.programOverviewWeek, { flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap' }]}>
            <Text style={[{fontFamily: 'Edo', fontSize: 28}, ShopStyles[(programLevel || 'beginner') as ProgramLevel]]}>
              Week {week}
            </Text>
            {linkedWeeks && (
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'flex-end' }}
                onPress={() => {
                  setSelectedLinkedWeeks(linkedWeeks);
                  setLinkedWeeksModalVisible(true);
                }}
              >
                <FontAwesome5 name="link" size={14} color="grey" style={{ marginRight: 4, paddingLeft: 14 }} />
                <Text style={{ fontSize: 14, color: 'grey' }}>
                  {linkedWeeks.map((linkedWeek, i) => (
                    <Text key={linkedWeek}>
                      {linkedWeek}
                      {i < linkedWeeks.length - 1 ? '-' : ''}
                    </Text>
                  ))}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          {renderDays(programData[week], week, completedKeys)}
          <View style={{height: 30}}></View>
        </View>
      );
    });
  };


  return (
      <ScrollView contentContainerStyle={{ paddingTop: 8, paddingBottom: 20, paddingHorizontal: 16 }}>
        <ViewModeModal setTrackingMode={setTrackingMode} setTriggerRedirect={setTriggerRedirect} visible={viewModeVisible} onClose={() => setViewModeVisible(false)}/>
        <LinkedWeeksModal linkedWeeks={selectedLinkedWeeks} visible={linkedWeeksModalVisible} onClose={() => setLinkedWeeksModalVisible(false)}/>

        {/* Premium gate alert */}
        <Modal visible={premiumAlertVisible} transparent animationType="fade">
          <Pressable
            style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', alignItems: 'center', justifyContent: 'center' }}
            onPress={() => setPremiumAlertVisible(false)}>
            <Pressable
              style={{ backgroundColor: 'black', borderRadius: 16, borderWidth: 1, borderColor: 'grey', paddingHorizontal: 28, paddingVertical: 24, width: '78%', alignItems: 'center' }}
              onPress={() => {}}>
              <Ionicons name="lock-closed" size={32} color="white" style={{ marginBottom: 12 }} />
              <Text style={{ color: '#ccc', fontSize: 14, textAlign: 'center', lineHeight: 20, marginBottom: 8 }}>
                Upgrade to{' '}
                <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold', fontStyle: 'italic' }}>premium</Text>
                {' '}to enjoy monthly gym subscription plans!
              </Text>
              <TouchableOpacity
                onPress={() => setPremiumAlertVisible(false)}
                style={{ marginTop: 20, paddingHorizontal: 32, paddingVertical: 10, backgroundColor: 'white', borderRadius: 100 }}>
                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 14 }}>OK</Text>
              </TouchableOpacity>
            </Pressable>
          </Pressable>
        </Modal>
        <TouchableOpacity style={{flex: 0.15, width: "20%", paddingLeft: 2, paddingTop: 10, paddingBottom: 28, justifyContent: 'center'}} onPress={() => handleChildPage('programs')}>
            <Text style={[TrackingNotesStyles.backButtonText]}>Back</Text>
        </TouchableOpacity>
        <View>
          {renderCalendar()}
          {renderWeeks(programData, completedKeys)} 
        </View>
      </ScrollView>
  );
}
