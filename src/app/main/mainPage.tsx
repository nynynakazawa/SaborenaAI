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
import { LocationObjectCoords } from "expo-location";

const StyledView = styled(View);
const StyledText = styled(Text);

const MapPage = () => {
  const Container = Platform.OS === "android" ? SafeAreaView : View;

  const fetchUserData = (uid: string) => {
    const userRef = doc(db, "user", uid);
    return onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        setMyUserData(doc.data() as UserData);
      } else {
        console.log("No such user data!");
      }
    });
  };

  const fetchPrivateData = (uid: string) => {
    const privateRef = doc(db, "private", uid);
    return onSnapshot(privateRef, (doc) => {
      if (doc.exists()) {
        setMyPrivateData(doc.data() as PrivateData);
      } else {
        console.log("No such private data!");
      }
    });
  };

  const fetchAppData = (uid: string) => {
    const appRef = doc(db, "app", uid);
    return onSnapshot(appRef, (doc) => {
      if (doc.exists()) {
        setAppData(doc.data() as AppData);
      } else {
        console.log("No such app data!");
      }
    });
  };

  const fetchCurrentData = (uid: string) => {
    const currentRef = doc(db, "current", uid);
    return onSnapshot(currentRef, (doc) => {
      if (doc.exists()) {
        setMyCurrentData(doc.data() as CurrentData);
      } else {
        console.log("No such current data!");
      }
    });
  };

  const fetchMyUser = async () => {
    const user = auth.currentUser as User;
    if (user) {
      setMyUid(user.uid);
      const unsubscribes = [
        fetchUserData(user.uid),
        fetchPrivateData(user.uid),
        fetchAppData(user.uid),
        fetchCurrentData(user.uid),
      ]
      // コンポーネントがアンマウントされたときにリスナーをクリーンアップ
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
    setLocation(location);
  };

  useEffect(() => {
    fetchMyUser();
    fetchLocation();
  }, []);

  const [myUserData, setMyUserData] = useState<UserData | null>(null);
  const [myPrivateData, setMyPrivateData] = useState<PrivateData | null>(null);
  const [myAppData, setAppData] = useState<AppData | null>(null);
  const [myCurrentData, setMyCurrentData] = useState<CurrentData | null>(null);
  const [myUid, setMyUid] = useState<string>("");

  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [screen, setScreen] = useState<string>("mapScreen");

  return (
    <Container style={{ flex: 1 }}>
      {screen === "mapScreen" && (
        <MapScreen
          location={location}
          myUid={myUid} 
          myUserData={myUserData} 
          myCurrentData={myCurrentData}
        />
      )}
      {screen === "likeFromScreen" && <LikeFromScreen myUserData={myUserData} />}
      {screen === "talkListScreen" && <TalkListScreen myUserData={myUserData} />}
      {screen === "mySettingScreen" && <MySettingScreen myUserData={myUserData} />}
      <BottomNavigation screen={screen} setScreen={setScreen} myUserData={myUserData} />
    </Container>
  );
};

export default MapPage;
