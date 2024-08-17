// 
// userData
// 自分のuserData
// 

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../types/userDataTypes";

interface UserState {
  value: UserData | null;
}

const initialState: UserState = {
  value: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<UserData>) => {
      state.value = action.payload;
    },
  },
});

export const { set } = userSlice.actions;
export default userSlice.reducer;
