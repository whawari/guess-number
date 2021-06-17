import React, { useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";

import __COLORS from "../constants/__COLORS";
import __STYLES from "../constants/__STYLES";

import Card from "../components/Card";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import MainButton from "../components/MainButton";

const StartGameScreen = ({ onStartGame }) => {
  const [numberInput, setNumberInput] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const handleNumberInput = (input) => {
    // regular expression
    // replace anything that is not a number with an empty string
    // g means globally (in the entire text, not only on the first hit)
    setNumberInput(input.replace(/[^0-9]/g, ""));
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const resetInputHandler = () => {
    setNumberInput("");
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(numberInput);

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("Invalid number!", "Number has to be between 1 and 99.", [
        { text: "OK", style: "destructive", onPress: resetInputHandler },
      ]);

      return;
    }

    setSelectedNumber(chosenNumber);
    setNumberInput("");
    setConfirmed(true);
    dismissKeyboard();
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.confirmedCard}>
        <Text style={{ ...__STYLES.bodyText }}>You selected</Text>

        <NumberContainer text={selectedNumber} />

        <MainButton
          backgroundColor={__COLORS.confirm}
          color={__COLORS.white}
          onPress={onStartGame.bind(this, selectedNumber)}
        >
          START GAME!!
        </MainButton>
      </Card>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView>
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View style={styles.screen}>
            <Text style={{ ...__STYLES.titleText, ...styles.title }}>
              Start a New Game!
            </Text>

            <Card style={styles.inputContainer}>
              <Text style={{ ...__STYLES.bodyText }}>Type a Number!</Text>

              <Input
                style={styles.input}
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="numeric"
                maxLength={2}
                value={numberInput}
                onChangeText={handleNumberInput}
              />

              <View style={styles.buttonContainer}>
                <View style={styles.button}>
                  <MainButton
                    backgroundColor={__COLORS.black}
                    color={__COLORS.white}
                    onPress={resetInputHandler}
                  >
                    RESET
                  </MainButton>
                </View>

                <View style={styles.button}>
                  <MainButton
                    backgroundColor={__COLORS.confirm}
                    color={__COLORS.white}
                    onPress={confirmInputHandler}
                  >
                    CONFIRM
                  </MainButton>
                </View>
              </View>
            </Card>

            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  title: {
    color: __COLORS.black,
    paddingBottom: 12,
  },
  inputContainer: {
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
  input: {
    width: 50,
    marginVertical: 12,
    textAlign: "center",
  },
  confirmedCard: {
    width: "100%",
    marginTop: 12,
    alignItems: "center",
  },
});

export default StartGameScreen;
