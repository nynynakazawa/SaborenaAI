import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from "./userDataSlice";
import privateDataReducer from "./privateDataSlice";
import appDataReducer from "./appDataSlice";
import currentDataReducer from "./currentDataSlice";
import locationReducer from "./locationSlice";
import myUidReducer from "./myUidSlice";
import isGpsReducer from "./isGpsSlice";
import peopleCountReducer from "./peopleCountSlice";
import allCurrentDataReducer from "./allCurrentDataSlice";
import allUserDataReducer from "./allUserDataSlice";

const store = configureStore({
  reducer: {
    userData: userDataReducer,
    privateData: privateDataReducer,
    appData: appDataReducer,
    currentData: currentDataReducer,
    location: locationReducer,
    myUid: myUidReducer,
    isGps: isGpsReducer,
    peopleCount: peopleCountReducer,
    allCurrentData: allCurrentDataReducer,
    allUserData: allUserDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
