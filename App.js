import * as React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Platform,
  StyleSheet,
  TouchableHighlight,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Haptics from "expo-haptics";
import LessonOneScreen from "./components/lessons/lessonOneScreen";
import LessonTwoScreen from "./components/lessons/lessonTwoScreen";
import LessonThreeScreen from "./components/lessons/lessonThreeScreen";
import LessonFourScreen from "./components/lessons/lessonFourScreen";
import LessonFiveScreen from "./components/lessons/lessonFiveScreen";
import LessonSixScreen from "./components/lessons/lessonSixScreen";
import LessonSevenScreen from "./components/lessons/lessonSevenScreen";
import Onboarding from "./components/onboarding/onboarding";
import * as Segment from "expo-analytics-segment";
import JournalHome from "./components/journal/journalHome";

// This project uses YARN YARN YARN YARN YARN YARN YARN YARN YARN YARN YARN

const Stack = createStackNavigator();

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("quit-date", jsonValue);
  } catch (e) {
    // saving error
  }
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("quit-date");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

const storeUserData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("user-data-test-23", jsonValue);
  } catch (e) {
    // saving error
  }
};

const getUserData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("user-data-test-23");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

const userId = "universal123";

export default function App() {
  const [load, setLoad] = useState("loading");

  const iosWriteKey = "dYDrjLXzJdCwztz5hDlfqYsfZNoWi0iM";
  const androidWriteKey = "kcGZd5M0tCqjlGyhKBAFuhyNyDCXA6l9";

  Segment.initialize({ androidWriteKey, iosWriteKey });
  Segment.identify(userId);
  Segment.track("session-tracker");

  useEffect(() => {
    async function handleNewSession() {
      let currentUserData = await getUserData();

      if (currentUserData === null) {
        setLoad("new");
        let userData = {
          firstSeen: new Date(),
          sessonCount: 0,
          onboarded: false,
          paid: false,
        };
        storeUserData(userData);
      } else if (currentUserData.onboarded === false) {
        let updatedUserData = currentUserData;
        updatedUserData.sessonCount = updatedUserData.sessonCount + 1;
        setLoad("not-onboarded");
        storeUserData(updatedUserData);
      } else {
        let updatedUserData = currentUserData;
        updatedUserData.sessonCount = updatedUserData.sessonCount + 1;
        setLoad("onboarded");
        storeUserData(updatedUserData);
      }
    }

    handleNewSession();
  }, []);

  if (load === "new" || load === "not-onboarded") {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Onboarding">
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{ animationEnabled: false, headerShown: false }}
          />
          <Stack.Screen
            name="Time"
            component={HomeScreen}
            options={{ title: "???? Sunflower", headerShown: false }}
          />
          <Stack.Screen
            name="Edit Date"
            component={EditDateScreen}
            options={{ animationEnabled: false, headerShown: false }}
          />
          <Stack.Screen
            name="Journal Screen"
            component={JournalScreen}
            options={{ animationEnabled: false, headerShown: false }}
          />
          <Stack.Screen
            name="Learn Screen"
            component={LearnScreen}
            options={{ animationEnabled: false, headerShown: false }}
          />
          <Stack.Screen
            name="Lesson One"
            component={LessonOne}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Lesson Two"
            component={LessonTwo}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Lesson Three"
            component={LessonThree}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Lesson Four"
            component={LessonFour}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Lesson Five"
            component={LessonFive}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Lesson Six"
            component={LessonSix}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Lesson Seven"
            component={LessonSeven}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else if (load === "loading") {
    return <View></View>;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Onboarding Screen">
          {/* <Stack.Screen
            name="Onboarding Screen"
            component={OnboardingScreen}
            options={{ animationEnabled: false, headerShown: false }}
          /> */}
          <Stack.Screen
            name="Time"
            component={HomeScreen}
            options={{ title: "???? Sunflower", headerShown: false }}
          />
          <Stack.Screen
            name="Edit Date"
            component={EditDateScreen}
            options={{ animationEnabled: false, headerShown: false }}
          />
          <Stack.Screen
            name="Learn Screen"
            component={LearnScreen}
            options={{ animationEnabled: false, headerShown: false }}
          />
          <Stack.Screen
            name="Journal Screen"
            component={JournalScreen}
            options={{ animationEnabled: false, headerShown: false }}
          />
          <Stack.Screen
            name="Lesson One"
            component={LessonOne}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Lesson Two"
            component={LessonTwo}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Lesson Three"
            component={LessonThree}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Lesson Four"
            component={LessonFour}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Lesson Five"
            component={LessonFive}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Lesson Six"
            component={LessonSix}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Lesson Seven"
            component={LessonSeven}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

function HomeScreen({ navigation }) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      async function timeDifference() {
        let currentDate = new Date();
        let savedData = await getData();
        let quitDate = new Date(savedData);

        let currentTotalTime = currentDate.getTime();
        let quitTotalTime = quitDate.getTime();
        let difference = currentTotalTime - quitTotalTime;
        let differenceInSeconds = difference / 1000;

        setTime(timeObject(differenceInSeconds));
      }
      timeDifference();
    }, 1000);
  });

  function timeObject(timeInSeconds) {
    let days = Math.floor(timeInSeconds / 86400);
    let dayRemainder = timeInSeconds % 86400;

    let hours = Math.floor(dayRemainder / 3600);
    let hourRemainder = dayRemainder % 3600;

    let minutes = Math.floor(hourRemainder / 60);
    let seconds = Math.floor(hourRemainder % 60);

    let returnObj = {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };

    return returnObj;
  }

  function ReturnDays() {
    if (time.days > 0) {
      return <Text style={styles.counterText}>{time.days}d</Text>;
    } else {
      return;
    }
  }

  function ReturnHours() {
    if (time.hours > 0) {
      return <Text style={styles.counterText}>{time.hours}h</Text>;
    } else {
      return;
    }
  }

  function ReturnMinutes() {
    if (time.minutes > 0) {
      return <Text style={styles.counterText}>{time.minutes}m</Text>;
    } else {
      return;
    }
  }

  function ReturnSeconds() {
    if (time.seconds > 0) {
      return <Text style={styles.counterText}>{time.seconds}s</Text>;
    } else {
      return;
    }
  }

  let mySource;

  if (time.days < 1) {
    mySource = require(`./assets/backgrounds/sunflowers-62.png`);
  } else if (time.days < 2) {
    mySource = require(`./assets/backgrounds/sunflowers-61.png`);
  } else if (time.days < 3) {
    mySource = require(`./assets/backgrounds/sunflowers-60.png`);
  } else if (time.days < 4) {
    mySource = require(`./assets/backgrounds/sunflowers-59.png`);
  } else if (time.days < 5) {
    mySource = require(`./assets/backgrounds/sunflowers-58.png`);
  } else if (time.days < 6) {
    mySource = require(`./assets/backgrounds/sunflowers-57.png`);
  } else if (time.days < 7) {
    mySource = require(`./assets/backgrounds/sunflowers-56.png`);
  } else if (time.days < 8) {
    mySource = require(`./assets/backgrounds/sunflowers-55.png`);
  } else if (time.days < 9) {
    mySource = require(`./assets/backgrounds/sunflowers-54.png`);
  } else if (time.days < 10) {
    mySource = require(`./assets/backgrounds/sunflowers-53.png`);
  } else if (time.days < 11) {
    mySource = require(`./assets/backgrounds/sunflowers-52.png`);
  } else if (time.days < 12) {
    mySource = require(`./assets/backgrounds/sunflowers-51.png`);
  } else if (time.days < 13) {
    mySource = require(`./assets/backgrounds/sunflowers-50.png`);
  } else if (time.days < 14) {
    mySource = require(`./assets/backgrounds/sunflowers-49.png`);
  } else if (time.days < 15) {
    mySource = require(`./assets/backgrounds/sunflowers-48.png`);
  } else if (time.days < 16) {
    mySource = require(`./assets/backgrounds/sunflowers-47.png`);
  } else if (time.days < 17) {
    mySource = require(`./assets/backgrounds/sunflowers-46.png`);
  } else if (time.days < 18) {
    mySource = require(`./assets/backgrounds/sunflowers-45.png`);
  } else if (time.days < 19) {
    mySource = require(`./assets/backgrounds/sunflowers-44.png`);
  } else if (time.days < 20) {
    mySource = require(`./assets/backgrounds/sunflowers-43.png`);
  } else if (time.days < 21) {
    mySource = require(`./assets/backgrounds/sunflowers-42.png`);
  } else if (time.days < 22) {
    mySource = require(`./assets/backgrounds/sunflowers-41.png`);
  } else if (time.days < 23) {
    mySource = require(`./assets/backgrounds/sunflowers-40.png`);
  } else if (time.days < 24) {
    mySource = require(`./assets/backgrounds/sunflowers-39.png`);
  } else if (time.days < 25) {
    mySource = require(`./assets/backgrounds/sunflowers-38.png`);
  } else if (time.days < 26) {
    mySource = require(`./assets/backgrounds/sunflowers-37.png`);
  } else if (time.days < 27) {
    mySource = require(`./assets/backgrounds/sunflowers-36.png`);
  } else if (time.days < 28) {
    mySource = require(`./assets/backgrounds/sunflowers-35.png`);
  } else if (time.days < 29) {
    mySource = require(`./assets/backgrounds/sunflowers-34.png`);
  } else if (time.days < 30) {
    mySource = require(`./assets/backgrounds/sunflowers-33.png`);
  } else if (time.days < 31) {
    mySource = require(`./assets/backgrounds/sunflowers-32.png`);
  } else if (time.days < 32) {
    mySource = require(`./assets/backgrounds/sunflowers-31.png`);
  } else if (time.days < 33) {
    mySource = require(`./assets/backgrounds/sunflowers-30.png`);
  } else if (time.days < 34) {
    mySource = require(`./assets/backgrounds/sunflowers-29.png`);
  } else if (time.days < 35) {
    mySource = require(`./assets/backgrounds/sunflowers-28.png`);
  } else if (time.days < 36) {
    mySource = require(`./assets/backgrounds/sunflowers-27.png`);
  } else if (time.days < 37) {
    mySource = require(`./assets/backgrounds/sunflowers-26.png`);
  } else if (time.days < 38) {
    mySource = require(`./assets/backgrounds/sunflowers-25.png`);
  } else if (time.days < 39) {
    mySource = require(`./assets/backgrounds/sunflowers-24.png`);
  } else if (time.days < 40) {
    mySource = require(`./assets/backgrounds/sunflowers-23.png`);
  } else if (time.days < 41) {
    mySource = require(`./assets/backgrounds/sunflowers-22.png`);
  } else if (time.days < 42) {
    mySource = require(`./assets/backgrounds/sunflowers-21.png`);
  } else if (time.days < 43) {
    mySource = require(`./assets/backgrounds/sunflowers-20.png`);
  } else if (time.days < 44) {
    mySource = require(`./assets/backgrounds/sunflowers-19.png`);
  } else if (time.days < 45) {
    mySource = require(`./assets/backgrounds/sunflowers-18.png`);
  } else if (time.days < 46) {
    mySource = require(`./assets/backgrounds/sunflowers-17.png`);
  } else if (time.days < 47) {
    mySource = require(`./assets/backgrounds/sunflowers-16.png`);
  } else if (time.days < 48) {
    mySource = require(`./assets/backgrounds/sunflowers-15.png`);
  } else if (time.days < 49) {
    mySource = require(`./assets/backgrounds/sunflowers-14.png`);
  } else if (time.days < 50) {
    mySource = require(`./assets/backgrounds/sunflowers-13.png`);
  } else if (time.days < 51) {
    mySource = require(`./assets/backgrounds/sunflowers-12.png`);
  } else if (time.days < 52) {
    mySource = require(`./assets/backgrounds/sunflowers-11.png`);
  } else if (time.days < 53) {
    mySource = require(`./assets/backgrounds/sunflowers-10.png`);
  } else if (time.days < 54) {
    mySource = require(`./assets/backgrounds/sunflowers-9.png`);
  } else if (time.days < 55) {
    mySource = require(`./assets/backgrounds/sunflowers-8.png`);
  } else if (time.days < 56) {
    mySource = require(`./assets/backgrounds/sunflowers-7.png`);
  } else if (time.days < 57) {
    mySource = require(`./assets/backgrounds/sunflowers-6.png`);
  } else if (time.days < 58) {
    mySource = require(`./assets/backgrounds/sunflowers-5.png`);
  } else if (time.days < 59) {
    mySource = require(`./assets/backgrounds/sunflowers-4.png`);
  } else if (time.days < 60) {
    mySource = require(`./assets/backgrounds/sunflowers-3.png`);
  } else if (time.days < 61) {
    mySource = require(`./assets/backgrounds/sunflowers-2.png`);
  } else if (time.days < 62) {
    mySource = require(`./assets/backgrounds/sunflowers-1.png`);
  } else if (time.days >= 62) {
    mySource = require(`./assets/backgrounds/sunflowers-0.png`);
  } else {
    mySource = require(`./assets/backgrounds/sunflowers-62.png`);
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#6A49E8",
      }}
    >
      <Image
        source={mySource}
        style={{
          position: "absolute",
          height: "100%",
          top: -30,
        }}
        resizeMode="contain"
      />

      <View
        style={{
          backgroundColor: "white",
          position: "absolute",
          height: "100%",
          width: "100%",
          opacity: 0.2,
        }}
      ></View>

      <View>
        <Text style={styles.counterTitleText}>You've Stayed Sober For</Text>
        <View style={styles.counterContainer}>
          {ReturnDays()}
          {ReturnHours()}
          {ReturnMinutes()}
          {ReturnSeconds()}
        </View>
      </View>

      <Image
        source={require("./assets/clock-fixed.gif")}
        resizeMode={"contain"}
        style={{ width: "60%", marginTop: 40, marginBottom: 100 }}
      />

      <View style={styles.navContainer}></View>

      <View style={styles.menuContainer}>
        <View style={styles.menuItemSelectContainer}>
          <Text style={styles.menuTextSelect}>time</Text>
        </View>
        <TouchableHighlight
          onPress={() => {
            Haptics.selectionAsync();
            navigation.navigate("Journal Screen");
          }}
          underlayColor=""
        >
          <View style={styles.menuItemContainer}>
            <Text style={styles.menuText}>journal</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            Haptics.selectionAsync();
            navigation.navigate("Edit Date");
          }}
          underlayColor=""
        >
          <View style={styles.menuItemContainer}>
            <Text style={styles.menuText}>edit</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}

