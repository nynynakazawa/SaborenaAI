//
// myExpoPushToken
// 自分のExpoPushToken
//

import { createSlice } from "@reduxjs/toolkit";

const myExpoPushTokenSlice = createSlice({
  name: "myExpoPushToken",
  initialState: {
    value: null,
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { set } = myExpoPushTokenSlice.actions;
export default myExpoPushTokenSlice.reducer;
