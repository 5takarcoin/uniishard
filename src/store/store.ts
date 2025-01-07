import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/myApi";
import auth from "./userSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth,
  },
  middleware: (getDef) => getDef().concat(authApi.middleware),
});
