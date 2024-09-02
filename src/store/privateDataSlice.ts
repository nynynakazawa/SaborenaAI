//
// privateData
// 自分のprivateData
//

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PrivateData } from "../types/userDataTypes";

interface PrivateState {
  value: PrivateData | null;
}

const initialState: PrivateState = {
  value: null,
};

const privateSlice = createSlice({
  name: "private",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<PrivateData>) => {
      state.value = action.payload;
    },
  },
});

export const { set } = privateSlice.actions;
export default privateSlice.reducer;
