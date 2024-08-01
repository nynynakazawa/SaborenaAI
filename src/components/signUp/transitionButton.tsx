import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";

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
    <StyledView className="flex-1 items-center w-screen absolute bottom-[8vh]">
      <StyledView className="flex flex-row w-[75vw] mx-auto justify-between mb-4">
        {/* prevボタン */}
        <StyledTouchableOpacity
          onPress={() => setScene((prev) => prev - 1)}
          className={
            `flex h-[48px] w-[100px] items-center justify-center rounded-lg bg-[#3685e0]
            ${scene == 0 && "opacity-0"}`
          }
        >
          <StyledText className="text-[16px] text-[#fff]">戻る</StyledText>
        </StyledTouchableOpacity>

        <StyledTouchableOpacity
          onPress={handleNext}
          className={`flex h-[48px] w-[100px] items-center justify-center rounded-lg bg-[#E04B36] ${!isValid && "opacity-30"}`}
          disabled={!isValid}
        >
          <StyledText className="text-[16px] text-[#fff]">次へ</StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    </StyledView>
  );
};

export default TransitionButton;
