// 
// notices
// 通知を保存する
// 

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NoticeData } from "../types/otherDataTypes";

interface NoticeState {
  value: { [key: string]: NoticeData | null };
}

const initialState: NoticeState = {
  value: {},
};

const noticesSlice = createSlice({
  name: "notices",
  initialState,
  reducers: {
    // 全体を設定するリデューサー
    set: (state, action: PayloadAction<{ [key: string]: NoticeData | null }>) => {
      state.value = action.payload;
    },
    // 特定のキーだけを更新するリデューサー
    updateKey: (
      state,
      action: PayloadAction<{ key: string; data: NoticeData | null }>
    ) => {
      const { key, data } = action.payload;
      state.value[key] = data;
    },
  },
});

export const { set, updateKey } = noticesSlice.actions;
export default noticesSlice.reducer;
