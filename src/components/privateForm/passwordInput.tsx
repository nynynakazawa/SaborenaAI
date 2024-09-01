import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";
import Icon from "react-native-vector-icons/MaterialIcons";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);

const PasswordInput = ({
  password,
  setPassword,
  option,
  isValid,
}: {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  option: string;
  isValid: boolean;
}) => {
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);

  const errorMessage =
    option === "first" && password && !isValid
      ? "※ 英数字6文字以上である必要があります"
      : option === "again" && password && !isValid
        ? "※ 一致しません"
        : "";

  const shouldShowError = password && !isValid;

  return (
    <StyledView className="w-full">
      {option !== "again" && (
        <StyledView
          className={`flex w-full flex-row items-center border-b-2 pb-[10px] ${
            option === "login" ? "border-[#fff]" : "border-[#333]"
          }`}
        >
          <Icon
            name="lock"
            size={30}
            color={option === "login" ? "#fff" : "#333"}
            className="mr-[10px]"
          />
          <StyledTextInput
            onChangeText={setPassword}
            secureTextEntry={!isVisiblePassword}
            placeholder="パスワード"
            maxLength={30}
            placeholderTextColor={option === "login" ? "#ffb9b9" : "#ccc"}
            value={password}
            className={`w-[72%] py-[6px] pl-[12px] text-[16px] ${
              option === "login" ? "text-[#fff]" : "text-[#333]"
            }`}
          />
          <StyledTouchableOpacity
            onPress={() => setIsVisiblePassword(!isVisiblePassword)}
            className="ml-[10px]"
          >
            <Icon
              name={isVisiblePassword ? "visibility" : "visibility-off"}
              size={30}
              color={option === "login" ? "#fff" : "#333"}
            />
          </StyledTouchableOpacity>
        </StyledView>
      )}
      {option === "first" && (
        <StyledText
          className={`mb-[18px] ml-[4px] text-[12px] text-[#FF0000] ${
            !shouldShowError ? "opacity-0" : ""
          }`}
        >
          {errorMessage}
        </StyledText>
      )}
      {option === "again" && (
        <StyledView className="w-full">
          <StyledText className="mb-[6px] ml-[4px] text-[#333]">
            もう一度パスワードを入力してください
          </StyledText>
          <StyledView className="mb-[6px] flex w-full flex-row items-center border-b-2 border-[#333] pb-[10px]">
            <Icon name="lock" size={30} color="#333" className="mr-[10px]" />
            <StyledTextInput
              onChangeText={setPassword}
              secureTextEntry={!isVisiblePassword}
              value={password}
              placeholder="パスワード"
              maxLength={30}
              placeholderTextColor="#ccc"
              className="w-[72%] pb-[2px] pl-[12px] pt-[6px] text-[16px] text-[#333]"
            />
            <StyledTouchableOpacity
              onPress={() => setIsVisiblePassword(!isVisiblePassword)}
              className="ml-[10px]"
            >
              <Icon
                name={isVisiblePassword ? "visibility" : "visibility-off"}
                size={30}
                color="#333"
              />
            </StyledTouchableOpacity>
          </StyledView>
          <StyledText
            className={`mb-[24px] ml-[4px] text-[12px] text-[#FF0000] ${
              !shouldShowError ? "opacity-0" : ""
            }`}
          >
            {errorMessage}
          </StyledText>
        </StyledView>
      )}
    </StyledView>
  );
};

export default PasswordInput;
