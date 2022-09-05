import React, { useState, useEffect } from "react";
import {
  Flex,
  View,
  Divider,
  Heading,
  Box,
  Button,
  Center,
  Spinner,
  Pressable,
} from "native-base";
import { getDatabase, ref, set, update, onValue } from "firebase/database";
import { auth } from "../config";
import GetFinaleMoney from "../hooks/GetFinaleMoney";
import { useNavigation } from "@react-navigation/native";
const Status = () => {
  const navigation = useNavigation();
  // const [groupdata, setgroupdata] = useState(null);
  const [finaledata, setfinaledata] = useState(null);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    const getdata = async () => {
      setloading(true);
      const db = getDatabase();
      const starCountRef = ref(db, "groups/");
      onValue(starCountRef, async (snapshot) => {
        const data = await snapshot.val();
        // setgroupdata(data);
        setfinaledata(
          GetFinaleMoney(
            Object.values(data || {}).filter(
              (d) => d?.members?.indexOf(auth.currentUser.email) !== -1
            )
          )
        );
        // console.log(finaledata.arrayuser);
        // console.log(finaledata.arrayamount);
        setloading(false);
      });
    };
    getdata();
  }, []);
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("HomeExpense", {
          expensedata: finaledata,
        });
      }}
      shadow={2}
      style={{
        width: "100%",
        overflow: "hidden",
        height: 80,
        backgroundColor: "#ADADAD",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      }}
    >
      <Flex direction="row" justify="space-evenly" flex={1}>
        <Box backgroundColor={"rgba(67, 156, 61,1)"} flex={1}>
          <View
            flex={1}
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0.6)",
            }}
          >
            <Heading color={"#fff"} fontSize={"sm"}>
              Will get
            </Heading>
          </View>
          <Divider />
          {!finaledata || loading ? (
            <Center backgroundColor={"rgba(0,0,0,0.6)"} flex={2}>
              <Spinner color={"#fff"} size={"sm"} />
            </Center>
          ) : (
            <View
              flex={2}
              style={{
                backgroundColor: "rgba(0,0,0,0.6)",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Heading color={"#fff"}>₹</Heading>
              <Heading color={"#fff"}>{finaledata?.moneytake}</Heading>
            </View>
          )}
        </Box>
        <Divider orientation="vertical" />
        <Box backgroundColor={"rgba(145, 61, 61,1)"} flex={1}>
          <View
            flex={1}
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0.6)",
            }}
          >
            <Heading color={"#fff"} fontSize={"sm"}>
              Will pay
            </Heading>
          </View>
          <Divider />
          {!finaledata || loading ? (
            <Center backgroundColor={"rgba(0,0,0,0.6)"} flex={2}>
              <Spinner color={"#fff"} size={"sm"} />
            </Center>
          ) : (
            <View
              flex={2}
              style={{
                backgroundColor: "rgba(0,0,0,0.6)",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Heading color={"#fff"}>₹</Heading>
              <Heading color={"#fff"}>{finaledata?.moneygive}</Heading>
            </View>
          )}
        </Box>
      </Flex>
    </Pressable>
  );
};

export default Status;
