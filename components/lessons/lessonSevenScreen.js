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

function LessonSevenScreen(props) {
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

      <Pages screen={screen} />

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
        <Text style={styles.titleText}>You're A Better Person Sober</Text>
        <Text style={styles.bodyText}>
          One of the most common lies that we tell ourselves to justify our use,
          is that marijuana makes us a better person. It makes us more creative.
          It makes doing things more enjoyable.
        </Text>
        <Text style={styles.bodyText}>
          Even when we get sober, we often have this cognitive dissonance that
          we recognize all of these problems that marijuana causes us, but we
          miss the feeling that it once gave us.
        </Text>
        <Text style={styles.bodyText}>
          Marijuana, never made you a better person.
        </Text>
      </View>
    );
  } else if (screen === 1) {
    return (
      <View style={styles.pageContainer}>
        <Text style={styles.titleText}>Marijuana Prevents Your Growth</Text>
        <Text style={styles.bodyText}>
          Besides teaching you about addiction, the only thing marijuana ever
          did was to mess up your reward system, and prevent your growth. The
          person you are sober is vastly more creative, more valuable, and a
          better version of yourself.
        </Text>
        <Text style={styles.bodyText}>
          If you spent the last 24 hours sober, think of everything you did. The
          friends you talked to, the things you learned. Did you make ourself
          food? Did you clean your room? Did your brush your teeth? What did you
          do to take care of yourself that you weren't doing high? I gaurantee
          you lived a more healthy life than if you were stoned from the moment
          you woke up.
        </Text>
      </View>
    );
  } else {
    return (
      <View style={styles.pageContainer}>
        <Text style={styles.titleText}>Internalize Your Best Self</Text>
        <Text style={styles.bodyText}>
          What does your best self look like? Imagine that person, operating at
          100% capacity. Free of addictions, of a cloudy mind, of everything
          holding him or her back.
        </Text>
        <Text style={styles.bodyText}>
          This is the last section of the lessons this apps contains, so I will
          leave it with the only personal reference in all of the lessons. I
          never knew what I was capable of sober. I was a banking executive, I
          finished college, I ran my own companies. When I finally got sober, I
          blew all of that out of the water. I finally learned to code after 7
          years stuck in a haze, I had a rediculous increase in my salary, I
          started competing as an athlete.
        </Text>
        <Text style={styles.bodyText}>
          I thought marijuana was part of my best self, but it wasn't even
          close.
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

export default LessonSevenScreen;

// psst im bad programmer :( very bad i really need to finish this
