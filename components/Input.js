import React from "react";
import { TextInput, StyleSheet } from "react-native";

import __COLORS from "../constants/__COLORS";
import __STYLES from "../constants/__STYLES";

const Input = ({ style, ...rest }) => {
  return (
    <TextInput
      style={{ ...__STYLES.bodyText, ...styles.input, ...style }}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: __COLORS.black,
    borderWidth: 1,
    padding: 6,
  },
});

export default Input;
