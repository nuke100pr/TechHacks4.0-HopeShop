import { StyleSheet, View, FlatList, RefreshControl, Text } from "react-native";
import { useState, useEffect } from "react";
import { db, getDocs, collection } from "../../firebase/firebase";
import * as Location from "expo-location";
import OrderListCard from "../../components/order_list_card";

export default function BuyerScreen() {
  const [services, setServices] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [locationIsSet, setLocationIsSet] = useState(false);

  const getServices = async () => {
    setIsLoading(true);
    const servicesArray: any[] = [];

    try {
      const querySnapshot = await getDocs(collection(db, "orders"));
      querySnapshot.forEach((doc) => {
        servicesArray.push({ id: doc.id, ...doc.data() });
      });

      setServices(servicesArray);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      alert("Permission to access location was denied");
      return;
    }

    try {
      await Location.getCurrentPositionAsync({});

      setLocationIsSet(true);
    } catch (error) {
      alert("Error getting location");
    }
  };

  useEffect(() => {
    getCurrentLocation();
    getServices();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.heading}>Your Orders!</Text>

        {locationIsSet && (
          <FlatList
            data={services}
            renderItem={({ item }) => <OrderListCard {...item} forBuyer />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              gap: 20,
              paddingBottom: 140,
              paddingHorizontal: 15,
              marginTop: 20,
            }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                colors={["#83A2FF"]}
                onRefresh={getServices}
              />
            }
          />
        )}
      </View>


    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  heading: {
    fontSize: 15,
    fontFamily: "Neo",
    textTransform: "uppercase",
    marginLeft: 15,
  },
});
