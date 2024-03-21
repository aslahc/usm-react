import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  data: [],
};

const usersDataSlice = createSlice({
  name: "userdata",
  initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
});
export const { setData } = usersDataSlice.actions;

export default usersDataSlice.reducer;
