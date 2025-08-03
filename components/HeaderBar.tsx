import { useAppContext } from "@/components/appContext";
import { DefaultTabStyles } from "@/components/HGStyles";
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { useState } from "react";
import { Pressable, Text, View } from 'react-native';
import NotificationsModal from "./NotificationsModal";

export function HGHeader() {
    const title = "HOOLIGAINS";
    const { notifications } = useAppContext();
    const [notificationsVisible, setNotificationsVisible] = useState(false);

    return(
        <>
        <NotificationsModal
        visible={notificationsVisible}
        notifications={notifications}
        onClose={() => setNotificationsVisible(false)}
        />
        <View style={DefaultTabStyles.hgHeaderContainer}>
            {/* <Image source={require("@/assets/images/OfficialLogo.jpg")} style={{ flex: 0.15, resizeMode: "contain" }} /> */}
            <Text style={{flex: 0.9, paddingLeft: 5, fontFamily: 'Edo', fontSize: 34, color: 'white', textAlign: 'left'}}>{title}</Text>
            <Pressable onPress={() => setNotificationsVisible(true)} style={{flex: 0.1}}>
                <TabBarIcon name={'notifications'} color="white" />
            </Pressable>
        </View>
        <View style={{borderWidth: 0.5, borderColor: "white", marginTop: 0, marginBottom: 0}}></View>
        </>
    );
}