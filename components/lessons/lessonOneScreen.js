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

function LessonOneScreen(props) {
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
    return (
      <View style={styles.pageContainer}>
        <Text style={styles.titleText}>
          The Truth Behind Marijuana Addiction
        </Text>
        <Text style={styles.bodyText}>
          There are so many lies and falsehoods when it comes to marijuana
          addiction that it's hard to figure out what is actually true. You have
          most likely heard everything ranging from "marijuana is a gateway
          drug" to "it's only mentally addicting, like video games" to "it's not
          addictive at all".
        </Text>
        <Text style={styles.bodyText}>
          <Text style={{ fontWeight: "bold" }}>Here's the truth.</Text>
        </Text>
        <Text style={styles.bodyText}>
          Marijuana isn't a gateway drug. It isn't as bad as meth or heroin or
          even alcohol. However, it IS mentally and physically addictive, much
          more than video games.
        </Text>
      </View>
    );
  } else if (screen === 1) {
    return (
      <View style={styles.pageContainer}>
        <Text style={styles.titleText}>
          How Does Society View Marijuana Addiction?
        </Text>
        <Text style={styles.bodyText}>
          The fact that withdrawal symptoms from marijuana actually aren't "that
          bad" (at least compared to other drugs) is one of the hardest parts
          about the addiction.
        </Text>
        <Text style={styles.bodyText}>
          Many people report that their family wont take their decision to quit
          seriously. Often society looks at marijuana addiction as a joke, that
          it's not actually addictive. Friends who are daily smokers may be in
          active denial about the harm it causes them.
        </Text>
        <Text style={styles.bodyText}>
          This can cause people to feel a bit lonely when they decide to quit.
          My hope is that this app will help you feel a little less lonely.
        </Text>
      </View>
    );
  } else if (screen === 2) {
    return (
      <View style={styles.pageContainer}>
        <Text style={styles.titleText}>A Community Of Support</Text>
        <Text style={styles.bodyText}>
          A strong supportive community is an invaluable asset when trying to
          become sober. If there are people in your current life who are
          encouraging of your decision to quit, talk to them about what you are
          going through.
        </Text>
        <Text style={styles.bodyText}>
          One of the largest online communities of people who have decided to
          quit marijuana lives at www.reddit.com/r/leaves. Reading through the
          stories of others and posting your own story is extremely helpful when
          trying to become sober.
        </Text>
        <Text style={styles.bodyText}>
          Just know, you are not alone. There are{" "}
          <Text style={{ fontWeight: "bold" }}>hundreds of thousands</Text> of
          people struggling to quit smoking marijuana.
        </Text>
      </View>
    );
  } else if (screen === 3) {
    return (
      <View style={styles.pageContainer}>
        <Text style={styles.titleText}>Making The Decision To Quit</Text>
        <Text style={styles.bodyText}>
          This app is pro-marijuana and pro-legalization. However, if you have
          identified a problem with your usage, it is here to help you become
          sober.
        </Text>
        <Text style={styles.bodyText}>
          Do you smoke instead of visiting friends or family? Do you smoke
          instead of studying or learning new things? Do you smoke instead of
          going to the gym? Is smoking preventing you from doing the things you
          truly want to do?
        </Text>
        <Text style={styles.bodyText}>
          If marijuana no longer serves you, this app is to help you take back
          your life.
        </Text>
      </View>
    );
  } else {
    return (
      <View style={styles.pageContainer}>
        <Text style={styles.titleText}>Learning About Addiction</Text>
        <Text style={styles.bodyText}>
          This app attempts to do two things. Keep track of your progress, and
          to teach you about the addiction.
        </Text>
        <Text style={styles.bodyText}>
          The reason for this, is because you need to create a new habit. The
          habit of being sober.
        </Text>
        <Text style={styles.bodyText}>
          <Text style={{ fontWeight: "bold" }}>
            Progression tracking is one of the strongest ways to change your
            behavior.
          </Text>{" "}
          Then, after spending months or years training your brain to associate
          marijuana with pleasure/rewards, you must now train your brain to
          associate marijuana with all of the problems it has caused your life.
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

export default LessonOneScreen;
