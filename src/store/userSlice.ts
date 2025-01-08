import { userType } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {} as userType,
  reducers: {
    setCreds: (_, action) => {
      return action.payload;
    },
    logout: () => {
      return {} as userType;
    },
  },
});

export default userSlice.reducer;
export const { setCreds, logout } = userSlice.actions;
