import { useState } from "react";
import { Alert, StyleSheet, Switch, Text, View } from "react-native";

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [soundOn, setSoundOn] = useState(true);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Settings</Text>

      {/* Text Size */}
      <View style={styles.row}>
        <Text style={styles.label}>Large Text</Text>
        <Switch
          value={largeText}
          onValueChange={(v) => {
            setLargeText(v);
            Alert.alert("Demo", "Text size updated (demo)");
          }}
        />
      </View>

      {/* Dark Mode */}
      <View style={styles.row}>
        <Text style={styles.label}>Dark Mode</Text>
        <Switch
          value={darkMode}
          onValueChange={(v) => {
            setDarkMode(v);
            Alert.alert("Demo", "Theme updated (demo)");
          }}
        />
      </View>

      {/* Sound */}
      <View style={styles.row}>
        <Text style={styles.label}>Sound</Text>
        <Switch
          value={soundOn}
          onValueChange={(v) => {
            setSoundOn(v);
            Alert.alert("Demo", "Sound setting updated (demo)");
          }}
        />
      </View>

      <Text style={styles.note}>
        Settings are for demonstration purposes only.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#2E7AA1",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "white",
    marginBottom: 20,
  },
  row: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  note: {
    marginTop: 10,
    color: "white",
    fontSize: 12,
    opacity: 0.8,
  },
});
