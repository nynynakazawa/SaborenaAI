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
    <StyledView className="mx-auto mt-[1vh] w-[50vw] p-2">
      <StyledView className="flex flex-row justify-between">
        <StyledText className="mb-2">基本情報の入力</StyledText>
        <StyledText className="mb-2">{text} / 3</StyledText>
      </StyledView>
      <StyledView className="h-[12px] w-[50vw] rounded-full bg-gray-300">
        <StyledView
          className="h-full rounded-full bg-[#E04B36]"
          style={{ width: `${percentage}%` }}
        />
      </StyledView>
    </StyledView>
  );
};

export default ProgressBar;
