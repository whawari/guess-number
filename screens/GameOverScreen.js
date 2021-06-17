import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";

import __COLORS from "../constants/__COLORS";
import __STYLES from "../constants/__STYLES";

import MainButton from "../components/MainButton";

const GameOverScreen = ({
  userSelectedNumber,
  guessRounds,
  onStartNewGame,
}) => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <Text style={{ ...__STYLES.titleText }}>The Game is Over!</Text>

        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/success.png")}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        <Text style={{ ...__STYLES.bodyText, ...styles.text }}>
          Your phone took
          <Text style={styles.highlight}> {guessRounds} </Text>
          rounds to guess the number
          <Text style={styles.highlight}> {userSelectedNumber}</Text>
        </Text>

        <MainButton
          backgroundColor={__COLORS.black}
          color={__COLORS.white}
          onPress={onStartNewGame}
        >
          New Game!
        </MainButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },
  imageContainer: {
    width: 200,
    height: 200,
    maxWidth: "80%",
    borderWidth: 3,
    borderColor: __COLORS.black,
    borderRadius: 150,
    overflow: "hidden",
    marginVertical: 12,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  text: {
    textAlign: "center",
    marginBottom: 12,
  },
  highlight: {
    color: __COLORS.primary,
    fontFamily: "montserrat-bold",
  },
});

export default GameOverScreen;
