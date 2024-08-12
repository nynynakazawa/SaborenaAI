import React from "react";
import {
  Text,
  View,
} from "react-native";
import { styled } from "nativewind";
import Icon from "react-native-vector-icons/Entypo";

const StyledView = styled(View);
const StyledText = styled(Text);

const WhatNowProfile = ({ whatNow }: { whatNow: string | undefined }) => {
  return (
    <StyledView className="mx-auto mb-[24px] w-full">
      <StyledView className="flex flex-row items-center justify-between">
        <StyledView className="mb-[12px] flex flex-row items-center">
          <Icon name="message" size={36} color="#333" className="mr-[10px]" />
          <StyledText className="mb-[8px] text-[16px] text-[#333]">
            いまなにしてる？
          </StyledText>
        </StyledView>
      </StyledView>
      <StyledText className="text-[16px] text-[#333]">{whatNow}</StyledText>
    </StyledView>
  );
};

export default WhatNowProfile;
