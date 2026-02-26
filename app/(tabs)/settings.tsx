import { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

export default function SettingsScreen() {
  const [largeText, setLargeText] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const backgroundColor = darkMode ? "#111827" : "#2E7AA1";

  return (
    <View style={[styles.screen, { backgroundColor }]}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.row}>
        <Text style={[styles.label, { fontSize: largeText ? 22 : 16 }]}>
          Large Text
        </Text>
        <Switch value={largeText} onValueChange={setLargeText} />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Enable Sound</Text>
        <Switch value={soundEnabled} onValueChange={setSoundEnabled} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 70,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "white",
    marginBottom: 40,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  label: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
