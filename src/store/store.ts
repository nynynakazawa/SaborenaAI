import { configureStore } from '@reduxjs/toolkit';
import userDataReducer from './userDataSlice';
import privateDataReducer from './privateDataSlice';
import appDataReducer from './appDataSlice';
import currentDataReducer from './currentDataSlice';
import locationReducer from './locationSlice';
import myUidReducer from './myUidSlice';

const store = configureStore({
  reducer: {
    userData: userDataReducer,
    privateData: privateDataReducer,
    appData: appDataReducer,
    currentData: currentDataReducer,
    location: locationReducer,
    myUid: myUidReducer,
  },
});

export default store;
