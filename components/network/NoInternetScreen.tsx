import { useAppContext } from "@/components/appContext";
import React from "react";
import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const { width } = Dimensions.get('window');

export const NoInternetScreen: React.FC = () => {
  const { recheckConnectivity, loading } = useAppContext();

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Oops!</Text>
      <Text style={styles.subtitle}>
        It looks like we can't connect to the internet.{'\n'}
        Please check your connection and try again.
      </Text>

      <Image
        source={require('@/assets/images/noInternet.jpg')}
        style={styles.image}
        resizeMode="contain"
      />

      <TouchableOpacity
        style={styles.retryButton}
        onPress={recheckConnectivity}
        disabled={loading === true}
      >
        {loading ? (
          <ActivityIndicator size="small" color="black" />
        ) : (
          <Text style={styles.retryButtonText}>Try again</Text>
        )}
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 32,
    fontFamily: 'Edo',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    color: 'grey',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  image: {
    width: width,
    height: width,
  },
  retryButton: {
    marginTop: 24,
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 100,
    minWidth: 120,
    alignItems: 'center',
  },
  retryButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
