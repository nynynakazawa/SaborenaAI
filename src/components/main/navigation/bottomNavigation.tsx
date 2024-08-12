import React from "react";
import { Image, Text, View } from "react-native";
import { styled } from "nativewind";
import { UserData } from "../../../types/userDataTypes";
import { useSelector } from "react-redux";

const StyledView = styled(View);
const StyledImage = styled(Image);

const BottomNavigation = ({ focused }: { focused: boolean }) => {
  const myUserData: null | UserData = useSelector(
    (state: any) => state.userData.value,
  );
  return (
    <StyledView className="relative">
      {/* ボトムナビゲーション画像 */}
      <StyledImage
        source={{ uri: myUserData?.main_image_url || undefined }}
        style={{ width: 34, height: 34 }}
        className={`rounded-full ${focused ? "opacity-100" : "opacity-60"}`}
      />
    </StyledView>
  );
};

export default BottomNavigation;
