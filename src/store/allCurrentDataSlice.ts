// 
// allCurrentData (辞書)
// key: uid 
// value: そのユーザー(uid)のcurrentData
// 

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CurrentData } from "../types/userDataTypes";

interface CurrentDataState {
  value: { [key: string]: CurrentData | null };
}

const initialState: CurrentDataState = {
  value: {},
};

const allCurrentDataSlice = createSlice({
  name: "allCurrentData",
  initialState,
  reducers: {
    // 全体を設定するリデューサー
    set: (
      state,
      action: PayloadAction<{ [key: string]: CurrentData | null }>,
    ) => {
      state.value = action.payload;
    },
    // 特定のキーだけを更新するリデューサー
    updateKey: (
      state,
      action: PayloadAction<{ key: string; data: CurrentData | null }>,
    ) => {
      const { key, data } = action.payload;
      state.value[key] = data;
    },
  },
});

export const { set, updateKey } = allCurrentDataSlice.actions;
export default allCurrentDataSlice.reducer;
