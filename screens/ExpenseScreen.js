import React, { useState, useEffect } from "react";
import {
  View,
  Fab,
  Modal,
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
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { HamburgerIcon } from "native-base";
import ExpenseStatus from "../components/ExpenseStatus";
import {
  getDatabase,
  remove,
  ref,
  set,
  update,
  onValue,
} from "firebase/database";
import shortid from "shortid";
const ExpenseScreen = ({ navigation, route }) => {
  const { groupfirstdata } = route.params;
  const themeReducer = useSelector(({ themeReducer }) => themeReducer);
  const [groupdata, setgroupdata] = useState(groupfirstdata);
  const [showModal, setShowModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [summaryVisible, setsummaryVisible] = useState(false);
  const [deleteBox, setdeleteBox] = useState(false);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              {groupdata?.groupName}
            </Heading>
            <Text fontSize="xs" fontWeight="500" ml="-0.5" mt="-2">
              {groupdata?.date}
            </Text>
          </Stack>
        </Stack>
      ),
      headerRight: () => (
        // <Box h="80%" w="90%" alignItems="flex-start">
        <Menu
          w="190"
          placement="bottom right"
          shouldOverlapWithTrigger={false}
          trigger={(triggerProps) => {
            return (
              <Pressable
                style={{
                  padding: 10,
                  marginRight: 15,
                  borderRadius: 150,
                  backgroundColor: "#000",
                }}
                accessibilityLabel="More options menu"
                {...triggerProps}
              >
                <HamburgerIcon />
              </Pressable>
            );
          }}
        >
          <Menu.Item onPress={() => setShowModal(!showModal)}>
            Add a member
          </Menu.Item>
          <Menu.Item
            onPress={async () => {
              setdeleteBox(!deleteBox);
            }}
          >
            Delete group
          </Menu.Item>
        </Menu>
      ),
    });
  }, []);
  useEffect(() => {
    const getdata = async () => {
      setloading(true);
      const db = getDatabase();
      const starCountRef = ref(db, "groups/" + `${groupfirstdata.groupName}/`);
      onValue(starCountRef, async (snapshot) => {
        const data = await snapshot.val();
        setgroupdata(data);
        setloading(false);
      });
    };
    getdata();
    // console.log(groupdata);
  }, []);

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
  const GroupForm = () => {
    const [description, setdescription] = useState(null);
    const [amount, setamount] = useState(null);
    const [paidby, setpaidby] = useState(null);
    var splittingusers = groupdata?.members.map((user) => ({
      user,
      status: false,
    }));

    const addexpense = async () => {
      setloading(true);
      const tempid = shortid.generate();
      const db = getDatabase();
      const reference = ref(
        db,
        "groups/" + `${groupdata?.groupName}/` + "expenses/" + `${tempid}`
      );
      await set(reference, {
        id: tempid,
        description,
        amount,
        paidby,
        splittingusers,
        date: getdate(new Date()),
        time: gettime(new Date()),
      });
      setloading(false);
    };

    const SplitAmong = ({ mail }) => {
      const removeemail = (email) => {
        splittingusers = splittingusers.filter((e) => e.user != email);
      };
      const addemail = (email) => {
        splittingusers = [...splittingusers, { user: email, status: false }];
      };
      return (
        <Box
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
            {mail}
          </Text>
          <Checkbox
            onChange={(e) => {
              e ? addemail(mail) : removeemail(mail);
            }}
            value="test"
            size={"md"}
            colorScheme="black"
            background={"#000"}
            icon={<Icon as={<AntDesign name="check" />} />}
            accessibilityLabel="This is a dummy checkbox"
            defaultIsChecked
          />
        </Box>
      );
    };
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
            <Modal.Header>Add new expense</Modal.Header>
            <Modal.Body>
              <FormControl>
                <FormControl.Label>Description</FormControl.Label>
                <Input
                  onChangeText={setdescription}
                  value={description}
                  placeholder="Enter expense description"
                />
                <FormControl.Label>Amount</FormControl.Label>
                <Input
                  onChangeText={setamount}
                  value={amount}
                  placeholder="Enter amount"
                />
                <FormControl.Label>Paid By</FormControl.Label>

                <Select
                  selectedValue={paidby}
                  minWidth="200"
                  accessibilityLabel="Choose Service"
                  placeholder="Choose Service"
                  _selectedItem={{
                    bg: "#ADADAD",
                  }}
                  mt={1}
                  onValueChange={(itemValue) => setpaidby(itemValue)}
                >
                  {groupdata?.members.map((e, index) => (
                    <Select.Item key={index} label={e} value={e} />
                  ))}
                </Select>

                <FormControl.Label>
                  Split among(Tap to unselect)
                </FormControl.Label>
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
                {groupdata?.members.map((gmail, index) => (
                  <SplitAmong key={index} mail={gmail} />
                ))}
              </View>
            </Modal.Body>
            <Modal.Footer>
              <Button
                style={{
                  backgroundColor: "transparent",
                  marginHorizontal: 4,
                }}
                flex="1"
                onPress={() => {
                  setModalVisible(false);
                }}
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
                  addexpense();
                  setModalVisible(false);
                }}
              >
                Add
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </>
    );
  };
  const [summarydata, setsummarydata] = useState(null);
  const Expense = ({ data }) => {
    return (
      <Pressable
        onPress={async () => {
          setsummarydata(data);
          setsummaryVisible(!summaryVisible);
        }}
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
          position={"absolute"}
          paddingX={4}
          top={0}
          right={0}
          style={{
            width: 98,
            height: 20,
            backgroundColor: "#000",
            borderBottomLeftRadius: 20,
          }}
        >
          <Text color={"#fff"} fontWeight={"bold"} size={"sm"}>
            {data.date}
          </Text>
        </Box>
        <Box
          style={{
            width: 43,
            height: 43,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 150,
            backgroundColor: "#000",
          }}
        >
          <Icon color="#fff" as={AntDesign} name="book" size="lg" />
        </Box>
        <Stack paddingX={4} space={3}>
          <Stack space={2}>
            <Heading numberOfLines={1} size="sm">
              {data.description}
            </Heading>
            <Text fontSize="xs" fontWeight="500" mt="-2">
              {data.amount}
            </Text>
            <Text fontSize="xs" fontWeight="500" mt="-2">
              Paid by {data.paidby}
            </Text>
          </Stack>
        </Stack>
      </Pressable>
    );
  };
  const deletexpense = async () => {
    setsummaryVisible(false);
    setloading(true);
    const db = getDatabase();
    let llee = ref(
      db,
      "groups/" + `${groupdata.groupName}/` + "expenses/" + `${summarydata.id}`
    );
    await remove(llee);
    setloading(false);
  };
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
            <Modal.Header>Overall Summary</Modal.Header>
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
                  {summarydata?.description}
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
                  {summarydata?.amount}₹
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
                  {summarydata?.date} {summarydata?.time}
                </Text>
              </Box>
              <FormControl>
                <FormControl.Label>Paid By</FormControl.Label>
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
                  <Box
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
                      {summarydata?.paidby}
                    </Text>
                  </Box>
                </View>

                <FormControl.Label>Split Among</FormControl.Label>
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
                  {summarydata?.splittingusers.map((suser, index) => (
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
                        {suser.user}
                      </Text>
                    </Box>
                  ))}
                </View>
              </FormControl>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onPress={async () => {
                  await deletexpense();
                  setModalVisible(false);
                }}
                style={{
                  backgroundColor: "#000",
                  borderRadius: 20,
                  marginHorizontal: 4,
                }}
                flex="1"
              >
                <Text color={"#fff"} fontWeight={"bold"}>
                  Delete
                </Text>
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </>
    );
  };
  const deletegroup = async () => {
    setdeleteBox(false);
    setloading(true);
    const db = getDatabase();
    let gref = ref(db, "groups/" + `${groupdata.groupName}/`);
    await remove(gref);
    setloading(false);
    navigation.goBack();
  };
  const GroupPeople = () => {
    const [adduseremail, setadduseremail] = useState(null);
    const adduser = async () => {
      const db = getDatabase();
      const reference = ref(db, "groups/" + `${groupdata.groupName}`);
      await update(reference, {
        members: [...groupdata.members, adduseremail],
      });
    };
    const deleteuser = async (val) => {
      const db = getDatabase();
      const reference = ref(db, "groups/" + `${groupdata.groupName}`);
      await update(reference, {
        members: groupdata.members.filter((t) => t !== val),
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
              {groupdata?.members?.map((val, index) => (
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
                        height: val.user === groupdata?.admin ? 30 : 25,
                        width: val.user === groupdata?.admin ? 30 : 25,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 20,
                        backgroundColor: "#000",
                        marginRight: 8,
                        borderWidth: val.user === groupdata?.admin ? 4 : 0,
                        borderColor:
                          val.user === groupdata?.admin ? "#900" : "#000",
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
                    {val !== groupdata?.admin ? (
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
                          w="32"
                        >
                          <Popover.Arrow />
                          <Popover.CloseButton />
                          <Popover.Header>Sure?</Popover.Header>
                          <Popover.Footer justifyContent="center">
                            <Button.Group>
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
  const DeleteConfirmation = () => {
    return (
      <Center>
        <Modal
          isOpen={deleteBox}
          onClose={() => setdeleteBox(false)}
          _backdrop={{
            bg: "rgba(0,0,0,1)",
          }}
        >
          <Modal.Content maxWidth="350" maxH="212">
            <Modal.CloseButton />
            <Modal.Header>Confirm?</Modal.Header>
            <Modal.Body>
              <View
                style={{
                  flex: 1,
                  paddingVertical: 4,
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <Text fontWeight={"bold"}>
                  Once you remove this group you can not get it back.
                </Text>
              </View>
            </Modal.Body>
            <Modal.Footer>
              <Button
                style={{
                  backgroundColor: "#000",
                  borderRadius: 20,
                  marginHorizontal: 4,
                }}
                flex="1"
                onPress={() => {
                  deletegroup();
                }}
              >
                <Text color={"#fff"} fontWeight={"bold"}>
                  Delete
                </Text>
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>
    );
  };
  const LoadingModal = () => {
    return (
      <Center>
        <Modal
          isOpen={loading}
          onClose={() => {}}
          _backdrop={{
            bg: "rgba(0,0,0,1)",
          }}
        >
          <Modal.Content shadow={"none"} background={"transparent"}>
            <Modal.Body>
              <Spinner size={"lg"} color={"#fff"} />
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </Center>
    );
  };
  return (
    <>
      <ExpenseStatus statusdata={groupdata} />
      <GroupForm />
      <Summary />
      <GroupPeople />
      <DeleteConfirmation />
      <LoadingModal />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 10,
        }}
      >
        <Box
          paddingX={5}
          paddingTop={5}
          width={"95%"}
          marginTop={0}
          alignSelf={"center"}
          alignItems={"center"}
          rounded="sm"
          bg="#bdbdbd"
        >
          {groupdata?.expenses ? (
            <>
              {Object.values(groupdata?.expenses).map((exp, index) => (
                <Expense key={index} data={exp} />
              ))}
            </>
          ) : (
            <Center w="100%" zIndex={3} h={150} marginBottom={5}>
              <Icon color="#fff" as={AntDesign} name="dropbox" size="lg" />
            </Center>
          )}
        </Box>
      </ScrollView>
      <View width={"100%"} flex={1} alignSelf={"center"}>
        <Fab
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
          renderInPortal={false}
          background={"#000"}
          borderWidth={themeReducer.theme ? 1 : 0}
          borderColor={"#fff"}
          shadow={2}
          placement="bottom-right"
          size="sm"
          icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />}
          label="Add new expense"
        />
      </View>
    </>
  );
};

export default ExpenseScreen;
