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
import Onboarding from "./components/onboarding/onboarding";
import * as Segment from "expo-analytics-segment";
import JournalHome from "./components/journal/journalHome";
import ActivityLogExercise from "./components/journal/activityLogExercise";
import CravingExercise from "./components/journal/cravingExercise";
import * as SplashScreen from "expo-splash-screen";
import { ArrowRightCircle } from "react-native-feather";
import * as StoreReview from 'expo-store-review';


// This project uses YARN YARN YARN YARN YARN YARN YARN YARN YARN YARN YARN

// I'm still a developer :(

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
    let parsedJson = JSON.parse(jsonValue)
    if (parsedJson.sessonCount > 10) {
      console.log('greater than 10 sessions: ', parsedJson.sessonCount)
      if (await StoreReview.hasAction()) {
        // you can call StoreReview.requestReview()
        StoreReview.requestReview();
      }
    }
    
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

const iosWriteKey = "dYDrjLXzJdCwztz5hDlfqYsfZNoWi0iM";
const androidWriteKey = "kcGZd5M0tCqjlGyhKBAFuhyNyDCXA6l9";
Segment.initialize({ androidWriteKey, iosWriteKey });
Segment.track("session-tracker");

SplashScreen.preventAutoHideAsync();
async function renderPage() {
  await SplashScreen.hideAsync();
}
setTimeout(() => {
  renderPage();
}, 800);

export default function App() {
  const [load, setLoad] = useState("loading");

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
            options={{ title: "🌻 Sunflower", headerShown: false }}
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
            name="Activity Log 0"
            component={ActivityLog0}
            options={{ animationEnabled: false, headerShown: false }}
          />
          <Stack.Screen
            name="Craving Exercise"
            component={CravingExerciseScreen}
            options={{ animationEnabled: false, headerShown: false }}
          />
          <Stack.Screen
            name="Exercise Nav Screen"
            component={ExerciseNavScreen}
            options={{ animationEnabled: false, headerShown: false }}
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
            options={{ title: "🌻 Sunflower", headerShown: false }}
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
            name="Activity Log 0"
            component={ActivityLog0}
            options={{ animationEnabled: false, headerShown: false }}
          />
          <Stack.Screen
            name="Craving Exercise"
            component={CravingExerciseScreen}
            options={{ animationEnabled: false, headerShown: false }}
          />
          <Stack.Screen
            name="Exercise Nav Screen"
            component={ExerciseNavScreen}
            options={{ animationEnabled: false, headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

function HomeScreen({ navigation }) {
  const [analytics, setAnalytics] = useState(true);
  const [time, setTime] = useState(0);
  const [initialLoad, setInitialLoad] = useState(true);

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

  if (initialLoad) {
    setInitialLoad(false);
    timeDifference();
  }

  useEffect(() => {
    if (analytics) {
      Segment.screen("timer-screen");
      setAnalytics(false);
    }
    setTimeout(() => {
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
          opacity: 0.05,
        }}
      ></View>

      <View
        style={{
          width: "100%",
          height: "88%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={styles.timeContainer}>
          <Text style={styles.counterTitleText}>You've Stayed Sober For</Text>
          <View style={styles.counterContainer}>
            {ReturnDays()}
            {ReturnHours()}
            {ReturnMinutes()}
            {ReturnSeconds()}
          </View>
        </View>

        <Image
          source={require("./assets/clock-simon-final.gif")}
          resizeMode={"contain"}
          style={{
            width: "60%",
            height: 300,
            marginTop: 0,
          }}
        />
        <TouchableHighlight
          onPress={() => {
            Haptics.selectionAsync();
            navigation.navigate("Exercise Nav Screen");
          }}
          underlayColor=""
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>New Exercise</Text>
          </View>
        </TouchableHighlight>
      </View>

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

  useEffect(() => {
    Segment.screen("edit-date-screen-view");
  }, []);

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

function OnboardingScreen({ navigation }) {
  useEffect(() => {
    Segment.screen("onboarding-screen-view");
  }, []);

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
  const NavActivityLog0 = function () {
    navigation.navigate("Activity Log 0");
  };

  const ExerciseNavFn = function () {
    navigation.navigate("Exercise Nav Screen");
  };

  return (
    <View>
      <JournalHome
        NavActivityLog0={NavActivityLog0}
        ExerciseNavFn={ExerciseNavFn}
      />
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

function ActivityLog0({ navigation }) {
  const NavJournalScreen = function () {
    navigation.navigate("Journal Screen");
  };

  return <ActivityLogExercise NavJournalScreen={NavJournalScreen} />;
}

function CravingExerciseScreen({ navigation }) {
  const NavJournalScreen = function () {
    navigation.navigate("Journal Screen");
  };

  return <CravingExercise NavJournalScreen={NavJournalScreen} />;
}

function ExerciseNavScreen({ navigation }) {
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "#fff",
      }}
    >
      <View style={{ width: "100%", marginTop: 40, paddingLeft: 20 }}>
        <Text style={styles.titleText}>Select A Guided Exercise</Text>
      </View>
      <View style={{ width: "100%", marginTop: 20, paddingLeft: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "400", color: "#000100" }}>
          Overcome your cravings and learn to associate sobriety with reward.
        </Text>
      </View>

      <TouchableHighlight
        onPress={() => {
          Haptics.selectionAsync();
          navigation.navigate("Craving Exercise");
        }}
        underlayColor=""
        style={{}}
        activeOpacity={0.8}
      >
        <View
          style={{
            width: "100%",
            height: 110,
            marginTop: 30,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#000100",
              width: "85%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              paddingLeft: 20,
              paddingRight: 10,
            }}
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
              New Craving Exercise
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 14,
                fontWeight: "400",
                marginTop: 5,
              }}
            >
              Track your cravings intensity, recognize illogical thoughts,
              overcome the urge.
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#2E2E2E",
              width: "15%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ArrowRightCircle stroke="#fff" width={22} height={22} />
          </View>
        </View>
      </TouchableHighlight>

      <TouchableHighlight
        onPress={() => {
          Haptics.selectionAsync();
          navigation.navigate("Activity Log 0");
        }}
        underlayColor=""
        style={{}}
        activeOpacity={0.8}
      >
        <View
          style={{
            width: "100%",
            height: 110,
            marginTop: 20,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#000100",
              width: "85%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              paddingLeft: 20,
              paddingRight: 10,
            }}
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
              New Activity Log
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 14,
                fontWeight: "400",
                marginTop: 5,
              }}
            >
              Log your activities to help your brain learn how to get reward and
              dopamine from healthy places.
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#2E2E2E",
              width: "15%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ArrowRightCircle stroke="#fff" width={22} height={22} />
          </View>
        </View>
      </TouchableHighlight>

      <TouchableHighlight
        onPress={() => {
          Haptics.selectionAsync();
          navigation.navigate("Journal Screen");
        }}
        underlayColor=""
        style={{ position: "absolute", bottom: 40, left: 20 }}
        activeOpacity={0.8}
      >
        <View
          style={{
            backgroundColor: "#B8BFC8",
            width: 120,
            height: 45,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "800" }}>
            cancel
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  displayContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  titleContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginTop: 5,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "800",
    color: "#000100",
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
    height: 48,
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
    fontSize: 24,
    fontWeight: "800",
  },
  counterContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  counterTitleText: {
    fontSize: 24,
    fontWeight: "400",
    marginBottom: 5,
  },
  timeContainer: {
    backgroundColor: "rgba(255, 255, 255,  .7)",
    width: "100%",
    display: "flex",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
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
