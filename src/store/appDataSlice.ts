import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppData } from "../types/userDataTypes";

interface AppDataState {
  value: AppData | null;
}

const initialState: AppDataState = {
  value: null,
};

const appDataSlice = createSlice({
  name: "appData",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<AppData>) => {
      state.value = action.payload;
    },
  },
});

export const { set } = appDataSlice.actions;
export default appDataSlice.reducer;
