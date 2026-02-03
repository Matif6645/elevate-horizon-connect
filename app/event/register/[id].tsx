import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const EVENTS_URL =
  "https://raw.githubusercontent.com/Matif6645/elevate-horizon-connect/main/events.json";

type EventItem = {
  id: string | number;
  title: string;
  location: string;
  time: string;
};

export default function RegisterScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [event, setEvent] = useState<EventItem | null>(null);

  useEffect(() => {
    fetch(EVENTS_URL)
      .then((res) => res.json())
      .then((data: EventItem[]) => {
        const found = data.find((e) => String(e.id) === String(id));
        setEvent(found ?? null);
      })
      .catch(console.error);
  }, [id]);

  if (!event) {
    return (
      <View style={styles.screen}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Register</Text>

      <Text style={styles.text}>Event: {event.title}</Text>
      <Text style={styles.text}>Location: {event.location}</Text>
      <Text style={styles.text}>Time: {event.time}</Text>

      <Pressable style={styles.button} onPress={() => alert("Registered (demo)")}>
        <Text style={styles.buttonText}>Confirm Registration</Text>
      </Pressable>
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
    marginBottom: 12,
  },
  text: {
    color: "white",
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    marginTop: 20,
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#2E7AA1",
    fontWeight: "800",
  },
});
