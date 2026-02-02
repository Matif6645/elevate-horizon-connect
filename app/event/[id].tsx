import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { EVENTS } from "../../data/event";

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const event = useMemo(() => {
    const eventId = Array.isArray(id) ? id[0] : id;
    return EVENTS.find((e) => e.id === eventId);
  }, [id]);

  // ✅ guard: if event not found
  if (!event) {
    return (
      <View style={styles.screen}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backText}>← Back</Text>
          </Pressable>
          <Text style={styles.headerTitle}>Event Details</Text>
          <View style={{ width: 60 }} />
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Event not found</Text>
          <Text style={styles.meta}>
            The event ID is missing or doesn’t exist.
          </Text>

          <Pressable
            style={styles.primaryButton}
            onPress={() => router.push("/(tabs)/explore")}
          >
            <Text style={styles.primaryButtonText}>Go to Events</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  // ✅ safe description: works even if your data doesn't have "description"
  const description =
    "description" in event && typeof (event as any).description === "string"
      ? (event as any).description
      : "No description available yet.";

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>

        <Text style={styles.headerTitle}>Event Details</Text>

        <Pressable
          onPress={() => router.push("/(tabs)/explore")}
          style={styles.rightBtn}
        >
          <Text style={styles.rightText}>Events</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Title card */}
        <View style={styles.card}>
          <Text style={styles.title}>{event.title}</Text>

          <Text style={styles.meta}>⏱ {event.time}</Text>
          <Text style={styles.meta}>📍 {event.location}</Text>
          <Text style={styles.meta}>👥 Spots remaining: {event.spots}</Text>
        </View>

        {/* Tags */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.tagsRow}>
            {event.tags.map((t) => (
              <View key={t} style={styles.tag}>
                <Text style={styles.tagText}>{t}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Description */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>About this event</Text>
          <Text style={styles.desc}>{description}</Text>
        </View>

        {/* Register */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Register</Text>
          <Text style={styles.meta}>Tap below to register for this event.</Text>

          <Pressable
            style={styles.primaryButton}
            onPress={() => {
              (router as any).push({
                pathname: "/event/register",
                params: { id: event.id },
              });
            }}
          >
            <Text style={styles.primaryButtonText}>Register Now</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#2E7AA1",
    padding: 16,
    gap: 12,
  },

  header: {
    height: 56,
    backgroundColor: "#5FA8D3",
    borderRadius: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
  },

  backBtn: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.18)",
  },
  backText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },

  rightBtn: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.18)",
  },
  rightText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    gap: 8,
    marginTop: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: "900",
    color: "#111827",
  },
  meta: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "600",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#111827",
  },
  desc: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
  },

  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 6,
  },
  tag: {
    backgroundColor: "#E6F2FA",
    paddingHorizontal: 12,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
  },
  tagText: {
    fontSize: 12,
    fontWeight: "900",
    color: "#1F3A5F",
  },

  primaryButton: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: "#2E7AA1",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 10,
  },
  primaryButtonText: {
    color: "#2E7AA1",
    fontWeight: "900",
  },
});
