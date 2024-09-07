import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message } from "../types/userDataTypes";

interface TalkHistoryDataState {
  value: { [key: string]: Message[] | null };
}

const initialState: TalkHistoryDataState = {
  value: {},
};

const talkHistoryDataSlice = createSlice({
  name: "talkHistoryData",
  initialState,
  reducers: {
    // 特定のキーだけを更新するリデューサー
    updateKey: (
      state,
      action: PayloadAction<{ key: string; data: Message[] | null }>,
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

export const { updateKey, deleteKey } = talkHistoryDataSlice.actions;
export default talkHistoryDataSlice.reducer;
