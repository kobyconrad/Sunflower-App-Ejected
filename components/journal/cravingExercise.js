import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useState } from "react";
import { Book, Frown, Meh, Smile, Trash2 } from "react-native-feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Segment from "expo-analytics-segment";

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("journal-entries-test-2", jsonValue);
  } catch (e) {
    // saving error
  }
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("journal-entries-test-2");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

function CravingExercise(props) {
  const [screen, setScreen] = useState(0);
  const [currentEntry, setCurrentEntry] = useState({});

  const [exerciseStyle, setExerciseStyle] = useState(false);

  const [journalText, setJournalText] = useState("");

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

  let NavJournalScreen = props.NavJournalScreen;

  if (screen === 0) {
    return (
      <View style={styles.screenContainer}>
        <Text style={styles.titleText}>How rewarding was this activity?</Text>
        <Text style={styles.subtitleText}>
          How much pleasure, reward, or accomplishment did you get from
          completing the activity?
        </Text>

        <View style={styles.exerciseNavContainer}>
          <TouchableHighlight
            onPress={() => {
              Haptics.selectionAsync();
              NavJournalScreen();
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
        <Text style={styles.titleText}>
          Do any of these common irrational thoughts apply?
        </Text>
        <Text style={styles.subtitleText}>
          Scale from "I hardly notice" to "I'm 3 seconds from giving in."
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
            </View>
          </ScrollView>
        </SafeAreaView>

        <View style={styles.exerciseNavContainer}>
          <TouchableHighlight
            onPress={() => {
              Haptics.selectionAsync();
              setScreen(0);
            }}
            underlayColor=""
            style={{ width: "33%", height: "100%", display: "flex" }}
          >
            <View style={styles.cancelContainer}>
              <Text style={{ fontSize: 18, color: "#fff", fontWeight: "800" }}>
                back
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              setScreen(2);
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
  } else if (screen === 2) {
    return (
      <View style={styles.screenContainer}>
        <Text style={styles.titleText}>
          Write down why you shouldn't give in to your cravings.
        </Text>
        <Text style={styles.subtitleText}>
          List the negatives of addiction. List the rewards of sobriety. List
          healthy ways to give your brain dopamine (exercise, friends, learning
          new things, etc).
        </Text>
        <TextInput
          multiline={true}
          numberOfLines={4}
          placeholder={
            "I cleaned my room, worked out at the gym, and had dinner with my family..."
          }
          style={{
            height: 160,
            borderColor: "gray",
            borderWidth: 1,
            borderBottomWidth: 3,
            borderRightWidth: 2,
            padding: 12,
            paddingTop: 12,
            marginTop: 0,
            borderRadius: 4,
            fontSize: 15,
            borderColor: "#B8BFC8",
            textAlignVertical: "top",
            width: "100%",
            marginTop: 20,
          }}
          onChangeText={(inputText) => setJournalText(inputText)}
          value={journalText}
        />
        <View style={styles.exerciseNavContainer}>
          <TouchableHighlight
            onPress={() => {
              Haptics.selectionAsync();
              setScreen(1);
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
              NavJournalScreen();
            }}
            underlayColor=""
            style={{ width: "63%", height: "100%", display: "flex" }}
          >
            <View style={styles.nextContainer}>
              <Text style={{ fontSize: 18, color: "#fff", fontWeight: "800" }}>
                finish
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  } else {
    return <View></View>;
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

export default CravingExercise;
