import { router, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { EVENTS } from "../../data/event";

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams();

  const event = EVENTS.find((e) => String(e.id) === String(id));

  // Event not found
  if (!event) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>Event not found</Text>

        <Pressable onPress={() => router.push("/explore")}>
          <Text style={styles.link}>Back to Events</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.text}>{event.time}</Text>
      <Text style={styles.text}>{event.location}</Text>
      <Text style={styles.text}>Spots: {event.spots}</Text>

      <Pressable
        style={styles.button}
        onPress={() => router.push(`/event/register/${event.id}`)}
      >
        <Text style={styles.buttonText}>Register</Text>
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
    fontSize: 20,
    fontWeight: "800",
    color: "white",
    marginBottom: 8,
  },
  text: {
    color: "white",
    marginBottom: 6,
  },
  button: {
    marginTop: 16,
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#2E7AA1",
    fontWeight: "700",
  },
  center: {
    flex: 1,
    backgroundColor: "#2E7AA1",
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    color: "white",
    textDecorationLine: "underline",
    marginTop: 10,
  },
});
