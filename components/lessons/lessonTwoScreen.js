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

function LessonTwoScreen(props) {
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
        <ProgressBarFive screen={screen} />
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
    Segment.track("lesson-two-start");
    return (
      <View style={styles.pageContainer}>
        <Text style={styles.titleText}>What Is THC Doing To My Mind?</Text>
        <Text style={styles.bodyText}>
          To understand the withdrawal effects of marijuana, it's important to
          understand the effect it has on your mind.
        </Text>
        <Text style={styles.bodyText}>
          What happens when you smoke marijuana? You get happy, you get
          munchies, and then you get tired.
        </Text>
        <Text style={styles.bodyText}>
          All of these activities are strongly related to your dopamine system.{" "}
          <Text style={{ fontWeight: "bold" }}>
            Through heavy use, your brain learns to rely on marijuana to
            regulate these activities.
          </Text>{" "}
          This is why heavy users often complain about needing to smoke, simply
          to feel "normal".
        </Text>
      </View>
    );
  } else if (screen === 1) {
    return (
      <View style={styles.pageContainer}>
        <Text style={styles.titleText}>Insomnia</Text>
        <Text style={styles.bodyText}>
          Marijuana doesn't help you sleep. You can't sleep because of the
          marijuana.
        </Text>
        <Text style={styles.bodyText}>
          Your dopamine system plays a huge part in regulating your ability to
          sleep. Marijuana seems to "help you sleep" because you have trained
          your brain to no longer be able to sleep without it.
        </Text>
        <Text style={styles.bodyText}>
          Insomnia is the most common withdrawal symptom. It is most severe the
          first 1-3 days after quitting, but can last up to two weeks. Be
          prepared to have a hard time sleeping, it is completely normal and you
          will be able to overcome it!
        </Text>
      </View>
    );
  } else if (screen === 2) {
    return (
      <View style={styles.pageContainer}>
        <Text style={styles.titleText}>Loss Of Appetite</Text>
        <Text style={styles.bodyText}>
          The second most common withdrawal symptom is the inability to eat or
          loss of appetite after quitting.
        </Text>
        <Text style={styles.bodyText}>
          Once again, dopamine plays a large role in how hungry you are. This is
          why when you smoke you get the munchies.
        </Text>
        <Text style={styles.bodyText}>
          It is also why, once you stop smoking, you may experience a very hard
          time eating for up to 5 days afterwards. It's important to try and
          make yourself eat a healthy amount. Eating plays an important role in
          providing energy to your brain and helping you overcome negative
          withdrawal effects.
        </Text>
      </View>
    );
  } else if (screen === 3) {
    return (
      <View style={styles.pageContainer}>
        <Text style={styles.titleText}>Depression</Text>
        <Text style={styles.bodyText}>
          At about 1-2 weeks, you will finally be able to sleep and eat again,
          but now a new challenge arises. Depending on how long and heavy you
          have been using, your brain has come to rely on marijuana for its
          dopamine production.
        </Text>
        <Text style={styles.bodyText}>
          It is extremely common to become depressed. Your mind will take a long
          time,{" "}
          <Text style={{ fontWeight: "bold" }}>
            sometimes up to 9-12 months
          </Text>
          , in order to recover and have your dopamine levels return to normal.
        </Text>
        <Text style={styles.bodyText}>
          During this time, it is extremely important to teach your brain to get
          dopamine from new healthy activities. Working out, learning new
          things, spending time with friends, all of these activities help your
          brain learn new ways to acquire dopamine and recover faster.
        </Text>
      </View>
    );
  } else {
    Segment.track("lesson-two-end");
    return (
      <View style={styles.pageContainer}>
        <Text style={styles.titleText}>Anger</Text>
        <Text style={styles.bodyText}>
          In a depressed low dopamine state, it is common for your brain to lash
          out.
        </Text>
        <Text style={styles.bodyText}>
          Your brain releases dopamine when you are angry, and anger is a very
          common withdrawal symptom.
        </Text>
        <Text style={styles.bodyText}>
          When you are going through withdrawals, take a moment to remember that
          anger is a very real side effect of trying to become sober. Your
          family still loves you, your coworkers aren't "that" annoying,
          everything is okay. ❤️
        </Text>
        <Text style={styles.bodyText}>
          Anger is just your brain struggling to return to normal. Like all
          things, it will pass in time.
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
  if (screen < 4) {
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

export default LessonTwoScreen;
