import React, { useState, useContext, useEffect } from 'react';
import { NavigationContainer,DarkTheme, DefaultTheme } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { useSelector } from "react-redux";
import { AuthStack } from './AuthStack';
import { AppStack } from './AppStack';
import { AuthenticatedUserContext } from '../providers';
import { LoadingIndicator } from '../components';
import { auth } from '../config';

export const RootNavigator = () => {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);
  const themeReducer = useSelector(({ themeReducer }) => themeReducer);
  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuthStateChanged = onAuthStateChanged(
      auth,
      authenticatedUser => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setIsLoading(false);
      }
    );

    // unsubscribe auth listener on unmount
    return unsubscribeAuthStateChanged;
  }, [user]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <NavigationContainer theme={themeReducer.theme ? DarkTheme : DefaultTheme} >
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
