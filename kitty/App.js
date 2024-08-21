import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  const [kitties, setKitties] = useState([]);
  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(kitties)}</Text>
      <StatusBar style="auto" /> jhwsjk
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
