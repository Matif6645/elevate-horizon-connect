import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
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
  location: string;
  time: string;
  spots: number;
};

export default function RegisterScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [event, setEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  async function loadEvent() {
    try {
      setLoading(true);
      const res = await fetch(`${EVENTS_URL}/${id}?ts=${Date.now()}`);
      const data = await res.json();
      setEvent(data ?? null);
    } catch (e) {
      console.log("Register fetch failed:", e);
      setEvent(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEvent();
  }, [id]);

  async function handleConfirm() {
    if (!event) return;

    if (event.spots <= 0) {
      alert("No spots left");
      return;
    }

    const newSpots = event.spots - 1;

    try {
      setSaving(true);

      await fetch(`${EVENTS_URL}/${event.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ spots: newSpots }),
      });

      const res = await fetch(`${EVENTS_URL}/${event.id}?ts=${Date.now()}`);
      const updated = await res.json();
      setEvent(updated);

      alert("Registered! Spots updated ✅");
      router.back();
    } catch (e) {
      console.log("PATCH failed:", e);
      alert("Registration failed. Try again.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.screen}>
        <ActivityIndicator size="large" color="white" />
        <Text style={styles.text}>Loading…</Text>
      </View>
    );
  }

  if (!event || !event.id) {
    return (
      <View style={styles.screen}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backArrow}>{"<"}</Text>
        </Pressable>

        <Text style={styles.title}>Register</Text>
        <Text style={styles.text}>Event not found.</Text>

        <Pressable style={styles.smallBtn} onPress={() => router.back()}>
          <Text style={styles.smallBtnText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      {/* ✅ ONLY THIS BACK BUTTON ADDED */}
      <Pressable onPress={() => router.back()}>
        <Text style={styles.backArrow}>{"<"}</Text>
      </Pressable>

      <Text style={styles.title}>Register</Text>

      <Text style={styles.text}>Event: {event.title}</Text>
      <Text style={styles.text}>Location: {event.location}</Text>
      <Text style={styles.text}>Time: {event.time}</Text>
      <Text style={styles.text}>Spots remaining: {event.spots}</Text>

      <Text style={styles.text}>Full name</Text>
      <TextInput
        value={fullName}
        onChangeText={setFullName}
        placeholder="e.g. Bob Jobs"
        placeholderTextColor="#9CA3AF"
        style={styles.input}
      />
      <Text style={styles.helper}>Name is required</Text>

      <Text style={styles.text}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="e.g. bob@jobsmail.com"
        placeholderTextColor="#9CA3AF"
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />
      <Text style={styles.helper}>enter a valid email</Text>

      <Text style={styles.text}>Phone</Text>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        placeholder="e.g. 0412345678"
        placeholderTextColor="#9CA3AF"
        keyboardType="phone-pad"
        style={styles.input}
      />
      <Text style={styles.helper}>(optional)</Text>

      <Pressable
        style={[styles.button, saving && { opacity: 0.6 }]}
        onPress={handleConfirm}
        disabled={saving}
      >
        <Text style={styles.buttonText}>
          {saving ? "Registering..." : "Confirm Registration"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#2E7AA1", padding: 20 },

  backArrow: {
    color: "#0B2B35",
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 10,
  },

  title: { fontSize: 22, fontWeight: "800", color: "white", marginBottom: 12 },
  text: { color: "white", fontSize: 16, marginBottom: 8 },

  input: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 6,
  },
  helper: {
    fontSize: 12,
    color: "#D1D5DB",
    marginBottom: 12,
  },

  button: {
    marginTop: 20,
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#2E7AA1", fontWeight: "800" },

  smallBtn: {
    marginTop: 14,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  smallBtnText: { color: "#2E7AA1", fontWeight: "800" },
});