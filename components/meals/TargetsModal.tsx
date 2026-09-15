import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';

import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CalcStyles } from "./CalorieCalculatorStyles";

const hexToRgba = (hex: string, opacity: number): string => {
  const clean = hex.replace('#', '');
  const bigint = parseInt(clean.length === 3
    ? clean.split('').map(c => c + c).join('')
    : clean, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

type StatRowProps = {
  icon: any,
  label: string,
  value: number,
  target: any,
  accent: string,
};

const StatRow: React.FC<StatRowProps> = ({ icon, label, value, target, accent }) => {
  const complete = typeof target === 'number' && value >= target;
  const isNumericTarget = typeof target === 'number';
  const isLocked = React.isValidElement(target) && target.type === FontAwesome;
  const progress = isNumericTarget ? Math.min(value / Math.max(target, 1), 1) : 0;

  return (
    <View style={styles.cardWrapper}>
      <LinearGradient
        colors={[hexToRgba(accent, 0.22), '#131313', hexToRgba(accent, 0.06)]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.card, { borderColor: complete ? accent : '#3a3a3a' }]}
      >
        <View style={styles.cardRow}>
          <View style={[styles.iconCircle, { borderColor: accent, backgroundColor: hexToRgba(accent, 0.12) }]}>
            {icon}
          </View>

          <View style={styles.labelColumn}>
            <Text style={styles.labelText}>{label}</Text>
            {isNumericTarget && (
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${progress * 100}%`, backgroundColor: accent }]} />
              </View>
            )}
          </View>

          <View style={styles.columnsRow}>
            <View style={styles.valueColumn}>
              <Text style={[styles.valueText, { color: complete ? accent : 'white' }]}>{value}</Text>
            </View>

            <View style={styles.columnDivider} />

            <View style={styles.targetColumn}>
              {isNumericTarget ? (
                <Text style={styles.targetText}>{target}</Text>
              ) : isLocked ? (
                <View style={styles.lockedRow}>
                  <FontAwesome name="lock" size={14} color="#777" />
                  <Text style={styles.premiumTag}>PREMIUM</Text>
                </View>
              ) : (
                <View style={styles.targetInlineNode}>{target}</View>
              )}
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};


type Gender = "male" | "female";
type ActivityLevel = "sedentry" | "moderate" | "active" | "very_active" | "athlete";
type Goal = "lose weight" | "maintain" | "gain";

type TargetsModalProps = {
  visible: boolean,
  targetState: any,
  streak: number,
  meals: number,
  mealsTarget: any,
  calories: number,
  caloriesTarget: any,
  protein: number,
  proteinTarget: any,
  water: number,
  waterTarget: any,

  onClose: () => void;
};

const TargetsModal: React.FC<TargetsModalProps> = ({
  visible,
  targetState,
  streak,
  meals,
  mealsTarget,
  calories,
  caloriesTarget,
  protein,
  proteinTarget,
  water,
  waterTarget,
  onClose,
}) => {

  const handleClose = () => {
      onClose();
  };

  const lockedOrSet = (target: any) =>
    targetState !== "free"
      ? (targetState !== "undefined"
          ? target
          : <Text style={{ color: "#999", fontSize: 12, textAlign: 'center' }}>Set Calorie Calculator</Text>)
      : (<FontAwesome name="lock" size={20} color="#777" />);

  const renderContent = () => {

    return (
      <>
      <LinearGradient
        colors={['#3a3a3a', '#0a0a0a', '#1c1c1c']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.borderWrap}
      >
      <View style={styles.modalContent}>

            <View style={styles.header}>
              <LinearGradient
                colors={['#ff9a3d', '#ff5f1f', '#c23f00']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.streakRing}
              >
                <View style={styles.streakInner}>
                  <FontAwesome name="bolt" size={30} color="#ffb454" />
                  <Text style={styles.streakNumber}>{streak}</Text>
                </View>
              </LinearGradient>
              <Text style={styles.streakLabel}>DAY STREAK</Text>

              <Text style={styles.titleText}>Today's Goals</Text>
              <Text style={styles.subtitleText}>Keep tracking to build your streak</Text>
            </View>

            <View style={styles.columnHeaderRow}>
              <View style={styles.columnHeaderSpacer} />
              <View style={styles.columnHeaderLabels}>
                <Text style={[styles.columnHeaderText, styles.currentHeaderText]}>Current</Text>
                <View style={styles.columnDividerSpace} />
                <Text style={[styles.columnHeaderText, styles.targetHeaderText]}>Target</Text>
              </View>
            </View>

            <View style={styles.statsBlock}>

                <StatRow
                  accent="#7CFF6B"
                  icon={<MaterialCommunityIcons name="food-apple" size={18} color="#7CFF6B" />}
                  label="Meals"
                  value={meals}
                  target={lockedOrSet(mealsTarget)}
                />

                <StatRow
                  accent="#FFA53D"
                  icon={<FontAwesome6 name="fire" size={15} color="#FFA53D" />}
                  label="Calories"
                  value={calories}
                  target={lockedOrSet(caloriesTarget)}
                />

                <StatRow
                  accent="#FF7A59"
                  icon={<MaterialCommunityIcons name="food-drumstick" size={15} color="#FF7A59" />}
                  label="Protein"
                  value={protein}
                  target={lockedOrSet(proteinTarget)}
                />

                <StatRow
                  accent="#4DD0E1"
                  icon={<FontAwesome6 name="bottle-water" size={16} color="#4DD0E1" />}
                  label="Water"
                  value={water}
                  target={lockedOrSet(waterTarget)}
                />

            </View>

      </View>
      </LinearGradient>
      {/* Close Button */}
      <TouchableOpacity onPress={() => handleClose()} activeOpacity={0.8} style={styles.closeButtonWrap}>
        <LinearGradient
          colors={['#2c2c2c', '#050505']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.closeButton}
        >
          <Text style={styles.closeText}>Close</Text>
          <FontAwesome6 name="circle-check" size={16} color="white" style={{ marginLeft: 8 }} />
        </LinearGradient>
      </TouchableOpacity>
      </>
    );
  };

  return (
      <Modal visible={visible} animationType="slide" transparent>
        <View style={CalcStyles.modalBackground}>
          {renderContent()}
        </View>
      </Modal>
    );
  }

export default TargetsModal;

const styles = StyleSheet.create({
  borderWrap: {
    flex: 1,
    borderRadius: 24,
    padding: 1.5,
  },

  modalContent: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#0a0a0aff',
    borderRadius: 22,
    paddingTop: 16,
    paddingBottom: 12,
    paddingHorizontal: 16,
    overflow: 'hidden',
  },

  header: {
    alignItems: 'center',
    paddingBottom: 14,
  },

  streakRing: {
    width: 88,
    height: 88,
    borderRadius: 44,
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },

  streakInner: {
    flex: 1,
    width: '100%',
    borderRadius: 42,
    backgroundColor: '#0a0a0a',
    justifyContent: 'center',
    alignItems: 'center',
  },

  streakNumber: {
    color: '#ffb454',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 1,
  },

  streakLabel: {
    color: '#888',
    fontSize: 10,
    letterSpacing: 2,
    marginTop: 8,
  },

  titleText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },

  subtitleText: {
    color: '#888',
    fontSize: 12,
    marginTop: 2,
  },

  statsBlock: {
    flex: 1,
    justifyContent: 'space-between',
  },

  cardWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    flex: 1,
    marginBottom: 8,
  },

  card: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 14,
    justifyContent: 'center',
  },

  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  labelColumn: {
    flex: 1,
    marginLeft: 12,
    marginRight: 10,
  },

  labelText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },

  progressTrack: {
    marginTop: 6,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#232323',
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    borderRadius: 3,
  },

  columnsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 140,
  },

  valueColumn: {
    flex: 0.7,
    alignItems: 'center',
  },

  targetColumn: {
    flex: 1.3,
    alignItems: 'center',
  },

  columnDivider: {
    width: 1,
    height: 24,
    marginHorizontal: 4,
    backgroundColor: '#333',
  },

  valueText: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  targetText: {
    color: '#aaa',
    fontSize: 18,
    fontWeight: 'bold',
  },

  targetInlineNode: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  lockedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  premiumTag: {
    color: '#666',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1,
    marginLeft: 4,
  },

  columnHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginBottom: 8,
  },

  columnHeaderSpacer: {
    flex: 1,
  },

  columnHeaderLabels: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 140,
  },

  columnDividerSpace: {
    width: 9,
  },

  columnHeaderText: {
    color: '#666',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
    textAlign: 'center',
  },

  currentHeaderText: {
    flex: 0.7,
  },

  targetHeaderText: {
    flex: 1.3,
  },

  closeButtonWrap: {
    marginTop: 14,
    borderRadius: 100,
    overflow: 'hidden',
  },

  closeButton: {
    flexDirection: 'row',
    paddingVertical: 14,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },

  closeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
