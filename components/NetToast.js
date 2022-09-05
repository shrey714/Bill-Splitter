import React from "react";
import { Box, Text, Icon } from "native-base";
import { AntDesign } from "@expo/vector-icons";

const NetToast = () => {
  return (
    <Box
      flexDirection={"row"}
      alignItems={"center"}
      bg="rgba(255,255,255,0.9)"
      px="5"
      py="3"
      rounded="sm"
      mb={5}
    >
      <Icon as={AntDesign} color="#000" mr="2" size="5" name="infocirlceo" />
      <Text fontSize={"sm"} fontWeight={"bold"}>
        You are not connected to internet!
      </Text>
    </Box>
  );
};

export default NetToast;
