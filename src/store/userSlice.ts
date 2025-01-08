import { userType } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {} as userType,
  reducers: {
    setCreds: (state, action) => {
      console.log("____");
      console.log(state);
      console.log("____");
      return action.payload;
    },
    logout: (state) => {
      console.log("____");
      console.log(state);
      console.log("____");
      return {} as userType;
    },
  },
});

export default userSlice.reducer;
export const { setCreds, logout } = userSlice.actions;
