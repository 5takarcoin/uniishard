import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    setCreds: (state, action) => {
      console.log(state);
      state = { ...action.payload };
    },
    logout: (state) => {
      console.log(state);
      state = {};
    },
  },
});

export default userSlice.reducer;
export const { setCreds, logout } = userSlice.actions;
