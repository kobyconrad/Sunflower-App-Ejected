import * as React from "react";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Book, Frown, Meh, Smile, Trash2 } from "react-native-feather";
import * as Haptics from "expo-haptics";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

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

// const DismissKeyboard = ({ children }) => {
//   return (

//   );
// };

function JournalHome() {
  const [screen, setScreen] = useState("home");
  const [text, setJournalText] = useState("");
  const [mood, setMood] = useState("none");
  const [entries, setEntries] = useState({});
  const [currentKey, setCurrentKey] = useState("");

  useEffect(() => {
    async function grabData() {
      let currentData = await getData();
      setEntries(currentData);
    }
    grabData();
  }, []);

  let myComponentList = (
    <View>
      <Text></Text>
    </View>
  );
  if (entries !== null) {
    myComponentList = Object.keys(entries).map((key) => {
      let currentDate = key;
      let currentText = entries[key].text;
      let currentMood = entries[key].mood;

      if (entries[key].deleted !== true) {
        return (
          <TouchableHighlight
            onPress={() => {
              setMood(currentMood);
              setJournalText(currentText);
              setCurrentKey(key);
              Haptics.selectionAsync();
              setScreen("journal-entry");
            }}
            underlayColor=""
            style={{}}
          >
            <JournalEntry
              myKey={key}
              text={currentText}
              date={currentDate}
              mood={currentMood}
            />
          </TouchableHighlight>
        );
      }
    });
  }
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

        <View
          style={{
            backgroundColor: "#fff",
            width: "100%",
            height: "6%",
            top: 0,
            position: "absolute",
            zIndex: 2,
          }}
        ></View>

        <SafeAreaView
          style={{
            height: "65%",
            display: "flex",
            flexDirection: "column-reverse",
          }}
        >
          <ScrollView
            style={{}}
            contentContainerStyle={{
              display: "flex",
              justifyContent: "flex-end",
              flexDirection: "column-reverse",
              paddingTop: 20,
            }}
          >
            <View style={styles.feedContainer}>{myComponentList}</View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  } else if (screen === "journal-entry") {
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
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
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
                setCurrentKey("");
                Haptics.selectionAsync();
              }}
              underlayColor=""
              style={{}}
            >
              <View style={styles.cancelButtonContainer}>
                <Text
                  style={{ fontSize: 18, fontWeight: "900", color: "white" }}
                >
                  cancel
                </Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              onPress={() => {
                setScreen("home");

                async function handleStorage() {
                  console.log("do i store?");

                  let currentDate = new Date();
                  if (currentKey.length > 1) {
                    currentDate = new Date(currentKey);
                  }

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
                  setEntries(storedData);
                }

                handleStorage();
                setJournalText("");
                setMood("none");
                setCurrentKey("");

                Haptics.selectionAsync();
              }}
              underlayColor=""
            >
              <View style={styles.finishButtonContainer}>
                <Text
                  style={{ fontSize: 18, fontWeight: "900", color: "white" }}
                >
                  finish
                </Text>
              </View>
            </TouchableHighlight>
          </View>

          {/* // delete button */}
          <TouchableHighlight
            style={{
              bottom: 0,
              right: 0,
              position: "absolute",
              margin: 18,
              backgroundColor: "#FA344C",
              padding: 4,
              borderRadius: 6,
            }}
            onPress={() => {
              setScreen("home");

              async function handleStorage() {
                console.log("do i store?");
                let currentDate = new Date();
                let storedData = await getData();
                if (storedData !== null) {
                  let entryObj = {};
                  entryObj.deleted = true;
                  //   entryObj.text = text;
                  //   if (mood !== "none") {
                  //     entryObj.mood = mood;
                  //   }
                  storedData[currentKey] = entryObj;
                } else {
                  storedData = {};
                  let entryObj = {};
                  entryObj.deleted = true;
                  //   entryObj.text = text;
                  //   if (mood !== "none") {
                  //     entryObj.mood = mood;
                  //   }
                  storedData[currentDate] = entryObj;
                }
                storeData(storedData);
                setEntries(storedData);
              }

              handleStorage();
              setJournalText("");
              setMood("none");
              setCurrentKey("");

              Haptics.selectionAsync();
            }}
            underlayColor=""
          >
            <View>
              <Trash2 stroke="#fff" width={30} height={30} />
            </View>
          </TouchableHighlight>
        </View>
      </TouchableWithoutFeedback>
    );
  } else {
    return <View></View>;
  }
}

function JournalEntry(props) {
  let mood = props.mood;
  let currentDate = new Date(props.date);
  let stringDate = currentDate.toDateString();

  let moodComponent = <View></View>;

  if (mood === "frown") {
    moodComponent = <Frown stroke="#D9042B" width={22} height={22} />;
  } else if (mood === "meh") {
    moodComponent = <Meh stroke="#FFB719" width={22} height={22} />;
  } else if (mood === "smile") {
    moodComponent = <Smile stroke="#02B268" width={22} height={22} />;
  }

  return (
    <View style={styles.exerciseContainer} key={props.key}>
      <View style={styles.exerciseTitleContainer}>
        <Text style={{ fontSize: 16, fontWeight: "900", color: "#313853" }}>
          {stringDate}
        </Text>
        <Text style={{ fontSize: 14, marginTop: 6, color: "#8892AB" }}>
          {props.text}
        </Text>
      </View>

      <View style={styles.iconContainer}>{moodComponent}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  feedContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: 15,
    flexDirection: "column-reverse",
  },
  exerciseContainer: {
    minHeight: 120,
    maxHeight: 300,
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
    backgroundColor: "#B8BFC8",
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
