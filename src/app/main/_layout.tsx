import { Tabs, useGlobalSearchParams, useRouter } from "expo-router";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import * as Location from "expo-location";
import { set as setMyUid } from "../../store/myUidSlice";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { useEffect, useRef } from "react";
import BottomNavigation from "../../components/main/navigation/bottomNavigation";
import { RootState } from "../../store/store";
import {
  fetchAllCurrentData,
  monitorCurrentCollection,
} from "../../utils/fetchAllCurrentData";
import {
  fetchAppData,
  fetchCurrentData,
  fetchLocation,
  fetchPrivateData,
  fetchUserData,
} from "../../utils/fetchMyData";

export default function Layout() {
  const { isFetchUserData } = useGlobalSearchParams();
  const dispatch = useDispatch();

  const location: Location.LocationObject | null = useSelector(
    (state: RootState) => state.location.value,
  );
  const myUid: string = useSelector((state: RootState) => state.myUid.value);
  const isGps: boolean = useSelector((state: RootState) => state.isGps.value);
  const prevLocationRef = useRef(location);

  // 自身の情報を取得
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

  // 位置情報送信
  const sendLocation = async (uid: string, isGps: boolean) => {
    if (isGps === false) {
      return;
    }
    console.log("🎉send location");
    const currentRef = doc(db, "current", uid);
    await setDoc(
      currentRef,
      {
        latitude: location?.coords.latitude,
        longitude: location?.coords.longitude,
      },
      { merge: true },
    );
  };

  // レンダリング時に各ユーザーデータ取得
  useEffect(() => {
    if (isFetchUserData != "false") {
      fetchAllCurrentData(dispatch);
      monitorCurrentCollection(dispatch);
      fetchLocation(dispatch);
      fetchMyUser(dispatch);
    }
  }, []);

  // 1秒ごとに現在位置取得
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchLocation(dispatch);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // 10秒ごとに現在位置をdbに送る
  useEffect(() => {
    const interval = setInterval(() => {
      // 位置が変化している場合
      if (prevLocationRef.current !== location) {
        sendLocation(myUid, isGps);
        prevLocationRef.current = location;
      }
    }, 10 * 1000); // 10秒

    return () => clearInterval(interval);
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { height: 80 },
        tabBarShowLabel: false,
      }}
    >
      {/* マップタブ */}
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
      {/* トークタブ */}
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
      {/* 設定タブ */}
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
