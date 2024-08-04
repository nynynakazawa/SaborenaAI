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

const SelfIntroductionProfile = ({
  selfIntroduction,
}: {
  selfIntroduction: string | undefined;
}) => {
  const [inputFocused, setInputFocused] = useState<boolean>(false);

  const handleFocus = () => setInputFocused(true);
  const handleBlur = () => setInputFocused(false);

  const handleSubmit = () => {
    Keyboard.dismiss();
    setInputFocused(false);
  };

  return (
    <StyledView className="mx-auto w-full">
      <StyledView className="flex flex-row items-center justify-between">
        <StyledView className="flex flex-row items-center">
          <Icon name="face-man" size={38} color="#333" className="mr-[10px]" />
          <StyledText className="text-[16px] text-[#333]">自己紹介</StyledText>
        </StyledView>
      </StyledView>
      <StyledText className="text-[16px] text-[#333]">
        {selfIntroduction}
      </StyledText>
    </StyledView>
  );
};

export default SelfIntroductionProfile;
