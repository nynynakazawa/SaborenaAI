// 
// allUserData (辞書)
// key: uid 
// value: そのユーザー(uid)のuserData
// 

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../types/userDataTypes";

interface UserDataState {
  value: { [key: string]: UserData | null };
}

const initialState: UserDataState = {
  value: {},
};

const allUserDataSlice = createSlice({
  name: "allUserData",
  initialState,
  reducers: {
    // 全体を設定するリデューサー
    set: (state, action: PayloadAction<{ [key: string]: UserData | null }>) => {
      state.value = action.payload;
    },
    // 特定のキーだけを更新するリデューサー
    updateKey: (
      state,
      action: PayloadAction<{ key: string; data: UserData | null }>,
    ) => {
      const { key, data } = action.payload;
      state.value[key] = data;
    },
  },
});

export const { set, updateKey } = allUserDataSlice.actions;
export default allUserDataSlice.reducer;
