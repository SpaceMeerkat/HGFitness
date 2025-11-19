import { useState } from "react";
import { Dimensions, View } from "react-native";
import { BarChart } from "react-native-chart-kit";

export function MealChart({
  dictionary,
  mealType,
  color,
  prefix,
  decimal,
}: {
  dictionary: any;
  mealType: string;
  color: [string, string, string];
  prefix: string;
  decimal: number;
}) {
  const [chartWidth, setChartWidth] = useState(Dimensions.get("window").width);
  const decimalArg = decimal;

  return (
    <View
      style={{ width: "100%", paddingBottom: 0 }}
      onLayout={(event) => setChartWidth(event.nativeEvent.layout.width)}
    >
      <BarChart
        verticalLabelRotation={-30}
        data={{
          labels: [...dictionary.dates, " "],
          datasets: [
            {
              // data: dictionary[mealType],
              data: [...dictionary[mealType], 0],
            },
          ],
        }}
        width={chartWidth}
        height={250}
        yAxisLabel=""
        yAxisSuffix={prefix}
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: "#000000ff",
          backgroundGradientFrom: "#000000",
          backgroundGradientTo: "#A9A9A9",
          decimalPlaces: decimalArg,
          color: (opacity = 1) =>
            `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          fillShadowGradient: `rgba(${color[0]}, ${color[1]}, ${color[2]}, 1)`, // ✅ solid bar color
          fillShadowGradientOpacity: 1, // ✅ make bars opaque
          style: {
            borderRadius: 16,
          },
          barPercentage: 0.6, // Adjust bar width
        }}
        style={{
          borderRadius: 4,
          borderColor: "black",
          borderWidth: 0,
          paddingTop: 0,
          paddingBottom: 0,
        }}
        showValuesOnTopOfBars={false} // Optional: show value labels
        fromZero={true} // Start y-axis at zero
      />
    </View>
  );
}

