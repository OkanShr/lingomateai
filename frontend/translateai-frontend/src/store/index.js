import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import auth from "./authentication";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import translation from "../api/translationApi";
import phi from "../api/askAbout";

const persistConfig = {
  key: "root",
  storage,
};
const reducer = combineReducers({
  auth,
  translation,
  phi,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
const persistor = persistStore(store);

export { store, persistor };
