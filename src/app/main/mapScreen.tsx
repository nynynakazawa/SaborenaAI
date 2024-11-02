import React, { useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Platform,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";
import MapView, { Polygon } from "react-native-maps";
import * as Location from "expo-location";
import { CurrentData } from "../../types/userDataTypes";
import { styled } from "nativewind";
import UserMarker from "../../features/main/map/userMarker";
import WhatNowInput from "../../features/main/map/whatNowInput";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import ChangeCurrentStatus from "../../features/main/map/changeCurrentStatus";
import { RootState } from "../../store/store";
import { MaterialIcons } from "@expo/vector-icons";

const StyledView = styled(View);
const StyledText = styled(Text);

const MapScreen = () => {
  const Container = Platform.OS === "android" ? SafeAreaView : View;

  const location: Location.LocationObject | null = useSelector(
    (state: RootState) => state.location.value
  );
  const allCurrentData: { [key: string]: CurrentData | null } = useSelector(
    (state: RootState) => state.allCurrentData.value
  );

  // 辞書を配列に変換する
  const allCurrentDataArray = allCurrentData
    ? Object.keys(allCurrentData).map((key: string) => ({
        key,
        value: allCurrentData[key],
      }))
    : [];

  // 外側の長方形の座標（地図全体をカバー）
  const outerCoords = [
    { latitude: -90, longitude: -180 },
    { latitude: -90, longitude: 180 },
    { latitude: 90, longitude: 180 },
    { latitude: 90, longitude: -180 },
  ];

  // 中心座標
  const center = {
    latitude: 35.661725300000015,
    longitude: 139.70307688466067,
  };

  // 円の半径（メートル）
  const radius = 2000; // 2km

  // 円を構成する点の数
  const numberOfPoints = 64;

  // 円の座標を取得し、順序を逆にする
  const circleCoords = getCircleCoordinates(center, radius, numberOfPoints).reverse();

  // MapView の参照を作成
  const mapRef = useRef<MapView>(null);

  // **ここから修正**
  useEffect(() => {
    const checkLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
  
      if (status !== Location.PermissionStatus.GRANTED) {
        // 許可されていない場合はポップアップを表示
        Alert.alert(
          "位置情報の許可",
          "NowMatchの位置情報の設定を「常に許可」に変更してください。",
          [
            {
              text: "キャンセル",
              style: "cancel",
            },
            {
              text: "設定を開く",
              onPress: () => {
                Linking.openSettings();
              },
            },
          ],
          { cancelable: false }
        );
      }
    };
  
    checkLocationPermission();
  }, []);
  // **ここまで修正**

  return (
    <Container style={{ flex: 1 }}>
      {location ? (
        <StyledView style={{ flex: 1 }}>
          {/* 操作盤 */}
          <ChangeCurrentStatus />
          {/* マップ */}
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude || 0,
              longitude: location.coords.longitude || 0,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {/* エリア外を暗く表示するポリゴン */}
            <Polygon
              coordinates={outerCoords}
              holes={[circleCoords]}
              fillColor="rgba(84, 148, 173, 0.15)"
              strokeColor="rgba(84, 148, 173, 0.55)"
              strokeWidth={1}
            />
            {/* 全てのユーザのピンを表示 */}
            {allCurrentDataArray.map((item) => (
              <UserMarker key={item.key} uid={item.key} currentData={item.value} />
            ))}
          </MapView>
          {/* 現在地に戻るボタンと Shibuya ボタンを追加 */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.shibuyaButton}
              onPress={() => {
                if (mapRef.current) {
                  mapRef.current.animateToRegion(
                    {
                      latitude: center.latitude,
                      longitude: center.longitude,
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.01,
                    },
                    1000
                  );
                }
              }}
            >
              <MaterialIcons name="location-city" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.currentLocationButton}
              onPress={() => {
                if (location && mapRef.current) {
                  mapRef.current.animateToRegion(
                    {
                      latitude: location.coords.latitude,
                      longitude: location.coords.longitude,
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.01,
                    },
                    1000
                  );
                }
              }}
            >
              <MaterialIcons name="my-location" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          {/* whatnowインプットボックス */}
          <WhatNowInput />
        </StyledView>
      ) : (
        <StyledView className="flex h-full items-center justify-center">
          <StyledText>位置情報を読み込んでいます</StyledText>
          <ActivityIndicator size="large" />
        </StyledView>
      )}
    </Container>
  );
};

// 円の座標を取得する関数
function getCircleCoordinates(
  center: { latitude: number; longitude: number },
  radiusInMeters: number,
  numberOfPoints: number
): { latitude: number; longitude: number }[] {
  const coordinates: { latitude: number; longitude: number }[] = [];
  const { latitude: centerLat, longitude: centerLng } = center;
  const earthRadius = 6371000; // 地球の半径（メートル）

  for (let i = 0; i <= numberOfPoints; i++) {
    const angle = (i * 2 * Math.PI) / numberOfPoints;
    const dx = radiusInMeters * Math.cos(angle);
    const dy = radiusInMeters * Math.sin(angle);

    // メートルから緯度・経度への変換
    const deltaLat = (dy / earthRadius) * (180 / Math.PI);
    const deltaLng =
      ((dx / earthRadius) * (180 / Math.PI)) / Math.cos((centerLat * Math.PI) / 180);

    const lat = centerLat + deltaLat;
    const lng = centerLng + deltaLng;

    coordinates.push({ latitude: lat, longitude: lng });
  }

  return coordinates;
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 100,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  shibuyaButton: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 12,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5, // Android用のシャドウ
    shadowColor: "#000", // iOS用のシャドウ
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginRight: 10, // ボタン間のスペース
  },
  currentLocationButton: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 12,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5, // Android用のシャドウ
    shadowColor: "#000", // iOS用のシャドウ
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
});

export default MapScreen;