import {
  StyleSheet,
  Text,
  Image,
  View,
  Linking,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { db, doc, getDoc } from "../../firebase/firebase";
import { ScrollView } from "react-native-gesture-handler";
import CustomButton from "../../components/CustomButton";
import DisplayLocation from "../../components/DisplayLocation";
import PlaceOrderModal from "../../components/PlaceOrderModal";
import React from 'react';
import { LineChart } from 'react-native-chart-kit';

const BuyingMode = (props) => {
  const { text } = props;

  const texts = {
    delivery: "delivery only",
    pickup: "pickup only",
    both: "delivery / pickup",
  };

  const images = {
    delivery: require("../../assets/images/delivery.png"),
    pickup: require("../../assets/images/pickup.png"),
    both: require("../../assets/images/both.png"),
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
      <Image
        source={images[text]}
        style={{
          width: 35,
          height: 35,
        }}
      />

      <Text
        style={{
          fontSize: 11,
          fontFamily: "Neo",
          textTransform: "uppercase",
        }}
      >
        {texts[text]}
      </Text>
    </View>
  );
};

const ServiceScreen = () => {
  const {
    id,
  }: {
    id: string;
  } = useLocalSearchParams();

  const [service, setService] = useState({});
  const [seller, setSeller] = useState({});

  const [orderModalIsOpen, setOrderModalIsOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);


  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June','July','August','September','October','November','December'],
    datasets: [
      {
        data: [500, 450, 300, 550, 600, 500,505,520,540,530,475,455],
      },
    ],};

  const getService = async () => {
    setIsLoading(true);

    if (id) {
      const docRef = doc(db, "services", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setService(docSnap.data());
      }
    }

    setIsLoading(false);
  };

  const getSellerInfo = async () => {
    if (service?.userID) {
      const docRef = doc(db, "users", service?.userID);
      const docSnap = await getDoc(docRef);


      if (docSnap.exists()) {
        setSeller(docSnap.data());
      }
    }
  };

  const callSeller = () => {
    Linking.openURL(`tel:${seller?.phone}`);
  };

  useEffect(() => {
    getService();
  }, []);

  useEffect(() => {
    getSellerInfo();
  }, [service]);

  if (isLoading)
    return (
      <ActivityIndicator
        size="large"
        color="#83A2FF"
        style={{
          marginTop: 50,
        }}
      />
    );

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={{ flex: 1, backgroundColor: "#fff" }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>{service?.title}</Text>
      




      

      <Image
        source={{
          uri: "https://plus.unsplash.com/premium_photo-1661757934821-d0e2049f6282?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max",
        }}
        style={styles.image}
      />

      <Text style={styles.price}>₹{service?.price}</Text>

      <Text style={styles.description}>{service?.description}</Text>

      <View style={styles.tags}>
        {service?.tags?.map((item: any, index: number) => (
          <Text key={index} style={styles.tag}>
            {item}
          </Text>
        ))}
      </View>

      <Text style={styles.description}>
        Order will Fulfill in{" "}
        <Text style={{ fontFamily: "Neo", color: "#83A2FF", fontSize: 17 }}>
          {service?.deliveryTime}
        </Text>{" "}
        Hours
      </Text>

      {service?.buyingMode && <BuyingMode text={service?.buyingMode} />}

      <View
        style={{
          width: "95%",
          alignSelf: "center",
          height: 1,
          backgroundColor: "#666666",
          marginVertical: 10,
        }}
      />
      <Text style={styles.heading}>Buy now 50% off on all orders.</Text>

      <Text style={styles.username}>{seller?.fullName}</Text>

      <Text style={styles.email}>@{seller?.email}</Text>

      <Text style={styles.text}>{seller?.bio}</Text>

      {seller?.location && <DisplayLocation location={seller?.location} />}

      <Text style={styles.heading}>Price history</Text>

      <ScrollView horizontal>
      <View style={styles.container3}>
      <LineChart
        data={data}
        width={1000}
        height={200}
        yAxisLabel="K"
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
      />
    </View>
      </ScrollView>
      
   

      <CustomButton
        text="call"
        backgroundColor="#83A2FF"
        onPress={callSeller}
      />
      <CustomButton
        text="order"
        backgroundColor="#83A2FF"
        onPress={() => setOrderModalIsOpen(true)}
      />

      <PlaceOrderModal
        isOpen={orderModalIsOpen}
        onClose={() => setOrderModalIsOpen(false)}
        userID={service?.userID}
        serviceName={service?.title}
        servicePrice={service?.price}
        deliveryTime={service?.deliveryTime}
      />
    </ScrollView>
  );
};

export default ServiceScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingHorizontal: 15,
    gap: 20,
    paddingBottom: 50,
  },
  title: {
    fontSize: 25,
    fontFamily: "Neo",
    textTransform: "capitalize",
  },
  image: {
    width: "100%",
    height: 250,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#000",
  },
  description: {
    fontSize: 15,
  },
  price: {
    fontSize: 23,
    fontFamily: "Neo",
    color: "#83A2FF",
  },
  tags: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
  },
  tag: {
    fontSize: 12,
    fontFamily: "Neo",
    backgroundColor: "#bafca2",
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 15,
    textTransform: "lowercase",
    borderWidth: 1,
  },
  heading: {
    fontSize: 14,
    fontFamily: "Neo",
    textTransform: "uppercase",
  },
  username: {
    fontSize: 20,
    fontFamily: "Neo",
    textTransform: "uppercase",
    color: "#83A2FF",
  },
  email: {
    fontSize: 12,
    fontFamily: "Neo",
  },
  text: {
    fontSize: 15,
  },
});
