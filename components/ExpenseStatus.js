import React, { useEffect, useState } from "react";
import {
  View,
  Fab,
  Modal,
  Flex,
  FormControl,
  Input,
  Select,
  Center,
  Spinner,
  Popover,
  Checkbox,
  Button,
  Stack,
  Heading,
  Text,
  Box,
  Menu,
  Pressable,
  Icon,
  ScrollView,
  Divider,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
const ExpenseStatus = ({ statusdata }) => {
  const navigation = useNavigation();
  const [totalamount, settotalamount] = useState(0);
  const [data, setdata] = useState(statusdata);
  const [summaryVisible, setsummaryVisible] = useState(false);
  useEffect(() => {
    setdata(statusdata);
    var temp = 0;
    Object.values(statusdata?.expenses || {}).forEach((e) => {
      temp = temp + Number(e.amount);
    });
    settotalamount(temp);
  }, [statusdata]);
  const Summary = () => {
    return (
      <>
        <Modal
          isOpen={summaryVisible}
          onClose={() => setsummaryVisible(false)}
          avoidKeyboard
          justifyContent="center"
          bottom="4"
          size="lg"
        >
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>Group Information</Modal.Header>
            <Modal.Body>
              <Box
                shadow={2}
                rounded="lg"
                marginBottom={2}
                // alignItems={"center"}
                // flexDirection={"row"}
                overflow="hidden"
                padding={2}
                backgroundColor={"#fff"}
              >
                <Text
                  fontSize={"sm"}
                  numberOfLines={3}
                  lineHeight="sm"
                  style={{
                    color: "#000",
                    fontWeight: "bold",
                  }}
                >
                  {data?.groupName}
                </Text>
                <Divider my={2} />
                <Text
                  fontSize={"sm"}
                  numberOfLines={1}
                  lineHeight="sm"
                  style={{
                    color: "#000",
                    fontWeight: "bold",
                  }}
                >
                  {data?.date} {data?.time}
                </Text>
                <Divider my={2} />
                <Text
                  fontSize={"sm"}
                  numberOfLines={1}
                  lineHeight="sm"
                  style={{
                    color: "#000",
                    fontWeight: "bold",
                  }}
                >
                  {data?.admin}
                </Text>
              </Box>
              <FormControl>
                <FormControl.Label>Group Members</FormControl.Label>
                <View
                  style={{
                    marginTop: 6,
                    borderWidth: 1,
                    borderColor: "rgba(0,0,0,0.15)",
                    borderRadius: 4,
                    paddingHorizontal: 5,
                    paddingBottom: 5,
                    flexDirection: "column",
                  }}
                >
                  {data?.members.map((suser, index) => (
                    <Box
                      key={index}
                      style={{
                        backgroundColor: "rgba(0,0,0,0.1)",
                        padding: 4,
                        paddingLeft: 8,
                        marginTop: 5,
                        borderRadius: 4,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text fontWeight={"bold"} fontSize={"md"}>
                        {suser}
                      </Text>
                    </Box>
                  ))}
                </View>
              </FormControl>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </>
    );
  };
  return (
    <>
      <Summary />
      <View
        shadow={2}
        style={{
          width: "100%",
          overflow: "hidden",
          height: 122,
          marginBottom: 10,
          backgroundColor: "#ADADAD",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        <Flex direction="row" justify="space-evenly" flex={1}>
          <Box
            flex={2}
            padding={2}
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
                Created By
              </FormControl.Label>
              <View
                padding={1}
                backgroundColor={"#fff"}
                shadow={2}
                borderRadius={5}
              >
                <Text fontWeight={"bold"} numberOfLines={1}>
                  {data?.admin}
                </Text>
              </View>
              <FormControl.Label
                _text={{
                  color: "#000",
                }}
              >
                Total expenses
              </FormControl.Label>
              <View
                padding={1}
                backgroundColor={"#fff"}
                shadow={2}
                borderRadius={5}
              >
                <Text fontWeight={"bold"} numberOfLines={1}>
                  {totalamount}
                </Text>
              </View>
            </FormControl>
          </Box>
          <Divider orientation="vertical" />
          <Box
            flex={1}
            // padding={2}
            style={{
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Divider bg={"#000"} position={"absolute"} alignSelf={"center"} />
            <Divider
              bg={"#000"}
              position={"absolute"}
              alignSelf={"center"}
              orientation={"vertical"}
            />
            <View flex={1}>
              <Button
                flex={1}
                borderRadius={0}
                alignItems={"center"}
                justifyContent={"center"}
                flexDirection={"column"}
                background={"rgba(255,255,255,0.5)"}
                _text={{
                  color: "rgba(255,255,255,0.5)",
                }}
                onPress={() => console.log("hello world")}
              >
                <Icon
                  alignSelf={"center"}
                  color="rgba(255,255,255,0.5)"
                  as={AntDesign}
                  name="bells"
                  size="lg"
                />
                <Text
                  color={"rgba(255,255,255,0.5)"}
                  numberOfLines={1}
                  fontSize={"xs"}
                  fontWeight={"bold"}
                >
                  Activity
                </Text>
              </Button>
              <Button
                flex={1}
                borderRadius={0}
                background={"rgba(255,255,255,0.5)"}
                _text={{
                  color: "#000",
                }}
                onPress={() => setsummaryVisible(true)}
              >
                <Icon
                  alignSelf={"center"}
                  color="#000"
                  as={AntDesign}
                  name="infocirlceo"
                  size="lg"
                />
                <Text numberOfLines={1} fontSize={"xs"} fontWeight={"bold"}>
                  Information
                </Text>
              </Button>
            </View>
            <View flex={1}>
              <Button
                flex={1}
                borderRadius={0}
                background={"rgba(255,255,255,0.5)"}
                _text={{
                  color: "#000",
                }}
                onPress={() =>
                  navigation.navigate("TXN", {
                    expensegroup: statusdata.groupName,
                  })
                }
              >
                <Icon
                  alignSelf={"center"}
                  color="#000"
                  as={MaterialCommunityIcons}
                  name="contactless-payment-circle-outline"
                  size="lg"
                />
                <Text numberOfLines={1} fontSize={"xs"} fontWeight={"bold"}>
                  TXN
                </Text>
              </Button>
              <Button
                flex={1}
                borderRadius={0}
                background={"rgba(255,255,255,0.5)"}
                _text={{
                  color: "rgba(255,255,255,0.5)",
                }}
                onPress={() => console.log("hello world")}
              >
                <Icon
                  alignSelf={"center"}
                  color="rgba(255,255,255,0.5)0"
                  as={AntDesign}
                  name="delete"
                  size="lg"
                />
                <Text
                  color={"rgba(255,255,255,0.5)"}
                  numberOfLines={1}
                  fontSize={"xs"}
                  fontWeight={"bold"}
                >
                  Delete
                </Text>
              </Button>
            </View>
          </Box>
        </Flex>
      </View>
    </>
  );
};

export default ExpenseStatus;
