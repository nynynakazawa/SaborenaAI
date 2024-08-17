// 
// talkPartnerData (辞書)
// key: uid 
// value: そのユーザー(uid)のuserData
// 
// ※ キーとなるuidは自分とトーク関係にあるユーザー
// 

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../types/userDataTypes";

interface TalkDataState {
  value: { [key: string]: UserData | null };
}

const initialState: TalkDataState = {
  value: {},
};

const talkPartnerSlice = createSlice({
  name: "talkPartnerData",
  initialState,
  reducers: {
    // 全体を設定するリデューサー
    set: (state, action: PayloadAction<{ [key: string]: UserData | null }>) => {
      state.value = action.payload;
    },
  },
});

export const { set } = talkPartnerSlice.actions;
export default talkPartnerSlice.reducer;
