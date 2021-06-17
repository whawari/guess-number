import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

const fetchFonts = () => {
  return Font.loadAsync({
    "montserrat-regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "montserrat-bold": require("./assets/fonts/Montserrat-Bold.ttf"),
  });
};

export default function App() {
  const [userSelectedNumber, setUserSelectedNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setDataLoaded(true);
        }}
        onError={() => {
          console.log("Error");
        }}
      />
    );
  }

  const startGameHandler = (selectedNumber) => {
    setUserSelectedNumber(selectedNumber);
    setGuessRounds(0);
  };

  const gameOverHandler = (numberOfRounds) => {
    setGuessRounds(numberOfRounds);
  };

  const onStartNewGame = () => {
    setGuessRounds(0);
    setUserSelectedNumber(null);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (userSelectedNumber && guessRounds <= 0) {
    content = (
      <GameScreen
        userSelectedNumber={userSelectedNumber}
        onGameOver={gameOverHandler}
      />
    );
  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen
        userSelectedNumber={userSelectedNumber}
        guessRounds={guessRounds}
        onStartNewGame={onStartNewGame}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <StatusBar style="auto" />

      <Header title="Guess a Number!" />

      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
