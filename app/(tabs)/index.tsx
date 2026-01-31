import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Elevate Horizon Connect</Text>
        <Pressable style={styles.settingsButton}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </Pressable>
      </View>

      {/* Welcome card */}
      <View style={styles.card}>
        <Text style={styles.welcomeTitle}>Welcome</Text>
        <Text style={styles.welcomeText}>
          Find and register for community events.
        </Text>

        <Pressable style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>View Today’s Events</Text>
        </Pressable>
      </View>

      {/* Search bar */}
      <TextInput
        placeholder="Search Events..."
        placeholderTextColor="#6b7280"
        style={styles.search}
      />

      {/* Category chips */}
      <View style={styles.chipsRow}>
        {[
          "Athletics",
          "Today",
          "Fitness",
          "Music",
          "Social",
          "Outdoors",
          "Family",
        ].map((item) => (
          <View key={item} style={styles.chip}>
            <Text style={styles.chipText}>{item}</Text>
          </View>
        ))}
      </View>

      {/* Events */}
      <Text style={styles.sectionTitle}>Showing: Today – 2 results</Text>

      <View style={styles.eventCard}>
        <Text style={styles.eventTitle}>Morning Yoga</Text>
        <Text style={styles.eventMeta}>08:30–09:15 • Community Hall</Text>
        <Text style={styles.eventMeta}>Spots remaining: 5</Text>
      </View>

      <View style={styles.eventCard}>
        <Text style={styles.eventTitle}>Trail Walk</Text>
        <Text style={styles.eventMeta}>11:30–14:30 • Forest Trails</Text>
        <Text style={styles.eventMeta}>Spots remaining: 15</Text>
      </View>
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
    paddingHorizontal: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  settingsButton: {
    padding: 6,
  },
  settingsIcon: {
    color: "#FFFFFF",
    fontSize: 18,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    gap: 10,
  },

  welcomeTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
  },
  welcomeText: {
    fontSize: 14,
    color: "#374151",
  },

  primaryButton: {
    borderWidth: 1,
    borderColor: "#2E7AA1",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  primaryButtonText: {
    color: "#2E7AA1",
    fontWeight: "700",
  },

  search: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    height: 44,
    paddingHorizontal: 12,
    fontSize: 14,
  },

  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    backgroundColor: "#E6F2FA",
    paddingHorizontal: 14,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
  },
  chipText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1F3A5F",
  },

  sectionTitle: {
    color: "#FFFFFF",
    fontWeight: "700",
    marginTop: 6,
  },

  eventCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    gap: 4,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
  },
  eventMeta: {
    fontSize: 13,
    color: "#374151",
  },
});
