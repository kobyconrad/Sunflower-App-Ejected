import * as React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import * as Haptics from "expo-haptics";
import { XCircle, ArrowLeftCircle } from "react-native-feather";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (value) => {
  console.log(value);
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("quit-date", jsonValue);
  } catch (e) {
    console.log(e);
    // saving error
  }
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("quit-date");
    console.log(jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
    // error reading value
  }
};

function Onboarding(props) {
  const [screen, setScreen] = useState(0);

  function backFunction() {
    Haptics.selectionAsync();
    let currentScreen = screen;
    setScreen(currentScreen - 1);
  }
  function nextFunction() {
    Haptics.selectionAsync();
    let currentScreen = screen;
    // storeData(date);
    setScreen(currentScreen + 1);
  }

  return (
    <View style={styles.lessonContainer}>
      {/* <View style={styles.progressContainer}>
        <ProgressBarOne screen={screen} />
        <ProgressBarTwo screen={screen} />
        <ProgressBarThree screen={screen} />
        <ProgressBarFour screen={screen} />
        <ProgressBarFive screen={screen} />
      </View> */}

      <View style={styles.navMenuContainer}>
        <BackArrow screen={screen} backFunction={backFunction} />
        {/* <XCircle
          stroke="#f2f2f2"
          width={32}
          height={32}
          opacity={0.3}
          onPress={props.back}
        /> */}
      </View>

      <Pages screen={screen} finish={props.finish} />

      {/* <NextArrow
        screen={screen}
        nextFunction={nextFunction}
        finishFunction={props.finish}
      /> */}
    </View>
  );
}

function Pages({ screen, finish }) {
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  if (screen === 0) {
    return (
      <View style={styles.pageContainer}>
        {/* <Text style={styles.titleText}>Ready to stop smoking marijuana?</Text>
        <Text style={styles.bodyText}>
          Progression tracking for marijuana addiction. Every day you stay
          sober, a new flower will grow.
        </Text> */}
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Set Your Quit Date</Text>
        </View>

        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          is24Hour={true}
          display="spinner"
          onChange={onChange}
        />
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
          style={{ backgroundColor: "white" }}
        />

        <View style={{ width: "100%", height: 45, marginBottom: 20 }}>
          <TouchableHighlight
            onPress={() => {
              storeData(date);
              getData();
              finish();
            }}
            underlayColor=""
            style={styles.buttonPositioning}
          >
            <View style={styles.nextButtonContainer}>
              <Text style={styles.nextButtonText}>finish</Text>
            </View>
          </TouchableHighlight>
        </View>

        {/* <TouchableHighlight
        onPress={finishFunction}
        underlayColor=""
        style={styles.buttonPositioning}
      >
        <View style={styles.nextButtonContainer}>
          <Text style={styles.nextButtonText}>finish</Text>
        </View>
      </TouchableHighlight> */}
      </View>
    );
  } else if (screen === 1) {
    return (
      <View style={styles.pageContainer}>
        <Text style={styles.titleText}>Page Two Title</Text>
        <Text style={styles.bodyText}>
          CBD is a new market and unregulated so theres a lot of research to be
          done to find great brands. Do your due diligence to find the right
          brand for you. However, to make your search easier, we’ve done our
          research and suggest trying a Brand called “Joy Organics”.
        </Text>
        <Text style={styles.bodyText}>
          Joy Organics is a Colorado-based family owned CBD company that was
          founded in 2018. We’ve tried other CBD brands and none so far have
          come close to the effectiveness of Joy Organics. Here are some reasons
          we like them:
        </Text>
      </View>
    );
  } else if (screen === 2) {
    return (
      <View style={styles.pageContainer}>
        <Text style={styles.titleText}>Page Three Title</Text>
        <Text style={styles.bodyText}>
          Water is a great way to flush things out of your system, and keep you
          hydrated and healthy. It will even lessen the need to take frequent
          tolerance breaks, so drink plenty of water!
        </Text>
        <Text style={styles.bodyText}>
          Taking a tolerance break can be hard, but you don’t have to go it
          alone. It’s very likely that if you’re taking a tolerance break, there
          are many other people who are also taking tolerance breaks. You could
          get your friends together and do a tolerance break at the same time.
        </Text>
      </View>
    );
  } else if (screen === 3) {
    return (
      <View style={styles.pageContainer}>
        <Text style={styles.titleText}>Page Four Title</Text>
        <Text style={styles.bodyText}>
          If you’ve been smoking for a while you may find that smoking weed is
          your main hobby. To keep you on track, find a new hobby or activity to
          keep you busy and fill the void. If you would like suggestions on
          something you can do, check out our article on “Activities to do
          Instead of Smoking”.
        </Text>
        <Text style={styles.bodyText}>
          Meditation is good practice to pickup because the more you do it, the
          better you will be able to manage your moods. This could be an amazing
          aid to keep you from breaking your T-break.
        </Text>
      </View>
    );
  } else {
    return (
      <View style={styles.pageContainer}>
        <Text style={styles.titleText}>Page Five Title</Text>
        <Text style={styles.bodyText}>
          If you’re taking a tolerance break, it’s likely that you will end up
          replacing your smoking ritual with something else like drinking
          coffee, eating more, or even smoking cigarettes. The problem with this
          is that you’re replacing a much healthier habit with something that is
          more destructive.
        </Text>
        <Text style={styles.bodyText}>
          Instead of this, we suggest you try replacing THC with CBD. CBD is the
          perfect alternative because it provides many health benefits of weed,
          and it isn’t psychoactive, on top of this it normally contains very
          little to zero THC. If you want to learn more about CBD check out our
          article called “What is CBD?”.
        </Text>
      </View>
    );
  }
}

