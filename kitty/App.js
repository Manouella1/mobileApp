import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/Settings";
import HelloKittyTamagotchiScreen from "./screens/HelloKittyTamagotchiScreen";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              if (route.name === "Home") {
                return <FontAwesome name="home" size={size} color={color} />;
              } else if (route.name === "Settings") {
                return (
                  <FontAwesome
                    name={focused ? "heart" : "heart-o"}
                    size={size}
                    color={color}
                  />
                );
              } else if (route.name === "Kitty Tamagotchi") {
                return <FontAwesome name="paw" size={size} color={color} />;
              }
            },
            tabBarInactiveTintColor: "gray",
            tabBarActiveTintColor: "pink",
          })}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{ tabBarBadge: 3 }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ tabBarLabel: "Favorites" }}
          />
          <Tab.Screen
            name="Kitty Tamagotchi"
            component={HelloKittyTamagotchiScreen}
            options={{ tabBarLabel: "Kitty" }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f8f8", // Du kan sätta en bakgrundsfärg om du vill
  },
});
