import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from "./userDataSlice";
import privateDataReducer from "./privateDataSlice";
import currentDataReducer from "./currentDataSlice";
import talkDataReducer from "./talkDataSlice";
import talkPartnerDataReducer from "./talkPartnerDataSlice";
import talkHistoryDataReducer from "./talkHistoryDataSlice";
import talkLastSeenReducer from "./talkLastSeenSlice";
import locationReducer from "./locationSlice";
import myUidReducer from "./myUidSlice";
import isUnreadTalkReducer from "./isUnreadTalkSlice";
import currentTalkPartnerUidReducer from "./currentTalkPartnerUidSlice";
import myExpoPushTokenReducer from "./myExpoPushTokenSlice";
import isGpsReducer from "./isGpsSlice";
import peopleCountReducer from "./peopleCountSlice";
import allCurrentDataReducer from "./allCurrentDataSlice";
import allUserDataReducer from "./allUserDataSlice";
import noticesReducer from "./noticesSlice";

const store = configureStore({
  reducer: {
    userData: userDataReducer,
    privateData: privateDataReducer,
    currentData: currentDataReducer,
    talkData: talkDataReducer,
    talkPartnerData: talkPartnerDataReducer,
    talkHistoryData: talkHistoryDataReducer,
    talkLastSeen: talkLastSeenReducer,
    location: locationReducer,
    myUid: myUidReducer,
    myExpoPushToken: myExpoPushTokenReducer,
    currentTalkPartnerUid: currentTalkPartnerUidReducer,
    isGps: isGpsReducer,
    isUnreadTalk: isUnreadTalkReducer,
    peopleCount: peopleCountReducer,
    allCurrentData: allCurrentDataReducer,
    allUserData: allUserDataReducer,
    notices: noticesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
