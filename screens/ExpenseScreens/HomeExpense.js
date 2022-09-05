import React, { useState } from "react";
import { Text, Box, View, Icon, ScrollView, Center } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { auth } from "../../config";
const HomeExpense = ({ route }) => {
  const { expensedata } = route.params;
  const [arrayuser, setarrayuser] = useState(expensedata?.arrayuser);
  const [arrayamount, setarrayamount] = useState(expensedata?.arrayamount);
  const MoneyTake = () => {
    var money = 0;
    arrayuser.forEach((i, index) => {
      if (arrayamount[index] < 0) {
        if (i.by === auth.currentUser.email) {
          money += Math.abs(arrayamount[index]);
        }
      } else {
        if (i.to === auth.currentUser.email) {
          money += arrayamount[index];
        }
      }
    });
    return (
      <Text fontSize={"sm"} fontWeight={"bold"} color={"#fff"}>
        {Math.round(money)}
      </Text>
    );
  };
  const MoneyGive = () => {
    var money = 0;
    arrayuser.forEach((i, index) => {
      if (arrayamount[index] < 0) {
        if (i.to === auth.currentUser.email) {
          money += Math.abs(arrayamount[index]);
        }
      } else {
        if (i.by === auth.currentUser.email) {
          money += arrayamount[index];
        }
      }
    });
    return (
      <Text fontSize={"sm"} fontWeight={"bold"} color={"#fff"}>
        {Math.round(money)}
      </Text>
    );
  };
  const Expensebox = ({ user, amount }) => {
    return (
      <View
        onPress={() =>
          navigation.navigate("ExpenseScreen", {
            groupfirstdata: value,
          })
        }
        rounded="lg"
        alignItems={"center"}
        flexDirection={"row"}
        overflow="hidden"
        padding={2}
        marginTop={5}
        backgroundColor={"#fff"}
      >
        <Box
          style={{
            width: 50,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 150,
            backgroundColor: "#000",
          }}
        >
          <Icon color="#fff" as={AntDesign} name="pay-circle-o1" size="lg" />
        </Box>
        <Box flex={1} padding={3}>
          {amount < 0 ? (
            <Text color={"#000"} fontSize={"sm"} fontWeight={"bold"}>
              {user.to} has to pay amount of{" "}
              <Text color={"#33b528"} fontSize={"sm"} fontWeight={"bold"}>
                {Math.round(Math.abs(amount))}
              </Text>{" "}
              to {user.by}
            </Text>
          ) : (
            <Text color={"#000"} fontSize={"sm"} fontWeight={"bold"}>
              {user.by} has to pay amount of{" "}
              <Text color={"#33b528"} fontSize={"sm"} fontWeight={"bold"}>
                {Math.round(amount)}
              </Text>{" "}
              to {user.to}
            </Text>
          )}
        </Box>
      </View>
    );
  };
  return (
    <>
      <View
        shadow={2}
        flexDirection={"row"}
        justifyContent={"space-around"}
        style={{
          width: "100%",
          overflow: "hidden",
          //   height: 0,
          marginBottom: 10,
          backgroundColor: "#ADADAD",
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
        }}
      >
        <Box
          flex={1}
          paddingY={1}
          alignItems={"center"}
          backgroundColor={"rgba(67, 156, 61,1)"}
        >
          <Text fontSize={"sm"} fontWeight={"bold"} color={"#fff"}>
            ₹{expensedata?.moneytake}
          </Text>
        </Box>
        <Box
          flex={1}
          paddingY={1}
          alignItems={"center"}
          backgroundColor={"rgba(145, 61, 61,1)"}
        >
          <Text fontSize={"sm"} fontWeight={"bold"} color={"#fff"}>
            ₹{expensedata?.moneygive}
          </Text>
        </Box>
      </View>
      <Box
        paddingX={5}
        style={{
          marginBottom: 10,
        }}
        flex={1}
        alignSelf={"center"}
        paddingBottom={5}
        width={"95%"}
        marginTop={0}
        rounded="md"
        bg="#bdbdbd"
      >
        {arrayuser.length !== 0 && arrayamount.length !== 0 ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* {arrayuser ? } */}
            {arrayuser?.map((a, index) => (
              <Expensebox
                key={index}
                user={arrayuser[index]}
                amount={arrayamount[index]}
              />
            ))}
          </ScrollView>
        ) : (
          <Center flex={1}>
            <Icon color="#fff" as={AntDesign} name="dropbox" size="lg" />
          </Center>
        )}
      </Box>
    </>
  );
};

export default HomeExpense;
