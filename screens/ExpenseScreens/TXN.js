import React, { useState, useEffect } from "react";
import {
  Text,
  Box,
  View,
  Checkbox,
  Icon,
  ScrollView,
  Center,
  Spinner,
  Button,
  Pressable,
} from "native-base";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import getExpense from "../../hooks/GetExpense";
import { getDatabase, ref, set, update, onValue } from "firebase/database";
import { auth } from "../../config";
const TXN = ({ route }) => {
  const { expensegroup } = route.params;
  const navigation = useNavigation();
  const [loading, setloading] = useState(false);
  const [expensedata, setexpensedata] = useState(null);
  const [arrayuser, setarrayuser] = useState(null);
  const [arrayamount, setarrayamount] = useState(null);
  useEffect(() => {
    setloading(true);
    const getdata = async () => {
      const db = getDatabase();
      const starCountRef = ref(
        db,
        "groups/" + `${expensegroup}/` + "expenses/"
      );
      onValue(starCountRef, async (snapshot) => {
        const data = await snapshot.val();
        setexpensedata(data);
        setarrayuser(getExpense(Object.values(data || {})).arrayuser);
        setarrayamount(getExpense(Object.values(data || {})).arrayamount);
        setloading(false);
      });
    };
    getdata();
  }, []);

  const MoneyTake = () => {
    var money = 0;
    arrayuser?.forEach((i, index) => {
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
    arrayuser?.forEach((i, index) => {
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
  const updatestatus = async (bool, e) => {
    const db = getDatabase();
    const reference = ref(db, "groups/" + `${expensegroup}/`);
    const newexpense = Object.values(expensedata || {}).map((data) => {
      var paidby = data.paidby;
      data.splittingusers.map((email) => {
        if (
          (paidby === auth.currentUser.email && email.user === e) ||
          (paidby === e && email.user === auth.currentUser.email)
        ) {
          email.status = bool;
        }
      });
      return data;
    });
    await update(reference, {
      expenses: newexpense,
    });
  };
  const Expensebox = ({ user, amount }) => {
    return (
      <View
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
        <Box flex={1} paddingY={3} paddingX={2}>
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
        {(amount < 0 && user.to === auth.currentUser.email) ||
        (amount >= 0 && user.by === auth.currentUser.email) ? (
          <Pressable
            _pressed={{
              background: "rgba(0,0,0,0.5)",
            }}
            onPress={() => {
              navigation.navigate("Payment", {
                from: auth.currentUser.email,
                to: amount >= 0 ? user.to : user.by,
                money: amount,
              });
            }}
            style={{
              width: 35,
              height: 35,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 150,
              borderWidth: 1,
            }}
          >
            <Icon color="#000" as={Ionicons} name="send-outline" size="md" />
          </Pressable>
        ) : (amount < 0 && user.by === auth.currentUser.email) ||
          (amount >= 0 && user.to === auth.currentUser.email) ? (
          <>
            <Box
              style={{
                width: 35,
                height: 35,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 150,
              }}
            >
              <Checkbox
                onChange={(e) => {
                  updatestatus(e, amount >= 0 ? user.by : user.to);
                }}
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 150,
                  borderWidth: 1,
                }}
                value="test"
                size={"md"}
                colorScheme="black"
                background={"#000"}
                icon={<Icon as={<AntDesign name="check" />} />}
                accessibilityLabel="This is a dummy checkbox"
                defaultIsChecked={user.status}
              />
            </Box>
          </>
        ) : (
          <></>
        )}
      </View>
    );
  };
  return (
    <>
      {loading ? (
        <Box
          style={{
            marginTop: 10,
            marginBottom: 10,
          }}
          flex={1}
          alignSelf={"center"}
          justifyContent={"center"}
          width={"95%"}
          rounded="md"
          bg="#bdbdbd"
        >
          <Spinner size={"lg"} />
        </Box>
      ) : (
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
                ₹<MoneyTake />
              </Text>
            </Box>
            <Box
              flex={1}
              paddingY={1}
              alignItems={"center"}
              backgroundColor={"rgba(145, 61, 61,1)"}
            >
              <Text fontSize={"sm"} fontWeight={"bold"} color={"#fff"}>
                ₹<MoneyGive />
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
            paddingBottom={1}
            width={"95%"}
            marginTop={0}
            rounded="md"
            bg="#bdbdbd"
          >
            {expensedata ? (
              <>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {arrayuser?.map((a, index) => (
                    <Expensebox
                      key={index}
                      user={arrayuser[index]}
                      amount={arrayamount[index]}
                    />
                  ))}
                </ScrollView>
                <View style={{ width: "100%", marginTop: 2 }}>
                  <Text fontSize={"sm"} fontWeight={"bold"} color={"#900"}>
                    Once you marked a TNX as done , there is no way to undo it.
                  </Text>
                </View>
              </>
            ) : (
              <Center flex={1}>
                <Icon color="#fff" as={AntDesign} name="dropbox" size="lg" />
              </Center>
            )}
          </Box>
        </>
      )}
    </>
  );
};

export default TXN;