function EditDateScreen({ navigation }) {
  const [date, setDate] = useState(new Date());

  Segment.track("edit-date-screen-view");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  return (
    <View style={styles.displayContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Set Your Quit Date</Text>
      </View>
      <View>
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          is24Hour={true}
          display="spinner"
          onChange={onChange}
        />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Set Your Quit Time</Text>
      </View>
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode={"time"}
        is24Hour={true}
        display="spinner"
        onChange={onChange}
      />

      <View style={styles.buttonContainer}>
        <TouchableHighlight
          onPress={() => {
            storeData(date);
            navigation.navigate("Time");
          }}
          underlayColor=""
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Save New Date</Text>
          </View>
        </TouchableHighlight>
      </View>
      <View style={styles.menuContainer}>
        <TouchableHighlight
          onPress={() => {
            Haptics.selectionAsync();
            navigation.navigate("Time");
          }}
          underlayColor=""
        >
          <View style={styles.menuItemContainer}>
            <Text style={styles.menuTextSelect}>time</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            Haptics.selectionAsync();
            navigation.navigate("Journal Screen");
          }}
          underlayColor=""
        >
          <View style={styles.menuItemContainer}>
            <Text style={styles.menuText}>journal</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            Haptics.selectionAsync();
            navigation.navigate("Edit Date");
          }}
          underlayColor=""
        >
          <View style={styles.menuItemSelectContainer}>
            <Text style={styles.menuText}>edit</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}

