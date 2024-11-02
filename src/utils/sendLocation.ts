import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import * as Location from "expo-location";
import { convertLatitudeLongitude } from "./convertLatitudeLongitude";

// ユーザーが以前エリア内にいたかどうかを追跡
let wasInShibuya = false;

// エリア内での位置情報送信を管理するタイマーID
let intervalId: NodeJS.Timeout | null = null;

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

  let isInArea = false;

  // 正確な位置からずらす
  if (location && isGps) {
    // 渋谷エリア内にいるか確認
    isInArea = isInShibuya(location.coords.latitude, location.coords.longitude);
  }

  if (isInArea) {
    // 位置情報を送信する関数を定義
    const sendCurrentLocation = async () => {
      try {
        // 現在の位置を取得
        const newLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        // 渋谷エリア内にいるか再確認
        if (
          isInShibuya(newLocation.coords.latitude, newLocation.coords.longitude)
        ) {
          // 位置をずらす
          const newCoords = await convertLatitudeLongitude(
            newLocation.coords.latitude,
            newLocation.coords.longitude,
            myUid
          );

          // 位置情報を送信
          await setDoc(
            currentRef,
            {
              latitude: newCoords.latitude,
              longitude: newCoords.longitude,
            },
            { merge: true }
          );
          console.log("🎉 位置情報を送信しました");
        } else {
          // エリア外に出た場合、タイマーをクリア
          if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
            console.log("🛑 位置情報送信タイマーを停止しました");
          }
          // エリア外の位置情報を送信
          await setDoc(
            currentRef,
            {
              latitude: null,
              longitude: null,
            },
            { merge: true }
          );
          console.log("🎉 エリア外の位置情報を送信しました");
        }
      } catch (error) {
        console.error("位置情報の取得または送信に失敗しました:", error);
      }
    };

    // 初回送信
    await sendCurrentLocation();

    // 10秒ごとに位置情報を送信するタイマーを開始
    if (!intervalId) {
      intervalId = setInterval(sendCurrentLocation, 10000); // 10秒ごとに実行
    }
  } else {
    // エリア外に出た場合、タイマーをクリア
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
      console.log("🛑 位置情報送信タイマーを停止しました");
    }

    if (wasInShibuya) {
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
  }

  // wasInShibuyaの状態を更新
  wasInShibuya = isInArea;
};