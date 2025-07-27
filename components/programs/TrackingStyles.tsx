import { StyleSheet } from "react-native";

export const ExerciseDescriptions = StyleSheet.create({
    ModalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000aa',
    },
    ModalScrollBox: {
        backgroundColor: '#111111ff',
        paddingHorizontal: 20,
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 2,
        width: '90%',
        maxHeight: "80%",  // Cap the modal height
        alignSelf: 'center',
    },
    ModalDescriptionBox: {
        backgroundColor: '#111111ff',
        paddingVertical: 20,
    },
    ModalTitleBox: {
        backgroundColor: '#000000ff',
        paddingVertical: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'grey',
    },
    ModalTitle: {
        color: 'white',
        fontSize: 20, 
        fontWeight: 'bold', 
        paddingBottom: 0,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    ModalSubtitleBox: {
        paddingTop: 10,
    },
    ModalSubtitleText: {
        color: 'white',
        textAlign: 'center',
        fontStyle: 'italic',
        fontSize: 16
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
        textAlign: 'left'
    }
})