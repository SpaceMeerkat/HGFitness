import { StyleSheet } from "react-native";

export const PricingStyles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    flex: 1,
    flexDirection: 'column', // stack rows vertically
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 10,
    maxHeight: '100%',
  },
  colorCell: {
    flexDirection: 'column',
    backgroundColor: 'black',
    width: '100%',   // take full modal width
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10
  },
  titleRow: {
    flexDirection: 'row',
    width: '100%',   // take full modal width
    justifyContent: 'center',
    paddingVertical: 10
  },
  titleText: {
    color: 'white',
    fontSize: 44,
    textAlign: 'center',
    fontFamily: 'Edo'
  },
  priceRow: {
    flexDirection: 'row',
    width: '100%',   // take full modal width
    justifyContent: 'center',
    paddingTop: 0,
    paddingBottom: 4
  },
  cellPriceText: {
    color: 'white',
    fontSize: 28,
    textAlign: 'center',
  },
  cadenceRow: {
    flexDirection: 'row',
    width: '100%',   // take full modal width
    justifyContent: 'center',
    paddingBottom: 10
  },
  cellPriceSubText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',   // take full modal width
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 4
  },
  infoChild: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingVertical: 8,
    paddingLeft: 8,
    borderRadius: 16
  },
  infoText: {
    color: 'grey',
    // fontSize: 16,
    textAlign: 'left',
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",   // vertical center
    marginVertical: 4,      // spacing between rows
  },

  infoIcon: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },

  infoTextContainer: {
    flex: 0.9,
    justifyContent: "center",
  },
  purchaseButton: {
    paddingVertical: 10,
    padding: 12,
    backgroundColor: '#000000ff',
    borderRadius: 100,
    alignItems: 'center',
  },
  purchaseText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    paddingVertical: 10,
    padding: 12,
    borderRadius: 100,
    alignItems: 'center',
  },
  closeText: {
    color: 'white',
    fontWeight: 'bold',
  },
})