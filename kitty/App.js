import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import FavoritesScreen from "./screens/Favorites";
import HelloKittyTamagotchiScreen from "./screens/HelloKittyTamagotchiScreen";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();

export default function App() {
  const [favorites, setFavorites] = useState([]);
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const favoritesJSON = await AsyncStorage.getItem("favorites");
      if (favoritesJSON) {
        const favorites = JSON.parse(favoritesJSON);
        setFavorites(favorites);
        setFavoritesCount(favorites.length);
      }
    } catch (error) {
      console.error("Failed to load favorites", error);
    }
  };

  const updateFavorites = async (newFavorites) => {
    setFavorites(newFavorites);
    setFavoritesCount(newFavorites.length);
    await AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              if (route.name === "Home") {
                return <FontAwesome name="home" size={size} color={color} />;
              } else if (route.name === "Favorites") {
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
            tabBarActiveTintColor: "tomato",
          })}
        >
          <Tab.Screen name="Home" options={{ tabBarBadge: null }}>
            {() => (
              <HomeScreen
                favorites={favorites}
                updateFavorites={updateFavorites}
              />
            )}
          </Tab.Screen>
          <Tab.Screen
            name="Favorites"
            options={{
              tabBarBadge: favoritesCount > 0 ? favoritesCount : null,
            }}
          >
            {() => (
              <FavoritesScreen
                favorites={favorites}
                updateFavorites={updateFavorites}
              />
            )}
          </Tab.Screen>
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
    backgroundColor: "#f8f8f8",
  },
});
