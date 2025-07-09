import { DefaultTabStyles } from "@/components/HGStyles";
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Text, View } from 'react-native';

export function HGHeader() {
    const title = "HOOLIGAINS";
    return(
        <>
        <View style={DefaultTabStyles.hgHeaderContainer}>
            {/* <Image source={require("@/assets/images/OfficialLogo.jpg")} style={{ flex: 0.15, resizeMode: "contain" }} /> */}
            <Text style={{flex: 0.9, paddingLeft: 5, fontFamily: 'Edo', fontSize: 34, color: 'white', textAlign: 'left'}}>{title}</Text>
            <View style={{flex: 0.1}}>
                <TabBarIcon name={'notifications'} color="white" />
            </View>
        </View>
        <View style={{borderWidth: 0.5, borderColor: "white", marginTop: 0, marginBottom: 0}}></View>
        </>
    );
}