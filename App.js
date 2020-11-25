import * as React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Platform,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";

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
          options={{ title: "Overview" }}
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
    let hourRemainder = dayRemainder % 360;

    let minutes = Math.floor(hourRemainder / 60);
    let seconds = Math.floor(hourRemainder % 60);

    let returnObj = {
      days: days,
      hours: hours,
      minutes: minutes,
      hours: hours,
      seconds: seconds,
    };

    return returnObj;
  }

  function ReturnDays() {
    if (time.days > 0) {
      return (
        <Text style={{ marginRight: 10, fontSize: 18, fontWeight: "bold" }}>
          {time.days}d
        </Text>
      );
    } else {
      return;
    }
  }

  function ReturnHours() {
    if (time.hours > 0) {
      return (
        <Text style={{ marginRight: 10, fontSize: 18, fontWeight: "bold" }}>
          {time.hours}h
        </Text>
      );
    } else {
      return;
    }
  }

  function ReturnMinutes() {
    if (time.minutes > 0) {
      return (
        <Text style={{ marginRight: 10, fontSize: 18, fontWeight: "bold" }}>
          {time.minutes}m
        </Text>
      );
    } else {
      return;
    }
  }

  function ReturnSeconds() {
    if (time.seconds > 0) {
      return (
        <Text style={{ marginRight: 10, fontSize: 18, fontWeight: "bold" }}>
          {time.seconds}s
        </Text>
      );
    } else {
      return;
    }
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>You've Stayed Sober For</Text>
      <View
        style={{
          flexDirection: "row",
          width: 100,
          margin: 10,
          justifyContent: "center",
        }}
      >
        {ReturnDays()}
        {ReturnHours()}
        {ReturnMinutes()}
        {ReturnSeconds()}
      </View>

      <Button
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
      />
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

      {/* <View>
        <Button
          onPress={() => {
            storeData(date);
            navigation.navigate("Home");
          }}
          title="Save New Date"
        />
      </View> */}

      <View style={styles.buttonContainer}>
        <TouchableHighlight
          onPress={() => {
            storeData(date);
            navigation.navigate("Home");
          }}
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
    width: 160,
    height: 60,
    backgroundColor: "#1FB7F2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});
