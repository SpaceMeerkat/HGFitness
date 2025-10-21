import React from "react";
import { StyleSheet, View } from "react-native";

interface ProgressBarWithDotsProps {
  /** Horizontal padding in pixels */
  horizontalPadding?: number;
  /** Two dot positions as percentages of the total line width (0–100) */
  dotPositions?: [number, number];
  /** Fill percentage (0–100) for the red line */
  fillPercentage?: number;
}

const ProgressBarWithDots: React.FC<ProgressBarWithDotsProps> = ({
  horizontalPadding = 20,
  dotPositions = [25, 75],
  fillPercentage = 40,
}) => {
  return (
    <View style={[styles.container, { paddingHorizontal: horizontalPadding }]}>
      {/* Background white line */}
      <View style={styles.lineContainer}>
        <View style={styles.whiteLine} />

        {/* Red overlay line */}
        <View
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 12
  },
  lineContainer: {
    position: "relative",
    height: 5, // gives enough height to render dots
    justifyContent: "center",
  },
  whiteLine: {
    position: "absolute",
    width: "100%",
    height: 2,
    backgroundColor: "grey",
    borderRadius: 100,
  },
  redLine: {
    position: "absolute",
    height: 4,
    backgroundColor: "white",
    borderRadius: 100,
  },
  dot: {
    position: "absolute",
    width: 12,
    height: 12,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "grey",
    backgroundColor: "white",
    transform: [{ translateX: -2.5 }], // centers the dot horizontally
  },
});

export default ProgressBarWithDots;
