import React from "react";
import { Image, Text, View } from "react-native";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

const LoginLogo = () => {
  return (
    <StyledView className="relative flex-1">
      <StyledView className="absolute top-[26vh] w-screen flex-1 items-center">
        <StyledImage
          source={require("../../../assets/logo/icon.png")}
          className="mb-[26px] h-[80px] w-[80px]"
        />
        <StyledText className="text-[18px] font-bold text-white">
          3分で出会えるマッチングアプリ
        </StyledText>
      </StyledView>
    </StyledView>
  );
};

export default LoginLogo;
