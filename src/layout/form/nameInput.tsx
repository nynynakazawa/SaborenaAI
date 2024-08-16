import React, { useEffect } from "react";
import { Text, TextInput, View } from "react-native";
import { styled } from "nativewind";
import Icon from "react-native-vector-icons/MaterialIcons";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);

const NameInput = ({
  name,
  setName,
  isEditable = true,
}: {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  isEditable: boolean;
}) => {
  return (
    <StyledView className="mx-auto mb-[24px] w-[90vw]">
      <StyledView className="flex flex-row items-center">
        <Icon
          name="drive-file-rename-outline"
          size={38}
          color="#333"
          className="mr-[10px]"
        />
        <StyledText className="text-[16px]">
          名前 {isEditable && "(再変更不可)"}
          {isEditable ? (
            <StyledText className="text-[#f00]">*</StyledText>
          ) : (
            <StyledText className="text-[#333]">(編集不可)</StyledText>
          )}
        </StyledText>
      </StyledView>
      <StyledView className="flex w-full flex-row items-center pb-[10px]">
        <StyledTextInput
          onChangeText={setName}
          value={name}
          placeholder="8文字まで"
          placeholderTextColor="#ccc"
          maxLength={8}
          editable={isEditable} // ここでisEditableを使用
          className="w-full border-b-2 border-[#333] py-[6px] pl-[12px] text-[16px] text-[#333]"
        />
      </StyledView>
    </StyledView>
  );
};

export default NameInput;
