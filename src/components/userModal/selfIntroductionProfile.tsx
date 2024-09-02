import React from "react";
import { Text, View } from "react-native";
import { styled } from "nativewind";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const StyledView = styled(View);
const StyledText = styled(Text);

const SelfIntroductionProfile = ({
  selfIntroduction,
}: {
  selfIntroduction: string | undefined;
}) => {
  return (
    <StyledView className="mx-auto mb-[24px] w-full">
      <StyledView className="flex flex-row items-center justify-between">
        <StyledView className="mb-[12px] flex flex-row items-center">
          <Icon name="face-man" size={38} color="#333" className="mr-[10px]" />
          <StyledText className="text-[16px] text-[#333]">自己紹介</StyledText>
        </StyledView>
      </StyledView>
      <StyledText className="text-[16px] text-[#333]">
        {selfIntroduction}
      </StyledText>
    </StyledView>
  );
};

export default SelfIntroductionProfile;
