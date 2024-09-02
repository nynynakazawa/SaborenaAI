import React from "react";
import { StyleSheet, View, Platform, ActivityIndicator } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { CurrentData } from "../../types/userDataTypes";
import { styled } from "nativewind";
import UserMarker from "../../features/main/map/userMarker";
import WhatNowInput from "../../features/main/map/whatNowInput";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import ChangeCurrentStatus from "../../features/main/map/changeCurrentStatus";
import { RootState } from "../../store/store";

const StyledView = styled(View);

const MapScreen = () => {
  const Container = Platform.OS === "android" ? SafeAreaView : View;

  const location: Location.LocationObject | null = useSelector(
    (state: RootState) => state.location.value,
  );
  const allCurrentData: { [key: string]: CurrentData | null } = useSelector(
    (state: RootState) => state.allCurrentData.value,
  );

  // 辞書を配列に変換する
  const allCurrentDataArray = allCurrentData
    ? Object.keys(allCurrentData).map((key: string) => ({
        key,
        value: allCurrentData[key],
      }))
    : [];

  return (
    <Container style={{ flex: 1 }}>
      {location ? (
        <StyledView>
          {/* 操作盤 */}
          <ChangeCurrentStatus />
          {/* マップ */}
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {/* 全てのユーザのピンを表示 */}
            {allCurrentDataArray.map((item) => (
              <UserMarker
                key={item.key}
                uid={item.key}
                currentData={item.value}
              />
            ))}
          </MapView>
          {/* whatnowインプットボックス */}
          <WhatNowInput />
        </StyledView>
      ) : (
        <StyledView className="flex h-full items-center justify-center">
          <ActivityIndicator size="large" />
        </StyledView>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
export default MapScreen;
