import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import * as Location from "expo-location";
import { convertLatitudeLongitude } from "./convertLatitudeLongitude";

// ユーザーが以前エリア内にいたかどうかを追跡
let wasInShibuya = false;

// ユーザーが指定された地点から半径2km以内にいるかを確認する関数
function isInShibuya(latitude: number, longitude: number): boolean {
  const centerLat = 35.661725300000015;
  const centerLon = 139.70307688466067;
  const radiusKm = 2;
  const earthRadiusKm = 6371;

  function degreesToRadians(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }

  const dLat = degreesToRadians(latitude - centerLat);
  const dLon = degreesToRadians(longitude - centerLon);

  const lat1 = degreesToRadians(centerLat);
  const lat2 = degreesToRadians(latitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceKm = earthRadiusKm * c;

  return distanceKm <= radiusKm;
}

// 位置情報送信
export const sendLocation = async (
  isGps: boolean,
  myUid: string,
  location: Location.LocationObject | null
) => {
  // ログインしていない場合、以降実行しない
  if (!myUid) {
    return;
  }

  const currentRef = doc(db, "current", myUid);
  let newCoords: {
    latitude: number | null;
    longitude: number | null;
  } = {
    latitude: null,
    longitude: null,
  };

  let isInArea = false;

  // 正確な位置からずらす
  if (location && isGps) {
    // 渋谷エリア内にいるか確認
    isInArea = isInShibuya(location.coords.latitude, location.coords.longitude);

    if (isInArea) {
      newCoords = await convertLatitudeLongitude(
        location.coords.latitude,
        location.coords.longitude,
        myUid
      ); // 非同期処理を待つ
      console.log(location.coords);
      console.log(newCoords);
    }
  }

  if (isInArea) {
    // エリア内の場合、位置情報を送信
    await setDoc(
      currentRef,
      {
        latitude: newCoords.latitude,
        longitude: newCoords.longitude,
      },
      { merge: true }
    );
    console.log("🎉 位置情報を送信しました");
  } else if (wasInShibuya) {
    // エリア外に出た直後の場合、nullを一度だけ送信
    await setDoc(
      currentRef,
      {
        latitude: null,
        longitude: null,
      },
      { merge: true }
    );
    console.log("🎉 nullの位置情報を送信しました");
  }

  // wasInShibuyaの状態を更新
  wasInShibuya = isInArea;
};