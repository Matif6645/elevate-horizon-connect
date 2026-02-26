import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Constants from "expo-constants";

const API_BASE = "http://10.88.94.1:3001";
const EVENTS_URL = `${API_BASE}/events`;

type EventItem = {
  id: number;
  title: string;
  time: string;
  location: string;
  spots: number;
  tags: string[];
  dateLabel: string;
  description?: string;
};

const TAGS = [
  "All",
  "Today",
  "This Week",
  "Weekend",
  "Fitness",
  "Social",
  "Music",
  "Outdoors",
  "Family",
  "Athletics",
  "Popular",
  "Indoors",
];

export default function ExploreScreen() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string>("All"); // ✅ FIXED

  async function loadEvents() {
    try {
      setLoading(true);

      const res = await fetch(EVENTS_URL);
      const data = await res.json();

      console.log("Explore fetched:", data);

      setEvents(Array.isArray(data) ? data : []);
    } catch (e) {
      console.log("Explore fetch failed:", e);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEvents();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return events.filter((e) => {
      const matchesText =
        q.length === 0 ||
        e.title.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q) ||
        (e.description ?? "").toLowerCase().includes(q) ||
        (e.tags ?? []).join(" ").toLowerCase().includes(q);

      const matchesTag =
        selected === "All"
          ? true
          : selected === "Today" ||
              selected === "This Week" ||
              selected === "Weekend"
            ? (e.dateLabel ?? "").toLowerCase() === selected.toLowerCase() ||
              (e.tags ?? []).includes(selected)
            : (e.tags ?? []).includes(selected);

      return matchesText && matchesTag;
    });
  }, [events, query, selected]);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Events</Text>

        <Pressable
          onPress={() => router.push("/(tabs)/settings")}
          style={styles.settingsBtn}
        >
          <Text style={styles.settingsIcon}>⚙️</Text>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.searchWrap}>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search Events..."
            placeholderTextColor="#6b7280"
            style={styles.search}
          />
          <Text style={styles.searchIcon}>🔍</Text>
        </View>

        <View style={styles.chipsRow}>
          {TAGS.map((t) => {
            const active = selected === t;
            return (
              <Pressable
                key={t}
                onPress={() => setSelected(t)}
                style={[styles.chip, active && styles.chipActive]}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>
                  {t}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.resultsText}>
          Showing: {selected} - {filtered.length} result
          {filtered.length === 1 ? "" : "s"}:
        </Text>

        {loading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="white" />
            <Text style={styles.loadingText}>Loading events…</Text>
          </View>
        ) : filtered.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>No events found</Text>
            <Text style={styles.emptyText}>Try another tag or search term.</Text>

            <Pressable style={styles.refreshBtn} onPress={loadEvents}>
              <Text style={styles.refreshBtnText}>Refresh</Text>
            </Pressable>
          </View>
        ) : (
          filtered.map((event) => (
            <Pressable
              key={event.id}
              style={styles.eventCard}
              onPress={() => router.push(`/event/${event.id}`)}
            >
              <Text style={styles.eventTitle}>{event.title}</Text>

              <View style={styles.metaRow}>
                <Text style={styles.metaText}>🕒 {event.time}</Text>
                <Text style={styles.metaText}>📍 {event.location}</Text>
              </View>

              <Text style={styles.spotsText}>
                Spots remaining: {event.spots}
              </Text>

              <View style={styles.tagRow}>
                {(event.tags ?? []).slice(0, 3).map((tag) => (
                  <View key={tag} style={styles.tagPill}>
                    <Text style={styles.tagPillText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </Pressable>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#2E7AA1" },

  header: {
    paddingTop: (Constants.statusBarHeight ?? 0) + 10, // ✅ MOBILE ALIGN FIX
    paddingHorizontal: 18,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    backgroundColor: "#5FA8D3",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    color: "white",
    fontSize: 18,
    fontWeight: "800",
    flex: 1,
    textAlign: "center",
    marginRight: 10,
  },
  settingsBtn: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  settingsIcon: { fontSize: 22 },

  content: { paddingHorizontal: 18, paddingBottom: 24 },

  searchWrap: {
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 46,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.12)",
    marginBottom: 12,
  },
  search: { flex: 1, fontSize: 15, color: "#111827", fontWeight: "600" },
  searchIcon: { fontSize: 18 },

  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 14,
  },
  chip: {
    backgroundColor: "#EAF3F8",
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  chipActive: { backgroundColor: "#5FA8D3" },
  chipText: { fontWeight: "900", color: "#0B2B35" },
  chipTextActive: { color: "white" },

  resultsText: {
    color: "#0B2B35",
    fontWeight: "900",
    fontSize: 16,
    marginBottom: 10,
  },

  loadingBox: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
  },
  loadingText: { marginTop: 10, color: "white", fontWeight: "800" },

  emptyBox: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 12,
    padding: 16,
  },
  emptyTitle: {
    color: "white",
    fontWeight: "900",
    fontSize: 18,
    marginBottom: 6,
  },
  emptyText: { color: "white", fontWeight: "600", marginBottom: 12 },

  refreshBtn: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  refreshBtnText: { color: "#2E7AA1", fontWeight: "900" },

  eventCard: {
    backgroundColor: "white",
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.12)",
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#111827",
    marginBottom: 8,
  },
  metaRow: { gap: 6, marginBottom: 8 },
  metaText: { color: "#111827", fontWeight: "700" },
  spotsText: { color: "#374151", fontWeight: "800", marginBottom: 10 },

  tagRow: { flexDirection: "row", gap: 10, flexWrap: "wrap" },
  tagPill: {
    backgroundColor: "#5FA8D3",
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  tagPillText: { color: "white", fontWeight: "900", fontSize: 12 },
});