function LearnScreen({ navigation }) {
  Segment.track("learn-screen-view");

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
        backgroundColor: "#f2f2f2",
      }}
    >
      <View style={styles.learnScreenTitleContainer}>
        <Text style={styles.learnScreenTitleText}>
          Click To Learn About Marijuana Addiction
        </Text>
      </View>

      <SafeAreaView style={styles.learnSafeContainer}>
        <ScrollView style={styles.learnScrollContainer}>
          <TouchableHighlight
            onPress={() => {
              Haptics.selectionAsync();
              navigation.navigate("Lesson One");
            }}
            underlayColor=""
          >
            <View style={styles.learnItemContainer} onPress={() => {}}>
              <Text style={styles.learnItemTitleText}>
                Lesson 1: Marijuana Is Addictive ????
              </Text>
              <Text style={styles.learnItemSubtitleText}>
                Do you want to learn the truth? Not 1960's scare tactics, not
                stoner culture myths, but the actual truth about marijuana
                addiction.
              </Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={() => {
              Haptics.selectionAsync();
              navigation.navigate("Lesson Two");
            }}
            underlayColor=""
          >
            <View style={styles.learnItemContainer} onPress={() => {}}>
              <Text style={styles.learnItemTitleText}>
                Lesson 2: There Are Significant Withdrawal Symptoms ????
              </Text>
              <Text style={styles.learnItemSubtitleText}>
                These effect people differently, but can include a severe
                inability to sleep or eat, as well as depression and anger.
              </Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={() => {
              Haptics.selectionAsync();
              navigation.navigate("Lesson Three");
            }}
            underlayColor=""
          >
            <View style={styles.learnItemContainer} onPress={() => {}}>
              <Text style={styles.learnItemTitleText}>
                Lesson 3: "Moderation" Often Leads To Daily Use ????
              </Text>
              <Text style={styles.learnItemSubtitleText}>
                "One joint won't hurt..." is the most common lie we tell
                ourselves before relapse. Addiction creates habits that are
                easily reactivated.
              </Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={() => {
              Haptics.selectionAsync();
              navigation.navigate("Lesson Four");
            }}
            underlayColor=""
          >
            <View style={styles.learnItemContainer} onPress={() => {}}>
              <Text style={styles.learnItemTitleText}>
                Lesson 4: Reprogram Your Mind ????
              </Text>
              <Text style={styles.learnItemSubtitleText}>
                You've spent months or years training your brain to associate
                marijuana with pleasure. Now it's time to learn new
                associations.
              </Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={() => {
              Haptics.selectionAsync();
              navigation.navigate("Lesson Five");
            }}
            underlayColor=""
          >
            <View style={styles.learnItemContainer} onPress={() => {}}>
              <Text style={styles.learnItemTitleText}>
                Lesson 5: Addiction Hides Your Real Problems ?????????????
              </Text>
              <Text style={styles.learnItemSubtitleText}>
                People frequently use marijuana as a crutch to avoid their real
                problems. Becoming sober means facing your real issues.
              </Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={() => {
              Haptics.selectionAsync();
              navigation.navigate("Lesson Six");
            }}
            underlayColor=""
          >
            <View style={styles.learnItemContainer} onPress={() => {}}>
              <Text style={styles.learnItemTitleText}>
                Lesson 6: It's Okay To Fail ??????
              </Text>
              <View>
                <Text style={styles.learnItemSubtitleText}>
                  While moderation rarely works, it's also okay to fail. You
                  should fight for your sobriety, but don't quit fighting if you
                  relapse.
                </Text>
              </View>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={() => {
              Haptics.selectionAsync();
              navigation.navigate("Lesson Seven");
            }}
            underlayColor=""
          >
            <View style={styles.learnItemContainer} onPress={() => {}}>
              <Text style={styles.learnItemTitleText}>
                Lesson 7: You're A Better Version Of Yourself, Sober ????
              </Text>
              <Text style={styles.learnItemSubtitleText}>
                The ultimate secret to becoming sober? Internalizing the fact
                you are your best self when sober.
              </Text>
            </View>
          </TouchableHighlight>

          <View style={{ width: "100%", height: 240 }}></View>
        </ScrollView>
      </SafeAreaView>

      <View style={styles.menuContainer}>
        <TouchableHighlight
          onPress={() => {
            Haptics.selectionAsync();
            navigation.navigate("Time");
          }}
          underlayColor=""
        >
          <View style={styles.menuItemContainer}>
            <Text style={styles.menuText}>time</Text>
          </View>
        </TouchableHighlight>

        <View style={styles.menuItemSelectContainer}>
          <Text style={styles.menuTextSelect}>learn</Text>
        </View>

        <TouchableHighlight
          onPress={() => {
            Haptics.selectionAsync();
            navigation.navigate("Edit Date");
          }}
          underlayColor=""
        >
          <View style={styles.menuItemContainer}>
            <Text style={styles.menuText}>edit</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}

