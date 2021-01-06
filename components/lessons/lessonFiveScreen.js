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

function LessonFiveScreen(props) {
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
    Segment.track("lesson-five-start");
    return (
      <View style={styles.pageContainer}>
        <Text style={styles.titleText}>Marijuana Is A Crutch</Text>
        <Text style={styles.bodyText}>
          Marijuana is a crutch that can hide what your real problems are.
          Parents getting divorced? Just some some weed. Abusive spouse? Just
          smoke some weed. Sad because you're overweight? Just smoke some weed.
        </Text>
        <Text style={styles.bodyText}>
          Nobody gets through this life without encountering some kind of
          issues. Addiction is rarely the only problem that an addict struggles
          with. The problem is that when you are always high, you are never
          addressing the things that are causing you pain. You just smoke a
          joint and forget about it.
        </Text>
        <Text style={styles.bodyText}>
          You are supposed to feel pain. You are supposed to become unhappy in
          bad situations. These are triggers that tell us something is wrong and
          that we need to fix it.
        </Text>
      </View>
    );
  } else if (screen === 1) {
    return (
      <View style={styles.pageContainer}>
        <Text style={styles.titleText}>Take All The Help You Can Get</Text>
        <Text style={styles.bodyText}>
          If you can get a therapist, you should probably get a therapist. It
          can be scary, uncomfortable, expensive, and often seem like "it's not
          necessary", but if you are in the fortunate position where you can get
          into therapy, you probably should.
        </Text>
        <Text style={styles.bodyText}>
          If you can't get a good therapist, and even in addition to it, take
          advantage of all of the free resources in the world. Learn how to
          master your mind. Go on YouTube and Google, learn about your dopamine
          system, learn how addiction works. Go on r/leaves and read other
          peoples stories. Identify what your problems are, the things that you
          struggle with beyond your addiction, and take baby steps towards
          addressing them.
        </Text>
      </View>
    );
  } else {
    Segment.track("lesson-five-end");
    return (
      <View style={styles.pageContainer}>
        <Text style={styles.titleText}>
          You Don't Need Marijuana To Be Happy
        </Text>
        <Text style={styles.bodyText}>
          It's easy to have a thorn in your foot and say "smoking weed makes the
          pain go away". It's a lot better to just take the thorn out of your
          foot.
        </Text>
        <Text style={styles.bodyText}>
          It's never actually this easy, but addressing your problems will
          actually fix them instead of simply ignoring them until they get
          worse. Just remember it's okay for things to feel bad once you stop
          smoking. Don't use marijuana as a crutch that's preventing you from
          living your best life. True freedom and accomplishment lies in
          tackling the problems that life puts in front of you.
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

export default LessonFiveScreen;
