import { StyleSheet } from "react-native";

export const ExerciseDescriptions = StyleSheet.create({
    ModalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#000000aa',
    },
    ModalScrollBox: {
        backgroundColor: '#111111ff',
        paddingHorizontal: 8,
        borderRadius: 10,
        borderColor: 'grey',
        borderWidth: 2,
        width: '90%',
        maxHeight: "80%",  // Cap the modal height
        alignSelf: 'center',
    },
    ModalDescriptionBox: {
        backgroundColor: '#111111ff',
        paddingVertical: 8,
    },
    ModalTitleParentBox: {
        flex: 1, 
        flexDirection: 'column', 
        justifyContent: 'center',
    },
    ModalTitleBox: {
        backgroundColor: '#414141ff',
        paddingVertical: 4,
        borderRadius: 8,
        borderWidth: 1,
    },
    ModalTitle: {
        color: 'white',
        fontSize: 20, 
        fontWeight: 'bold', 
        paddingBottom: 0,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    ModalSwitchBox: {
        flex: 0.55, 
        flexDirection: 'row', 
        paddingHorizontal: 4, 
        paddingVertical: 4,
        justifyContent: 'center', 
        alignItems: 'center',
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 8,
    },
    ModalSpacer: {
        flex: 0.1, 
        flexDirection: 'row'
    },
    ModalSubtitleBox: {
        paddingTop: 10,
        paddingBottom: 10
    },
    ModalSubtitleText: {
        color: 'white',
        textAlign: 'center',
        fontStyle: 'italic',
        fontSize: 18
    },
    ModalText: {
        paddingVertical: 5,
        color: 'white',
        textAlign: 'center'
    },
    ModalMappingBox: {
        alignItems: 'center', 
        paddingTop: 10, 
        paddingBottom: 5
    },
    ModalStepNumber: {
        color: 'lime', 
        fontSize: 14, 
        fontWeight: 'bold', 
        alignContent: 'center'
    },
    ModalCloseText: {
        color: 'white', 
        textAlign: 'left',
        paddingLeft: 18,
        fontSize: 16
    },
    ModalGifParentBox: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignContent: 'center'
    },
    ModalGifChildBox: {
        height: 200, 
        width: 200, 
        paddingVertical: 10
    }
})