import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  Alert,
  ImageBackground,
  ScrollView,
  RefreshControl,
  Switch,
} from "react-native";

export default function HelloKittyTamagotchiScreen() {
  // Startar med Hello Kitty som hungrig
  const [hunger, setHunger] = useState(2); // 2 = hungrig, 0 = mätt
  const [isHappy, setIsHappy] = useState(true);
  const [outfit, setOutfit] = useState("default");
  const [kittyImage, setKittyImage] = useState(
    require("../assets/images/default.png")
  );
  const [refreshing, setRefreshing] = useState(false);
  const [isSleeping, setIsSleeping] = useState(false); // Läggdags Switch

  const feedKitty = () => {
    if (hunger > 0) {
      setHunger(hunger - 1);
      setKittyImage(require("../assets/images/eating.png")); // Visar bild när Kitty äter
      Alert.alert("Yum!", "Hello Kitty har ätit och är nu mättare!");
    } else {
      Alert.alert("Full!", "Hello Kitty är redan mätt.");
    }
  };

  const playWithKitty = () => {
    setIsHappy(true);
    setKittyImage(require("../assets/images/happy.png")); // Visar bild när Kitty är glad
    Alert.alert("Happy!", "Hello Kitty är glad efter att ha blivit klappad!");
  };

  const changeOutfit = () => {
    const newOutfit = outfit === "default" ? "fancy" : "default";
    setOutfit(newOutfit);
    const newImage =
      newOutfit === "default"
        ? require("../assets/images/default.png")
        : require("../assets/images/fancy.png");

    setKittyImage(newImage); // Visar bild beroende på kläder
    Alert.alert(
      "New Outfit!",
      `Hello Kitty har nu på sig ${
        newOutfit === "default" ? "sitt vanliga kläder" : "fina kläder"
      }!`
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Uppdatera hunger och humör vid refresh
    const randomHunger = Math.random() > 0.5 ? 2 : 0; // Slumpmässigt hungrig (2) eller mätt (0)
    const randomMood = Math.random() > 0.5; // Slumpmässigt humör

    setHunger(randomHunger);
    setIsHappy(randomMood);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000); // Simulerar laddningstid på 1 sekund
  };

  const toggleSleep = () => {
    setIsSleeping(!isSleeping);
    setKittyImage(
      isSleeping
        ? require("../assets/images/default.png") // Bild när Kitty vaknar
        : require("../assets/images/sleeping.png") // Bild när Kitty sover
    );
  };

  return (
    <ImageBackground
      source={require("../assets/images/back.png")}
      style={styles.background}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.title}>Hello Kitty Tamagotchi</Text>
        <Image
          source={kittyImage} // Använder den aktuella bilden för Hello Kitty
          style={styles.image}
        />
        <Text style={styles.status}>
          Hunger: {hunger > 0 ? "Hungrig" : "Mätt"} | Humör:{" "}
          {isHappy ? "Glad" : "Ledsen"}
        </Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Läggdags</Text>
          <Switch
            value={isSleeping}
            onValueChange={toggleSleep} // Byter mellan sovande och vaken
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Ge Mat" onPress={feedKitty} />
          <Button title="Klappa" onPress={playWithKitty} />
          <Button title="Byt Kläder" onPress={changeOutfit} />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
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
    color: "#fff",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  status: {
    fontSize: 18,
    marginBottom: 20,
    color: "#fff",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 18,
    color: "#fff",
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
});
