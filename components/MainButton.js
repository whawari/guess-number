import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import __STYLES from "../constants/__STYLES";

const MainButton = ({ backgroundColor, color, onPress, children }) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={{ ...styles.button, backgroundColor: backgroundColor }}>
        <Text style={{ ...__STYLES.bodyText, ...styles.text, color: color }}>
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 22,
  },
  text: {
    textTransform: "uppercase",
    textAlign: "center",
    fontSize: 16,
  },
});

export default MainButton;
