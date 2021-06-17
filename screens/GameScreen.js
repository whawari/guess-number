import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  ScrollView,
  Dimensions,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import __COLORS from "../constants/__COLORS";
import __STYLES from "../constants/__STYLES";

import Card from "../components/Card";
import NumberContainer from "../components/NumberContainer";
import MainButton from "../components/MainButton";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  // Math.random gives a random number between 0 and 1
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;

  if (randomNumber === exclude) {
    return generateRandomBetween(min, max, exclude);
  }

  return randomNumber;
};

const renderListItem = (value, roundNumber) => (
  <View key={roundNumber} style={styles.listItem}>
    <Text style={{ ...__STYLES.bodyText }}>{"#" + roundNumber}</Text>

    <Text style={{ ...__STYLES.bodyText }}>{value}</Text>
  </View>
);

const GameScreen = ({ userSelectedNumber, onGameOver }) => {
  const initialGuess = generateRandomBetween(1, 100, userSelectedNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const [windowHeight, setWindowHeight] = useState(
    Dimensions.get("window").height
  );

  useEffect(() => {
    Dimensions.addEventListener("change", () => {
      setWindowHeight(Dimensions.get("window").height);
    });

    return () => {
      Dimensions.removeEventListener("change");
    };
  });

  useEffect(() => {
    if (currentGuess === userSelectedNumber) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userSelectedNumber, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < userSelectedNumber) ||
      (direction === "greater" && currentGuess > userSelectedNumber)
    ) {
      Alert.alert("Come on!", "Do not cheat!", [
        { text: "Sorry!", style: "cancel" },
      ]);

      return;
    }

    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }

    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );

    setCurrentGuess(nextNumber);
    setPastGuesses((previousState) => [nextNumber, ...previousState]);
  };

  if (windowHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text style={{ ...__STYLES.titleText }}>Computer's Guess</Text>

        <View
          style={{
            ...styles.buttonContainer,
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <MainButton
            backgroundColor={__COLORS.black}
            color={__COLORS.white}
            onPress={nextGuessHandler.bind(this, "lower")}
          >
            <Ionicons name="remove" size={24} color={__COLORS.white} />
          </MainButton>

          <NumberContainer text={currentGuess} />

          <MainButton
            backgroundColor={__COLORS.black}
            color={__COLORS.white}
            onPress={nextGuessHandler.bind(this, "greater")}
          >
            <Ionicons name="add" size={24} color={__COLORS.white} />
          </MainButton>
        </View>

        <View style={styles.listContainer}>
          <ScrollView contentContainerStyle={styles.list}>
            {pastGuesses.map((guess, index) =>
              renderListItem(guess, pastGuesses.length - index)
            )}
          </ScrollView>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Card style={styles.card}>
        <Text style={{ ...__STYLES.titleText }}>Computer's Guess</Text>

        <NumberContainer text={currentGuess} />

        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <MainButton
              backgroundColor={__COLORS.black}
              color={__COLORS.white}
              onPress={nextGuessHandler.bind(this, "lower")}
            >
              <Ionicons name="remove" size={24} color={__COLORS.white} />
            </MainButton>
          </View>

          <View style={styles.button}>
            <MainButton
              backgroundColor={__COLORS.black}
              color={__COLORS.white}
              onPress={nextGuessHandler.bind(this, "greater")}
            >
              <Ionicons name="add" size={24} color={__COLORS.white} />
            </MainButton>
          </View>
        </View>
      </Card>

      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index)
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "100%",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    width: "47.5%",
  },
  listContainer: {
    flex: 1,
    width: "100%",
    marginTop: 12,
  },
  list: {
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
  listItem: {
    borderColor: __COLORS.black,
    padding: 12,
    marginBottom: 12,
    backgroundColor: __COLORS.white,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
});

export default GameScreen;
