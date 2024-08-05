import React, { useState } from "react";
import { Image, Platform, Text, TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";
import { UserData } from "../../../types/userDataTypes";
import MyProfileIcon from "./myProfileIcon";
import NowMatchHeader from "../../../layout/header/nowMatchHeader";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

const MySettingScreen = ({ myUserData }: { myUserData: UserData | null }) => {
  return (
    <StyledView>
      <NowMatchHeader />
      <StyledView
        className={`absolute mt-[80px] flex w-screen items-center ${Platform.OS == "android" ? "top-[10vh]" : "top-[18vh]"}`}
      >
        <MyProfileIcon myUserData={myUserData} />
      </StyledView>
    </StyledView>
  );
};

export default MySettingScreen;
