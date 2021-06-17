import React from "react";
import { View, Text, StyleSheet } from "react-native";

import __COLORS from "../constants/__COLORS";
import __STYLES from "../constants/__STYLES";

const Header = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={{ ...__STYLES.titleText, ...styles.headerTitle }}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    backgroundColor: __COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: __COLORS.white,
  },
});

export default Header;
