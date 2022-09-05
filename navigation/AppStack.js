import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ExpenseScreen from "../screens/ExpenseScreen";
import { HomeScreen } from "../screens";
import NameBox from "../components/NameBox";
import { getDatabase, ref, onValue } from "firebase/database";
import { auth } from "../config";
import TXN from "../screens/ExpenseScreens/TXN";
import Payment from "../screens/ExpenseScreens/Payment";
import HomeExpense from "../screens/ExpenseScreens/HomeExpense";
const Stack = createStackNavigator();

export const AppStack = () => {
  const [nameVisible, setnameVisible] = useState(false);
  useEffect(() => {
    const db = getDatabase();
    const reference = ref(db, "users/" + `${auth.currentUser.uid}`);
    onValue(reference, (snapshot) => {
      if (snapshot.exists()) {
        setnameVisible(false);
      } else {
        setnameVisible(true);
      }
    });
  }, []);

  return (
    <>
      {nameVisible ? <NameBox /> : <></>}
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{
            headerStyle: {
              backgroundColor: "#ADADAD",
              elevation: 0,
              shadowOpacity: 0,
            },
          }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="ExpenseScreen"
          options={{
            headerStyle: {
              backgroundColor: "#ADADAD",
              elevation: 0,
              shadowOpacity: 0,
            },
          }}
          component={ExpenseScreen}
        />
        <Stack.Screen
          name="TXN"
          options={{
            headerStyle: {
              backgroundColor: "#ADADAD",
              elevation: 0,
              shadowOpacity: 0,
            },
          }}
          component={TXN}
        />
        <Stack.Screen
          name="Payment"
          options={{
            headerStyle: {
              backgroundColor: "#ADADAD",
              elevation: 0,
              shadowOpacity: 0,
            },
          }}
          component={Payment}
        />
        <Stack.Screen
          name="HomeExpense"
          options={{
            headerStyle: {
              backgroundColor: "#ADADAD",
              elevation: 0,
              shadowOpacity: 0,
            },
          }}
          component={HomeExpense}
        />
      </Stack.Navigator>
    </>
  );
};
