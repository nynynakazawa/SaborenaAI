import React from "react";
import { Text, TextInput, View } from "react-native";
import { styled } from "nativewind";
import Icon from "react-native-vector-icons/MaterialIcons";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);

const NameInput = ({
  setName,
}: {
  setName: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <StyledView className="mx-auto w-[90vw]">
      <StyledView className="flex flex-row items-center">
        <Icon
          name="drive-file-rename-outline"
          size={38}
          color="#333"
          className="mr-[10px]"
        />
        <StyledText className="text-[16px]">
          名前(8文字まで)<StyledText className="text-[#f00]">*</StyledText>
        </StyledText>
      </StyledView>
      <StyledView className="mb-[12px] flex w-full flex-row items-center border-b-2 border-[#fff] pb-[10px]">
        <StyledTextInput
          onChangeText={setName}
          placeholder="あだ名など"
          placeholderTextColor="#ccc"
          maxLength={8}
          className="w-full border-b-2 border-[#333] py-[6px] pl-[12px] text-[16px] text-[#333]"
        />
      </StyledView>
    </StyledView>
  );
};

export default NameInput;
