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

function LessonFourScreen(props) {
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
        <ProgressBarFour screen={screen} />
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
    Segment.track("lesson-four-start");
    return (
      <View style={styles.pageContainer}>
        <Text style={styles.titleText}>Changing Your Associations</Text>
        <Text style={styles.bodyText}>
          Deciding to stop smoking and to become sober requires a fundamental
          shift in what feelings and emotions you associate with marijuana.
        </Text>
        <Text style={styles.bodyText}>
          When you are deep in the addiction, it's very common for people to say
          that they "love" marijuana. Even after becoming sober, many refer to
          it as an ex girlfriend or an ex lover who simply became toxic.
        </Text>
        <Text style={styles.bodyText}>
          Marijuana is not something to be loved. The first step to no longer
          "craving" marijuana, is realizing you don't want it.
        </Text>
      </View>
    );
  } else if (screen === 1) {
    return (
      <View style={styles.pageContainer}>
        <Text style={styles.titleText}>
          You Don't Love Weed, You Love Dopamine
        </Text>
        <Text style={styles.bodyText}>
          It can help to understand that marijuana is simply a plant. You don't
          love the plant, you love the dopamine it provides your brain when you
          get high.
        </Text>
        <Text style={styles.bodyText}>
          <Text style={{ fontWeight: "bold" }}>Good!</Text> It's healthy to love
          dopamine.
        </Text>
        <Text style={styles.bodyText}>
          Dopamine is what drives you to accomplish great things. It's the
          reward for working out, visiting friends, and accomplishing your
          goals. Chase the things you love with the same emotion and passion you
          once had for marijuana.
        </Text>
      </View>
    );
  } else if (screen === 2) {
    return (
      <View style={styles.pageContainer}>
        <Text style={styles.titleText}>
          Learn To Associate Being Sober With Rewards
        </Text>
        <Text style={styles.bodyText}>
          One of the main things this app tries to do, is help you to associate
          being sober with rewards. It's a little silly, but "getting a
          sunflower" for every day you stay sober, is a simple way to reward our
          brains for staying sober. Take time to look at your days (or even
          minutes) sober, the sunflowers that you have earned, feel proud of
          what you accomplished.
        </Text>
        <Text style={styles.bodyText}>
          The real rewards for staying sober are all around you. It's the family
          you visited instead of getting high. It's the body you built instead
          of the one you destroyed. It's the things you learned instead of the
          things you forgot. Sobriety is a super power 1,000 times more
          rewarding than getting stoned.
        </Text>
      </View>
    );
  } else {
    Segment.track("lesson-four-end");
    return (
      <View style={styles.pageContainer}>
        <Text style={styles.titleText}>Build New Pathways</Text>
        <Text style={styles.bodyText}>
          Every time you smoked marijuana, you taught your brain to associate
          marijuana with pleasure/rewards. You can rebuild your brain using this
          same method.
        </Text>
        <Text style={styles.bodyText}>
          If you want to heal your brain faster, give it dopamine as a reward
          for things other than marijuana. Every time you exercise, you teach
          your brain how to get dopamine. Every time you spend time with
          friends, you teach your brain how to get dopamine. Every time you
          learn something new, you teach your brain how to get dopamine. These
          actions change the pathways in your brain so instead of craving
          marijuana as a means to obtain dopamine, it craves exercise, social
          interaction, and the pursuit of rewarding information.
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
  if (screen < 3) {
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

export default LessonFourScreen;
