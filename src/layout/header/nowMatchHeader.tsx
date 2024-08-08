import React from "react";
import { Image, Platform, Text, View } from "react-native";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

const NowMatchHeader = () => {
  return (
    <StyledView
      className={`mx-auto flex h-[70px] w-full items-center border-b-[1px] border-[#e8e8e8] bg-[#fff] ${Platform.OS === "ios" && "mt-[50px]"}`}
    >
      <StyledView className="flex h-full w-[90vw] flex-row items-center">
        <StyledImage
          source={require("../../../assets/logo/icon.png")}
          className="h-[60px] w-[60px]"
        />
        <StyledText className="ml-[16px] flex-1 text-[16px] text-[#333]">
          Now Match
        </StyledText>
      </StyledView>
    </StyledView>
  );
};

export default NowMatchHeader;
