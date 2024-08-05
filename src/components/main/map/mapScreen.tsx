import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import Modal from "react-native-modal";
import { CurrentData, UserData } from "../../../types/userDataTypes";
import { styled } from "nativewind";
import UserMarker from "./userMarker";
import NameDisplayComponent from "../../../layout/display/nameDisplayComponent";
import Icon from "react-native-vector-icons/MaterialIcons";
import UserModal from "../../../layout/userModal/userProfileModal";
import WhatNowInput from "./whatNowInput";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

const MapScreen = ({
  location,
  myUid,
  myUserData,
  myCurrentData,
}: {
  location: Location.LocationObject | null;
  myUid: string,
  myUserData: UserData | null;
  myCurrentData: CurrentData | null;
}) => {
  const [isVisibleUserModal, setIsVisibleUserModal] = useState<boolean>(false);

  return (
    <StyledView>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <UserMarker
            location={location}
            isVisibleUserModal={isVisibleUserModal}
            setIsVisibleUserModal={setIsVisibleUserModal}
            userData={myUserData}
            currentData={myCurrentData}
          />
        </MapView>
      ) : (
        <StyledText>waiting</StyledText>
      )}

      <WhatNowInput myUid={myUid}/>
      <UserModal
        isVisibleUserModal={isVisibleUserModal}
        setIsVisibleUserModal={setIsVisibleUserModal}
        userData={myUserData}
        currentData={myCurrentData}
      />
    </StyledView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
});
export default MapScreen;
