import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const myUidSlice = createSlice({
  name: "myUid",
  initialState : {
    value : "",
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { set } = myUidSlice.actions;
export default myUidSlice.reducer;
