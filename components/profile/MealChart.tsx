import { View, Dimensions, Text } from "react-native";
import { useState } from "react";
import {
    LineChart,
  } from "react-native-chart-kit";

  export function MealChart({ dictionary, mealType, color, prefix, decimal }: { dictionary: any, mealType: string, color: [string, string, string], prefix: string, decimal: number }) {
    const [chartWidth, setChartWidth] = useState(Dimensions.get("window").width);
    const decimalArg = decimal
    return (
      <View 
        style={{ width: "100%", paddingBottom: 0 }} 
        onLayout={(event) => setChartWidth(event.nativeEvent.layout.width)} // Capture parent width
      >
        <LineChart
          verticalLabelRotation={-30}
          data={{
            labels: dictionary.dates,
            datasets: [
              {
                data: dictionary[mealType],
                color: (opacity = 1) => `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${opacity})`, // Red line
                strokeWidth: 5,
                // Individual props for dots in Line 1
              },
            ]
          }}
          width={chartWidth} // from react-native
          height={250}
          yAxisLabel=""
          yAxisSuffix={prefix}
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#A9A9A9",
            backgroundGradientFrom: "#000000",
            backgroundGradientTo: "#A9A9A9",
            decimalPlaces: decimalArg, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${opacity})`, // Area under the curve
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // axes labels
            propsForDots: {
              r: "4",
              strokeWidth: "2",
              stroke: `rgba(${color[0]}, ${color[1]}, ${color[2]}, 1)`,
              fill: "black",
            },
            propsForLabels: {
              textAnchor: "end", // Aligns text properly when rotated
            },
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={{
            borderRadius: 4,
            borderColor: 'black',
            borderWidth: 0,
            paddingTop:0,
            paddingBottom: 0
          }}
        />
      </View>
    );
  }

  export const NoMealsChart = () => {
    return (
      <View style={{
        flex: 0.25,
        flexDirection: 'column',
        backgroundColor: 'black',
        justifyContent: 'center',
        alignContent: 'center',
        paddingVertical: 50,
        borderRadius: 4,
        borderColor: 'grey',
        borderWidth: 2,
      }}>
        <Text style={{ color: "white", textAlign: "center", textAlignVertical: 'center' }}>Get nomming to see meal stats!</Text>
      </View>
    );
  }
  
  