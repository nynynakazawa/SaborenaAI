import React, { useState } from "react"
import { Image, Platform, Text, TouchableOpacity, View } from "react-native"
import { styled } from "nativewind";
import { UserData } from "../../../types/userData";
import MyProfileIcon from "./myProfileIcon";
import NowMatchHeader from "../../../layout/header/nowMatchHeader";

const StyledView = styled(View)
const StyledText = styled(Text)
const StyledImage = styled(Image)
const StyledTouchableOpacity = styled(TouchableOpacity)

const MySettingScreen = ({
  myUser
}:
  {
    myUser: UserData | undefined
  }) => {
  return (
    <StyledView>
      <NowMatchHeader />
      <StyledView className={`absolute w-screen mt-[80px] flex items-center ${Platform.OS == "android" ? "top-[10vh]" : "top-[18vh]"}`}>
        <MyProfileIcon myUser={myUser}/>
      </StyledView>
    </StyledView>
  )
}

export default MySettingScreen
