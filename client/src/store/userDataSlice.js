import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  userLoggedIn: false,
};

const userDataSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.data = action.payload;
      console.log("this is state", state.data);
    },
    userLoggedIn(state, action) {
      state.userLoggedIn = action.payload;
    },
  },
});

export const { setUser, userLoggedIn } = userDataSlice.actions;
export default userDataSlice.reducer;
