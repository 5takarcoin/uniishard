import { userType } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {} as userType,
  reducers: {
    setCreds: (_, action) => {
      return action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setCreds } = userSlice.actions;
