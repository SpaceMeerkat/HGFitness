import { TrackingNotesStyles } from "@/components/HGStyles";
import { Pressable, Text, View } from "react-native";

type ApparelProps = {
    handleBackButton: () => boolean;
  };

export function ApparelShop({handleBackButton}: ApparelProps) {
    const emptyText = "Coming soon...";

    return (
        <View style={{height: "100%", backgroundColor: "black"}}>
            <Pressable style={{flex: 0.05, paddingLeft: 18, paddingTop: 20, paddingBottom: 0, justifyContent: 'center'}} onPress={handleBackButton}>
                <Text style={[TrackingNotesStyles.backButtonText]}>Back</Text>
            </Pressable>
            <View style={{flex: 1, justifyContent: 'center', paddingBottom: 30}}>
                <Text style={{color: "white",  textAlign: 'center', textAlignVertical: "center"}}>
                    {emptyText}
                </Text>
            </View>
        </View>
    )
}