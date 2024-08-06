import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CurrentData } from "../types/userDataTypes";

interface CurrentDataState {
  value: CurrentData | null;
}

const initialState: CurrentDataState = {
  value: null,
};

const currentDataSlice = createSlice({
  name: "currentData",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<CurrentData>) => {
      state.value = action.payload;
    },
  },
});

export const { set } = currentDataSlice.actions;
export default currentDataSlice.reducer;
