import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
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

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [event, setEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await fetch(`${EVENTS_URL}/${id}?ts=${Date.now()}`);
        const data = await res.json();
        setEvent(data ?? null);
      } catch (e) {
        console.log("Details fetch failed:", e);
        setEvent(null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="white" />
        <Text style={styles.loadingText}>Loading event…</Text>
      </View>
    );
  }

  if (!event || !event.id) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFoundTitle}>Event not found</Text>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  const tag1 = event.tags?.[0] ?? "Tag";
  const tag2 = event.tags?.[1] ?? "Today";

  return (
    <View style={styles.screen}>
      {/* Header row */}
      <View style={styles.headerRow}>
        <Pressable onPress={() => router.back()} style={styles.headerBack}>
          <Text style={styles.headerBackText}>{"<"}</Text>
        </Pressable>

        <View style={styles.headerTitlePill}>
          <Text style={styles.headerTitle}>Event Details</Text>
        </View>

        <Pressable
          onPress={() => router.push("/(tabs)/settings")}
          style={styles.headerGear}
        >
          <Text style={styles.headerGearText}>⚙️</Text>
        </Pressable>
      </View>

      {/* Description card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{event.title}</Text>
        <Text style={styles.cardBody}>
          {event.description ?? "No description available."}
        </Text>
      </View>

      {/* Info row */}
      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <Text style={styles.infoIcon}>🕒</Text>
          <Text style={styles.infoText}>{event.time}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoIcon}>📍</Text>
          <Text style={styles.infoText}>{event.location}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoIcon}>👤</Text>
          <Text style={styles.infoText}>{event.spots}</Text>
        </View>
      </View>

      {/* Tags + Register */}
      <View style={styles.bottomRow}>
        <View style={styles.tagsRow}>
          <View style={styles.tagPill}>
            <Text style={styles.tagText}>{tag1}</Text>
          </View>
          <View style={[styles.tagPill, styles.tagPillActive]}>
            <Text style={[styles.tagText, styles.tagTextActive]}>{tag2}</Text>
          </View>
        </View>

        <Pressable
          style={styles.registerBtn}
          onPress={() => router.push(`/event/register/${event.id}`)}
        >
          <Text style={styles.registerText}>Register</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#2E7AA1",
    paddingHorizontal: 20,
    paddingTop: 60, // 👈 add this
  },

  headerRow: {
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  headerBack: {
    width: 46,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  headerBackText: { color: "#0B2B35", fontSize: 22, fontWeight: "900" },
  headerTitlePill: {
    flex: 1,
    marginHorizontal: 10,
    height: 44,
    backgroundColor: "#5FA8D3",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: { color: "#0B2B35", fontSize: 18, fontWeight: "800" },
  headerGear: {
    width: 46,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
  },
  headerGearText: { fontSize: 22 },

  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.12)",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 6,
    color: "#111827",
  },
  cardBody: { fontSize: 14, lineHeight: 20, color: "#111827" },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 14,
    marginBottom: 14,
  },
  infoItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  infoIcon: { fontSize: 14 },
  infoText: { color: "#0B2B35", fontWeight: "700", fontSize: 13 },

  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    // ✅ pushes this whole row to the very bottom
    marginTop: "auto",

    // ✅ gives bottom spacing so it doesn't touch the phone edge
    paddingBottom: 20,
  },

  tagsRow: { flexDirection: "row", gap: 10 },

  tagPill: {
    backgroundColor: "#EAF3F8",
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  tagPillActive: { backgroundColor: "#5FA8D3" },
  tagText: { fontWeight: "800", color: "#0B2B35" },
  tagTextActive: { color: "white" },

  registerBtn: {
    // ✅ keeps it aligned at the bottom right (no weird gap)
    height: 54,
    width: 170,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  registerText: { color: "#111827", fontWeight: "700" },

  center: {
    flex: 1,
    backgroundColor: "#2E7AA1",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: { marginTop: 10, color: "white", fontWeight: "700" },
  notFoundTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 10,
  },
  backBtn: {
    marginTop: 10,
    backgroundColor: "white",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },
  backBtnText: { color: "#2E7AA1", fontWeight: "800" },
});
