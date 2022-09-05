import React from "react";
import {
  useDisclose,
  Icon,
  Pressable,
  Switch,
  Actionsheet,
  Box,
  View,
  Text,
} from "native-base";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { auth } from "../config";
import * as themeActions from "../redux/action/theme.action";
import { useDispatch, useSelector } from "react-redux";
import { LogBox } from "react-native";
LogBox.ignoreLogs([
  "We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320",
]);
const Settings = () => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const handleLogout = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };
  const dispatch = useDispatch();
  const themeReducer = useSelector(({ themeReducer }) => themeReducer);
  return (
    <>
      <Pressable
        style={{
          padding: 8,
          marginRight: 15,
          borderRadius: 150,
          backgroundColor: "#000",
        }}
        onPress={onOpen}
        shadow={2}
      >
        <Icon color="white" as={AntDesign} name="setting" size="sm" />
      </Pressable>
      <Actionsheet isOpen={isOpen} onClose={onClose} background={"transparent"}>
        <Actionsheet.Content background={themeReducer.theme ? "#000" : "#fff"}>
          <Box w="100%" h={60} px={4} justifyContent="center">
            <Text
              fontSize="16"
              fontWeight={"bold"}
              color={themeReducer.theme ? "gray.500" : "gray.500"}
            >
              {auth.currentUser.email}
            </Text>
          </Box>
          <Actionsheet.Item
            background={themeReducer.theme ? "#000" : "#fff"}
            onPress={() => {}}
            _pressed={{
              background: themeReducer.theme ? "#000" : "#fff",
            }}
            startIcon={
              <Icon
                as={MaterialCommunityIcons}
                color={themeReducer.theme ? "#fff" : "#000"}
                mr="1"
                size="6"
                name="theme-light-dark"
              />
            }
            _text={{
              fontWeight: "bold",
              color: themeReducer.theme ? "#fff" : "#000",
            }}
          >
            <Switch
              value={themeReducer.theme}
              onValueChange={(val) => dispatch(themeActions.ToggleTheme(val))}
              height={6}
            />
          </Actionsheet.Item>
          <Actionsheet.Item
            background={themeReducer.theme ? "#000" : "#fff"}
            onPress={handleLogout}
            startIcon={
              <Icon
                as={AntDesign}
                color={themeReducer.theme ? "#fff" : "#000"}
                mr="1"
                size="6"
                name="logout"
              />
            }
            _text={{
              fontWeight: "bold",
              color: themeReducer.theme ? "#fff" : "#000",
            }}
          >
            Sign Out
          </Actionsheet.Item>
          <Actionsheet.Item
            background={themeReducer.theme ? "#000" : "#fff"}
            startIcon={
              <Icon
                as={AntDesign}
                color={themeReducer.theme ? "#fff" : "#000"}
                mr="1"
                size="6"
                name="close"
              />
            }
            _text={{
              fontWeight: "bold",
              color: themeReducer.theme ? "#fff" : "#000",
            }}
            onPress={() => onClose()}
          >
            Cancel
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
};

export default Settings;
