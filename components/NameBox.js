import {
  View,
  VStack,
  Center,
  Box,
  Divider,
  Input,
  Text,
  Button,
  Spinner,
} from "native-base";
import React, { useState } from "react";
import { getDatabase, ref, set } from "firebase/database";
import { auth } from "../config";

const NameBox = () => {
  const [loading, setloading] = useState(false);
  const [nameVal, setnameVal] = useState(null);
  const setname = async () => {
    if (nameVal) {
      setloading(true);
      const db = getDatabase();
      const reference = ref(db, "users/" + `${auth.currentUser.uid}`);
      await set(reference, {
        email: auth.currentUser.email,
        name: nameVal,
      });
      setloading(false);
    } else {
    //   console.log("not valid");
    }
  };
  return (
    <View
      width={"100%"}
      zIndex={1}
      height={"100%"}
      position={"absolute"}
      flex={1}
      alignItems={"center"}
      justifyContent={"center"}
      background={"rgba(0,0,0,0.6)"}
    >
      <Box
        width={"80%"}
        height={200}
        background={"#fff"}
        borderRadius={5}
        overflow={"hidden"}
      >
        {loading ? (
          <Center
            w="100%"
            zIndex={3}
            h={"100%"}
            position={"absolute"}
            background={"rgba(0,0,0,0.7)"}
          >
            <Spinner size="lg" />
          </Center>
        ) : (
          <></>
        )}
        <VStack space={0} flex={1} alignItems="center">
          <Box padding={3} w="100%" bg="#ADADAD">
            <Text fontSize={"md"} fontWeight={"bold"}>
              What would you like us to call you?
            </Text>
          </Box>
          <Divider bg={"#000"} />
          <Box
            w="100%"
            alignItems={"center"}
            justifyContent={"center"}
            flex={1}
          >
            <Input
              isRequired={true}
              mx="3"
              value={nameVal}
              onChangeText={setnameVal}
              borderColor={"#000"}
              placeholder="Enter your name"
              w="80%"
              maxWidth="300px"
            />
          </Box>
          <Divider bg={"#000"} />
          <Box w="100%" padding={3}>
            <Button
              onPress={setname}
              width={"50%"}
              alignSelf={"center"}
              bg={"#000"}
              borderRadius={20}
            >
              <Text color={"#fff"} fontSize={"md"} fontWeight={"bold"}>
                Done
              </Text>
            </Button>
          </Box>
        </VStack>
      </Box>
    </View>
  );
};

export default NameBox;
