import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { EVENTS } from "../../data/event";

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const event = useMemo(() => {
    const eventId = Array.isArray(id) ? id[0] : id;

    // ✅ IMPORTANT: compare as strings (handles number/string mismatch)
    return EVENTS.find((e) => String(e.id) === String(eventId));
  }, [id]);

  // ✅ If event not found
  if (!event) {
    return (
      <View style={styles.screen}>
        <Text style={styles.title}>Event not found</Text>

        <Pressable
          style={styles.button}
          onPress={() => router.push("/(tabs)/explore")}
        >
          <Text style={styles.buttonText}>Back to Events</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.headerBtn}>← Back</Text>
        </Pressable>

        <Text style={styles.headerTitle}>Event Details</Text>

        <Pressable onPress={() => router.push("/(tabs)/explore")}>
          <Text style={styles.headerBtn}>Events</Text>
        </Pressable>
      </View>

      <ScrollView>
        {/* Event Info */}
        <View style={styles.card}>
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.text}>⏱ {event.time}</Text>
          <Text style={styles.text}>📍 {event.location}</Text>
          <Text style={styles.text}>👥 Spots remaining: {event.spots}</Text>
        </View>

        {/* Categories */}
        <View style={styles.card}>
          <Text style={styles.subtitle}>Categories</Text>

          <View style={styles.tagsRow}>
            {(event.tags ?? []).map((tag: string) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* About */}
        <View style={styles.card}>
          <Text style={styles.subtitle}>About</Text>
          <Text style={styles.text}>
            {event.description ?? "No description available."}
          </Text>
        </View>

        {/* Register */}
        <View style={styles.card}>
          <Pressable
            style={styles.button}
            // ✅ IMPORTANT: matches your folder: app/event/register/[id].tsx
            onPress={() => router.push(`/event/register/${String(event.id)}`)}
          >
            <Text style={styles.buttonText}>Register Now</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#2E7AA1",
    padding: 16,
  },

  header: {
    height: 56,
    backgroundColor: "#5FA8D3",
    borderRadius: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },
  headerBtn: {
    color: "#fff",
    fontWeight: "700",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },

  title: {
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 6,
  },
  text: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 4,
  },

  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    backgroundColor: "#E6F2FA",
    paddingHorizontal: 12,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
  },
  tagText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1F3A5F",
  },

  button: {
    borderWidth: 1,
    borderColor: "#2E7AA1",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "#2E7AA1",
    fontWeight: "800",
  },
});
