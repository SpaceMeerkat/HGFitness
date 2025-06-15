import { StyleSheet } from "react-native";

export const ProfileStyles = StyleSheet.create({
    MealStatsParentContanier: {
        backgroundColor: 'black', 
        flex: 1, 
        paddingTop: 10,
        borderColor: 'grey',
        borderWidth: 2,
        borderRadius: 8,
        paddingHorizontal: 2,
        paddingBottom: 2,
    },
    ProfileSpacer: {
        paddingVertical: 5
    },
    MealChartButtonsContainer: {
        flex: 0.2, 
        flexDirection: 'row', 
        backgroundColor: 'black', 
        paddingTop: 15, 
        paddingBottom: 10,
        paddingHorizontal: 6,
        justifyContent: 'space-between'
    },
    MealChartButtons: {
        flex: 0.24, 
        flexDirection: 'column', 
        backgroundColor: 'black', 
        paddingHorizontal: 0, 
        paddingVertical: 8,
        borderRadius: 8,
        borderColor: 'grey',
        borderWidth: 2
    },
    StatsHeaderContainer: {
        flex: 0.2, 
        backgroundColor: 'black',
    },
    StatsHeaderText: {
        color: 'white', 
        textAlignVertical: 'center', 
        textAlign: 'center',
        fontSize: 34,
        paddingLeft: 6,
        fontFamily: 'Edo'
    }
})


