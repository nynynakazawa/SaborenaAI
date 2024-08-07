import { Tabs } from "expo-router";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import { auth, db } from "../../firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import {
  AppData,
  CurrentData,
  PrivateData,
  UserData,
} from "../../types/userDataTypes";
import * as Location from "expo-location";
import { set as setUserData } from "../../store/userDataSlice";
import { set as setPrivateData } from "../../store/privateDataSlice";
import { set as setAppData } from "../../store/appDataSlice";
import { set as setCurrentData } from "../../store/currentDataSlice";
import { set as setLocation } from "../../store/locationSlice";
import { set as setMyUid } from "../../store/myUidSlice";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { useEffect, useState } from "react";
import { styled } from "nativewind";
import { Image, Text, View } from "react-native";
import BottomNavigation from "../../components/main/navigation/bottomNavigation";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

export default function Layout() {
  const fetchUserData = (uid: string, dispatch: Dispatch) => {
    const userRef = doc(db, "user", uid);

    dispatch(setMyUid(uid));
    return onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        console.log("fetched user data");
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
        console.log("fetched private data");
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
        console.log("fetched app data");
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
        console.log("fetched current data");
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
      return () => unsubscribes.forEach((unsub) => unsub());
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

  const dispatch = useDispatch();
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { height: 80 },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="mySettingScreen"
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="map"
              size={26}
              color={focused ? "#45e645" : "#333"}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="likeFromScreen"
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="heart"
              size={30}
              color={focused ? "#f91880" : "#333"}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="talkListScreen"
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="mail"
              size={30}
              color={focused ? "#1a8cd8" : "#333"}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="mapScreen"
        options={{
          tabBarIcon: ({ focused }) => <BottomNavigation focused={focused} />,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
