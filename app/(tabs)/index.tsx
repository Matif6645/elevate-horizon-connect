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

const HOME_TAGS = [
  "Athletics",
  "Today",
  "Fitness",
  "Music",
  "Social",
  "Outdoors",
  "Family",
  "Popular",
  "Indoors",
  "This Week",
  "Weekend",
];

export default function HomeScreen() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("Today");

  async function loadEvents() {
    try {
      setLoading(true);
      const res = await fetch(EVENTS_URL);
      const data = await res.json();
      setEvents(Array.isArray(data) ? data : []);
    } catch (e) {
      console.log("Home fetch failed:", e);
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
        selectedTag === ""
          ? true
          : selectedTag === "Today"
          ? e.dateLabel === "Today" || (e.tags ?? []).includes("Today")
          : selectedTag === "This Week" || selectedTag === "Weekend"
          ? e.dateLabel === selectedTag
          : (e.tags ?? []).includes(selectedTag);

      return matchesText && matchesTag;
    });
  }, [events, query, selectedTag]);

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Elevate Horizon Connect</Text>

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
        {/* Welcome Card */}
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>Welcome</Text>
          <Text style={styles.welcomeText}>
            Find and register for Community Events
          </Text>

          <Pressable
            style={styles.primaryBtn}
            onPress={() => {
              setSelectedTag("Today");
              router.push("/(tabs)/explore");
            }}
          >
            <Text style={styles.primaryBtnText}>View Today’s Events</Text>
          </Pressable>
        </View>

        {/* Search */}
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

        {/* Chips */}
        <View style={styles.chipsRow}>
          {HOME_TAGS.map((t) => {
            const active = selectedTag === t;
            return (
              <Pressable
                key={t}
                onPress={() => setSelectedTag(t)}
                style={[styles.chip, active && styles.chipActive]}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>
                  {t}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Results header */}
        <Text style={styles.resultsText}>
          Showing: {selectedTag} - {filtered.length} result
          {filtered.length === 1 ? "" : "s"}:
        </Text>

        {/* Loading */}
        {loading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="white" />
            <Text style={styles.loadingText}>Loading events…</Text>
          </View>
        ) : (
          <>
            {/* Empty */}
            {filtered.length === 0 ? (
              <View style={styles.emptyBox}>
                <Text style={styles.emptyTitle}>No events found</Text>
                <Text style={styles.emptyText}>
                  Try another tag or search term.
                </Text>

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

                  {/* show first 3 tags */}
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
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#2E7AA1",
    paddingTop: 40, // ✅ Android: pushes UI below status bar
  },

  header: {
    backgroundColor: "#2E7AA1",
    paddingTop: 0, // ✅ was 14 (remove to avoid double top spacing)
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
  settingsIcon: {
    fontSize: 22,
  },

  content: {
    paddingHorizontal: 18,
    paddingBottom: 24,
  },

  welcomeCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.12)",
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: "900",
    marginBottom: 6,
    color: "#111827",
  },
  welcomeText: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 12,
    fontWeight: "600",
  },
  primaryBtn: {
    borderWidth: 2,
    borderColor: "#1f2937",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  primaryBtnText: {
    fontWeight: "900",
    color: "#1f2937",
  },

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
  search: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
    fontWeight: "600",
  },
  searchIcon: {
    fontSize: 18,
  },

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
  chipActive: {
    backgroundColor: "#5FA8D3",
  },
  chipText: {
    fontWeight: "900",
    color: "#0B2B35",
  },
  chipTextActive: {
    color: "white",
  },

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
  loadingText: {
    marginTop: 10,
    color: "white",
    fontWeight: "800",
  },

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
  emptyText: {
    color: "white",
    fontWeight: "600",
    marginBottom: 12,
  },
  refreshBtn: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  refreshBtnText: {
    color: "#2E7AA1",
    fontWeight: "900",
  },

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
  metaRow: {
    gap: 6,
    marginBottom: 8,
  },
  metaText: {
    color: "#111827",
    fontWeight: "700",
  },
  spotsText: {
    color: "#374151",
    fontWeight: "800",
    marginBottom: 10,
  },
  tagRow: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
  },
  tagPill: {
    backgroundColor: "#5FA8D3",
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  tagPillText: {
    color: "white",
    fontWeight: "900",
    fontSize: 12,
  },
});