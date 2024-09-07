//
// TalkLastSeenData (辞書)
// key: uid
// value: そのユーザー(uid)との会話を自分が最後に閲覧した時間
//
// ※ キーとなるuidは自分とトーク関係にあるユーザー
//

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TalkLastSeenDataState {
  value: { [key: string]: number };
}

const initialState: TalkLastSeenDataState = {
  value: {},
};

const talkLastSeenDataSlice = createSlice({
  name: "talkLastSeenData",
  initialState,
  reducers: {
    // 特定のキーだけを更新するリデューサー
    updateKey: (
      state,
      action: PayloadAction<{ key: string; data: number }>,
    ) => {
      const { key, data } = action.payload;
      state.value[key] = data;
    },
    // 特定のキーを削除するリデューサー
    deleteKey: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      delete state.value[key];
    },
  },
});

export const { updateKey, deleteKey } = talkLastSeenDataSlice.actions;
export default talkLastSeenDataSlice.reducer;
