import React, { useState } from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
import { styled } from "nativewind";
import { UserData } from "../../../types/userData";
import Icon from "react-native-vector-icons/Entypo";
import NameDisplayComponent from "../../../layout/display/nameDisplayComponent";

const StyledView = styled(View)
const StyledText = styled(Text)
const StyledImage = styled(Image)
const StyledTouchableOpacity = styled(TouchableOpacity)

const MyProfileIcon = ({
  myUser
}:
  {
    myUser: UserData | undefined
  }) => {
  return (
    <StyledTouchableOpacity
      className="flex items-center"
      activeOpacity={0.8}
    >
      <StyledView className="absolute">
        <StyledImage
          source={{ uri: myUser?.user_info?.imageUrl }}
          style={{ width: 100, height: 100 }}
          className="rounded-full"
        />
        <StyledView className="absolute bottom-[-4px] right-[-4px] w-[40px] h-[40px] rounded-full bg-[#fafafa] border-[1px] border-[#eee] flex justify-center items-center">
          <Icon name="pencil" size={26} color={"#333"} className="bottom-0 right-0"/>
        </StyledView>
        <StyledView className="text-[16px] absolute bottom-[-50px]">
          <NameDisplayComponent myUser={myUser} />
        </StyledView>
      </StyledView>
    </StyledTouchableOpacity>
  )
}

export default MyProfileIcon
