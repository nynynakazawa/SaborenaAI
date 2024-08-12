import { Tabs, useGlobalSearchParams, useRouter } from "expo-router";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import { auth, db } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
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
import {
  set as setAllCurrentData,
} from "../../store/allCurrentDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { useEffect, useRef, useState } from "react";
import { styled } from "nativewind";
import { Image, Text, View } from "react-native";
import BottomNavigation from "../../components/main/navigation/bottomNavigation";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

export default function Layout() {
  const { isFetchUserData } = useGlobalSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const fetchUserData = (uid: string, dispatch: Dispatch) => {
    const userRef = doc(db, "user", uid);
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
    dispatch(setMyUid(user?.uid));
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

  const fetchCurrentData_indvidual = (
    uid: string,
    dispatch: Dispatch,
    existingData: { [key: string]: CurrentData | null },
  ) => {
    const currentRef = doc(db, "current", uid);
    return onSnapshot(currentRef, (doc) => {
      if (doc.exists()) {
        console.log(`Fetched current data for user ${uid}`);
        const updatedData = {
          ...existingData,
          [uid]: doc.data() as CurrentData,
        };
        dispatch(setAllCurrentData(updatedData));
      } else {
        console.log(`No current data for user ${uid}`);
      }
    });
  };

  const fetchAllCurrentData = async (dispatch: Dispatch) => {
    const currentRef = collection(db, "current");
    try {
      const querySnapshot = await getDocs(currentRef);
      if (!querySnapshot.empty) {
        console.log("Fetched all current data");
        let allCurrentDataDict: { [key: string]: CurrentData | null } = {};
        querySnapshot.forEach((doc) => {
          allCurrentDataDict[doc.id] = doc.data() as CurrentData;
        });

        // 全てのユーザの current データを dispatch にセット
        dispatch(setAllCurrentData(allCurrentDataDict));

        // 各ユーザの current ドキュメントをリアルタイムで監視
        querySnapshot.forEach((doc) => {
          fetchCurrentData_indvidual(doc.id, dispatch, allCurrentDataDict);
        });
      } else {
        console.log("No user data found!");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const sendLocation = async (uid: string, isGps: boolean) => {
    if (isGps === false) {
      return;
    }
    console.log("send location");
    const currentRef = doc(db, "current", uid);
    await setDoc(
      currentRef,
      {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
      { merge: true },
    );
  };

  useEffect(() => {
    if (isFetchUserData != "false") {
      fetchAllCurrentData(dispatch);
      fetchMyUser(dispatch);
      fetchLocation();
      sendLocation(myUid, true);
    }
  }, []);

  // useEffect(() => {
  //   console.log("a")
  //   const intervalId = setInterval(() => {
  //     fetchLocation();
  //     console.log("fetch location")
  //   }, 1000);

  //   return () => clearInterval(intervalId);
  // },[])

  const location: any = useSelector((state: any) => state.location.value);
  const myUid: string = useSelector((state: any) => state.myUid.value);
  const isGps: boolean = useSelector((state: any) => state.isGps.value);
  const prevLocationRef = useRef(location);

  useEffect(() => {
    const interval = setInterval(() => {
      if (prevLocationRef.current !== location) {
        sendLocation(myUid, isGps);
        prevLocationRef.current = location;
      }
    }, 2 * 1000); // 180秒

    return () => clearInterval(interval);
  }, [Location]);

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { height: 80 },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="mapScreen"
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
          headerShown: true,
          headerTitleAlign: "center",
          headerTitle: "相手からのいいね",
          headerStyle: { height: 90 },
          headerTitleStyle: { fontSize: 16 },
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
          headerShown: true,
          headerTitleAlign: "center",
          headerTitle: "トーク",
          headerStyle: { height: 90 },
          headerTitleStyle: { fontSize: 16 },
        }}
      />
      <Tabs.Screen
        name="mySettingScreen"
        options={{
          tabBarIcon: ({ focused }) => <BottomNavigation focused={focused} />,
          headerShown: true,
          headerTitleAlign: "center",
          headerTitle: "設定",
          headerStyle: { height: 90 },
          headerTitleStyle: { fontSize: 16 },
        }}
      />
    </Tabs>
  );
}
