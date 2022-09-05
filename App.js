import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeBaseProvider } from "native-base";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { SSRProvider } from "@react-aria/ssr";
import { RootNavigator } from "./navigation/RootNavigator";
import { AuthenticatedUserProvider } from "./providers";
import store, { persistor } from "./store";
import { LoadingIndicator } from "./components";
const App = () => {
  return (
    <SSRProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthenticatedUserProvider>
            <SafeAreaProvider>
              <NativeBaseProvider>
                <RootNavigator />
              </NativeBaseProvider>
            </SafeAreaProvider>
          </AuthenticatedUserProvider>
        </PersistGate>
      </Provider>
    </SSRProvider>
  );
};

export default App;
