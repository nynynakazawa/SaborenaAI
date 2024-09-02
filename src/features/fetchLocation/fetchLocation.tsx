import React, { useEffect, useRef } from "react";
import { Text, View } from "react-native";
import { styled } from "nativewind";
import { useDispatch, useSelector } from "react-redux";
import * as Location from "expo-location";
import { RootState } from "../../store/store";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { fetchLocation } from "../../utils/fetchMyData";
import { onAuthStateChanged } from "firebase/auth";
import { set as setMyUid } from "../../store/myUidSlice";

const StyledView = styled(View);

const FetchLocation = () => {
  const dispatch = useDispatch();
  const isGps: boolean = useSelector((state: RootState) => state.isGps.value);
  const myUid: string | null = useSelector(
    (state: RootState) => state.myUid.value,
  );
  const location: Location.LocationObject | null = useSelector(
    (state: RootState) => state.location.value,
  );
  const prevLocationRef = useRef(location);

  // 位置情報送信
  const sendLocation = async (uid: string, isGps: boolean) => {
    // ログインしていない場合、以降実行しない
    if (!myUid) {
      return;
    }
    // 位置情報公開設定がOFFの場合、以降実行しない
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
  // 1秒ごとに現在位置取得
  useEffect(() => {
    const intervalId = setInterval(() => {
      onAuthStateChanged(auth, (user) => {
        if (!user) {
          dispatch(setMyUid(null));
          return;
        }

        // console.log("🩵Fetching location for user:", user.uid);
        fetchLocation(dispatch);
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // 10秒ごとに現在位置をdbに送る
  useEffect(() => {
    if (!auth.currentUser) {
      return;
    }
    console.log(new Date());
    console.log("location changed");
    const interval = setInterval(() => {
      // 位置が変化している場合
      if (prevLocationRef.current !== location && myUid) {
        sendLocation(myUid, isGps);
        prevLocationRef.current = location;
      }
    }, 10 * 1000); // 10秒

    return () => clearInterval(interval);
  }, [location?.coords.latitude, location?.coords.longitude]);

  return <StyledView></StyledView>;
};

export default FetchLocation;
