import { StyleSheet } from "react-native";

export const LoginStyles = StyleSheet.create({
    ParentContainer: {
        flex: 1, justifyContent: "center", paddingHorizontal: 16, paddingVertical: 20
    },
    ChildContainer: {
        flex: 1, backgroundColor: "white", 
        justifyContent: "center", 
        alignContent: "center", 
        alignItems: "center",
        borderColor: "white",
        borderWidth: 2,
        borderRadius: 30,
        paddingVertical: 16 ,
        paddingHorizontal: 16
    },
    ImageParentContainer: {
        flex: 0.6, flexDirection: "row", paddingTop: 20
    },
    ImageChildContainer: {
        flex:0.6, flexDirection: "column", paddingHorizontal: 20, borderRadius: 8
    },
    TextParentContainer: {
        flex: 0.1, flexDirection: "row"
    },
    WelcomeTextContainer: {
        flex: 0.5, flexDirection: "column", justifyContent: "flex-end"
    },
    WelcomeText: {
        color: "black", fontSize: 20, textAlign: 'right'
    },
    HGFitnessText: {
        fontFamily: 'Edo', color: "black", fontSize: 28, textAlign: 'left'
    },
    SubTextContainer: {
        flex: 0.05, flexDirection: "row", backgroundColor: 'white', paddingHorizontal: "10%"
    },
    SubText: {
        color: "grey", fontSize: 14, textAlign: 'center', textAlignVertical: 'center'
    },
    ButtonParentContainer: {
        flex: 0.075, flexDirection: "row", justifyContent: 'center', paddingVertical: 10
    },
    ButtonPressable: {
        flex: 0.8, flexDirection: "column", borderRadius: 100, borderWidth: 1, justifyContent: 'center'
    },
    ButtonText: {
        fontSize: 18, textAlign: 'center'
    },
    ModalSpinner: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    InputParentContainer: {
        flex: 0.05, flexDirection: "row"
    },
    InputChildContainer: {
        flex: 1, flexDirection: 'column'
    },
    InputTextTitle: {
        flex: 0.5, flexDirection: "row", justifyContent: "center"
    },
    InputTextTitleText: {
        color: "grey", fontSize: 16, textAlignVertical: 'bottom'
    },
    TextInputParentContainer: {
        flex: 0.5, flexDirection: "row", alignItems: "center"
    },
    TextInputContainer: {
        flex: 1, 
        flexDirection: "column", 
        justifyContent: "center", 
        alignItems: "center",
        borderWidth: 2,
        borderRadius: 8,
    },
    TextInputBox: {
        width: '100%', fontSize: 20, color: "black"
    }

})