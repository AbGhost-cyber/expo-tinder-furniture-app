import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Swiper from "react-native-deck-swiper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Transitioning,
  Transition,
  TransitioningView,
} from "react-native-reanimated";

import { CardItem, Card } from "./components/CardItem";
import { CardDetails } from "./components/CardDetails";

import { CARDS } from "./data/data";
import colors from "./components/colors";

const { width } = Dimensions.get("window");

const stackSize = 5;

const ANIMATION_DURATION = 200;

const transition = (
  <Transition.Sequence>
    <Transition.Out
      type="slide-bottom"
      durationMs={ANIMATION_DURATION}
      interpolation="easeIn"
    />
    <Transition.Together>
      <Transition.In
        type="fade"
        durationMs={ANIMATION_DURATION}
        delayMs={ANIMATION_DURATION / 2}
      />
      <Transition.In
        type="slide-bottom"
        durationMs={ANIMATION_DURATION}
        delayMs={ANIMATION_DURATION / 2}
        interpolation="easeOut"
      />
    </Transition.Together>
  </Transition.Sequence>
);

export default function App() {
  const [index, setIndex] = useState<number>(0);
  const swiperRef = useRef<Swiper<Card>>(null);
  const transitionRef = useRef<TransitioningView>(null);

  const onSwiped = () => {
    transitionRef.current?.animateNextTransition();
    setIndex((index + 1) % CARDS.length);
  };

  return (
    <SafeAreaView style={styles.container}>
      <MaterialCommunityIcons
        name="crop-square"
        size={width}
        color={colors.blue}
        style={{
          opacity: 0.05,
          transform: [{ rotate: "45deg" }, { scale: 1.6 }],
          position: "absolute",
          left: -15,
          top: 30,
        }}
      />
      <StatusBar hidden={true} />
      <View style={styles.swiperContainer}>
        <Swiper
          ref={swiperRef}
          cards={CARDS}
          cardIndex={index}
          renderCard={(card) => <CardItem card={card} />}
          infinite
          verticalSwipe={false}
          backgroundColor="transparent"
          onSwiped={onSwiped}
          onTapCard={() => swiperRef.current?.swipeLeft()}
          cardVerticalMargin={50}
          stackSize={stackSize}
          stackScale={10}
          stackSeparation={14}
          animateOverlayLabelsOpacity
          animateCardOpacity
          disableTopSwipe
          disableBottomSwipe
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  backgroundColor: colors.red,
                  borderColor: colors.red,
                  color: colors.white,
                  borderWidth: 1,
                  fontSize: 24,
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "flex-start",
                  marginTop: 20,
                  marginLeft: -20,
                },
              },
            },
            right: {
              title: "LIKE",
              style: {
                label: {
                  backgroundColor: colors.blue,
                  borderColor: colors.blue,
                  color: colors.white,
                  borderWidth: 1,
                  fontSize: 24,
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  marginTop: 20,
                  marginLeft: 20,
                },
              },
            },
          }}
        />
      </View>
      <View style={styles.bottomContainer}>
        <Transitioning.View
          ref={transitionRef}
          transition={transition}
          style={styles.bottomContainerMeta}
        >
          <CardDetails index={index} />
        </Transitioning.View>
        <View style={styles.bottomContainerButtons}>
          <MaterialCommunityIcons.Button
            name="close"
            size={94}
            backgroundColor="transparent"
            underlayColor="transparent"
            activeOpacity={0.3}
            color={colors.red}
            onPress={() => swiperRef.current?.swipeLeft()}
          />
          <MaterialCommunityIcons.Button
            name="check"
            size={94}
            backgroundColor="transparent"
            underlayColor="transparent"
            activeOpacity={0.3}
            color={colors.blue}
            onPress={() => swiperRef.current?.swipeRight()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  swiperContainer: {
    flex: 0.55,
  },
  style: {
    transform: [
      {
        rotate: "180deg",
      },
    ],
  },
  bottomContainer: {
    flex: 0.45,
    justifyContent: "space-evenly",
  },
  bottomContainerMeta: { alignContent: "flex-end", alignItems: "center" },
  bottomContainerButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
