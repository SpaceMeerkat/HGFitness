import { useAppContext } from "@/components/appContext";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const NoInternetScreen: React.FC = () => {
  const { recheckConnectivity, loading } = useAppContext();

  return (
    <View style={styles.container}>
      <MaterialIcons name="wifi-off" size={80} color="white" />
      <Text style={styles.title}>No Internet Connection</Text>
      <Text style={styles.subtitle}>
        An internet connection is required to use this app.
      </Text>
      <TouchableOpacity
        style={styles.retryButton}
        onPress={recheckConnectivity}
        disabled={loading === true}
      >
        {loading ? (
          <ActivityIndicator size="small" color="black" />
        ) : (
          <Text style={styles.retryButtonText}>Retry</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  subtitle: {
    color: "grey",
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  retryButton: {
    marginTop: 30,
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    minWidth: 120,
    alignItems: "center",
  },
  retryButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});
