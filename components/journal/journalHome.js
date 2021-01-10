import * as React from "react";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TextInput,
} from "react-native";
import { Book, Frown, Meh, Smile } from "react-native-feather";
import * as Haptics from "expo-haptics";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("journal-entries-test", jsonValue);
  } catch (e) {
    // saving error
  }
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("journal-entries-test");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

function JournalHome() {
  const [screen, setScreen] = useState("home");
  const [text, setJournalText] = useState("");
  const [mood, setMood] = useState("none");

  if (screen === "home") {
    // Journal Homepage Screen
    return (
      <View
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column-reverse",
          backgroundColor: "#fff",
        }}
      >
        <View style={{ height: 80 }}></View>
        <View
          style={{
            height: 165,
            backgroundColor: "#F0F4FA",
          }}
        >
          <TouchableHighlight
            onPress={() => {
              setScreen("journal-entry");
              Haptics.selectionAsync();
            }}
            underlayColor=""
            style={{}}
          >
            <View style={styles.exerciseContainer}>
              <View style={styles.exerciseTitleContainer}>
                <Text
                  style={{ fontSize: 16, fontWeight: "900", color: "#313853" }}
                >
                  Add Sober Journal Entry
                </Text>
                <Text style={{ fontSize: 14, marginTop: 6, color: "#8892AB" }}>
                  Rewire your brain to associate sobriety with reward.
                </Text>
              </View>

              <View style={styles.iconContainer}>
                <Book stroke="#6A49E8" width={22} height={22} />
              </View>
            </View>
          </TouchableHighlight>
        </View>

        <View style={styles.feedContainer}>
          <Text>THIS IS JOURNALLLL</Text>
          <Text>THIS IS JOURNALLLL</Text>
          <Text>THIS IS JOURNALLLL</Text>
          <Text>THIS IS JOURNALLLL</Text>
          <Text>THIS IS JOURNALLLL</Text>
          <Text>THIS IS JOURNALLLL</Text>
          <Text>THIS IS JOURNALLLL</Text>
          <Text>THIS IS JOURNALLLL</Text>
          <Text>THIS IS JOURNALLLL</Text>
        </View>
      </View>
    );
  } else {
    // Exercise Screen
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
      <View
        style={{
          backgroundColor: "#FBFCFE",
          height: "100%",
          zIndex: 100,
          paddingTop: 50,
        }}
      >
        <View style={styles.entryExerciseTitleContainer}>
          <Text style={{ fontSize: 20, fontWeight: "900", color: "#313853" }}>
            How did you feel today?
          </Text>
        </View>

        <MoodSelector moodSetting={mood} />

        <View style={styles.entryExerciseTitleContainer}>
          <Text style={{ fontSize: 20, fontWeight: "900", color: "#313853" }}>
            What did you accomplish today, because you were sober?
          </Text>
        </View>

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
            margin: 18,
            marginTop: 0,
            borderRadius: 4,
            fontSize: 15,
            borderColor: "#B8BFC8",
            textAlignVertical: "top",
          }}
          onChangeText={(inputText) => setJournalText(inputText)}
          value={text}
        />

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TouchableHighlight
            onPress={() => {
              setJournalText("");
              setScreen("home");
              setMood("none");
              Haptics.selectionAsync();
            }}
            underlayColor=""
            style={{}}
          >
            <View style={styles.cancelButtonContainer}>
              <Text style={{ fontSize: 18, fontWeight: "900", color: "white" }}>
                delete
              </Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={() => {
              setScreen("home");

              async function handleStorage() {
                let currentDate = new Date();
                let storedData = await getData();
                if (storedData !== null) {
                  let entryObj = {};
                  entryObj.text = text;
                  if (mood !== "none") {
                    entryObj.mood = mood;
                  }
                  storedData[currentDate] = entryObj;
                } else {
                  storedData = {};
                  let entryObj = {};
                  entryObj.text = text;
                  if (mood !== "none") {
                    entryObj.mood = mood;
                  }
                  storedData[currentDate] = entryObj;
                }

                storeData(storedData);
                let newStoredData = await getData();
              }

              handleStorage();
              setJournalText("");
              setMood("none");

              Haptics.selectionAsync();
            }}
            underlayColor=""
          >
            <View style={styles.finishButtonContainer}>
              <Text style={{ fontSize: 18, fontWeight: "900", color: "white" }}>
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
  feedContainer: {},
  exerciseContainer: {
    height: 120,
    backgroundColor: "#fff",
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderBottomWidth: 2,
    borderColor: "#EDEFFB",
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FBFCFE",
    width: "20%",
  },
  exerciseTitleContainer: {
    width: "80%",
    padding: 18,
    display: "flex",
    justifyContent: "center",
  },
  entryExerciseTitleContainer: {
    padding: 18,
  },
  cancelButtonContainer: {
    width: 100,
    height: 45,
    backgroundColor: "#FA344C",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    margin: 4,
  },
  finishButtonContainer: {
    height: 45,
    width: 220,
    backgroundColor: "#6A49E8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    margin: 4,
  },
});

export default JournalHome;
