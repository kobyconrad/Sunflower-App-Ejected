import * as React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableHighlight,
  SafeAreaView,
  ScrollView,
} from "react-native";
import * as Haptics from "expo-haptics";
import { XCircle, ArrowLeftCircle } from "react-native-feather";
import * as Segment from "expo-analytics-segment";

function LessonThreeScreen(props) {
  const [screen, setScreen] = useState(0);

  function backFunction() {
    Haptics.selectionAsync();
    let currentScreen = screen;
    setScreen(currentScreen - 1);
  }
  function nextFunction() {
    Haptics.selectionAsync();
    let currentScreen = screen;
    setScreen(currentScreen + 1);
  }

  return (
    <View style={styles.lessonContainer}>
      <View style={styles.progressContainer}>
        <ProgressBarOne screen={screen} />
        <ProgressBarTwo screen={screen} />
        <ProgressBarThree screen={screen} />
      </View>

      <View style={styles.navMenuContainer}>
        <BackArrow screen={screen} backFunction={backFunction} />
        <XCircle
          stroke="#f2f2f2"
          width={32}
          height={32}
          opacity={0.3}
          onPress={props.back}
        />
      </View>

      <SafeAreaView>
        <ScrollView>
          <Pages screen={screen} />
        </ScrollView>
      </SafeAreaView>

      <NextArrow
        screen={screen}
        nextFunction={nextFunction}
        finishFunction={props.back}
      />
    </View>
  );
}

function Pages({ screen }) {
  if (screen === 0) {
    Segment.track("lesson-three-start");
    return (
      <View style={styles.pageContainer}>
        <Text style={styles.titleText}>Quitting For Good</Text>
        <Text style={styles.bodyText}>
          Are you looking for a tolerance break, or are you trying to quit for
          good?
        </Text>
        <Text style={styles.bodyText}>
          This is a question only you can answer.
        </Text>
        <Text style={styles.bodyText}>
          However, if you notice significant withdrawal symptoms, if marijuana
          addiction is significantly effecting your life, it is extremely likely
          that marijuana has created pathways in your brain that will easily be
          reactivated by attempting "moderation".
        </Text>
        <Text style={styles.bodyText}>
          "One joint won't hurt..." are very famous last words before relapse.
        </Text>
      </View>
    );
  } else if (screen === 1) {
    return (
      <View style={styles.pageContainer}>
        <Text style={styles.titleText}>
          How Many Times Have You Tried To Quit?
        </Text>
        <Text style={styles.bodyText}>
          If you downloaded this app, chances are this isn't the first time
          you've tried to quit.
        </Text>
        <Text style={styles.bodyText}>
          Even if you are only looking for a tolerance break, there must be some
          part of you that recognizes that your current usage isn't helping you
          become a better person.
        </Text>
        <Text style={styles.bodyText}>
          Is it the 1st time you're trying to quit? The 10th? The 100th?
          Marijuana has a funny way of getting you to rationalize usage and
          before you know it, it's 10am, you just woke up, and you're already
          high.
        </Text>
      </View>
    );
  } else {
    Segment.track("lesson-three-end");
    return (
      <View style={styles.pageContainer}>
        <Text style={styles.titleText}>Why Do You Want To Be Sober?</Text>
        <Text style={styles.bodyText}>
          Do you want to spend more time with your family? Do you want to go to
          the gym and build a better body? Do you want to be motivated to learn
          new things and work harder?
        </Text>
        <Text style={styles.bodyText}>
          "Sober" is a funny word. It sounds boring. Being sober, is a
          superpower. It allows you to accomplish real meaningful things that
          you would never have done high.
        </Text>
        <Text style={styles.bodyText}>
          No one can speak for you and tell you why you should be sober. Chances
          are however, the reasons that you are looking to get sober are long
          lasting. They aren't going away in 12 months. Don't trade them away
          for a cloudy mind.
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
  if (screen < 2) {
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
    backgroundColor: "#6A49E8",
    paddingTop: "12%",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
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
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  nextButtonText: {
    color: "#6A49E8",
    fontWeight: "bold",
    fontSize: 18,
  },
  buttonPositioning: {
    position: "absolute",
    bottom: 50,
    right: 20,
  },
  pageContainer: {
    width: "100%",
    height: "100%",
    marginTop: 15,
    paddingLeft: 10,
  },
  titleText: {
    fontSize: 28,
    fontWeight: "900",
    color: "white",
  },
  bodyText: {
    color: "white",
    fontSize: 18,
    marginTop: 15,
    lineHeight: 25,
  },
});

export default LessonThreeScreen;
