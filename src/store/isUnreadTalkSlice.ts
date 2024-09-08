//
// isUnreadTalk
// 未読トークかあるかどうか
// (バッジを表示する)
//

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const isUnreadTalkSlice = createSlice({
  name: "isUnreadTalk",
  initialState: {
    value: false, // 初期値は未読トークなし
  },
  reducers: {
    set: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { set } = isUnreadTalkSlice.actions;
export default isUnreadTalkSlice.reducer;
