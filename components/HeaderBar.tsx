import { useAppContext } from "@/components/appContext";
import { DefaultTabStyles } from "@/components/HGStyles";
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { useState } from "react";
import { Pressable, Text, View } from 'react-native';
import NotificationsModal from "./NotificationsModal";
import PremiumModal from "./premium/PremiumModal";


export function HGHeader() {
    const { profile, setProfile } = useAppContext();
    const [notificationsVisible, setNotificationsVisible] = useState(false);
    const [premiumVisible, setPremiumVisible] = useState(false);
    const premiumState = profile?.premium;

    const title = premiumState ? "HOOLIGAINS PRO" : "HOOLIGAINS";

    return(
        <>
        <NotificationsModal
        visible={notificationsVisible}
        notifications={profile?.notifications}
        onClose={() => setNotificationsVisible(false)}
        />
        <PremiumModal
        visible={premiumVisible}
        onClose={() => setPremiumVisible(false)}
        />
        <View style={DefaultTabStyles.hgHeaderContainer}>
            {/* <Image source={require("@/assets/images/OfficialLogo.jpg")} style={{ flex: 0.15, resizeMode: "contain" }} /> */}
            <Text style={{flex: 0.9, paddingLeft: 5, fontFamily: 'Edo', fontSize: 34, color: 'white', textAlign: 'left'}}>
                HOOLIGAINS
                {premiumState && (
                    <View style={{paddingLeft: 6, justifyContent: 'center'}}>
                        <View style={{borderColor: 'grey', borderWidth: 1, borderRadius: 10, justifyContent: 'center', paddingLeft: 3, paddingRight: 5}}>
                        <Text style={{ color: 'white', fontSize: 10, textAlign: 'center' }}> PREMIUM</Text>
                        </View>
                    </View>
                )}
            </Text>
            <Pressable onPress={() => setNotificationsVisible(true)} style={{flex: 0.12}}>
                <TabBarIcon name={'notifications'} size={28} color="white" />
            </Pressable>
            <Pressable onPress={() => setPremiumVisible(true)} style={{flex: 0.12}}>
                <SimpleLineIcons name="menu" size={28} color="white" style={{textAlign: 'right'}} />
            </Pressable>
        </View>
        <View style={{borderWidth: 0.5, borderColor: "white", marginTop: 0, marginBottom: 0}}></View>
        </>
    );
}