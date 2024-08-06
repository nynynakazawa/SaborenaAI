import React, { useEffect, useState } from "react";
import { Platform, Text, View } from "react-native";
import { styled } from "nativewind";
import BottomNavigation from "../../components/main/navigation/bottomNavigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../../firebase";
import { User } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { AppData, CurrentData, PrivateData, UserData } from "../../types/userDataTypes";
import MapScreen from "../../components/main/map/mapScreen";
import LikeFromScreen from "../../components/main/likeFrom/likeFromScreen";
import TalkListScreen from "../../components/main/talkList/talkListScreen";
import MySettingScreen from "../../components/main/mySetting/mySettingScreen";
import * as Location from "expo-location";
import { set as setUserData } from "../../store/userDataSlice";
import { set as setPrivateData } from "../../store/privateDataSlice";
import { set as setAppData } from "../../store/appDataSlice";
import { set as setCurrentData } from "../../store/currentDataSlice";
import { set as setLocation } from "../../store/locationSlice";
import { set as setMyUid } from "../../store/myUidSlice";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

const StyledView = styled(View);
const StyledText = styled(Text);

const MainPage = () => {
  const Container = Platform.OS === "android" ? SafeAreaView : View;

  const fetchUserData = (uid: string, dispatch: Dispatch) => {
    const userRef = doc(db, "user", uid);

    dispatch(setMyUid(uid));
    return onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        dispatch(setUserData(doc.data()));
      } else {
        console.log("No such user data!");
      }
    });
  };

  const fetchPrivateData = (uid: string, dispatch: Dispatch) => {
    const privateRef = doc(db, "private", uid);
    return onSnapshot(privateRef, (doc) => {
      if (doc.exists()) {
        dispatch(setPrivateData(doc.data()));
      } else {
        console.log("No such private data!");
      }
    });
  };

  const fetchAppData = (uid: string, dispatch: Dispatch) => {
    const appRef = doc(db, "app", uid);
    return onSnapshot(appRef, (doc) => {
      if (doc.exists()) {
        dispatch(setAppData(doc.data()));
      } else {
        console.log("No such app data!");
      }
    });
  };

  const fetchCurrentData = (uid: string, dispatch: Dispatch) => {
    const currentRef = doc(db, "current", uid);
    return onSnapshot(currentRef, (doc) => {
      if (doc.exists()) {
        dispatch(setCurrentData(doc.data()));
      } else {
        console.log("No such current data!");
      }
    });
  };

  const fetchMyUser = async (dispatch: Dispatch) => {
    const user = auth.currentUser;
    if (user) {
      const unsubscribes = [
        fetchUserData(user.uid, dispatch),
        fetchPrivateData(user.uid, dispatch),
        fetchAppData(user.uid, dispatch),
        fetchCurrentData(user.uid, dispatch),
      ];
      return () => unsubscribes.forEach(unsub => unsub());
    }
  };

  const fetchLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    dispatch(setLocation(location));
  };

  useEffect(() => {
    fetchMyUser(dispatch);
    fetchLocation();
  }, []);

  const [screen, setScreen] = useState<string>("mapScreen");

  const dispatch = useDispatch();
  const myUserData: UserData = useSelector((state: any) => state.userData.value);
  const myAppData: AppData = useSelector((state: any) => state.appData.value);
  const myCurrentData: CurrentData = useSelector((state: any) => state.currentData.value);
  const myPrivateData: PrivateData = useSelector((state: any) => state.privateData.value);
  const location: Location.LocationObject = useSelector((state: any) => state.location.value);
  const myUid = useSelector((state: any) => state.myUid.value);

  return (
    <Container style={{ flex: 1 }}>
      {screen === "mapScreen" && <MapScreen />}
      {screen === "likeFromScreen" && <LikeFromScreen/>}
      {screen === "talkListScreen" && <TalkListScreen/>}
      {screen === "mySettingScreen" && <MySettingScreen/>}
      <BottomNavigation screen={screen} setScreen={setScreen}/>
    </Container>
  );
};

export default MainPage;
