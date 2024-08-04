import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";
import { UserData } from "../../../types/userData";
import Icon from "react-native-vector-icons/Entypo";
import NameDisplayComponent from "../../../layout/display/nameDisplayComponent";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

const MyProfileIcon = ({ myUser }: { myUser: UserData | null }) => {
  return (
    <StyledTouchableOpacity className="flex items-center" activeOpacity={0.8}>
      <StyledView className="absolute">
        <StyledImage
          source={{ uri: myUser?.user_info?.image_url }}
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
        <StyledView className="absolute bottom-[-50px] text-[16px]">
          <NameDisplayComponent user={myUser} />
        </StyledView>
      </StyledView>
    </StyledTouchableOpacity>
  );
};

export default MyProfileIcon;
