import React, { useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";
import { ScrollView, useToast } from "native-base";
import GroupBox from "../components/GroupBox";
import Status from "../components/Status";
import Settings from "../components/Settings";
import NetToast from "../components/NetToast";
export const HomeScreen = ({ navigation }) => {
  const toast = useToast();
  useEffect(() => {
    navigation.setOptions({
      title: "Bill Splitter",
      headerRight: () => <Settings />,
    });
  }, []);
  useEffect(() => {
    NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        toast.show({
          render: () => <NetToast />,
          duration: null,
        });
      } else {
        toast.closeAll();
      }
    });
  }, [NetInfo]);
  return (
    <>
      <Status />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 10,
        }}
      >
        <GroupBox />
      </ScrollView>
    </>
  );
};
