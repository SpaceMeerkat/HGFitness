import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

type PremiumModalProps = {
  visible: boolean;
  onClose: () => void;
};

const PremiumModal: React.FC<PremiumModalProps> = ({
  visible,
  onClose,
}) => {

    const renderModal = () => {
    return (
        <View style={styles.modalContent}>

        <View style={styles.colorCell}>
        {/* Row 1 */}
        <View style={styles.row}>
            <View style={styles.cell}>
            <Text style={styles.cellTitleText}>PREMIUM</Text>
            </View>
        </View>

        {/* Row 2 */}
        <View style={styles.row}>
            <View style={styles.cell}>
            <Text style={styles.cellPriceText}>R100</Text>
            </View>
        </View>

        <View style={styles.row}>
            <View style={styles.cell}>
            <Text style={styles.cellPriceSubText}>per month</Text>
            </View>
        </View>
        </View>

        <View style={[styles.row, {backgroundColor: 'red', borderRadius: 10}]}>
            <View style={[styles.cell, {paddingVertical: 4}]}>
            <Text style={styles.cellPriceSubText}>The best deal on HG Fitness!</Text>
            </View>
        </View>

        <View style={[styles.infoCell, {backgroundColor: 'white'}]}>
        {/* Row 1 */}
        <View style={styles.row}>
            <View style={styles.cellInfo}>
            <Text style={styles.cellInfoText}>&#8226; Fresh new gym programs every month</Text>
            </View>
        </View>
        <View style={styles.row}>
            <View style={styles.cellInfo}>
            <Text style={styles.cellInfoText}>&#8226; Paid programs gain unlimited tracking reruns</Text>
            </View>
        </View>
        <View style={styles.row}>
            <View style={styles.cellInfo}>
            <Text style={styles.cellInfoText}>&#8226; Choose from more than 100 meals</Text>
            </View>
        </View>
        <View style={styles.row}>
            <View style={styles.cellInfo}>
            <Text style={styles.cellInfoText}>&#8226; Expanded profile tracking and customisation options</Text>
            </View>
        </View>

        </View>

        {/* Purchase Button */}
        <Pressable onPress={onClose} style={styles.purchaseButton}>
            <Text style={styles.purchaseText}>PURCHASE</Text>
        </Pressable>

        {/* Close Button */}
        <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Close</Text>
        </Pressable>
        </View>
    );
    };
  // **Here is the missing return:**
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.modalBackground}>
        {renderModal()}
      </View>
    </Modal>
  );
};


export default PremiumModal;

const styles = StyleSheet.create({
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
    paddingVertical: 20,
    paddingHorizontal: 10,
    maxHeight: '100%',
  },
  infoCell: {
    flexDirection: 'column',
    width: '100%',   // take full modal width
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 4
  },
  colorCell: {
    flexDirection: 'column',
    backgroundColor: 'black',
    width: '100%',   // take full modal width
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 30
  },
  row: {
    flexDirection: 'row',
    width: '100%',   // take full modal width
    justifyContent: 'center',
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 16
  },
  cellInfo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingVertical: 8,
    paddingLeft: 8,
    borderRadius: 16
  },
  cellTitleText: {
    color: 'white',
    fontSize: 44,
    textAlign: 'center',
    fontFamily: 'Edo'
  },
  cellInfoText: {
    color: 'grey',
    fontSize: 16,
    textAlign: 'left',
  },
  cellPriceText: {
    color: 'white',
    fontSize: 32,
    textAlign: 'center',
  },
  cellPriceSubText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  modalTitle: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    paddingVertical: 10,
    textAlign: 'center',
    borderRadius: 8,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 16,
    flex: 1,
  },
  date: {
    fontSize: 14,
    color: '#888',
    paddingLeft: 10,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'grey',
    paddingBottom: 22,
  },
  messageLine: {
    fontSize: 16,
    paddingBottom: 6,
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
    color: 'black',
    fontWeight: 'bold',
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
});
