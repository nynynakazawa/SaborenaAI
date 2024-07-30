import React from "react";
import { Text, View } from "react-native";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);

const LoginButtonContainer = () => {
  return (
    <StyledView className="relative flex-1">
      <StyledView className="absolute top-[60vh] w-screen flex-1 items-center">
        {/* サインアップ */}
        <StyledView className="flex h-[60px] w-[66vw] items-center justify-center rounded-full bg-[#fff]">
          <StyledText className="text-[16px] text-[#E04B36]">
            アカウント作成
          </StyledText>
        </StyledView>
        {/* OR罫線 */}
        <StyledView className="my-[30px] flex flex-row items-center">
          <StyledView className="h-[2px] w-[30vw] bg-[#fff]"></StyledView>
          <StyledText className="px-[10px] text-[#fff]"> OR </StyledText>
          <StyledView className="h-[2px] w-[30vw] bg-[#fff]"></StyledView>
        </StyledView>
        {/* サインイン */}
        <StyledView className="flex h-[60px] w-[66vw] items-center justify-center rounded-full border-2 border-[#fff]">
          <StyledText className="text-[16px] text-[#fff]">ログイン</StyledText>
        </StyledView>
      </StyledView>
      {/* 利用規約 */}
      <StyledView className="absolute h-screen w-screen flex-1 items-center">
        <StyledText className="absolute bottom-[5vh] text-[#fff]">
          利用規約, プライバシーポリシー
        </StyledText>
      </StyledView>
    </StyledView>
  );
};

export default LoginButtonContainer;
