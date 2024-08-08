import React, { useState } from "react";
import { Image, Platform, Text, TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import AppInfoDisplay from "../../components/main/mySetting/appInfoDisplay";
import MyProfileIcon from "../../components/main/mySetting/myProfileIcon";
import SettingButtonContainer from "../../components/main/mySetting/settingButtonContainer";

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
          <MyProfileIcon isEditable={true}/>
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
