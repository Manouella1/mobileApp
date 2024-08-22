import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  Alert,
  ImageBackground,
} from "react-native";

export default function HelloKittyTamagotchiScreen() {
  const [hunger, setHunger] = useState(0);
  const [isHappy, setIsHappy] = useState(true);
  const [outfit, setOutfit] = useState("default");

  const feedKitty = () => {
    if (hunger > 0) {
      setHunger(hunger - 1);
      Alert.alert("Yum!", "Hello Kitty har ätit och är nu mättare!");
    } else {
      Alert.alert("Full!", "Hello Kitty är redan mätt.");
    }
  };

  const playWithKitty = () => {
    setIsHappy(true);
    Alert.alert("Happy!", "Hello Kitty är glad efter att ha blivit klappad!");
  };

  const changeOutfit = () => {
    const newOutfit = outfit === "default" ? "fancy" : "default";
    setOutfit(newOutfit);
    Alert.alert(
      "New Outfit!",
      `Hello Kitty har nu på sig ${
        newOutfit === "default" ? "sitt vanliga kläder" : "fina kläder"
      }!`
    );
  };

  return (
    <ImageBackground
      source={require("../assets/images/back.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Hello Kitty Tamagotchi</Text>
        <Image
          source={{
            uri:
              outfit === "default"
                ? "https://path-to-default-outfit-image"
                : "https://path-to-fancy-outfit-image",
          }}
          style={styles.image}
        />
        <Text style={styles.status}>
          Hunger: {hunger} | Humör: {isHappy ? "Glad" : "Ledsen"}
        </Text>
        <View style={styles.buttonContainer}>
          <Button title="Ge Mat" onPress={feedKitty} />
          <Button title="Klappa" onPress={playWithKitty} />
          <Button title="Byt Kläder" onPress={changeOutfit} />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover", // Anpassar bilden så att den täcker hela skärmen
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff", // Ändrar textfärg för att synas mot bakgrunden
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  status: {
    fontSize: 18,
    marginBottom: 20,
    color: "#fff", // Ändrar textfärg för att synas mot bakgrunden
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
});
