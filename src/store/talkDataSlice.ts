//
// talkData
// 自分のtalkData
// ※ talkData
// key: uid
// value: そのユーザー(uid)とのトークルームのid
//

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TalkData } from "../types/userDataTypes";

interface TalkDataState {
  value: TalkData | null;
}

const initialState: TalkDataState = {
  value: null,
};

const talkDataSlice = createSlice({
  name: "talkData",
  initialState,
  reducers: {
    // 全体を設定するリデューサー
    set: (state, action: PayloadAction<TalkData>) => {
      state.value = action.payload;
    },
  },
});

export const { set } = talkDataSlice.actions;
export default talkDataSlice.reducer;
