import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
// import { Colors } from "../config";
import { View } from "./View";

export const LoadingIndicator = () => {
  const themeReducer = useSelector(({ themeReducer }) => themeReducer);
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themeReducer.theme ? "#000" : "#fff",
        },
      ]}
    >
      <ActivityIndicator
        size="large"
        color={themeReducer.theme ? "#fff" : "#000"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
