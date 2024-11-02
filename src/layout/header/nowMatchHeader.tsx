import React from "react";
import { Image, Platform, Text, View } from "react-native";
import { styled } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

const NowMatchHeader = () => {
  const Container = Platform.OS === "ios" ? SafeAreaView : View;
  return (
    <Container edges={["left", "right"]}>
      <StyledView
        className={`mx-auto flex h-[70px] w-full items-center border-b-[1px] border-[#e8e8e8] bg-[#fff] ${Platform.OS === "ios" && "mt-[50px]"}`}
      >
        <StyledView className="ml-[170px] flex h-full w-[90vw] flex-row items-center">
          <StyledImage
            source={require("../../../assets/logo/icon.png")}
            className="h-[60px] w-[60px]"
          />
          <StyledText className="flex-1 text-[20px] text-[#333]">
            Now Match
          </StyledText>
        </StyledView>
      </StyledView>
    </Container>
  );
};

export default NowMatchHeader;
