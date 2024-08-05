import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { styled } from "nativewind";
import Icon from "react-native-vector-icons/Entypo";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

const WhatNowProfile = ({
  whatNow,
}: {
  whatNow: string | undefined;
}) => {

  return (
    <StyledView className="mx-auto mb-[24px] w-full">
      <StyledView className="flex flex-row items-center justify-between">
        <StyledView className="flex flex-row items-center mb-[12px]">
          <Icon name="message" size={36} color="#333" className="mr-[10px]" />
          <StyledText className="text-[16px] text-[#333] mb-[8px]">いまなにしてる？</StyledText>
        </StyledView>
      </StyledView>
      <StyledText className="text-[16px] text-[#333]">
        {whatNow}
      </StyledText>
    </StyledView>
  );
};

export default WhatNowProfile;
