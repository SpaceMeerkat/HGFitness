import { StyleSheet } from "react-native";

export const MealTrackingStyles = StyleSheet.create({
    TrackingOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        justifyContent: "center",
        alignItems: "center",
    },
    TrackingOptionsContainer: {
        width: "90%",
        height: "90%",
        backgroundColor: "black",
        padding: 0,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'grey',
        overflow: 'hidden'
    },
    TrackingBackButton: {
        alignSelf: "flex-start", 
        paddingTop: 5, 
        paddingLeft: 5, 
        paddingBottom: 8
    },
    MealOptionOuterContainer: {
        minHeight: 115,
        paddingVertical: 10,
        flex: 1,
        flexDirection: 'column',
        padding: 5,
        paddingHorizontal: 20,
    },
    MealOptionLayoutContainer: {
        minHeight: 115,
        flex: 1,
        flexDirection: 'column',
        padding: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "white",
        backgroundColor: "black"
    },
    AddMealButton: {
        flex: 0.5,
        flexDirection: 'column',
        paddingVertical: 5,
        paddingHorizontal: 0,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "lime",
        backgroundColor: "black",
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    WaterOptionOuterContainer: {
        minHeight: 100,
        paddingVertical: 5,
        flex: 1,
        flexDirection: 'column',
        padding: 5,
        backgroundColor: "black"
    },
    WaterOptionLayoutContainer: {
        minHeight: 100,
        flex: 1,
        flexDirection: 'column',
        padding: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "white",
        backgroundColor: "black"
    },
    AddWaterButton: {
        flex: 0.3,
        flexDirection: 'column',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "lime",
        backgroundColor: "black",
        justifyContent: 'center'
    },
    WaterAmountBlock: {
        flex: 0.5,
        flexDirection: 'column',
        paddingLeft: 0,
        backgroundColor: "black",
        justifyContent: 'center'
    },
    WaterAmountText: {
        color: 'white',
        fontSize: 26,
        textAlign: 'center'
    },
    WaterIconsBlock: {
        flex: 0.2,
        flexDirection: 'column',
        padding: 10,
        backgroundColor: "black",
        justifyContent: 'center'
    },
    WaterIconsRow: {
        flex: 0.5,
        flexDirection: 'row',
        backgroundColor: "black",
        justifyContent: 'center',
    },
    WaterIconsIconContainer: {
        flex: 0.5,
        flexDirection: 'column',
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: "black",
        justifyContent: 'center',
        alignItems: 'center',
    },
    WaterIconsText: {
        alignItems: 'center',
    },
    WaterCustomBlock: {
        flex: 0.65,
        flexDirection: 'column',
        paddingHorizontal: 10,
        backgroundColor: "black",
        justifyContent: 'center',
    },
    WaterCustomUnitsBlock: {
        flex: 0.05,
        flexDirection: 'column',
        paddingLeft: 0,
        backgroundColor: "black",
        justifyContent: 'center'
    },
    InstructionsOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        paddingTop: 30,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        justifyContent: "center",
        alignItems: "center",
    },
})