export const ShopStyles = StyleSheet.create({
    CardInfoOverlayContainer: {
        flex: 1,
        flexDirection: 'column',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: 20,
    },
    cardInfoContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingBottom: 0,
        paddingHorizontal: 10,
        backgroundColor: "black",
        borderRadius: 10,
        borderWidth: 2,
        paddingTop: 16,
    },
    cardInfoStackContainerCentered: {
        flex: 1,
        flexDirection: 'column',
        alignItems: "center",
        paddingBottom: 15, // To ensure inner padding instead of margin
        justifyContent: 'center',
        alignContent: 'center',
    },
    cardInfoStackContainerLeft: {
        flex: 1,
        flexDirection: 'column',
        alignItems: "flex-start",
        paddingBottom: 15, // To ensure inner padding instead of margin
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'black'
    },
    cardInfoStackChild: {
        flex: 1,
        flexDirection: 'column',
        alignItems: "center",
        paddingBottom: 15, // To ensure inner padding instead of margin
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'black'
    },
    cardName: {
        fontFamily: 'Edo',
        fontSize: 32,
        color: 'white',
        paddingBottom: 10,
        textAlign: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    },
    cardSlogan: {
        fontSize: 14,
        color: 'white',
        paddingBottom: 10,
        fontStyle: 'italic',
        textAlign: 'center'
    },
    cardLevel: {
        fontSize: 14,
        fontWeight: "600",
        paddingBottom: 0,
        color: 'white',
        textAlign: 'left',
    },
    cardPrice: {
        fontSize: 14,
        paddingBottom: 0,
        color: 'white',
    },
    cardDays: {
        fontSize: 14,
        color: 'white',
        paddingBottom: 26,
    },
    cardOverview: {
        fontSize: 16,
        color: 'white',
        paddingBottom: 26,
    },
    cardFeatures: {
        fontSize: 14,
        color: 'white',
        paddingBottom: 6,
    },
    indentedFeature: {
        paddingLeft: 20,
    },
    cardGoals: {
        fontSize: 14,
        color: 'white',
        paddingBottom: 6,
    },
    cardWhy: {
        fontSize: 14,
        color: 'white',
        paddingBottom: 20,
    },
    shopScrollContainer: {
      paddingHorizontal: 16,
      paddingTop: 8,
      paddingBottom: 16,
      marginBottom: 0,
      marginTop: 0,
    },
    shopBlockContainer: {
      flexDirection: "row",
      backgroundColor: "black",
      borderColor: "grey",
      borderWidth: 2,
      borderRadius: 8,
      marginVertical: 5,
      alignItems: "center",
      overflow: "hidden",
    },
    shopProgramsContainer: {
        flexDirection: "row",
        height: 200,
        backgroundColor: "black",
        borderColor: "grey",
        borderWidth: 2,
        borderRadius: 8,
        marginVertical: 5,
        alignItems: "center",
        overflow: "hidden",
      },
    shopMealsContainer: {
        flexDirection: "row",
        height: 200,
        backgroundColor: "black",
        borderColor: "grey",
        borderWidth: 2,
        borderRadius: 8,
        marginVertical: 5,
        alignItems: "flex-start",
        overflow: "hidden",
      },
    shopLevelContainer: {
        flexDirection: "row",
        flex: 1,
        backgroundColor: "black",
        borderColor: "grey",
        borderWidth: 2,
        borderRadius: 8,
        marginVertical: 5,
        alignItems: "center",
        height: 155,
      },
    shopHotRowContainer: {
        flexDirection: 'row', gap: 4, paddingVertical: 2
    },
    shopHotSpacer: {
        paddingLeft: 10, 
        paddingRight: 10, paddingVertical: 0, 
        justifyContent: 'center',
        borderWidth: 2, borderRadius: 8,
        backgroundColor: 'dimgrey',
        opacity: 0.4
    },
    shopHotButton: {
        paddingLeft: 10, 
        paddingRight: 10, paddingVertical: 0, 
        justifyContent: 'center',
        borderWidth: 2, borderRadius: 8, borderColor: 'grey',
        backgroundColor: 'black'
    },
    shopHotLeft: {
        flex: 1,
        paddingLeft: 10, 
        paddingRight: 10, paddingVertical: 0, 
        justifyContent: 'flex-start',
        // borderWidth: 2, borderRadius: 8, borderColor: 'grey'
    },
    shopHotRight: {
        flex: 1,
        paddingLeft: 10, paddingRight: 10, paddingVertical: 0, 
        justifyContent: 'flex-start',
        // backgroundColor:'black',
        // borderWidth: 2, borderRadius: 8, borderColor: 'grey'
    },
    cardBlockContainer: {
        justifyContent: "space-around",
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: "transparent",
        marginVertical: 10,
        paddingVertical: 10,
    },
    mealCard: {
        flex: 0.5,
        height: 240,
        minWidth: 130,
        maxWidth: 155,
        marginHorizontal: 4,
        marginVertical: 4,
        backgroundColor: "#5b5b5b",
        borderRadius: 8,
        borderColor: "white",
        borderWidth: 2,
        elevation: 4,
    },
    gymCardImage: {
        width: '100%',
        height: '100%',
      },
    gymCardTextName: {
        paddingVertical: 0,
        backgroundColor: 'black',
        paddingHorizontal: 8,
        flex: 0.2, 
        justifyContent: "flex-end", 
        alignItems: 'center',
    },
    gymCardTextDays: {
        paddingVertical: 0,
        paddingHorizontal: 8,
        flex: 0.1, 
        justifyContent: "center", 
        alignItems: 'center',
    },
    gymCardTextTop: {
        paddingHorizontal: 8,
        flex: 0.42, 
        justifyContent: "center", 
        alignItems: 'center',
        backgroundColor: "gold",
        borderRadius: 8,
    },
    gymCard: {
        flex: 1,
        height: 240,
        minWidth: 130,
        maxWidth: 155,
        marginVertical: 4,
        borderRadius: 8,
        borderColor: "white",
        borderWidth: 1,
        elevation: 4,
        paddingHorizontal: 0,
        paddingBottom: 4,
        backgroundColor: "black",
    },
    myProgramsBlockContainer: {
        flexDirection: "row",
        height: 100,
        backgroundColor: "black",
        borderColor: "grey",
        borderWidth: 1,
        borderRadius: 8,
        paddingTop: 8,
        paddingLeft: 16,
        paddingRight: 6,
        marginTop: 4,
        marginBottom: 8,
        alignItems: "center",
      },
    advanced: {
        borderColor: 'magenta',
        color: 'magenta',
    },
    advancedFill: {
        backgroundColor: 'magenta',
    },
    intermediate: {
        borderColor: 'gold',
        color: 'gold'
    },
    intermediateFill: {
        backgroundColor: 'gold',
    },
    beginner: {
        borderColor: 'cyan',
        color: 'cyan',
    },
    beginnerFill: {
        backgroundColor: 'cyan',
    },
  })

  export const SpinnerStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
        position: 'relative',
    },
    spinnerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for the spinner
    },
    pressableCover: {
        ...StyleSheet.absoluteFillObject,
        // This will make the Pressable cover the entire area, adjust if needed
        zIndex: 1, // Ensure it's on top
    },
    shopSpinnerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    shopSpinnerOverlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
        position: 'relative',
    },
    shopSpinnerSpinnerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for the spinner
        zIndex: 2, // Ensure it's on top
    },
});

  export const ProgramStyles = StyleSheet.create({
    completedTickIcon: {
        position: "absolute",
        top: -5, 
        right: 10, 
      },
    programOverviewDay: {
        flexDirection: "row",
        height: 50,
        backgroundColor: "dimgray",
        borderColor: "dimgray",
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 60,
        marginVertical: 5,
        marginHorizontal: 20,
        alignItems: "center",
        justifyContent: "flex-start",
      },
    programText: {
        color: "white",
    },
    programOverviewDayComplete: {
        flexDirection: "row",
        height: 50,
        backgroundColor: "dimgray",
        borderColor: "grey",
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 16,
        marginVertical: 5,
        marginHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
      },
    programTextComplete: {
        color: "darkgray",
    },
    programOverviewWeek: {
        flexDirection: "row",
        height: 30,
        marginBottom: 5,
        alignItems: "center",
      },
    trackingActive: {
        flexDirection: "column",
        flex: 1,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: "grey",
        paddingVertical: 8,
        borderRadius: 4,
        backgroundColor: "black"
    },
    trackingChildContainer: {
        backgroundColor: "black",
        flex: 0.2,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center',
        paddingBottom: 2,
        paddingVertical: 0,
    },
    trackingType: {
        backgroundColor: "black",
        flexDirection: "row",
        flex: 0.2,
        justifyContent: 'center',
        paddingVertical: 0,
        paddingHorizontal: 2,
        paddingTop: 10,
        paddingBottom: 15,
        alignItems: "center",
    },
    trackingExerciseHeader: {
        backgroundColor: "black",
        flexDirection: "row",
        flex: 0.25,
        justifyContent: 'flex-end',
        paddingVertical: 10,
        alignItems: "center",
        paddingHorizontal: 0,
    },
    trackingExercise: {
        backgroundColor: "black",
        flexDirection: "row",
        flex: 0.25,
        justifyContent: 'flex-end',
        paddingVertical: 0,
        paddingHorizontal: 0,
    },
    trackingInputHeader: {
        flexDirection: "row",
        flex: 0.175,
        justifyContent: 'center',
        paddingVertical: 10,
        alignItems: "center",
        paddingHorizontal: 0,
    },
    trackingWeight: {
        backgroundColor: "black",
        flexDirection: "row",
        flex: 0.3,
        justifyContent: 'center',
        paddingVertical: 0,
        alignItems: "center",
        paddingHorizontal: 0,
    },
    trackingInactive: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "center",
        paddingVertical: 5,
        backgroundColor: "grey",
        marginVertical: 5,
        borderWidth: 1,
        borderRadius: 4,
    },
    trackingInputContainer: {
        flex: 1,
        flexDirection: "row",
    },

    trackingContainer: {
        flexDirection: "row",
        backgroundColor: "black",
        flex: 0.175,
        borderColor: 'black',
        justifyContent: 'center',
        paddingVertical: 0
    },
    trackingExerciseInput: {
        backgroundColor: "grey",
        flex: 0.75,
        borderColor: 'black',
        borderWidth: 0,
        borderRadius: 4,
        height: 45,
    },
    trackingWeightInput: {
        backgroundColor: "grey",
        flex: 0.75,
        borderColor: 'black',
        borderWidth: 0,
        borderRadius: 4,
        height: 45,
    },
    trackingSaveButton: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "center",
        paddingVertical: 5,
        backgroundColor: "black",
        marginVertical: 5,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: "grey",
    },
    trackingNotesContainer: {
        flex: 1
    },
  })

  export const TrackingNotesStyles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '80%',
        backgroundColor: 'black',
        borderRadius: 8,
        borderColor: "white",
        borderWidth: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
    backButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: "white",
    },
    body: {
        fontSize: 16,
        marginBottom: 20,
        color: "white",
        textAlign: 'center',
    },
    textInput: {
        width: '100%',
        height: 100,
        backgroundColor: "white",
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
        textAlignVertical: 'top',
    },
    saveButton: {
        backgroundColor: 'cyan',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 4,
    },
    saveButtonText: {
        color: 'black',
        fontWeight: 'bold',
    },
  })

  export const DefaultTabStyles = StyleSheet.create({ 
    hgHeaderContainer: {
        flexDirection: "row",
        backgroundColor: "black",
        height: 50,
        alignItems: "center",
        marginTop: 8,
        marginBottom: 2,
        marginHorizontal: 12,

    },
    defaultContainer: {
        flex: 1,
        flexGrow: 1,
        backgroundColor: "black",
    },
    defaultBodyText: {
        paddingTop: 8,
        fontSize: 11,
        color: "white"
    },
    defaultCardNameText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "white",
    },
    defaultMediumText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "white",
    },
    defaultTypeText: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
    },
    defaultHeaderText: {
        fontSize: 25,
        color: "white",
        fontWeight: "bold",
    },
    defaultBoldRepText: {
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
    },
    defaultTrackingText: {
        color: "magenta",
        fontSize: 11,
    },
    defaultTrackingExerciseText: {
        color: "white",
        fontSize: 12,
    },
    defaultBoldText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: 'Edo',
    },
})

