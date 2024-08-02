import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";
import Icon from "react-native-vector-icons/MaterialIcons";

const StyledView = styled(View);
const StyledTextInput = styled(TextInput);

const EmailInput = ({
  email,
  setEmail,
  option,
}: {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  option: string;
}) => {
  return (
    <StyledView className="w-full">
      <StyledView
        className={`flex flex-row items-center border-b-2 pb-[10px] ${
          option === "login" ? "border-[#fff]" : "border-[#333]"
        }`}
      >
        <Icon
          name="email"
          size={30}
          color={option === "login" ? "#fff" : "#333"}
          className="mr-[10px]"
        />
        <StyledTextInput
          onChangeText={setEmail}
          value={email}
          placeholder="メールアドレス"
          placeholderTextColor={option === "login" ? "#ffb9b9" : "#ccc"}
          className={`max-w-[80%] pb-[2px] pl-[12px] pt-[6px] text-[16px] ${
            option === "login" ? "text-[#fff]" : "text-[#333]"
          }`}
        />
      </StyledView>
    </StyledView>
  );
};

export default EmailInput;
