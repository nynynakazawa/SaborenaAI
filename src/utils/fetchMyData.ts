import { doc, onSnapshot } from "firebase/firestore";
import { Dispatch } from "redux";
import { db } from "../firebase";
import { set as setUserData } from "../store/userDataSlice";
import { set as setPrivateData } from "../store/privateDataSlice";
import { set as setCurrentData } from "../store/currentDataSlice";
import { set as setTalkData } from "../store/currentDataSlice";
import * as Location from "expo-location";
import { set as setLocation } from "../store/locationSlice";

// location取得
export const fetchLocation = async (dispatch: Dispatch) => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    console.log("❌permission to access location was denied");
    return;
  }

  let location = await Location.getCurrentPositionAsync({});
  dispatch(setLocation(location));
};

// userData取得
export const fetchUserData = (uid: string, dispatch: Dispatch) => {
  const userRef = doc(db, "user", uid);
  return onSnapshot(userRef, (doc) => {
    if (doc.exists()) {
      console.log("🔵fetched user data");
      dispatch(setUserData(doc.data()));
    } else {
      console.log("❌no such user data!");
    }
  });
};

// privateData取得
export const fetchPrivateData = (uid: string, dispatch: Dispatch) => {
  const privateRef = doc(db, "private", uid);
  return onSnapshot(privateRef, (doc) => {
    if (doc.exists()) {
      console.log("🟡fetched private data");
      dispatch(setPrivateData(doc.data()));
    } else {
      console.log("❌no such private data!");
    }
  });
};

// talkData取得
export const fetchAppData = (uid: string, dispatch: Dispatch) => {
  const appRef = doc(db, "talk", uid);
  return onSnapshot(appRef, (doc) => {
    if (doc.exists()) {
      console.log("🟢fetched app data");
      dispatch(setTalkData(doc.data()));
    } else {
      console.log("❌no such app data!");
    }
  });
};

// currentData取得
export const fetchCurrentData = (uid: string, dispatch: Dispatch) => {
  const currentRef = doc(db, "current", uid);
  return onSnapshot(currentRef, (doc) => {
    if (doc.exists()) {
      console.log("🟣fetched current data");
      dispatch(setCurrentData(doc.data()));
    } else {
      console.log("❌no such current data!");
    }
  });
};
