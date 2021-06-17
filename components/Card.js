import React from "react";
import { View, StyleSheet } from "react-native";

import __COLORS from "../constants/__COLORS";

const Card = ({ style, children }) => {
  return <View style={{ ...styles.card, ...style }}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    shadowColor: __COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: __COLORS.white,
    padding: 12,
    borderRadius: 12,
  },
});

export default Card;
