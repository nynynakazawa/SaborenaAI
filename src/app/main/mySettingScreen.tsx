import React, { useState } from "react";
import { Image, Platform, Text, TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";
import { UserData } from "../../types/userDataTypes";
import MyProfileIcon from "../../components/main/mySetting/myProfileIcon";
import NowMatchHeader from "../../layout/header/nowMatchHeader";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import SettingButtonContainer from "../../components/main/mySetting/settingButtonContainer";
import AppInfoDisplay from "../../components/main/mySetting/appInfoDisplay";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

const MySettingScreen = () => {
  const Container = Platform.OS === "android" ? SafeAreaView : View;

  return (
    <Container style={{ flex: 1 }}>
      <StyledView className="absolute mt-[8vh] flex w-screen items-center">
        <StyledView className="h-[150px]">
          <MyProfileIcon />
        </StyledView>

        <StyledView className="mx-auto mt-[8vh] w-[94vw]">
          <AppInfoDisplay />
        </StyledView>

        <StyledView className="mx-auto mt-[8vh] w-[80vw]">
          <SettingButtonContainer />
        </StyledView>
      </StyledView>
    </Container>
  );
};

export default MySettingScreen;
