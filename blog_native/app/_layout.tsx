import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const tabsStyle = {
  tabBarStyle: { backgroundColor: "#688d1b" },
  tabBarActiveTintColor: "white",
  tabBarInactiveTintColor: "#cfcfcf",
  headerStyle: { backgroundColor: "#688d1b" },
};

export default function RootLayout() {
  return <Tabs screenOptions={tabsStyle}>
    <Tabs.Screen name="index" options={{ title: "Blog feed", tabBarIcon: ({ color }) => <Ionicons name="calendar" size={40} color={color} /> }} />
    <Tabs.Screen name="newPost" options={{ title: "New post", tabBarIcon: ({ color }) => <Ionicons name="add-circle" size={40} color={color} /> }} />
  </Tabs>;
}
