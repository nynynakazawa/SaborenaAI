import React from "react";
import { View, Text } from "react-native";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);

const ProgressBar = ({
  percentage,
  text,
}: {
  percentage: number;
  text: string;
}) => {
  return (
    <StyledView className="w-[50vw] mx-auto mt-[2vh] p-2">
      <StyledView className="flex flex-row justify-between">
        <StyledText className="mb-2">基本情報の入力</StyledText>
        <StyledText className="mb-2">{text} / 3</StyledText>
      </StyledView>
      <StyledView className="w-[50vw] h-[12px] bg-gray-300 rounded-full">
        <StyledView
          className="h-full bg-[#E04B36] rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </StyledView>
    </StyledView>
  );
};

export default ProgressBar;
