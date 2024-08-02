import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const TransitionButton = ({
  scene,
  setScene,
  isValid,
}: {
  scene: number;
  setScene: React.Dispatch<React.SetStateAction<number>>;
  isValid: boolean;
}) => {
  const handleNext = () => {
    setScene((prev) => prev + 1);
  };

  return (
    <StyledView className="absolute bottom-[8vh] w-screen flex-1 items-center">
      <StyledView className="mx-auto mb-4 flex w-[75vw] flex-row justify-between">
        {/* prevボタン */}
        <StyledTouchableOpacity
          onPress={() => setScene((prev) => prev - 1)}
          className={`flex h-[48px] w-[100px] items-center justify-center rounded-lg bg-[#E04B36] ${scene == 1 && "opacity-0"}`}
        >
          <StyledText className="text-[16px] text-[#fff]">戻る</StyledText>
        </StyledTouchableOpacity>

        <StyledTouchableOpacity
          onPress={handleNext}
          className={`flex h-[48px] w-[100px] items-center justify-center rounded-lg bg-[#44e25f] ${!isValid && "opacity-30"}`}
          disabled={!isValid}
        >
          <StyledText className="text-[16px] text-[#fff]">次へ</StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    </StyledView>
  );
};

export default TransitionButton;
