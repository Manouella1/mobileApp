import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from "react-native";
import LottieView from "lottie-react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// button komponenten
import MyButton from "../components/button";

const HomeScreen = ({ favorites, updateFavorites }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/Manouella1/mobileApp/main/kitty/data/hello_kitty_characters.json"
    )
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const toggleFavorite = (item) => {
    const itemExists = favorites.find((fav) => fav.name === item.name);
    const newFavorites = itemExists
      ? favorites.filter((fav) => fav.name !== item.name)
      : [...favorites, item];

    updateFavorites(newFavorites);
  };

  const isFavorite = (item) => {
    return favorites.some((fav) => fav.name === item.name);
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image_url }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <TouchableOpacity
          onPress={() => toggleFavorite(item)}
          style={styles.heartContainer}
        >
          <LottieView
            source={require("../assets/heart.json")}
            autoPlay={false}
            loop={false}
            style={styles.heart}
            progress={isFavorite(item) ? 1 : 0}
          />
        </TouchableOpacity>
        <MyButton title="Learn More" onPress={() => openModal(item)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.name}-${item.age}-${index}`}
      />
      {selectedItem && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.name}>{selectedItem.name}</Text>
              <Text style={styles.description}>{selectedItem.description}</Text>
              <Text style={styles.info}>Age: {selectedItem.age}</Text>
              <Text style={styles.info}>
                Favorite Food: {selectedItem.favorite_food}
              </Text>
              <MyButton title="Close" onPress={closeModal} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  heartContainer: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  heart: {
    width: 50,
    height: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
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
});

export default HomeScreen;
