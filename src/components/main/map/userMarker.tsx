import React, { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";
import { CurrentData, UserData } from "../../../types/userDataTypes";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";
import Animated, {
  useSharedValue,
  withSequence,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useSelector } from "react-redux";
const StyledView = styled(View);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);
const UserMarker = ({
  isVisibleUserModal,
  setIsVisibleUserModal,
}: {
  isVisibleUserModal: boolean;
  setIsVisibleUserModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const location: Location.LocationObject = useSelector(
    (state: any) => state.location.value,
  );
  const userData: UserData = useSelector((state: any) => state.userData.value);

  const gender = userData?.gender;
  let frameColor;
  if (gender === "male") {
    frameColor = "bg-[#79C7FF]";
  } else if (gender === "female") {
    frameColor = "bg-[#F479FF]";
  } else {
    frameColor = "bg-[#79FF82]";
  }

  const scale = useSharedValue(1);

  const handlePress = () => {
    scale.value = withSequence(
      withSpring(0.8), // 小さくなる
      withSpring(1), // 元の大きさに戻る
    );
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Marker
      coordinate={
        location
          ? {
              // TODO: データベースから取得した値に置き換える
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }
          : {
              latitude: 0,
              longitude: 0,
            }
      }
      style={{ width: 52, height: 60, paddingBottom: 40 }}
      onPress={() => {
        setIsVisibleUserModal(!isVisibleUserModal);
        handlePress();
      }}
    >
      <Animated.View style={[animatedStyle]}>
        <StyledView className="flex h-[60px] w-max">
          <StyledView
            className={`flex h-[52px] w-[52px] items-center justify-center rounded-[14px] ${frameColor}`}
          >
            <StyledImage
              source={{ uri: userData?.main_image_url || undefined }}
              style={{ width: 42, height: 42, borderRadius: 10 }}
            />
          </StyledView>
          <StyledView className="absolute bottom-[5px] z-[-5] flex w-full items-center">
            <StyledView
              className={`h-[20px] w-[20px] rotate-[45deg] ${frameColor}`}
            />
          </StyledView>
        </StyledView>
      </Animated.View>
    </Marker>
  );
};

export default UserMarker;
