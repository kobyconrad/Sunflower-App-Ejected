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

function LessonSixScreen(props) {
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

      <SafeAreaView
        style={{
          height: "78%",
        }}
      >
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
    Segment.track("lesson-six-start");
    return (
      <View style={styles.pageContainer}>
        <Text style={styles.titleText}>Relapse: A Tricky Topic</Text>
        <Text style={styles.bodyText}>
          This is a tricky concept to talk about. Moderation is very often a
          path to failure. After learning to abuse marijuana, making the
          decision to quit almost always needs to be "final" for most people.
        </Text>
        <Text style={styles.bodyText}>
          That being said, relapse is very often part of recovery. I know very
          few people who were completely successful becoming sober their very
          first try.
        </Text>
        <Text style={styles.bodyText}>
          It's important to strive for success, but don't become depressed and
          fall back into addiction if you fail. Get back up and keep fighting
          for your sobriety.{" "}
        </Text>
      </View>
    );
  } else if (screen === 1) {
    return (
      <View style={styles.pageContainer}>
        <Text style={styles.titleText}>
          There Is No Reset Button On Learning
        </Text>
        <Text style={styles.bodyText}>
          Despite resetting your quit timer when you relapse, there is no reset
          button on what you have learned. To steal the words of people much
          smarter than me, failure is the chance to start again, simply with
          more wisdom.
        </Text>
        <Text style={styles.bodyText}>
          The hardest time, is the first 24 days. Discovering what marijuana is
          actually doing to your life, how withdrawals effect you, and
          everything else related to your journey towards sobriety, it doesn't
          go away if you slip up.
        </Text>
        <Text style={styles.bodyText}>
          So aim for success with the intention of never smoking again. But if
          you relapse, keep practicing self love and just get back up.{" "}
        </Text>
      </View>
    );
  } else {
    Segment.track("lesson-six-end");
    return (
      <View style={styles.pageContainer}>
        <Text style={styles.titleText}>Tips To Overcome Relapse</Text>
        <Text style={styles.bodyText}>
          If you end up smoking, it can very often trigger the start of a cycle
          back into addiction. It's possible to catch yourself from falling
          down.
        </Text>
        <Text style={styles.bodyText}>
          Try retracing the things you did when you first got sober. Write down
          what being sober means to you. Tell a trusted friend what you are
          going through. Read through the posts on r/leaves of other people who
          are struggling. Exercise, spend time with friends, take it seriously.
        </Text>
        <Text style={styles.bodyText}>
          It's okay fail. Just don't let yourself fall back into something that
          causes you pain.
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
    bottom: 38,
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

export default LessonSixScreen;