function LessonOne({ navigation }) {
  return (
    <View>
      <LessonOneScreen
        back={() => {
          Haptics.selectionAsync();
          navigation.navigate("Learn Screen");
        }}
      />
    </View>
  );
}

function LessonTwo({ navigation }) {
  return (
    <View>
      <LessonTwoScreen
        back={() => {
          Haptics.selectionAsync();
          navigation.navigate("Learn Screen");
        }}
      />
    </View>
  );
}

function LessonThree({ navigation }) {
  return (
    <View>
      <LessonThreeScreen
        back={() => {
          Haptics.selectionAsync();
          navigation.navigate("Learn Screen");
        }}
      />
    </View>
  );
}

function LessonFour({ navigation }) {
  return (
    <View>
      <LessonFourScreen
        back={() => {
          Haptics.selectionAsync();
          navigation.navigate("Learn Screen");
        }}
      />
    </View>
  );
}

function LessonFive({ navigation }) {
  return (
    <View>
      <LessonFiveScreen
        back={() => {
          Haptics.selectionAsync();
          navigation.navigate("Learn Screen");
        }}
      />
    </View>
  );
}

function LessonSix({ navigation }) {
  return (
    <View>
      <LessonSixScreen
        back={() => {
          Haptics.selectionAsync();
          navigation.navigate("Learn Screen");
        }}
      />
    </View>
  );
}

