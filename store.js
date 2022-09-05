import { createStore, applyMiddleware } from "redux";
import reducers from "./redux/reducer/index.reducer";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import AsyncStorage from "@react-native-async-storage/async-storage";
const middleware = [thunk];
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
};
const initialState = {};
import { composeWithDevTools } from "redux-devtools-extension";
const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
export const persistor = persistStore(store);
