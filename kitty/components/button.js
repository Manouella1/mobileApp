import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const MyButton = ({ onPress, title }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    margin: 30,
    backgroundColor: "#d63384", // Mörkrosa bakgrund
    padding: 10,
    borderRadius: 10, // Rundade hörn
    alignItems: "center",
    borderWidth: 2, // Kantlinjens bredd
    borderColor: "#fff", // Kantlinjens färg (vit i detta fall)
  },
  buttonText: {
    color: "#fff", // Vit text
    fontSize: 16,
  },
});

export default MyButton;
