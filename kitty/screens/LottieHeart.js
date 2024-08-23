import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

const TestLottieScreen = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../assets/heart.json")}
        autoPlay
        loop
        style={styles.lottie}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  lottie: {
    width: 200,
    height: 200,
  },
});

export default TestLottieScreen;
