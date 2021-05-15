import React, { FC } from "react";
import { StyleSheet, View, Text } from "react-native";
import { CARDS } from "../data/data";
import colors from "./colors";

interface CardDetailsProps {
  index: number;
}

export const CardDetails: FC<CardDetailsProps> = (props) => {
  return (
    <View key={CARDS[props.index].id} style={{ alignItems: "center" }}>
      <Text style={[styles.text, styles.heading]}>
        {CARDS[props.index].name}
      </Text>
      <Text style={[styles.text, styles.price]}>{CARDS[props.index].price}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent",
  },
  heading: { fontSize: 24, marginBottom: 10, color: colors.gray },
  price: { color: colors.blue, fontSize: 32, fontWeight: "500" },
});
