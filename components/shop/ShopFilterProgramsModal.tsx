import { filterAndSortPrograms } from "@/components/shop/ShopFilterPrograms"; // adjust path
import React, { useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";

interface FilterSortModalProps {
  visible: boolean;
  onClose: () => void;
  programs: any;
  setFilteredPrograms: React.Dispatch<React.SetStateAction<any>>;
}

export default function FilterSortModal({
  visible,
  onClose,
  programs,
  setFilteredPrograms,
}: FilterSortModalProps) {
  const [days, setDays] = useState<number>(7); // default max days
  const [sex, setSex] = useState<"Men" | "Women" | "All">("All");
  const [sortOption, setSortOption] = useState<string>("alphabetical");

  const applyFilters = (updatedSex = sex, updatedDays = days, updatedSort = sortOption) => {
    const sortFlags = {
      alphabetical: false,
      priceAscending: false,
      priceDescending: false,
      daysAscending: false,
      daysDescending: false,
    };

    (sortFlags as any)[updatedSort] = true;

    const results = filterAndSortPrograms(programs, {
      ...sortFlags,
      sex: updatedSex,
      days: updatedDays,
    });

    setFilteredPrograms(results);
  };

  const handleSort = (sortType: string) => {
    setSortOption(sortType);
    applyFilters(sex, days, sortType);
  };

  const handleFilterDays = (dayCount: number) => {
    setDays(dayCount);
    applyFilters(sex, dayCount, sortOption);
  };

  const handleSexSelect = (selectedSex: "Men" | "Women" | "All") => {
    setSex(selectedSex);
    applyFilters(selectedSex, days, sortOption);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.7)", justifyContent: "center", padding: 20 }}>
        <View style={{ backgroundColor: "white", borderRadius: 16, padding: 20, maxHeight: "80%" }}>
          <ScrollView>
            <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 16 }}>
              Filter & Sort
            </Text>

            {/* Sex Selection */}
            <Text style={{ fontSize: 16, marginBottom: 8 }}>Select Sex:</Text>
            <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 16 }}>
              {["All", "Men", "Women"].map((option) => (
                <Pressable
                  key={option}
                  style={{
                    backgroundColor: sex === option ? "black" : "#eee",
                    padding: 10,
                    borderRadius: 8,
                  }}
                  onPress={() => handleSexSelect(option as "All" | "Men" | "Women")}
                >
                  <Text style={{color: sex === option ? "white" : "black"}}>{option}</Text>
                </Pressable>
              ))}
            </View>

            {/* Sort options */}
            <Text style={{ fontSize: 16, marginBottom: 8 }}>Sort by:</Text>
            {[
              { key: "alphabetical", label: "Alphabetical" },
              { key: "priceAscending", label: "Price Ascending" },
              { key: "priceDescending", label: "Price Descending" },
              { key: "daysAscending", label: "Days Ascending" },
              { key: "daysDescending", label: "Days Descending" },
            ].map((option) => (
              <Pressable
                key={option.key}
                style={{
                  backgroundColor: sortOption === option.key ? "black" : "#eee",
                  padding: 10,
                  marginVertical: 4,
                  borderRadius: 8,
                }}
                onPress={() => handleSort(option.key)}
              >
                <Text style={{ textAlign: "center", color: sortOption === option.key ? "white" : "black" }}>{option.label}</Text>
              </Pressable>
            ))}

            {/* Filter by days */}
            <Text style={{ fontSize: 16, paddingTop: 20, paddingBottom: 8 }}>Filter by days per week:</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <Pressable
                  key={day}
                  style={{
                    backgroundColor: days === day ? "black" : "#eee",
                    padding: 10,
                    borderRadius: 8,
                  }}
                  onPress={() => handleFilterDays(day)}
                >
                  <Text style={{color: days === day ? "white": "black"}}>&lt; {day}</Text>
                </Pressable>
              ))}
            </View>

            {/* Close button */}
            <Pressable
              style={{ backgroundColor: "white", padding: 12, marginTop: 24, borderRadius: 100, borderColor: 'black', borderWidth: 2 }}
              onPress={onClose}
            >
              <Text style={{ color: "black", textAlign: "center", fontWeight: "bold" }}>Close</Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
