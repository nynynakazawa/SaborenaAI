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
  },
});

export const { updateKey } = talkHistoryDataSlice.actions;
export default talkHistoryDataSlice.reducer;
