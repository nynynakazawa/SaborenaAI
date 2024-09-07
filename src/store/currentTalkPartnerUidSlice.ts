//
// currentTalkPartnerUid
// 現在トーク中の相手のuid
// 現在トーク中の相手からのメッセージからのプッシュ通知を受け取らないようにする
// 

import { createSlice } from "@reduxjs/toolkit";

const currentTalkPartnerUidSlice = createSlice({
  name: "currentTalkPartnerUid",
  initialState: {
    value: null,
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { set } = currentTalkPartnerUidSlice.actions;
export default currentTalkPartnerUidSlice.reducer;
