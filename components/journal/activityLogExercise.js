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

function ActivityLogExercise(props) {
  const [screen, setScreen] = useState(0);
  const [currentEntry, setCurrentEntry] = useState({});

  const [exerciseStyle, setExerciseStyle] = useState(false);
  const [socialStyle, setSocialStyle] = useState(false);
  const [workStyle, setWorkStyle] = useState(false);
  const [learnStyle, setLearnStyle] = useState(false);
  const [careStyle, setCareStyle] = useState(false);
  const [skillStyle, setSkillStyle] = useState(false);
  const [miscStyle, setMiscStyle] = useState(false);

  const [journalText, setJournalText] = useState("");
  const [mood, setMood] = useState("none");

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

  let skillTouchPropsContainer = {
    style: skillStyle
      ? styles.activityItemContainerOn
      : styles.activityItemContainer,
  };
  let skillTouchPropsBody = {
    style: skillStyle
      ? styles.activityItemBodyContainerOn
      : styles.activityItemBodyContainer,
  };
  let skillTouchPropsBodyText = {
    style: skillStyle ? styles.paragraphTextOn : styles.paragraphText,
  };

  let careTouchPropsContainer = {
    style: careStyle
      ? styles.activityItemContainerOn
      : styles.activityItemContainer,
  };
  let careTouchPropsBody = {
    style: careStyle
      ? styles.activityItemBodyContainerOn
      : styles.activityItemBodyContainer,
  };
  let careTouchPropsBodyText = {
    style: careStyle ? styles.paragraphTextOn : styles.paragraphText,
  };

  let miscTouchPropsContainer = {
    style: miscStyle
      ? styles.activityItemContainerOn
      : styles.activityItemContainer,
  };
  let miscTouchPropsBody = {
    style: miscStyle
      ? styles.activityItemBodyContainerOn
      : styles.activityItemBodyContainer,
  };
  let miscTouchPropsBodyText = {
    style: miscStyle ? styles.paragraphTextOn : styles.paragraphText,
  };

  let NavJournalScreen = props.NavJournalScreen;

  if (screen === 0) {
    return (
      <View style={styles.screenContainer}>
        <Text style={styles.titleText}>
          What activities did you accomplish today?
        </Text>
        <Text style={styles.subtitleText}>
          Select any activity that was a healthy method for rewarding your brain
          with dopamine.
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

              <TouchableHighlight
                onPress={() => {
                  Haptics.selectionAsync();
                  let current = skillStyle;
                  setSkillStyle(!current);
                }}
                underlayColor=""
                style={{ width: "100%", display: "flex" }}
                activeOpacity={0.6}
              >
                <View {...skillTouchPropsContainer}>
                  <View style={styles.activityTitleContainer}>
                    <Image
                      source={require(`./../../assets/skill-emoji.png`)}
                      style={{ width: 16, height: 16, marginRight: 6 }}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "800",
                        color: "#000100",
                      }}
                    >
                      Practicing A Skill
                    </Text>
                  </View>
                  <View {...skillTouchPropsBody}>
                    <Text {...skillTouchPropsBodyText}>
                      ex: Practicing any kind of skill! Instruments, cooking,
                      programming, art, anything.
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>

              <TouchableHighlight
                onPress={() => {
                  Haptics.selectionAsync();
                  let current = careStyle;
                  setCareStyle(!current);
                }}
                underlayColor=""
                style={{ width: "100%", display: "flex" }}
                activeOpacity={0.6}
              >
                <View {...careTouchPropsContainer}>
                  <View style={styles.activityTitleContainer}>
                    <Image
                      source={require(`./../../assets/care-emoji.png`)}
                      style={{ width: 16, height: 16, marginRight: 6 }}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "800",
                        color: "#000100",
                      }}
                    >
                      Self Care
                    </Text>
                  </View>
                  <View {...careTouchPropsBody}>
                    <Text {...careTouchPropsBodyText}>
                      ex: Cleaning your room, doing your laundry, paying that
                      bill you've been avoiding, etc.
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>

              <TouchableHighlight
                onPress={() => {
                  Haptics.selectionAsync();
                  let current = miscStyle;
                  setMiscStyle(!current);
                }}
                underlayColor=""
                style={{ width: "100%", display: "flex" }}
                activeOpacity={0.6}
              >
                <View {...miscTouchPropsContainer}>
                  <View style={styles.activityTitleContainer}>
                    <Image
                      source={require(`./../../assets/misc-emoji.png`)}
                      style={{ width: 16, height: 16, marginRight: 6 }}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "800",
                        color: "#000100",
                      }}
                    >
                      Misc.
                    </Text>
                  </View>
                  <View {...miscTouchPropsBody}>
                    <Text {...miscTouchPropsBodyText}>
                      ex: Anything not covered on this list that you found
                      rewarding in a healthy way.
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

              let currentObj = {};
              if (Object.keys(currentEntry).length === 0) {
                let currentDate = new Date();
                currentObj[currentDate] = {};
                currentObj[currentDate].activities = {};
                currentObj[currentDate].text = "";
                currentObj[currentDate].mood = "none";
              } else {
                currentObj = currentEntry;
              }

              let currentKey = Object.keys(currentObj)[0];

              // currentObj[currentKey]

              if (exerciseStyle) {
                currentObj[currentKey].activities.exercise = true;
              } else {
                currentObj[currentKey].activities.exercise = false;
              }

              if (socialStyle) {
                currentObj[currentKey].activities.social = true;
              } else {
                currentObj[currentKey].activities.social = false;
              }

              if (workStyle) {
                currentObj[currentKey].activities.work = true;
              } else {
                currentObj[currentKey].activities.work = false;
              }

              if (learnStyle) {
                currentObj[currentKey].activities.learn = true;
              } else {
                currentObj[currentKey].activities.learn = false;
              }

              if (skillStyle) {
                currentObj[currentKey].activities.skill = true;
              } else {
                currentObj[currentKey].activities.skill = false;
              }

              if (careStyle) {
                currentObj[currentKey].activities.care = true;
              } else {
                currentObj[currentKey].activities.care = false;
              }

              if (miscStyle) {
                currentObj[currentKey].activities.misc = true;
              } else {
                currentObj[currentKey].activities.misc = false;
              }

              setCurrentEntry(currentObj);
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
        <Text style={styles.titleText}>Briefly write down what you did.</Text>
        <Text style={styles.subtitleText}>
          What down what you accomplished! How did being sober make an impact?
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
              setScreen(2);

              let currentObj = currentEntry;
              let currentKey = Object.keys(currentObj)[0];
              currentObj[currentKey].text = journalText;
              setCurrentEntry(currentObj);
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
    function MoodSelector(props) {
      if (props.moodSetting === "none") {
        return (
          <View
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: 20,
              marginTop: 20,
            }}
          >
            <Frown
              stroke="#B8BFC8"
              width={55}
              height={55}
              onPress={() => {
                setMood("frown");
              }}
            />
            <Meh
              stroke="#B8BFC8"
              width={55}
              height={55}
              onPress={() => {
                setMood("meh");
              }}
            />
            <Smile
              stroke="#B8BFC8"
              width={55}
              height={55}
              onPress={() => {
                setMood("smile");
              }}
            />
          </View>
        );
      } else if (props.moodSetting === "frown") {
        return (
          <View
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: 20,
              marginTop: 20,
            }}
          >
            <Frown
              stroke="#D9042B"
              width={55}
              height={55}
              onPress={() => {
                setMood("frown");
              }}
            />
            <Meh
              stroke="#B8BFC8"
              width={55}
              height={55}
              onPress={() => {
                setMood("meh");
              }}
            />
            <Smile
              stroke="#B8BFC8"
              width={55}
              height={55}
              onPress={() => {
                setMood("smile");
              }}
            />
          </View>
        );
      } else if (props.moodSetting === "meh") {
        return (
          <View
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: 20,
              marginTop: 20,
            }}
          >
            <Frown
              stroke="#B8BFC8"
              width={55}
              height={55}
              onPress={() => {
                setMood("frown");
              }}
            />
            <Meh
              stroke="#FFB719"
              width={55}
              height={55}
              onPress={() => {
                setMood("meh");
              }}
            />
            <Smile
              stroke="#B8BFC8"
              width={55}
              height={55}
              onPress={() => {
                setMood("smile");
              }}
            />
          </View>
        );
      } else if (props.moodSetting === "smile") {
        return (
          <View
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: 20,
              marginTop: 20,
            }}
          >
            <Frown
              stroke="#B8BFC8"
              width={55}
              height={55}
              onPress={() => {
                setMood("frown");
              }}
            />
            <Meh
              stroke="#B8BFC8"
              width={55}
              height={55}
              onPress={() => {
                setMood("meh");
              }}
            />
            <Smile
              stroke="#02B268"
              width={55}
              height={55}
              onPress={() => {
                setMood("smile");
              }}
            />
          </View>
        );
      } else {
        return <View></View>;
      }
    }

    return (
      <View style={styles.screenContainer}>
        <Text style={styles.titleText}>How rewarding was this activity?</Text>
        <Text style={styles.subtitleText}>
          How much pleasure, reward, or accomplishment did you get from
          completing the activity?
        </Text>

        <MoodSelector moodSetting={mood} />

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

              let currentObj = currentEntry;
              let currentKey = Object.keys(currentObj)[0];
              currentObj[currentKey].mood = mood;
              setCurrentEntry(currentObj);

              let currentData = {};
              async function grabData() {
                currentData = await getData();
                currentData[currentKey] = currentEntry[currentKey];
                storeData(currentData);
                NavJournalScreen();
              }
              Segment.track("completed-journal-entry");
              grabData();
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
