import React from "react";
import { View, Text, StyleSheet } from "react-native";

import __COLORS from "../constants/__COLORS";
import __STYLES from "../constants/__STYLES";

const NumberContainer = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={{ ...__STYLES.bodyText, ...styles.number }}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: __COLORS.primary,
    padding: 12,
    borderRadius: 12,
    marginVertical: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  number: {
    color: __COLORS.primary,
    fontSize: 24,
  },
});

export default NumberContainer;
