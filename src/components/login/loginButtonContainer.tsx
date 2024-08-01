import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";
import TermModal from "./termModal";
import { Link, useRouter } from "expo-router";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const LoginButtonContainer = ({
  setIsVisibleLoginModal,
}: {
  setIsVisibleLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isVisibleTermModal, setIsVisibleTermModal] = useState<boolean>(false);
  const router = useRouter();

  return (
    <StyledView className="relative z-10 flex-1">
      <StyledView className="absolute top-[60vh] z-10 w-screen flex-1 items-center">
        {/* サインアップ */}
        <StyledTouchableOpacity
          onPress={() => router.push("/signUpPage")}
          className="flex h-[60px] w-[66vw] items-center justify-center rounded-full bg-[#fff]"
        >
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
          className="flex h-[60px] w-[66vw] items-center justify-center rounded-full border-2 border-[#fff]"
        >
          <StyledText className="text-[16px] text-[#fff]">ログイン</StyledText>
        </StyledTouchableOpacity>
      </StyledView>

      {/* 利用規約 */}
      <StyledTouchableOpacity
        onPress={() => setIsVisibleTermModal(true)}
        className="absolute h-screen w-screen flex-1 items-center"
      >
        <StyledText className="absolute bottom-[5vh] text-[#fff]">
          利用規約
        </StyledText>
      </StyledTouchableOpacity>

      <TermModal
        visible={isVisibleTermModal}
        onClose={() => setIsVisibleTermModal(false)}
      />
    </StyledView>
  );
};

export default LoginButtonContainer;
