import * as React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import * as Haptics from "expo-haptics";

function ActivityLogExercise(props) {
  let NavJournalScreen = props.NavJournalScreen;

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.titleText}>What did you accomplish today?</Text>
      <Text style={styles.subtitleText}>
        Select any activity that was healthy for your mind or body.
      </Text>
      <View style={styles.exerciseNavContainer}>
        <TouchableHighlight
          onPress={() => {
            Haptics.selectionAsync();
            NavJournalScreen();
          }}
          underlayColor=""
          style={{ width: "33%", height: "100%", display: "flex" }}
        >
          <View style={styles.cancelContainer}>
            <Text style={{ fontSize: 18, color: "#fff", fontWeight: "800" }}>
              cancel
            </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            Haptics.selectionAsync();
            // NavActivityLog0();
          }}
          underlayColor=""
          style={{ width: "63%", height: "100%", display: "flex" }}
        >
          <View style={styles.nextContainer}>
            <Text style={{ fontSize: 18, color: "#fff", fontWeight: "800" }}>
              next
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    width: "100%",
    height: "100%",
    padding: 25,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "800",
    marginTop: 34,
    color: "#000100",
  },
  subtitleText: {
    fontSize: 14,
    fontWeight: "400",
    marginTop: 10,
    color: "#2E2E2E",
  },
  exerciseNavContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 40,
    marginTop: 20,
  },
  cancelContainer: {
    backgroundColor: "#B8BFC8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    height: "100%",
  },
  nextContainer: {
    backgroundColor: "#6A49E8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    height: "100%",
  },
});

export default ActivityLogExercise;
