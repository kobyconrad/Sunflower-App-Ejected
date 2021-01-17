import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useState } from "react";

function ActivityLogExercise(props) {
  const [screen, setScreen] = useState(0);
  const [exerciseStyle, setExerciseStyle] = useState(false);
  const [socialStyle, setSocialStyle] = useState(false);
  const [workStyle, setWorkStyle] = useState(false);
  const [learnStyle, setLearnStyle] = useState(false);

  let exerciseTouchProps = {
    style: exerciseStyle
      ? styles.activityItemContainerOn
      : styles.activityItemContainer,
  };
  let exerciseTouchPropsBody = {
    style: exerciseStyle
      ? styles.activityItemBodyContainerOn
      : styles.activityItemBodyContainer,
  };
  let exerciseTouchPropsBodyText = {
    style: exerciseStyle ? styles.paragraphTextOn : styles.paragraphText,
  };

  let socialTouchPropsContainer = {
    style: socialStyle
      ? styles.activityItemContainerOn
      : styles.activityItemContainer,
  };
  let socialTouchPropsBody = {
    style: socialStyle
      ? styles.activityItemBodyContainerOn
      : styles.activityItemBodyContainer,
  };
  let socialTouchPropsBodyText = {
    style: socialStyle ? styles.paragraphTextOn : styles.paragraphText,
  };

  let workTouchPropsContainer = {
    style: workStyle
      ? styles.activityItemContainerOn
      : styles.activityItemContainer,
  };
  let workTouchPropsBody = {
    style: workStyle
      ? styles.activityItemBodyContainerOn
      : styles.activityItemBodyContainer,
  };
  let workTouchPropsBodyText = {
    style: workStyle ? styles.paragraphTextOn : styles.paragraphText,
  };

  let learnTouchPropsContainer = {
    style: learnStyle
      ? styles.activityItemContainerOn
      : styles.activityItemContainer,
  };
  let learnTouchPropsBody = {
    style: learnStyle
      ? styles.activityItemBodyContainerOn
      : styles.activityItemBodyContainer,
  };
  let learnTouchPropsBodyText = {
    style: learnStyle ? styles.paragraphTextOn : styles.paragraphText,
  };

  let NavJournalScreen = props.NavJournalScreen;

  if (screen === 0) {
    return (
      <View style={styles.screenContainer}>
        <Text style={styles.titleText}>What did you accomplish today?</Text>
        <Text style={styles.subtitleText}>
          Select any activity that was healthy for your mind or body.
        </Text>

        <SafeAreaView
          style={{
            height: "67%",
            marginTop: 14,
          }}
        >
          <ScrollView style={{}} contentContainerStyle={{}}>
            <View style={{}}>
              <TouchableHighlight
                onPress={() => {
                  Haptics.selectionAsync();
                  console.log(exerciseStyle);
                  let current = exerciseStyle;
                  setExerciseStyle(!current);
                }}
                underlayColor=""
                style={{ width: "100%", display: "flex" }}
                activeOpacity={0.6}
              >
                <View {...exerciseTouchProps}>
                  <View style={styles.activityTitleContainer}>
                    <Image
                      source={require(`./../../assets/arm-emoji.png`)}
                      style={{ width: 16, height: 16, marginRight: 6 }}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "800",
                        color: "#000100",
                      }}
                    >
                      Exercise
                    </Text>
                  </View>
                  <View {...exerciseTouchPropsBody}>
                    <Text {...exerciseTouchPropsBodyText}>
                      ex: Going for a run, lifting weights, practicing sports.
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>

              <TouchableHighlight
                onPress={() => {
                  Haptics.selectionAsync();
                  let current = socialStyle;
                  setSocialStyle(!current);
                }}
                underlayColor=""
                style={{ width: "100%", display: "flex" }}
                activeOpacity={0.6}
              >
                <View {...socialTouchPropsContainer}>
                  <View style={styles.activityTitleContainer}>
                    <Image
                      source={require(`./../../assets/family-emoji.png`)}
                      style={{ width: 16, height: 16, marginRight: 6 }}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "800",
                        color: "#000100",
                      }}
                    >
                      Social Activity
                    </Text>
                  </View>
                  <View {...socialTouchPropsBody}>
                    <Text {...socialTouchPropsBodyText}>
                      ex: Spending time with family, friends, or loved ones.
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>

              <TouchableHighlight
                onPress={() => {
                  Haptics.selectionAsync();
                  let current = workStyle;
                  setWorkStyle(!current);
                }}
                underlayColor=""
                style={{ width: "100%", display: "flex" }}
                activeOpacity={0.6}
              >
                <View {...workTouchPropsContainer}>
                  <View style={styles.activityTitleContainer}>
                    <Image
                      source={require(`./../../assets/work-emoji.png`)}
                      style={{ width: 16, height: 16, marginRight: 6 }}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "800",
                        color: "#000100",
                      }}
                    >
                      Rewarding Work
                    </Text>
                  </View>
                  <View {...workTouchPropsBody}>
                    <Text {...workTouchPropsBodyText}>
                      ex: Any work that you feel proud of, or gave you a sense
                      of purpose.
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>

              <TouchableHighlight
                onPress={() => {
                  Haptics.selectionAsync();
                  let current = learnStyle;
                  setLearnStyle(!current);
                }}
                underlayColor=""
                style={{ width: "100%", display: "flex" }}
                activeOpacity={0.6}
              >
                <View {...learnTouchPropsContainer}>
                  <View style={styles.activityTitleContainer}>
                    <Image
                      source={require(`./../../assets/books-emoji.png`)}
                      style={{ width: 16, height: 16, marginRight: 6 }}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "800",
                        color: "#000100",
                      }}
                    >
                      Learning New Things
                    </Text>
                  </View>
                  <View {...learnTouchPropsBody}>
                    <Text {...learnTouchPropsBodyText}>
                      ex: Anything you learned that was pleasurable and brought
                      joy.
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>
            </View>
          </ScrollView>
        </SafeAreaView>

        <View style={styles.exerciseNavContainer}>
          <TouchableHighlight
            onPress={() => {
              Haptics.selectionAsync();
              NavJournalScreen();
            }}
            underlayColor=""
            style={{ width: "33%", height: "100%", display: "flex" }}
          >
            <View style={styles.cancelContainer}>
              <Text style={{ fontSize: 18, color: "#fff", fontWeight: "800" }}>
                cancel
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              Haptics.selectionAsync();
              setScreen(1);
            }}
            underlayColor=""
            style={{ width: "63%", height: "100%", display: "flex" }}
          >
            <View style={styles.nextContainer}>
              <Text style={{ fontSize: 18, color: "#fff", fontWeight: "800" }}>
                next
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  } else if (screen === 1) {
    return (
      <View style={styles.screenContainer}>
        <Text>Next Screen</Text>
        <View style={styles.exerciseNavContainer}>
          <TouchableHighlight
            onPress={() => {
              Haptics.selectionAsync();
              setScreen(0);
            }}
            underlayColor=""
            style={{
              width: "33%",
              height: "100%",
              display: "flex",
            }}
          >
            <View style={styles.cancelContainer}>
              <Text style={{ fontSize: 18, color: "#fff", fontWeight: "800" }}>
                back
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              Haptics.selectionAsync();
              setScreen(1);
            }}
            underlayColor=""
            style={{ width: "63%", height: "100%", display: "flex" }}
          >
            <View style={styles.nextContainer}>
              <Text style={{ fontSize: 18, color: "#fff", fontWeight: "800" }}>
                next
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    width: "100%",
    height: "100%",
    padding: 25,
    backgroundColor: "#fff",
  },
  titleText: {
    fontSize: 24,
    fontWeight: "800",
    marginTop: 34,
    color: "#000100",
  },
  subtitleText: {
    fontSize: 14,
    fontWeight: "400",
    marginTop: 10,
    color: "#2E2E2E",
  },
  exerciseNavContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 45,
    marginTop: 20,
  },
  cancelContainer: {
    backgroundColor: "#B8BFC8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    height: "100%",
  },
  nextContainer: {
    backgroundColor: "#6A49E8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    height: "100%",
  },
  activityItemContainer: {
    width: "100%",
    borderWidth: 1,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: "#EDEFFB",
    borderRadius: 6,
    minHeight: 100,
    padding: 14,
    marginBottom: 20,
  },
  activityItemContainerOn: {
    borderColor: "#6A49E8",
    width: "100%",
    borderWidth: 1,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderRadius: 6,
    minHeight: 100,
    padding: 14,
    marginBottom: 20,
  },
  activityItemBodyContainer: {
    width: "100%",
    backgroundColor: "#EDEFFB",
    borderRadius: 6,
    padding: 8,
    marginTop: 10,
  },
  activityItemBodyContainerOn: {
    width: "100%",
    backgroundColor: "#6A49E8",
    borderRadius: 6,
    padding: 8,
    marginTop: 10,
  },
  activityTitleContainer: {
    display: "flex",
    flexDirection: "row",
  },
  paragraphText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#000100",
  },
  paragraphTextOn: {
    fontSize: 14,
    fontWeight: "400",
    color: "#fff",
  },
});

export default ActivityLogExercise;
