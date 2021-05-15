import React, { FC } from "react";
import { StyleProp, ViewStyle, StyleSheet, View, Image } from "react-native";
import colors from "./colors";

export type Card = {
  id: string;
  price: string;
  name: string;
  image: string;
};

interface CardItemProps {
  card: Card;
}
export const CardItem: FC<CardItemProps> = (props) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: props.card.image }} style={styles.cardImage} />
    </View>
  );
};
const styles = StyleSheet.create({
  cardImage: {
    width: 160,
    flex: 1,
    resizeMode: "contain",
  },
  card: {
    flex: 0.45,
    borderRadius: 8,
    shadowRadius: 25,
    shadowColor: colors.black,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 0 },
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
});
