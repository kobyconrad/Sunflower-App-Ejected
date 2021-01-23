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
  const [craving, setCraving] = useState(0);

  const [coping, setCoping] = useState(false);
  const [reward, setReward] = useState(false);
  const [notAddicted, setNotAddicted] = useState(false);
  const [notBad, setNotBad] = useState(false);
  const [job, setJob] = useState(false);
  const [occasional, setOccasional] = useState(false);

  const [journalText, setJournalText] = useState("");

  let copingTouchProps = {
    style: coping
      ? styles.activityItemContainerOn
      : styles.activityItemContainer,
  };
  let copingTouchPropsBody = {
    style: coping
      ? styles.activityItemBodyContainerOn
      : styles.activityItemBodyContainer,
  };
  let copingTouchPropsBodyText = {
    style: coping ? styles.paragraphTextOn : styles.paragraphText,
  };

  let rewardTouchProps = {
    style: reward
      ? styles.activityItemContainerOn
      : styles.activityItemContainer,
  };
  let rewardTouchPropsBody = {
    style: reward
      ? styles.activityItemBodyContainerOn
      : styles.activityItemBodyContainer,
  };
  let rewardTouchPropsBodyText = {
    style: reward ? styles.paragraphTextOn : styles.paragraphText,
  };

  let notAddictedTouchProps = {
    style: notAddicted
      ? styles.activityItemContainerOn
      : styles.activityItemContainer,
  };
  let notAddictedTouchPropsBody = {
    style: notAddicted
      ? styles.activityItemBodyContainerOn
      : styles.activityItemBodyContainer,
  };
  let notAddictedTouchPropsBodyText = {
    style: notAddicted ? styles.paragraphTextOn : styles.paragraphText,
  };

  let notBadTouchProps = {
    style: notBad
      ? styles.activityItemContainerOn
      : styles.activityItemContainer,
  };
  let notBadTouchPropsBody = {
    style: notBad
      ? styles.activityItemBodyContainerOn
      : styles.activityItemBodyContainer,
  };
  let notBadTouchPropsBodyText = {
    style: notBad ? styles.paragraphTextOn : styles.paragraphText,
  };

  let jobTouchProps = {
    style: job ? styles.activityItemContainerOn : styles.activityItemContainer,
  };
  let jobTouchPropsBody = {
    style: job
      ? styles.activityItemBodyContainerOn
      : styles.activityItemBodyContainer,
  };
  let jobTouchPropsBodyText = {
    style: job ? styles.paragraphTextOn : styles.paragraphText,
  };

  let occasionalTouchProps = {
    style: occasional
      ? styles.activityItemContainerOn
      : styles.activityItemContainer,
  };
  let occasionalTouchPropsBody = {
    style: occasional
      ? styles.activityItemBodyContainerOn
      : styles.activityItemBodyContainer,
  };
  let occasionalTouchPropsBodyText = {
    style: occasional ? styles.paragraphTextOn : styles.paragraphText,
  };

  let NavJournalScreen = props.NavJournalScreen;

  if (screen === 0) {
    return (
      <View style={styles.screenContainer}>
        <Text style={styles.titleText}>Rate Your Craving</Text>
        <Text style={styles.subtitleText}>
          On a scale from 1 to 5 how strong is your craving?
        </Text>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            paddingTop: 20,
            paddingBottom: 20,
          }}
        >
          <TouchableHighlight
            onPress={() => {
              Haptics.selectionAsync();
              setCraving(1);
            }}
            underlayColor=""
            activeOpacity={0.5}
            style={{}}
          >
            <Image
              source={require(`./../../assets/fire-emoji.png`)}
              style={{ width: 50, height: 50, marginRight: 6 }}
            />
          </TouchableHighlight>

          <TouchableHighlight
            onPress={() => {
              Haptics.selectionAsync();
              setCraving(2);
            }}
            underlayColor=""
            activeOpacity={0.5}
            style={{}}
          >
            <Image
              source={require(`./../../assets/fire-emoji.png`)}
              style={{ width: 50, height: 50, marginRight: 6 }}
            />
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              Haptics.selectionAsync();
              setCraving(3);
            }}
            underlayColor=""
            activeOpacity={0.5}
            style={{}}
          >
            <Image
              source={require(`./../../assets/fire-emoji.png`)}
              style={{ width: 50, height: 50, marginRight: 6 }}
            />
          </TouchableHighlight>

          <TouchableHighlight
            onPress={() => {
              Haptics.selectionAsync();
              setCraving(4);
            }}
            underlayColor=""
            activeOpacity={0.5}
            style={{}}
          >
            <Image
              source={require(`./../../assets/fire-emoji.png`)}
              style={{ width: 50, height: 50, marginRight: 6 }}
            />
          </TouchableHighlight>

          <TouchableHighlight
            onPress={() => {
              Haptics.selectionAsync();
              setCraving(5);
            }}
            underlayColor=""
            activeOpacity={0.5}
            style={{}}
          >
            <Image
              source={require(`./../../assets/fire-emoji.png`)}
              style={{ width: 50, height: 50, marginRight: 6 }}
            />
          </TouchableHighlight>
        </View>

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
              console.log(craving);
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
          Do any of these common fallacies apply?
        </Text>
        <Text style={styles.subtitleText}>
          Is your brain trying to trick you into giving up your sobriety? Select
          one or skip this step.
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
                  let current = coping;
                  setCoping(!current);
                }}
                underlayColor=""
                style={{ width: "100%", display: "flex" }}
                activeOpacity={0.6}
              >
                <View {...copingTouchProps}>
                  <View style={styles.activityTitleContainer}>
                    <Image
                      source={require(`./../../assets/coping-emoji.png`)}
                      style={{ width: 16, height: 16, marginRight: 6 }}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "800",
                        color: "#000100",
                      }}
                    >
                      Coping Fallacy
                    </Text>
                  </View>
                  <View {...copingTouchPropsBody}>
                    <Text {...copingTouchPropsBodyText}>
                      ex: Something horrible happened to me, and I need it to
                      cope with life.
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => {
                  Haptics.selectionAsync();
                  let current = reward;
                  setReward(!current);
                }}
                underlayColor=""
                style={{ width: "100%", display: "flex" }}
                activeOpacity={0.6}
              >
                <View {...rewardTouchProps}>
                  <View style={styles.activityTitleContainer}>
                    <Image
                      source={require(`./../../assets/reward-emoji.png`)}
                      style={{ width: 16, height: 16, marginRight: 6 }}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "800",
                        color: "#000100",
                      }}
                    >
                      Reward Fallacy
                    </Text>
                  </View>
                  <View {...rewardTouchPropsBody}>
                    <Text {...rewardTouchPropsBodyText}>
                      ex: Because I've been sober so long, I deserve it.
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => {
                  Haptics.selectionAsync();
                  let current = notAddicted;
                  setNotAddicted(!current);
                }}
                underlayColor=""
                style={{ width: "100%", display: "flex" }}
                activeOpacity={0.6}
              >
                <View {...notAddictedTouchProps}>
                  <View style={styles.activityTitleContainer}>
                    <Image
                      source={require(`./../../assets/not-addicted-emoji.png`)}
                      style={{ width: 16, height: 16, marginRight: 6 }}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "800",
                        color: "#000100",
                      }}
                    >
                      No Longer Addicted Fallacy
                    </Text>
                  </View>
                  <View {...notAddictedTouchPropsBody}>
                    <Text {...notAddictedTouchPropsBodyText}>
                      ex: Staying sober has proved i'm not addicted, so I can
                      use again.
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => {
                  Haptics.selectionAsync();
                  let current = notBad;
                  setNotBad(!current);
                }}
                underlayColor=""
                style={{ width: "100%", display: "flex" }}
                activeOpacity={0.6}
              >
                <View {...notBadTouchProps}>
                  <View style={styles.activityTitleContainer}>
                    <Image
                      source={require(`./../../assets/not-bad.png`)}
                      style={{ width: 16, height: 16, marginRight: 6 }}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "800",
                        color: "#000100",
                      }}
                    >
                      It's Not Bad Fallacy
                    </Text>
                  </View>
                  <View {...notBadTouchPropsBody}>
                    <Text {...notBadTouchPropsBodyText}>
                      ex: I can't even remember why this was bad for me. Why did
                      I stop?
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>

              <TouchableHighlight
                onPress={() => {
                  Haptics.selectionAsync();
                  let current = job;
                  setJob(!current);
                }}
                underlayColor=""
                style={{ width: "100%", display: "flex" }}
                activeOpacity={0.6}
              >
                <View {...jobTouchProps}>
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
                      I Have A Job Fallacy
                    </Text>
                  </View>
                  <View {...jobTouchPropsBody}>
                    <Text {...jobTouchPropsBodyText}>
                      ex: I have a job or I'm doing well in life, so my use is
                      fine.
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>

              <TouchableHighlight
                onPress={() => {
                  Haptics.selectionAsync();
                  let current = occasional;
                  setOccasional(!current);
                }}
                underlayColor=""
                style={{ width: "100%", display: "flex" }}
                activeOpacity={0.6}
              >
                <View {...occasionalTouchProps}>
                  <View style={styles.activityTitleContainer}>
                    <Image
                      source={require(`./../../assets/occasional-emoji.png`)}
                      style={{ width: 16, height: 16, marginRight: 6 }}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "800",
                        color: "#000100",
                      }}
                    >
                      Occasional Fallacy
                    </Text>
                  </View>
                  <View {...occasionalTouchPropsBody}>
                    <Text {...occasionalTouchPropsBodyText}>
                      ex: I only do it on the weekends or special occasions, so
                      that's okay right?
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
              console.log(journalText);

              // const [craving, setCraving] = useState(0);

              // const [coping, setCoping] = useState(false);
              // const [reward, setReward] = useState(false);
              // const [notAddicted, setNotAddicted] = useState(false);
              // const [notBad, setNotBad] = useState(false);
              // const [job, setJob] = useState(false);
              // const [occasional, setOccasional] = useState(false);

              // const [journalText, setJournalText] = useState("");

              // creates a new entry object
              let currentDate = new Date();
              let newEntry = {};
              newEntry[currentDate] = {};
              newEntry[currentDate]["craving"] = craving;
              newEntry[currentDate]["fallacy"] = {};
              newEntry[currentDate]["text"] = journalText;

              if (coping) {
                newEntry[currentDate]["fallacy"]["coping"] = true;
              }
              if (reward) {
                newEntry[currentDate]["fallacy"]["reward"] = true;
              }
              if (notAddicted) {
                newEntry[currentDate]["fallacy"]["notAddicted"] = true;
              }
              if (notBad) {
                newEntry[currentDate]["fallacy"]["notBad"] = true;
              }
              if (job) {
                newEntry[currentDate]["fallacy"]["job"] = true;
              }
              if (occasional) {
                newEntry[currentDate]["fallacy"]["occasional"] = true;
              }

              console.log(newEntry);
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
