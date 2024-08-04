import React, { useState } from "react";
import { Image, View } from "react-native";
import { styled } from "nativewind";
import { UserData } from "../../../types/userData";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";

const StyledView = styled(View);

const UserMarker = ({
  location,
  user,
  isVisibleUserModal,
  setIsVisibleUserModal,
}: {
  location: Location.LocationObject | null;
  user: UserData | null;
  isVisibleUserModal: boolean;
  setIsVisibleUserModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const gender = user?.user_info?.gender;
  let frameColor;

  if (gender === "male") {
    frameColor = "bg-[#79C7FF]";
  } else if (gender === "female") {
    frameColor = "bg-[#F479FF]";
  } else {
    frameColor = "bg-[#79FF82]";
  }

  return (
    <Marker
      coordinate={
        location
          ? {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }
          : {
              latitude: 0,
              longitude: 0,
            }
      }
      onPress={() =>setIsVisibleUserModal(!isVisibleUserModal)}
    >
      <StyledView className="flex h-[60px] w-max">
        <StyledView
          className={`h-[52px] w-[52px] rounded-[10px] flex items-center justify-center ${frameColor}`}
        >
          <Image
            source={{ uri: user?.user_info?.image_url }}
            style={{ width: 42, height: 42, borderRadius: 10 }}
          />
        </StyledView>
        <StyledView className="absolute bottom-[5px] z-[-5] flex w-full items-center">
          <StyledView
            className={`h-[20px] w-[20px] rotate-[45deg] ${frameColor}`}
          />
        </StyledView>
      </StyledView>
    </Marker>
  );
};

export default UserMarker;
