import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import LottieView from "lottie-react-native";

const FavoritesScreen = ({ favorites, updateFavorites }) => {
  const removeFavorite = (item) => {
    const newFavorites = favorites.filter((fav) => fav.name !== item.name);
    updateFavorites(newFavorites);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image_url }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.info}>Age: {item.age}</Text>
        <Text style={styles.info}>Favorite Food: {item.favorite_food}</Text>
        <TouchableOpacity
          onPress={() => removeFavorite(item)}
          style={styles.heartContainer}
        >
          <LottieView
            source={require("../assets/heart.json")}
            autoPlay={true}
            loop={false}
            style={styles.heart}
            progress={0}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.name}-${item.age}-${index}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginTop: 10,
  },
  info: {
    fontSize: 12,
    color: "#888",
    marginTop: 5,
  },
  heartContainer: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  heart: {
    width: 50,
    height: 50,
  },
});

export default FavoritesScreen;
