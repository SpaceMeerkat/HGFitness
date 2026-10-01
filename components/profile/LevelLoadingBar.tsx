import { LinearGradient } from 'expo-linear-gradient';
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ProgressBarWithDotsProps {
  level?: number;
  /** Horizontal padding in pixels */
  horizontalPadding?: number;
  /** Two dot positions as percentages of the total line width (0–100) */
  dotPositions?: [number, number];
  /** Fill percentage (0–100) for the red line */
  fillPercentage?: number;
}

const ProgressBarWithDots: React.FC<ProgressBarWithDotsProps> = ({
  level=0,
  horizontalPadding = 20,
  dotPositions = [25, 75],
  fillPercentage = 40,
}) => {
  return (
    <View style={[styles.container, { paddingHorizontal: horizontalPadding }]}>
      {/* Background white line */}
      <View style={styles.textContainer}>

        <View style={{flex: 0.5, flexDirection: 'row', justifyContent: 'flex-start'}}>
          <Text style={styles.levelLabel}>{`LV.${level}`}</Text>
        </View>
        <View style={{flex: 0.5, flexDirection: 'row', justifyContent: 'flex-end'}}>
          <Text style={styles.levelLabel}>{`LV.${level + 1}`}</Text>
        </View>
      </View>
      <View style={styles.lineContainer}>

        <View style={styles.whiteLine} />

        {/* Gradient overlay line */}
        <LinearGradient
          colors={['#7CFF6B', '#2ee65b']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            styles.redLine,
            { width: `${fillPercentage}%` },
          ]}
        />

        {/* White dots */}
        {dotPositions.map((pos, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { left: `${pos}%` },
            ]}
          />
        ))}

        {/* Progress knob at the current fill position */}
        <View style={[styles.knob, { left: `${fillPercentage}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 12
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    position: "relative",
    height: 25, // gives enough height to render dots
    justifyContent: "center",
  },
  levelLabel: {
    color: '#999',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  lineContainer: {
    position: "relative",
    height: 6, // gives enough height to render dots
    justifyContent: "center",
  },
  whiteLine: {
    position: "absolute",
    width: "100%",
    height: 3,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 100,
  },
  redLine: {
    position: "absolute",
    height: 3,
    borderRadius: 100,
    shadowColor: '#7CFF6B',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
  },
  dot: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.3)",
    backgroundColor: "#1c1c1c",
    transform: [{ translateX: -2.5 }], // centers the dot horizontally
  },
  knob: {
    position: "absolute",
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#0a0a0a",
    backgroundColor: "#7CFF6B",
    transform: [{ translateX: -6 }],
  },
});

export default ProgressBarWithDots;
