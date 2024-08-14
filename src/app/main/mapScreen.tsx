import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  Platform,
  FlatList,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import Modal from "react-native-modal";
import { CurrentData, UserData } from "../../types/userDataTypes";
import { styled } from "nativewind";
import UserMarker from "../../components/main/map/userMarker";
import Icon from "react-native-vector-icons/MaterialIcons";
import UserModal from "../../layout/userModal/userModal";
import WhatNowInput from "../../components/main/map/whatNowInput";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import ChangeCurrentStatus from "../../components/main/map/changeCurrentStatus";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { RootState } from "../../store/store";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

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
        // TODO: ローディング画面
        <StyledText>waiting</StyledText>
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
