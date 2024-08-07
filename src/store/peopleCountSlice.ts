import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const peopleCountSlice = createSlice({
  name: "peopleCount",
  initialState: {
    value: "1人",
  },
  reducers: {
    set: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { set } = peopleCountSlice.actions;
export default peopleCountSlice.reducer;
