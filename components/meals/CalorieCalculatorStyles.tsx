import { StyleSheet } from "react-native";

export const CalcStyles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#000000ff',
    borderWidth: 2,
    borderColor: 'grey',
    borderRadius: 12,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
    maxHeight: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    overflow: 'hidden'
  },
  inputBlock: {
    flex: 1,
    paddingVertical: 6,
    justifyContent: 'center',
  },
  inputTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputTitleText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    textAlignVertical: 'center'
  },
  tickOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    },
  tickInputRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 2,
  },
  textTick: {
    color: 'white',
    fontSize: 18,
    paddingLeft: 4
  },
  textInputRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 8,
  },
  textInput: {
    flex: 0.8, // 80% of horizontal space
    borderWidth: 1,
    borderColor: '#ffffffff',
    backgroundColor: '#99999977',
    borderRadius: 8,
    padding: 8,
    textAlign: 'center',
    justifyContent: 'center',
    color: 'white'
  },
  closeButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 100,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  closeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  calculateBlock: {
    flex: 1,
    width: '50%',
    paddingVertical: 6,
    justifyContent: 'center',
  },
  calculateButton: {
    flex: 1, backgroundColor: 'black', borderColor: 'white', borderRadius: 200, borderWidth: 1, justifyContent: 'center', paddingVertical: 4
  },
  calculateButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  recalculateButton: {
    flex: 0.05, backgroundColor: 'black', borderColor: 'white', borderRadius: 200, borderWidth: 1, justifyContent: 'center', paddingVertical: 4
  },
});
