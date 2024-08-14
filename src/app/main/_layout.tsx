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
import {
  updateKey
} from "../../store/allCurrentDataSlice";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { useEffect, useRef } from "react";
import BottomNavigation from "../../components/main/navigation/bottomNavigation";
import { RootState } from "../../store/store";

export default function Layout() {
  const { isFetchUserData } = useGlobalSearchParams();
  const dispatch = useDispatch();

  const location: Location.LocationObject | null = useSelector((state: RootState) => state.location.value);
  const myUid: string = useSelector((state: RootState) => state.myUid.value);
  const isGps: boolean = useSelector((state: RootState) => state.isGps.value);
  const prevLocationRef = useRef(location);

  // userData取得
  const fetchUserData = (uid: string, dispatch: Dispatch) => {
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
  const fetchPrivateData = (uid: string, dispatch: Dispatch) => {
    const privateRef = doc(db, "private", uid);
    return onSnapshot(privateRef, (doc) => {
      if (doc.exists()) {
        console.log("🔵fetched private data");
        dispatch(setPrivateData(doc.data()));
      } else {
        console.log("❌no such private data!");
      }
    });
  };

  // appData取得
  const fetchAppData = (uid: string, dispatch: Dispatch) => {
    const appRef = doc(db, "app", uid);
    return onSnapshot(appRef, (doc) => {
      if (doc.exists()) {
        console.log("🔵fetched app data");
        dispatch(setAppData(doc.data()));
      } else {
        console.log("❌no such app data!");
      }
    });
  };

  // currentData取得
  const fetchCurrentData = (uid: string, dispatch: Dispatch) => {
    const currentRef = doc(db, "current", uid);
    return onSnapshot(currentRef, (doc) => {
      if (doc.exists()) {
        console.log("🔵fetched current data", doc.data());
        dispatch(setCurrentData(doc.data()));
      } else {
        console.log("❌no such current data!");
      }
    });
  };

  // location取得
  const fetchLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("❌permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    dispatch(setLocation(location));
  };
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

//   const monitorCurrentCollection = (dispatch: Dispatch) => {
//     const currentRef = collection(db, "current");
  
//     // コレクション全体を監視
//     onSnapshot(currentRef, (snapshot) => {
//       snapshot.docChanges().forEach((change) => {
//         if (change.type === "added") {
//           console.log(`🔵Document added with ID: ${change.doc.id}`);
//         }
//         if (change.type === "modified") {
//           console.log(`🔵Document modified with ID: ${change.doc.id}`);
//         }
//         if (change.type === "removed") {
//           console.log(`🔵Document removed with ID: ${change.doc.id}`);
//         }
  
//         // ドキュメントIDを取得し、必要に応じてReduxにディスパッチ
//         const documentId = change.doc.id;
//         console.log(documentId)
//       });
//     });
//   };

// // Fetch all users' current data and set up real-time listeners
const fetchAllCurrentData = async (dispatch: Dispatch) => {
  const currentRef = collection(db, "current");
  try {
    const querySnapshot = await getDocs(currentRef);
    if (!querySnapshot.empty) {
      console.log("🔵fetched all current data");
      let allCurrentDataDict: { [key: string]: CurrentData | null } = {};

      querySnapshot.forEach((doc) => {
        allCurrentDataDict[doc.id] = doc.data() as CurrentData;
      });

      console.log(allCurrentDataDict)
      // 全てのユーザの current データを dispatch にセット
      dispatch(setAllCurrentData(allCurrentDataDict));
    } else {
      console.log("❌no user data found!");
    }
  } catch (error) {
    console.error("❌error fetching user data:", error);
  }
};

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

  useEffect(() => {
    if (isFetchUserData != "false") {
      fetchAllCurrentData(dispatch);
      fetchMyUser(dispatch);
      fetchLocation();
      // sendLocation(myUid, true);
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
