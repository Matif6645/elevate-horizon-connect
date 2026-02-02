import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { EVENTS } from "../../data/event";

/* ---------- Tags ---------- */
const ALL_TAGS = [
  "Today",
  "Fitness",
  "Social",
  "Outdoors",
  "Family",
  "Music",
  "Athletics",
  "Popular",
  "Dance",
  "Indoors",
];

/* ---------- Screen ---------- */
export default function EventsScreen() {
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>(["Today"]);
  const [pickedDate, setPickedDate] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return EVENTS.filter((e) => {
      const matchesText =
        q.length === 0 ||
        e.title.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q) ||
        e.tags.join(" ").toLowerCase().includes(q);

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((t) => e.tags.includes(t));

      const matchesDate =
        pickedDate.trim().length === 0 ||
        e.dateLabel.toLowerCase().includes(pickedDate.toLowerCase());

      return matchesText && matchesTags && matchesDate;
    });
  }, [query, selectedTags, pickedDate]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const clearFilters = () => {
    setQuery("");
    setSelectedTags([]);
    setPickedDate("");
  };

  const showEmpty = filtered.length === 0;

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Events</Text>
        <Text style={styles.settingsIcon}>⚙️</Text>
      </View>

      {/* Filters */}
      <View style={styles.card}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search Events..."
          placeholderTextColor="#6b7280"
          style={styles.search}
        />

        <View style={styles.chipsRow}>
          {ALL_TAGS.map((tag) => {
            const active = selectedTags.includes(tag);
            return (
              <Pressable
                key={tag}
                onPress={() => toggleTag(tag)}
                style={[styles.chip, active && styles.chipActive]}
              >
                <Text
                  style={[styles.chipText, active && styles.chipTextActive]}
                >
                  {tag}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.filterRow}>
          <TextInput
            value={pickedDate}
            onChangeText={setPickedDate}
            placeholder="Pick Date DD/MM/YYYY"
            placeholderTextColor="#6b7280"
            style={styles.dateInput}
          />
          <Pressable style={styles.clearBtn} onPress={clearFilters}>
            <Text style={styles.clearBtnText}>Clear</Text>
          </Pressable>
        </View>
      </View>

      {/* Results */}
      <Text style={styles.sectionTitle}>
        Showing {filtered.length} result{filtered.length === 1 ? "" : "s"}
      </Text>

      <ScrollView>
        {showEmpty ? (
          <Text style={styles.emptyText}>No events found</Text>
        ) : (
          filtered.map((e) => (
            <Pressable
              key={e.id}
              style={({ pressed }) => [
                styles.eventCard,
                pressed && { opacity: 0.85 },
                Platform.OS === "web" && { cursor: "pointer" as any },
              ]}
              onPress={() => {
                (router as any).push(`/event/${e.id}`);
              }}
            >
              <Text style={styles.eventTitle}>{e.title}</Text>
              <Text style={styles.eventMeta}>
                {e.time} • {e.location}
              </Text>
              <Text style={styles.eventMeta}>Spots remaining: {e.spots}</Text>
            </Pressable>
          ))
        )}
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
    paddingHorizontal: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },
  settingsIcon: {
    fontSize: 18,
    color: "#fff",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  search: {
    height: 44,
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 10,
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 10,
  },
  chip: {
    backgroundColor: "#E6F2FA",
    paddingHorizontal: 14,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
  },
  chipActive: {
    backgroundColor: "#5FA8D3",
  },
  chipText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1F3A5F",
  },
  chipTextActive: {
    color: "#fff",
  },
  filterRow: {
    flexDirection: "row",
    gap: 10,
  },
  dateInput: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  clearBtn: {
    backgroundColor: "#5FA8D3",
    borderRadius: 12,
    paddingHorizontal: 14,
    justifyContent: "center",
  },
  clearBtnText: {
    color: "#fff",
    fontWeight: "800",
  },
  sectionTitle: {
    color: "#fff",
    fontWeight: "800",
    marginBottom: 8,
  },
  eventCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "900",
  },
  eventMeta: {
    fontSize: 13,
    color: "#374151",
  },
  emptyText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
    fontWeight: "800",
  },
});
