import React from "react";
import { Image, Text, View } from "react-native";
import { styled } from "nativewind";
import { UserData } from "../../../types/userDataTypes";
import { useSelector } from "react-redux";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

const BottomNavigation = ({ focused }: { focused: boolean }) => {
  const myUserData: null | UserData = useSelector(
    (state: any) => state.userData.value,
  );
  return (
    <StyledView className="relative">
      <StyledImage
        source={{ uri: myUserData?.image_url }}
        style={{ width: 34, height: 34 }}
        className={`rounded-full ${focused ? "opacity-60" : "opacity-100"}`}
      />
    </StyledView>
  );
};

export default BottomNavigation;
