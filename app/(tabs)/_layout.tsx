import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import { Foundation, Fontisto } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Foundation name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <Fontisto name="search" size={24} color={color} />
          ),
        }}
      />
        <Tabs.Screen
        name="order_list"
        options={{
          title: "Your Orders",
          tabBarIcon: ({ color }) => (
            <Fontisto name="shopping-bag" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
