import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/authApi";
import auth from "./userSlice";
import { dataApi } from "./services/dataApi";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [dataApi.reducerPath]: dataApi.reducer,
    auth,
  },
  middleware: (getDef) =>
    getDef().concat(authApi.middleware).concat(dataApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
