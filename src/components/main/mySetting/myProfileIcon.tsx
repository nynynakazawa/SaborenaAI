import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";
import { UserData } from "../../../types/userDataTypes";
import Icon from "react-native-vector-icons/Entypo";
import NameDisplayComponent from "../../../layout/display/nameDisplayComponent";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

const MyProfileIcon = () => {
  const myUserData = useSelector((state: any) => state.userData.value);
  const router = useRouter();

  return (
    <StyledTouchableOpacity
      className="flex h-[200px] w-screen items-center"
      onPress={() => {
        router.push("mySetting/settingMyProfilePage");
      }}
      activeOpacity={0.6}
    >
      <StyledView className="absolute">
        <StyledImage
          source={{ uri: myUserData?.image_url || undefined }}
          style={{ width: 100, height: 100 }}
          className="rounded-full"
        />
        <StyledView className="absolute bottom-[-4px] right-[-4px] flex h-[40px] w-[40px] items-center justify-center rounded-full border-[1px] border-[#eee] bg-[#fafafa]">
          <Icon
            name="pencil"
            size={26}
            color={"#333"}
            className="bottom-0 right-0"
          />
        </StyledView>
      </StyledView>
      <StyledView className="absolute bottom-[-50px] top-[120px] text-[16px]">
        <NameDisplayComponent userData={myUserData} />
      </StyledView>
    </StyledTouchableOpacity>
  );
};

export default MyProfileIcon;
