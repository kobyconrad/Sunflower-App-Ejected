import * as React from "react";
import { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  const [date, setDate] = useState();
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

        setTime(Math.floor(differenceInSeconds));
      }
      timeDifference();
    }, 1000);
  });

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>{time} seconds</Text>

      <Text>Home Screen</Text>
      <Button
        title="Set Quit Date"
        onPress={() => {
          let currentDate = new Date();
          console.log(currentDate);

          storeData(currentDate);
        }}
      />

      <Button
        title="Time Difference"
        onPress={() => {
          timeDifference();
        }}
      />
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      />
    </View>
  );
}

async function timeDifference() {
  let currentDate = new Date();
  let savedData = await getData();
  let quitDate = new Date(savedData);

  let currentTotalTime = currentDate.getTime();
  let quitTotalTime = quitDate.getTime();
  let difference = currentTotalTime - quitTotalTime;
  let differenceInSeconds = difference / 1000;

  return differenceInSeconds;
}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
    </View>
  );
}

// console.log("---");
// console.log("currentTime ", currentTotalTime);
// console.log("quitTime: ", quitTotalTime);
// console.log("difference: ", difference);
// console.log("difference in seconds: ", differenceInSeconds);
