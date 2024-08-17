import React from "react";
import { Image, View } from "react-native";
import { styled } from "nativewind";

const StyledView = styled(View);

const LoginBackground = () => {
  return (
    <StyledView className="relative">
      <Image
        source={require("../../../assets/login/109.jpg")}
        className="absolute left-0 top-0 z-[-1000] h-screen w-screen"
      />
      <StyledView className="z-[-999] h-screen w-screen bg-[#E04B36] opacity-60"></StyledView>
    </StyledView>
  );
};

export default LoginBackground;
