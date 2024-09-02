//
// location
// 自分の位置情報
//

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as Location from "expo-location";

interface LocationState {
  value: Location.LocationObject | null;
}

const initialState: LocationState = {
  value: null,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Location.LocationObject>) => {
      state.value = action.payload;
    },
  },
});

export const { set } = locationSlice.actions;
export default locationSlice.reducer;
