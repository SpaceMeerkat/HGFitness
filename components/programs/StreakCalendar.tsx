import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

// Days of the week header (Mon-Sun + Extra column)
const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S", ""]; 

// Helper to get all days in the month with spillover
const getCalendarDays = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const startIndex = (firstDay.getDay() + 6) % 7;
  const endIndex = (lastDay.getDay() + 6) % 7;

  const prevMonthDays: { day: number; type: "prev" | "curr" | "next" }[] = [];
  if (startIndex > 0) {
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startIndex - 1; i >= 0; i--) {
      prevMonthDays.push({ day: prevMonthLastDay - i, type: "prev" });
    }
  }

  const thisMonthDays = Array.from(
    { length: lastDay.getDate() },
    (_, i) => ({ day: i + 1, type: "curr" as const })
  );

  const nextMonthDays: { day: number; type: "prev" | "curr" | "next" }[] = [];
  if (endIndex < 6) {
    for (let i = 1; i <= 6 - endIndex; i++) {
      nextMonthDays.push({ day: i, type: "next" });
    }
  }

  return [...prevMonthDays, ...thisMonthDays, ...nextMonthDays];
};

interface CalendarProps {
  streakDates: string[]; // or Date[] depending on what you pass in
  streakThreshold: number;
}

const Calendar: React.FC<CalendarProps> = ({ streakDates, streakThreshold }) => {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Africa/Johannesburg",
    year: "numeric",
    month: "long",
  });

  const parts = formatter.formatToParts(now);
  const year = parseInt(parts.find(p => p.type === "year")?.value || "0");
  const month = now.getMonth() + 1;
  const monthName = parts.find(p => p.type === "month")?.value.toUpperCase();

  const today = now.getDate();
  const days = getCalendarDays(year, month - 1);

  // Split into weeks of 7 days, then add the extra column
  const weeks: { day: number; type: "prev" | "curr" | "next" }[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const uniqueStreakDates = new Set(streakDates);

  return (
    <View style={styles.container}>
      {/* Month title */}
      <Text style={styles.monthTitle}>{monthName}</Text>

      {/* Header row */}
      <View style={styles.weekRow}>
        {daysOfWeek.map((day, index) =>
          index < 7 ? (
            <View key={index} style={styles.dayHeader}>
              <Text style={styles.dayHeaderText}>{day}</Text>
            </View>
          ) : (
            <View key="bolt" style={styles.dayHeader}>
              <FontAwesome
                name="bolt"
                size={24}
                color="orange"
                style={{ textAlign: "center" }}
              />
            </View>
          )
        )}
      </View>

      {/* Weeks */}
      {weeks.map((week, wi) => {
      // Count how many streak days in this week
      const highlightCount = week.reduce((count, d) => {
        if (d.type !== "curr") return count;
        const key = `${year}_${month}_${d.day}`;
        return count + (uniqueStreakDates.has(key) ? 1 : 0);
      }, 0);

      return (
        <View key={wi} style={styles.weekRow}>
          {week.map((d, di) => {
            const isToday = d.type === "curr" && d.day === today;
            const isHighlighted = streakDates.includes(`${year}_${month}_${d.day}`);

            return (
              <View key={di} style={styles.dayCell}>
                <View
                  style={[
                    styles.dayCircle,
                    isToday && styles.todayCircle,
                    isHighlighted && styles.highlightCircle,
                  ]}
                >
                  <Text
                    style={[
                      styles.dayText,
                      d.type !== "curr" && styles.spilloverText,
                      isToday && styles.todayText,
                    ]}
                  >
                    {d.day}
                  </Text>
                </View>
              </View>
            );
          })}

          {/* Extra column cell */}
          <View style={styles.extraCell}>
            {highlightCount >= streakThreshold && (
              <FontAwesome5
                name="check-circle"
                size={20}
                color="orange"
              />
            )}
          </View>
        </View>
      );
    })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "grey",
  },
  monthTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 6,
  },
  dayHeader: {
    flex: 1,
    alignItems: "center",
    padding: 5,
  },
  dayHeaderText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  dayCell: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
  },
  extraCell: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
  },
  dayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  todayCircle: {
    backgroundColor: "white",
  },
  highlightCircle: {
    borderWidth: 2,
    borderColor: "lime", 
  },
  dayText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  spilloverText: {
    opacity: 0.4,
  },
  todayText: {
    color: "black",
    fontWeight: "bold",
  },
});

export default Calendar;
