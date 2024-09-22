import React, { useState, useEffect } from "react";
import { Image, View } from "react-native";
import { styled } from "nativewind";
import { CurrentData } from "../../../types/userDataTypes";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useSelector } from "react-redux";
import UserModal from "../../../components/userModal/userModal";
import { RootState } from "../../../store/store";

const StyledView = styled(View);
const StyledImage = styled(Image);

const UserMarker = ({
  uid,
  currentData,
}: {
  uid: string;
  currentData: CurrentData | null;
}) => {
  const location: Location.LocationObject | null = useSelector(
    (state: RootState) => state.location.value
  );
  const myUid: string | null = useSelector((state: RootState) => state.myUid.value);
  const gender = currentData?.gender;
  const isGps: boolean = useSelector((state: RootState) => state.isGps.value);
  const [isVisibleUserModal, setIsVisibleUserModal] = useState<boolean>(false);

  // マーカーの座標を管理するためのステート
  const [coords, setCoords] = useState({
    latitude: uid === myUid ? location?.coords.latitude || 0 : currentData?.latitude || 0,
    longitude: uid === myUid ? location?.coords.longitude || 0 : currentData?.longitude || 0,
  });

  // 0.3秒かけて旧座標から新座標に線形補間する
  useEffect(() => {
    const newCoords = uid === myUid
      ? {
          latitude: location?.coords.latitude || 0,
          longitude: location?.coords.longitude || 0,
        }
      : {
          latitude: currentData?.latitude || 0,
          longitude: currentData?.longitude || 0,
        };

    // 新しい座標が有効な場合、滑らかに移動する
    if (
      newCoords.latitude != null && newCoords.longitude != null &&
      (newCoords.latitude !== coords.latitude || newCoords.longitude !== coords.longitude)
    ) {
      // 座標が異なる場合にアニメーションを開始
      const startLatitude = coords.latitude;
      const startLongitude = coords.longitude;
      const endLatitude = newCoords.latitude;
      const endLongitude = newCoords.longitude;
      const duration = 300; // 0.3秒
      const interval = 10; // 更新間隔（滑らかさ）
      const steps = duration / interval;
      let currentStep = 0;

      const animate = () => {
        currentStep += 1;
        const progress = currentStep / steps;

        const interpolatedLatitude = startLatitude + (endLatitude - startLatitude) * progress;
        const interpolatedLongitude = startLongitude + (endLongitude - startLongitude) * progress;

        setCoords({
          latitude: interpolatedLatitude,
          longitude: interpolatedLongitude,
        });

        if (currentStep < steps) {
          setTimeout(animate, interval);
        } else {
          // アニメーションが完了したら最終位置を設定
          setCoords(newCoords);
        }
      };

      animate();
    } else if (coords.latitude == null && coords.longitude == null) {
      // 座標が無効な場合は最終位置を設定
      setCoords(newCoords);
    }
  }, [location, currentData, uid]);

  // マーカーのフレームカラー設定
  let frameColor;
  if (uid === myUid) {
    frameColor = "bg-[#ffc179]";
  } else if (gender === "male") {
    frameColor = "bg-[#79C7FF]";
  } else if (gender === "female") {
    frameColor = "bg-[#F479FF]";
  } else {
    frameColor = "bg-[#79FF82]";
  }

  // 座標が無効な場合はマーカーを表示しない
  if (coords.latitude == null || coords.longitude == null) {
    return null; // 座標が無効なときはマーカーをレンダリングしない
  }

  return (
    <Marker
      coordinate={coords}
      style={{ width: 52, height: 60, paddingBottom: 40 }}
      onPress={() => setIsVisibleUserModal(!isVisibleUserModal)}
    >
      <StyledView className={`flex h-[60px] w-max ${uid === myUid && !isGps && "opacity-60"}`}>
        <StyledView className={`flex h-[52px] w-[52px] items-center justify-center rounded-[14px] ${frameColor}`}>
          <StyledImage
            source={{ uri: currentData?.main_image_url || undefined }}
            style={{ width: 42, height: 42, borderRadius: 10 }}
          />
        </StyledView>
        <StyledView className="absolute bottom-[5px] z-[-5] flex w-full items-center">
          <StyledView className={`h-[20px] w-[20px] rotate-[45deg] ${frameColor}`} />
        </StyledView>
      </StyledView>

      {isVisibleUserModal && (
        <UserModal uid={uid} visible={isVisibleUserModal} onClose={() => setIsVisibleUserModal(false)} />
      )}
    </Marker>
  );
};

export default UserMarker;
