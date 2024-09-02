//
// myUid
// 自分のuid
//

import { createSlice } from "@reduxjs/toolkit";

const myUidSlice = createSlice({
  name: "myUid",
  initialState: {
    value: null,
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { set } = myUidSlice.actions;
export default myUidSlice.reducer;
