import * as React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { Book } from "react-native-feather";
import * as Haptics from "expo-haptics";

function JournalHome() {
  return (
    <View
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column-reverse",
        backgroundColor: "#fff",
      }}
    >
      <View style={{ height: 80 }}></View>
      <View
        style={{
          height: 165,
          backgroundColor: "#F0F4FA",
        }}
      >
        <TouchableHighlight
          onPress={() => {
            console.log("press me");
            Haptics.selectionAsync();
          }}
          underlayColor=""
          style={{}}
        >
          <View style={styles.exerciseContainer}>
            <View style={styles.exerciseTitleContainer}>
              <Text
                style={{ fontSize: 16, fontWeight: "900", color: "#313853" }}
              >
                Add Sober Journal Entry
              </Text>
              <Text style={{ fontSize: 14, marginTop: 6, color: "#8892AB" }}>
                Rewire your brain to associate sobriety with reward.
              </Text>
            </View>

            <View style={styles.iconContainer}>
              <Book stroke="#6A49E8" width={22} height={22} />
            </View>
          </View>
        </TouchableHighlight>
      </View>

      <View style={styles.feedContainer}>
        <Text>THIS IS JOURNALLLL</Text>
        <Text>THIS IS JOURNALLLL</Text>
        <Text>THIS IS JOURNALLLL</Text>
        <Text>THIS IS JOURNALLLL</Text>
        <Text>THIS IS JOURNALLLL</Text>
        <Text>THIS IS JOURNALLLL</Text>
        <Text>THIS IS JOURNALLLL</Text>
        <Text>THIS IS JOURNALLLL</Text>
        <Text>THIS IS JOURNALLLL</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  feedContainer: {},
  exerciseContainer: {
    height: 120,
    backgroundColor: "#fff",
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderBottomWidth: 2,
    borderColor: "#EDEFFB",
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FBFCFE",
    width: "20%",
  },
  exerciseTitleContainer: {
    width: "80%",
    padding: 18,
    display: "flex",
    justifyContent: "center",
  },
});

export default JournalHome;
