import React, { useState, useEffect } from "react";
import {
  Fab,
  Box,
  Input,
  Center,
  Spinner,
  Stack,
  Modal,
  Heading,
  FormControl,
  Popover,
  Button,
  Text,
  Image,
  View,
  Icon,
  Divider,
  Pressable,
} from "native-base";
import { getDatabase, ref, set, update, onValue } from "firebase/database";
import { auth } from "../config";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
const GroupBox = () => {
  const navigation = useNavigation();
  const themeReducer = useSelector(({ themeReducer }) => themeReducer);
  const [loading, setloading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [groupdata, setgroupdata] = useState(null);
  useEffect(() => {
    setloading(true);
    const getdata = async () => {
      const db = getDatabase();
      const starCountRef = ref(db, "groups/");
      onValue(starCountRef, async (snapshot) => {
        const data = await snapshot.val();
        setgroupdata(data);
        setloading(false);
      });
    };
    getdata();
  }, []);

  const [membersupdate, setmembersupdate] = useState(null);
  const Group = ({ value, index }) => {
    return (
      <Pressable
        key={index}
        onPress={() =>
          navigation.navigate("ExpenseScreen", {
            groupfirstdata: value,
          })
        }
        width="98%"
        rounded="lg"
        marginBottom={5}
        alignItems={"center"}
        flexDirection={"row"}
        overflow="hidden"
        padding={2}
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
          <Icon color="#fff" as={FontAwesome} name="group" size="lg" />
        </Box>
        <Stack p="4" flex={1} space={3}>
          <Stack space={2}>
            <Heading numberOfLines={1} size="md" ml="-1">
              {value.groupName}
            </Heading>
            <Text
              fontSize="xs"
              _light={{
                color: "violet.500",
              }}
              _dark={{
                color: "violet.400",
              }}
              fontWeight="500"
              ml="-0.5"
              mt="-1"
            >
              {value.date}
            </Text>
          </Stack>
        </Stack>
        <Box
          style={{
            width: 100,
            height: 40,
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: 20,
            backgroundColor: "#000",
            flexDirection: "row",
          }}
        >
          <Box
            style={{
              height: 40,
              width: 40,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
              backgroundColor: "#ADADAD",
            }}
          >
            <Heading Heading size="lg">
              {value.members.length}
            </Heading>
          </Box>
          <Button
            onPress={() => {
              setShowModal(true);
              setmembersupdate(value);
            }}
            style={{
              height: 40,
              width: 40,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
              backgroundColor: "#000",
            }}
          >
            <Icon
              color="#fff"
              as={AntDesign}
              name="plus"
              borderWidth={1}
              borderColor={"#fff"}
              borderRadius={150}
              size="lg"
            />
          </Button>
        </Box>
      </Pressable>
    );
  };
  const GroupPeople = () => {
    const [adduseremail, setadduseremail] = useState(null);
    const adduser = async () => {
      const db = getDatabase();
      const reference = ref(db, "groups/" + `${membersupdate.groupName}`);
      await update(reference, {
        members: [...membersupdate.members, adduseremail],
      });
    };
    const deleteuser = async (val) => {
      const db = getDatabase();
      const reference = ref(db, "groups/" + `${membersupdate.groupName}`);
      await update(reference, {
        members: membersupdate.members.filter((t) => t !== val),
      });
    };
    return (
      <Center>
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          _backdrop={{
            bg: "rgba(0,0,0,1)",
          }}
        >
          <Modal.Content maxWidth="350" maxH="212">
            <Modal.CloseButton />
            <Modal.Header>
              <Box
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Input
                  value={adduseremail}
                  onChangeText={setadduseremail}
                  onend
                  placeholder="Add User"
                  width={"70%"}
                />
                <Button
                  onPress={adduser}
                  style={{
                    height: 30,
                    width: 30,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 20,
                    backgroundColor: "#000",
                    marginHorizontal: 10,
                  }}
                >
                  <Icon color="#fff" as={AntDesign} name="plus" size="lg" />
                </Button>
              </Box>
            </Modal.Header>
            <Modal.Body>
              {membersupdate?.members?.map((val, index) => (
                <View
                  key={index}
                  style={{
                    flex: 1,
                    paddingVertical: 4,
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <Box
                    style={{
                      padding: 2,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        height: val === membersupdate.admin ? 30 : 25,
                        width: val === membersupdate.admin ? 30 : 25,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 20,
                        backgroundColor: "#000",
                        marginRight: 8,
                        borderWidth: val === membersupdate.admin ? 4 : 0,
                        borderColor:
                          val === membersupdate.admin ? "#900" : "#000",
                      }}
                    >
                      <Text color={"#fff"} fontSize="md">
                        {index + 1}
                      </Text>
                    </View>
                    <Text numberOfLines={1} maxWidth={140} fontSize="md">
                      {val}
                    </Text>
                  </Box>
                  <Box
                    style={{
                      padding: 2,
                    }}
                  >
                    {val !== membersupdate.admin ? (
                      <Popover
                        placement="top"
                        trigger={(triggerProps) => {
                          return (
                            <Button {...triggerProps} colorScheme="danger">
                              <Icon
                                color="#000"
                                as={AntDesign}
                                name="delete"
                                size="lg"
                              />
                            </Button>
                          );
                        }}
                      >
                        <Popover.Content
                          accessibilityLabel="Delete Customerd"
                          w="56"
                        >
                          <Popover.Arrow />
                          <Popover.CloseButton />
                          <Popover.Header>Sure?</Popover.Header>
                          <Popover.Footer justifyContent="flex-end">
                            <Button.Group space={2}>
                              <Button colorScheme="coolGray" variant="ghost">
                                Cancel
                              </Button>
                              <Button
                                onPress={() => deleteuser(val)}
                                colorScheme="danger"
                              >
                                Delete
                              </Button>
                            </Button.Group>
                          </Popover.Footer>
                        </Popover.Content>
                      </Popover>
                    ) : (
                      <></>
                    )}
                  </Box>
                </View>
              ))}
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </Center>
    );
  };
  function getdate(date) {
    var dd = date.getDate();
    var mm = date.getMonth() + 1;

    var yyyy = date.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    var today = dd + "/" + mm + "/" + yyyy;
    return today;
  }
  function gettime(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }
  const createGroup = async (groupName, membersArray) => {
    const db = getDatabase();
    const reference = ref(db, "groups/" + `${groupName}`);
    await set(reference, {
      groupName,
      members: membersArray,
      admin: auth.currentUser.email,
      date: getdate(new Date()),
      time: gettime(new Date()),
    });
  };
  const GroupForm = () => {
    const [groupName, setgroupName] = useState(null);
    const [newemail, setnewemail] = useState(null);
    const [membersArray, setmembersArray] = useState([auth.currentUser.email]);
    return (
      <>
        <Modal
          isOpen={modalVisible}
          onClose={() => setModalVisible(false)}
          avoidKeyboard
          justifyContent="center"
          bottom="4"
          size="lg"
        >
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>Create a group</Modal.Header>
            <Modal.Body>
              <FormControl>
                <FormControl.Label>Group name</FormControl.Label>
                <Input
                  placeholder="Enter a group name"
                  value={groupName}
                  onChangeText={setgroupName}
                />
                <FormControl.Label>Group members</FormControl.Label>
                <Input
                  placeholder="Enter email of a group member"
                  value={newemail}
                  onChangeText={setnewemail}
                  InputRightElement={
                    <Button
                      onPress={async () => {
                        setmembersArray([...membersArray, newemail]);
                        setnewemail(null);
                      }}
                      style={{
                        height: 30,
                        width: 30,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 20,
                        backgroundColor: "#000",
                        marginHorizontal: 10,
                      }}
                    >
                      <Icon color="#fff" as={AntDesign} name="plus" size="lg" />
                    </Button>
                  }
                />
              </FormControl>
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
                {membersArray.map((e, index) => (
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
                      {e}
                    </Text>
                    {e === auth.currentUser.email ? (
                      <Button
                        disabled={true}
                        background={"#ADADAD"}
                        onPress={() => {
                          setmembersArray((products) =>
                            products.filter((_, i) => i !== index)
                          );
                        }}
                      >
                        <Icon
                          color="#900"
                          as={AntDesign}
                          name="user"
                          size="sm"
                        />
                      </Button>
                    ) : (
                      <Button
                        background={"#ADADAD"}
                        onPress={() => {
                          setmembersArray((products) =>
                            products.filter((_, i) => i !== index)
                          );
                        }}
                      >
                        <Icon
                          color="#000"
                          as={AntDesign}
                          name="deleteuser"
                          size="sm"
                        />
                      </Button>
                    )}
                  </Box>
                ))}
              </View>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onPress={() => {
                  setModalVisible(false);
                }}
                style={{
                  backgroundColor: "transparent",
                  marginHorizontal: 4,
                }}
                flex="1"
              >
                <Text color={"#000"}>Cancel</Text>
              </Button>
              <Button
                style={{
                  backgroundColor: "#000",
                  borderRadius: 20,
                  marginHorizontal: 4,
                }}
                flex="1"
                onPress={async () => {
                  createGroup(groupName, membersArray);
                  setModalVisible(false);
                }}
              >
                Create
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </>
    );
  };
  return (
    <>
      <GroupPeople />
      <GroupForm />
      <View height="80px" width={"95%"} alignSelf={"center"}>
        <Fab
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
          renderInPortal={false}
          borderWidth={themeReducer.theme ? 1 : 0}
          borderColor={"#fff"}
          background={"#000"}
          shadow={2}
          placement="top-right"
          size="sm"
          icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />}
          label="Add New Group"
        />
      </View>
      <Box
        // minHeight={200}
        paddingX={5}
        paddingTop={5}
        width={"95%"}
        marginTop={0}
        alignSelf={"center"}
        alignItems={"center"}
        rounded="sm"
        bg="#bdbdbd"
      >
        {loading ? (
          <Center w="100%" zIndex={3} h={150} marginBottom={5}>
            <Spinner size="lg" />
          </Center>
        ) : (
          <>
            {groupdata ? (
              Object.values(groupdata || {})
                .filter(
                  (data) =>
                    data?.members?.indexOf(auth.currentUser.email) !== -1
                )
                .map((val, i) => <Group key={i} value={val} index={i} />)
            ) : (
              <>
                <Center w="100%" zIndex={3} h={150} marginBottom={5}>
                  <Icon color="#fff" as={AntDesign} name="dropbox" size="lg" />
                </Center>
              </>
            )}
          </>
        )}
      </Box>
    </>
  );
};

export default GroupBox;
