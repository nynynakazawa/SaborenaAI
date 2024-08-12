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

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

const MapScreen = () => {
  const Container = Platform.OS === "android" ? SafeAreaView : View;

  const location: any = useSelector((state: any) => state.location.value);
  const isGps: boolean = useSelector((state: any) => state.isGps.value);
  const allCurrentData = useSelector(
    (state: any) => state.allCurrentData.value,
  );

  // 辞書 → 配列
  const allCurrentDataArray = Object.keys(allCurrentData).map((key) => ({
    key,
    value: allCurrentData[key],
  }));
  return (
    <Container style={{ flex: 1 }}>
      {location ? (
        <StyledView>
          <ChangeCurrentStatus />
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 35.41116940116373,
              longitude: 139.6986807531,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {allCurrentDataArray.map((item) => (
              <UserMarker
                key={item.key}
                uid={item.key}
                currentData={item.value}
              />
            ))}
          </MapView>
          <WhatNowInput />
        </StyledView>
      ) : (
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
