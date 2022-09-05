import React from "react";
import {
  Text,
  Box,
  View,
  Checkbox,
  Icon,
  ScrollView,
  Flex,
  FormControl,
  Center,
  Input,
  Spinner,
  Button,
  Pressable,
} from "native-base";
import { AntDesign, Ionicons } from "@expo/vector-icons";
const Payment = ({ route }) => {
  const methods = ["Google Pay", "PhonePay", "Paytm", "UPI"];
  const { from, to, money } = route.params;
  return (
    <>
      <View
        shadow={2}
        flexDirection={"row"}
        justifyContent={"space-around"}
        style={{
          width: "100%",
          overflow: "hidden",
          marginBottom: 10,
          backgroundColor: "#ADADAD",
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
        }}
      >
        <Flex direction="row" justify="space-evenly" flex={1}>
          <Box
            flex={2}
            paddingX={2}
            paddingBottom={2}
            style={{
              // justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <FormControl>
              <FormControl.Label
                _text={{
                  color: "#000",
                }}
              >
                FROM
              </FormControl.Label>
              <View
                padding={1}
                backgroundColor={"#fff"}
                shadow={2}
                borderRadius={5}
              >
                <Text fontWeight={"bold"} numberOfLines={1}>
                  {from}
                </Text>
              </View>
              <FormControl.Label
                _text={{
                  color: "#000",
                }}
              >
                TO
              </FormControl.Label>
              <View
                padding={1}
                backgroundColor={"#fff"}
                shadow={2}
                borderRadius={5}
              >
                <Text fontWeight={"bold"} numberOfLines={1}>
                  {to}
                </Text>
              </View>
              <FormControl.Label
                _text={{
                  color: "#000",
                }}
              >
                AMOUNT
              </FormControl.Label>
              <View
                padding={1}
                backgroundColor={"#fff"}
                shadow={2}
                borderRadius={5}
              >
                <Text fontWeight={"bold"} numberOfLines={1}>
                  {Math.round(money)}
                </Text>
              </View>
            </FormControl>
          </Box>
        </Flex>
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            rounded="lg"
            flexDirection={"column"}
            overflow="hidden"
            paddingX={2}
            paddingBottom={2}
            marginTop={5}
            backgroundColor={"#fff"}
          >
            {methods.map((method, index) => (
              <View marginTop={2} key={index} width={"100%"}>
                <Button
                  style={{
                    backgroundColor: "#ADADAD",
                    alignItems: "center",
                  }}
                >
                  <Text fontSize={"sm"} fontWeight={"bold"}>
                    {method}
                  </Text>
                </Button>
              </View>
            ))}
          </View>
          <View
            rounded="lg"
            flexDirection={"column"}
            overflow="hidden"
            marginTop={5}
            backgroundColor={"#fff"}
          >
            <View
              width={"100%"}
              backgroundColor={"#ADADAD"}
              alignItems={"center"}
              paddingY={2}
            >
              <Text fontSize={"sm"} fontWeight={"bold"}>
                Credit/Dabit Card
              </Text>
            </View>
            <FormControl flex={1} padding={2}>
              <FormControl.Label
                _text={{
                  color: "#000",
                }}
              >
                Cardholder Name
              </FormControl.Label>
              <Input
                placeholder="Enter Cardholder Name"
                InputRightElement={
                  <View
                    style={{
                      height: 30,
                      width: 30,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#fff",
                      marginHorizontal: 10,
                    }}
                  >
                    <Icon color="#000" as={AntDesign} name="user" size="lg" />
                  </View>
                }
              />
              <FormControl.Label
                _text={{
                  color: "#000",
                }}
              >
                Card Number
              </FormControl.Label>
              <Input
                placeholder="Enter Card Number"
                InputRightElement={
                  <View
                    style={{
                      height: 30,
                      width: 30,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#fff",
                      marginHorizontal: 10,
                    }}
                  >
                    <Icon
                      color="#000"
                      as={AntDesign}
                      name="creditcard"
                      size="lg"
                    />
                  </View>
                }
              />
              <View flex={1} flexDirection={"row"}>
                <Box flex={1} marginRight={2}>
                  <FormControl.Label
                    _text={{
                      color: "#000",
                      fontSize: "sm",
                    }}
                  >
                    Expiration Date
                  </FormControl.Label>
                  <Input placeholder="Enter Expiration Date" />
                </Box>
                <Box flex={1} marginLeft={2}>
                  <FormControl.Label
                    _text={{
                      color: "#000",
                      fontSize: "sm",
                    }}
                  >
                    CVV
                  </FormControl.Label>
                  <Input keyboardType="number-pad" placeholder="Enter CVV" />
                </Box>
              </View>
            </FormControl>

            <View flex={1} padding={2}></View>
            <Button
              width={"100%"}
              backgroundColor={"#000"}
              borderRadius={0}
              alignItems={"center"}
              paddingY={2}
            >
              <Text fontSize={"md"} fontWeight={"bold"} color={"#fff"}>
                Send
              </Text>
            </Button>
          </View>
        </ScrollView>
      </Box>
    </>
  );
};

export default Payment;
