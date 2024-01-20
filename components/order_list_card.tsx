import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import BrutalismShadow from "./BrutalismShadow";
import { FontAwesome } from "@expo/vector-icons";
import CommentsModal from "./CommentsModal";

const OrderListCard = (props) => {
  const {
    id,
    totalAmount,
    serviceName,
    quantity,
    phone,
    fullName,
    email ,
    deliveryTime,
    date,
    address
  } = props;

  const [commentModalIsOpen, setCommentModalIsOpen] = useState(false);


  return (
    <Pressable
      style={{
        width: "100%",
        alignSelf: "center",
      }}
      
    >
      <View style={styles.container}>


        <Text style={styles.title}>Service Name:{serviceName}</Text>
        <Text style={styles.price}>₹{totalAmount}</Text>
        <Text style={styles.description}>Quantity:{quantity}</Text>
        <Text style={styles.description}>Delivery time:{deliveryTime} hours</Text>
        <Text style={styles.description}>Date:{date}</Text>
        <Text style={styles.description}>Address:{address}</Text>
        <Text style={styles.description}>FullName:{fullName}</Text>
        <Text style={styles.description}>PhoneNumber:{phone}</Text>
        <Text style={styles.description}>Email:{email}</Text>

        <Pressable
          style={styles.addComment}
          onPress={() => setCommentModalIsOpen(true)}
        >
          <FontAwesome name="star" size={18} color="#83A2FF" />
          <Text style={styles.commentText}>Rate your Order</Text>
        </Pressable>
      </View>

      <BrutalismShadow />

    </Pressable>
  );
};

export default OrderListCard;

const styles = StyleSheet.create({
  container: {
    gap: 15,
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    zIndex: 10,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 200,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#000",
  },
  serviceInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  title: {
    fontSize: 17,
    fontFamily: "Neo",
    textTransform: "capitalize",
    flex: 1,
  },
  price: {
    fontSize: 17,
    fontFamily: "Neo",
    color: "#83A2FF",
  },
  description: {
    fontSize: 14,
  },
  tags: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 7,
  },
  tag: {
    fontSize: 11,
    fontFamily: "Neo",
    backgroundColor: "#bafca2",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    textTransform: "lowercase",
    borderWidth: 1,
  },
  addComment: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    alignSelf: "flex-end",
  },
  commentText: {
    fontSize: 12,
    textTransform: "capitalize",
    fontFamily: "Neo",
  },
});
