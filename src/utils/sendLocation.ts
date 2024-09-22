import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import * as Location from "expo-location";
import { convertLatitudeLongitude } from "./convertLatitudeLongitude";
// 位置情報送信
export const sendLocation = async (isGps: boolean, myUid: string, location: Location.LocationObject | null) => {

  // ログインしていない場合、以降実行しない
  if (!myUid) {
    return;
  }
  

  // あいまいな位置情報にする
  const currentRef = doc(db, "current", myUid);
  let newCoords: {
    latitude: number | null;
    longitude: number | null;
  } = {
    latitude: null,
    longitude: null,
  };

  // 正確な位置からずらす
  if (location && isGps) {
    newCoords = await convertLatitudeLongitude(location.coords.latitude, location.coords.longitude, myUid); // 非同期処理を待つ
    console.log(location.coords)
    console.log(newCoords)
  }

  await setDoc(
    currentRef,
    {
      latitude: newCoords.latitude,
      longitude: newCoords.longitude,
    },
    { merge: true }
  );

  console.log("🎉send locationaa");
};