function LessonSeven({ navigation }) {
  return (
    <View>
      <LessonSevenScreen
        back={() => {
          Haptics.selectionAsync();
          navigation.navigate("Learn Screen");
        }}
      />
    </View>
  );
}

function OnboardingScreen({ navigation }) {
  Segment.track("onboarding-screen-view");
  return (
    <View>
      <Onboarding
        finish={() => {
          async function finishOnboarding() {
            let currentUserData = await getUserData();
            let updatedUserData = currentUserData;
            updatedUserData.onboarded = true;
            storeUserData(updatedUserData);
          }

          finishOnboarding();
          Haptics.selectionAsync();
          navigation.navigate("Time");
        }}
      />
    </View>
  );
}

function JournalScreen({ navigation }) {
  return (
    <View>
      <JournalHome />
      {/* nav bar */}

      <View style={styles.menuContainer}>
        <TouchableHighlight
          onPress={() => {
            Haptics.selectionAsync();
            navigation.navigate("Time");
          }}
          underlayColor=""
        >
          <View style={styles.menuItemContainer}>
            <Text style={styles.menuText}>time</Text>
          </View>
        </TouchableHighlight>

        <View style={styles.menuItemSelectContainer}>
          <Text style={styles.menuTextSelect}>journal</Text>
        </View>

        <TouchableHighlight
          onPress={() => {
            Haptics.selectionAsync();
            navigation.navigate("Edit Date");
          }}
          underlayColor=""
        >
          <View style={styles.menuItemContainer}>
            <Text style={styles.menuText}>edit</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  displayContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
  },
  titleContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginTop: 5,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "900",
    color: "#6A49E8",
  },
  buttonContainer: {
    width: "100%",
    height: 60,
    marginTop: 4,
    marginBottom: 60,
    display: "flex",
    alignItems: "center",
  },
  button: {
    width: 180,
    height: 50,
    backgroundColor: "#000100",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  counterText: {
    margin: 5,
    fontSize: 32,
    fontWeight: "700",
  },
  counterContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  counterTitleText: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
    marginTop: 120,
  },
  navContainer: {
    display: "flex",
    marginBottom: 100,
  },
  imageContainer: {
    backgroundColor: "red",
    width: "80%",
  },
  midContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    backgroundColor: "blue",
  },
  headerContainer: {
    height: 100,
    width: "100%",
    backgroundColor: "#000100",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    marginTop: 30,
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  menuContainer: {
    backgroundColor: "#000100",
    width: "100%",
    height: 80,
    position: "absolute",
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    borderTopColor: "#2E2E2E",
    borderTopWidth: 2,
  },
  menuItemContainer: {
    height: 40,
    width: 100,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  menuItemSelectContainer: {
    backgroundColor: "#2E2E2E",
    height: 40,
    width: 100,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  menuText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  menuTextSelect: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  learnScreenTitleContainer: {
    marginTop: 80,
    marginBottom: 40,
    width: "80%",
  },
  learnScreenTitleText: {
    fontSize: 28,
    fontWeight: "900",
  },
  learnSafeContainer: {
    width: "100%",
    height: "100%",
  },
  learnScrollContainer: {},
  learnItemContainer: {
    width: "100%",
    height: 160,
    backgroundColor: "#6A49E8",
    marginBottom: 20,
    display: "flex",
    justifyContent: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#5072FF",
  },
  learnItemTitleText: {
    marginLeft: 20,
    marginRight: 20,
    fontSize: 18,
    color: "white",
    fontWeight: "900",
  },
  learnItemSubtitleText: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 16,
    color: "white",
  },
});
