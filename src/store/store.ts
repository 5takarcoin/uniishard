import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/myApi";
import auth from "./userSlice";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth,
  },
  middleware: (getDef) => getDef().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
