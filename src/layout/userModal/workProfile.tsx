import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";
import Icon from "react-native-vector-icons/MaterialIcons";

const StyledView = styled(View);
const StyledText = styled(Text);

const WorkProfile = ({
  selectedWork,
}: {
  selectedWork: string | undefined;
}) => {
  return (
    <StyledView className="mx-auto mb-[12px] flex w-full flex-row items-center justify-between rounded-lg p-[8px]">
      <StyledView className="flex flex-row items-center">
        <Icon
          name="work"
          size={32}
          color="#333"
          className="ml-[8px] mr-[16px]"
        />
        <StyledText className="text-[16px] text-[#333]">仕事</StyledText>
      </StyledView>
      <StyledView className="flex w-full items-center justify-center rounded-md px-[16px] py-[6px]">
        <StyledText
          className={`text-[16px] text-[#333] ${selectedWork === "未設定" ? "text-[#ccc]" : ""}`}
        >
          {selectedWork}
        </StyledText>
      </StyledView>
    </StyledView>
  );
};

export default WorkProfile;
