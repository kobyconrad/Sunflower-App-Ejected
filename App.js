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
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import Clock from "./assets/clock.png";

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

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "🌻 Sunflower", headerShown: false }}
        />
        <Stack.Screen name="Edit Date" component={EditDateScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
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

  let imageOne = require(`./assets/sunflowers.jpg`);
  let imageTwo = require(`./assets/beach.png`);

  let mySource;

  if (time.days > 1) {
    mySource = imageOne;
  } else {
    mySource = imageTwo;
  }

  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "space-between" }}
    >
      <Image
        source={mySource}
        style={{ position: "absolute", height: "100%", top: 50 }}
        resizeMode="contain"
      />

      <View
        style={{
          backgroundColor: "white",
          position: "absolute",
          height: "100%",
          width: "100%",
          opacity: 0.25,
        }}
      ></View>

      <View style={styles.headerContainer}>
        <Image
          source={require(`./assets/sunflower-logo.png`)}
          style={{ height: "100%", width: "50%", marginTop: 34 }}
          resizeMode="contain"
        />
        {/* <Text style={styles.headerText}>Sunflower</Text> */}
      </View>

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
        source={require("./assets/clock-square.png")}
        resizeMode={"contain"}
        style={{ width: "60%", marginTop: 40 }}
      />

      <View style={styles.navContainer}>
        {/* <Button
          title="Reset"
          onPress={() => {
            let currentDate = new Date();
            console.log(currentDate);

            storeData(currentDate);
          }}
        />

        <Button
          title="Edit Date"
          onPress={() => navigation.navigate("Edit Date")}
        /> */}

        <View style={styles.buttonContainer}>
          <TouchableHighlight
            onPress={() => navigation.navigate("Edit Date")}
            underlayColor=""
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Edit Date</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}

function EditDateScreen({ navigation }) {
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  return (
    <View style={styles.displayContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Select your quit date</Text>
      </View>
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode={"date"}
        is24Hour={true}
        display="default"
        onChange={onChange}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Select your quit time</Text>
      </View>
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode={"time"}
        is24Hour={true}
        display="default"
        onChange={onChange}
      />

      <View style={styles.buttonContainer}>
        <TouchableHighlight
          onPress={() => {
            storeData(date);
            navigation.navigate("Home");
          }}
          underlayColor=""
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Save Date</Text>
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
    marginTop: 20,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: {
    width: "100%",
    height: 60,
    marginTop: 30,
    marginBottom: 60,
    display: "flex",
    alignItems: "center",
  },
  button: {
    width: 140,
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
    marginTop: 50,
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
});
