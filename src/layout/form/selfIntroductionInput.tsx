import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { styled } from "nativewind";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

const SelfIntroductionInput = ({
  selfIntroduction,
  setSelfIntroduction,
}: {
  selfIntroduction: string;
  setSelfIntroduction: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [inputFocused, setInputFocused] = useState<boolean>(false);

  const handleFocus = () => setInputFocused(true);
  const handleBlur = () => setInputFocused(false);

  const handleSubmit = () => {
    Keyboard.dismiss();
    setInputFocused(false);
  };

  return (
    <StyledView className="mx-auto w-[90vw]">
      <StyledView className="mb-[6px] flex flex-row items-center justify-between">
        <StyledView className="flex flex-row items-center">
          <Icon name="face-man" size={38} color="#333" className="mr-[10px]" />
          <StyledText className="text-[16px]">自己紹介</StyledText>
          <StyledText className="ml-[12px] mt-[4px] text-[16px]">
            {selfIntroduction.length} / 140
          </StyledText>
        </StyledView>
        <StyledView className="flex flex-row items-center">
          {inputFocused && (
            <StyledTouchableOpacity
              onPress={handleSubmit}
              className="ml-[8px] rounded-full bg-[#57d0e0] p-2"
            >
              <StyledText className="text-[14px] text-white">決定</StyledText>
            </StyledTouchableOpacity>
          )}
        </StyledView>
      </StyledView>
      <StyledView className="mb-[12px] flex w-full pb-[10px]">
        <StyledTextInput
          onChangeText={setSelfIntroduction}
          value={selfIntroduction}
          placeholder={`自己紹介をしよう\n■ 好きなもの\n・アニメ\n・野球\n・寿司\n誰でも大歓迎♪`}
          placeholderTextColor="#ccc"
          maxLength={140}
          multiline
          textAlignVertical="top"
          className="h-[22vh] w-full rounded-lg border-2 border-[#333] p-4 text-[16px] text-[#333]"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </StyledView>
    </StyledView>
  );
};

export default SelfIntroductionInput;
