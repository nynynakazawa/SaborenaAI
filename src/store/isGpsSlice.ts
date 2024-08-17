// 
// isGps
// 自分の位置情報公開設定
// 

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const isGpsSlice = createSlice({
  name: "isGps",
  initialState: {
    value: false,
  },
  reducers: {
    set: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { set } = isGpsSlice.actions;
export default isGpsSlice.reducer;
