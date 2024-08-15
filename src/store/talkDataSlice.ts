import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TalkData } from "../types/userDataTypes";

interface TalkDataState {
  value: TalkData | null;
}

const initialState: TalkDataState = {
  value: {},
};

const allCurrentDataSlice = createSlice({
  name: "allCurrentData",
  initialState,
  reducers: {
    // 全体を設定するリデューサー
    set: (state, action: PayloadAction<TalkData>) => {
      state.value = action.payload;
    },
    // 特定のキーだけを更新するリデューサー
    updateKey: (
      state,
      action: PayloadAction<{ key: string; data: any }>,
    ) => {
      const { key, data } = action.payload;
      if (state.value) {
        state.value[key] = data;
      }
    },
  },
});

export const { set, updateKey } = allCurrentDataSlice.actions;
export default allCurrentDataSlice.reducer;