function BackArrow({ screen, backFunction }) {
  if (screen === 0) {
    return <View></View>;
  } else {
    return (
      <ArrowLeftCircle
        stroke="#f2f2f2"
        width={32}
        height={32}
        opacity={0.3}
        onPress={backFunction}
      />
    );
  }
}

function NextArrow({ screen, nextFunction, finishFunction }) {
  if (screen < 0) {
    return (
      <TouchableHighlight
        onPress={nextFunction}
        underlayColor=""
        style={styles.buttonPositioning}
      >
        <View style={styles.nextButtonContainer}>
          <Text style={styles.nextButtonText}>next</Text>
        </View>
      </TouchableHighlight>
    );
  } else {
    return (
      <TouchableHighlight
        onPress={finishFunction}
        underlayColor=""
        style={styles.buttonPositioning}
      >
        <View style={styles.nextButtonContainer}>
          <Text style={styles.nextButtonText}>finish</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

function ProgressBarOne({ screen }) {
  if (screen === 0) {
    return <View style={styles.progressBarSelect}></View>;
  } else {
    return <View style={styles.progressBar}></View>;
  }
}

function ProgressBarTwo({ screen }) {
  if (screen === 1) {
    return <View style={styles.progressBarSelect}></View>;
  } else {
    return <View style={styles.progressBar}></View>;
  }
}

function ProgressBarThree({ screen }) {
  if (screen === 2) {
    return <View style={styles.progressBarSelect}></View>;
  } else {
    return <View style={styles.progressBar}></View>;
  }
}

function ProgressBarFour({ screen }) {
  if (screen === 3) {
    return <View style={styles.progressBarSelect}></View>;
  } else {
    return <View style={styles.progressBar}></View>;
  }
}

function ProgressBarFive({ screen }) {
  if (screen === 4) {
    return <View style={styles.progressBarSelect}></View>;
  } else {
    return <View style={styles.progressBar}></View>;
  }
}

const styles = StyleSheet.create({
  lessonContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    paddingTop: "12%",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  progressContainer: {
    width: "100%",
    height: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  progressBarSelect: {
    width: 55,
    height: 5,
    backgroundColor: "#f2f2f2",
    borderRadius: 4,
    margin: 5,
  },
  progressBar: {
    width: 55,
    height: 5,
    backgroundColor: "#f2f2f2",
    borderRadius: 4,
    margin: 5,
    opacity: 0.3,
  },
  navMenuContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 15,
  },
  nextButtonContainer: {
    width: 90,
    height: 45,
    borderRadius: 8,
    backgroundColor: "#6A49E8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  nextButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  buttonPositioning: {
    position: "absolute",
    right: 20,
  },
  pageContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 28,
    fontWeight: "900",
    color: "#6A49E8",
  },
  bodyText: {
    color: "#6A49E8",
    fontSize: 18,
    marginTop: 15,
    lineHeight: 25,
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: 25,
  },
});

export default Onboarding;
