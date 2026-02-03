import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

// import { EVENTS } from "../../data/event"; // ← kept for reference only

/* ---------- Type ---------- */
type EventItem = {
  id: string;
  title: string;
  time: string;
  location: string;
  spots: number;
  tags: string[];
  dateLabel: string;
};

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

export default function EventsScreen() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>(["Today"]);

  /* ---------- Fetch events ---------- */
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/Matif6645/elevate-horizon-connect/main/events.json",
    )
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  /* ---------- Filter ---------- */
  const filtered = useMemo(() => {
    const q = query.toLowerCase();

    return events.filter((e) => {
      const matchText =
        e.title.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q);

      const matchTags =
        selectedTags.length === 0 ||
        selectedTags.every((t) => e.tags.includes(t));

      return matchText && matchTags;
    });
  }, [events, query, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.header}>Events</Text>

      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search events"
        style={styles.search}
      />

      <View style={styles.tags}>
        {ALL_TAGS.map((tag) => (
          <Pressable
            key={tag}
            onPress={() => toggleTag(tag)}
            style={[styles.tag, selectedTags.includes(tag) && styles.tagActive]}
          >
            <Text>{tag}</Text>
          </Pressable>
        ))}
      </View>

      <ScrollView>
        {filtered.map((e) => (
          <Pressable
            key={e.id}
            style={styles.card}
            onPress={() => router.push(`/event/${e.id}`)}
          >
            <Text style={styles.title}>{e.title}</Text>
            <Text>{e.time}</Text>
            <Text>{e.location}</Text>
            <Text>Spots: {e.spots}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  screen: { flex: 1, padding: 16, backgroundColor: "#2E7AA1" },
  header: { fontSize: 20, fontWeight: "800", color: "white", marginBottom: 10 },
  search: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  tags: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginBottom: 10 },
  tag: {
    backgroundColor: "#E6F2FA",
    padding: 8,
    borderRadius: 20,
  },
  tagActive: {
    backgroundColor: "#5FA8D3",
  },
  card: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: { fontSize: 16, fontWeight: "700" },
});
