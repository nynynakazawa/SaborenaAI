import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text)
const StyledTouchableOpacity = styled(TouchableOpacity);;

const LoginButtonContainer = ({
    setIsVisibleLoginModal
  }:
  {
    setIsVisibleLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
  
  const displayLoginModal = () => {
    setIsVisibleLoginModal(true);
  }
  return (
    <StyledView className="relative flex-1 z-10">
      <StyledView className="absolute z-10 top-[60vh] w-screen flex-1 items-center">
        {/* サインアップ */}
        <StyledTouchableOpacity
          onPress={() => console.log("サインアップ")}
          className="flex h-[60px] w-[66vw] items-center justify-center rounded-full bg-[#fff]">
          <StyledText className="text-[16px] text-[#E04B36]">
            アカウント作成
          </StyledText>
        </StyledTouchableOpacity>

        {/* OR罫線 */}
        <StyledView className="my-[30px] flex flex-row items-center">
          <StyledView className="h-[2px] w-[30vw] bg-[#fff]"></StyledView>
          <StyledText className="px-[10px] text-[#fff]"> OR </StyledText>
          <StyledView className="h-[2px] w-[30vw] bg-[#fff]"></StyledView>
        </StyledView>

        {/* サインイン */}
        <StyledTouchableOpacity
          onPress={() => setIsVisibleLoginModal(true)}
          className="flex h-[60px] w-[66vw] items-center justify-center rounded-full border-2 border-[#fff]">
          <StyledText className="text-[16px] text-[#fff]">
            ログイン
          </StyledText>
        </StyledTouchableOpacity>
      </StyledView>
      <StyledTouchableOpacity
        onPress={() => console.log("利用規約")}
        className="absolute h-screen w-screen flex-1 items-center"
      >
        <StyledText className="absolute bottom-[5vh] text-[#fff]">
          利用規約
        </StyledText>
      </StyledTouchableOpacity>
    </StyledView>

  )
}

export default LoginButtonContainer;
