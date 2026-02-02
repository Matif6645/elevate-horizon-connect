import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function RegisterScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Register</Text>
      <Text style={styles.text}>Event ID: {id}</Text>
      <Text style={styles.text}>Next: we can add a simple form + confirm button.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 16, backgroundColor: "#2E7AA1" },
  title: { fontSize: 22, fontWeight: "800", color: "white", marginBottom: 12 },
  text: { color: "white", fontSize: 16, marginBottom: 8 },
});
