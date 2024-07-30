import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, TextInput, Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import { styled } from "nativewind";
import Icon from "react-native-vector-icons/MaterialIcons";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);

const LoginModal = ({
  isVisibleLoginModal,
  setIsVisibleLoginModal
}:
  {
    isVisibleLoginModal: boolean
    setIsVisibleLoginModal: any
  }) => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    console.log("Login");
  };

  return (

    <StyledView className="relative flex-1 z-40">
      <StyledView
        className="absolute z-40 h-screen w-screen flex-1 items-center"
      >
        {/* クローズボタン */}
        <StyledTouchableOpacity
          onPress={() => setIsVisibleLoginModal(false)}
          className="absolute z-40 w-screen h-[62vh] top-0"
        ></StyledTouchableOpacity>
        {/* 赤色オーバーレイ */}
        <StyledView className="absolute w-screen h-[38vh] bg-[#ff3e25] bottom-0 opacity-80"></StyledView>

        {/* ログインフォームコンテイナー */}
        <StyledView className="absolute w-screen h-[38vh] bottom-0 px-8 py-4">
          <StyledView className="w-[70vw] flex-1 items-center mt-[30px]">
            {/* Email */}
            <StyledView className="border-b-2 border-[#fff] w-full pb-[10px] mb-[12px] flex flex-row items-center">
              <Icon name="email" size={30} color="#fff" className="mr-[10px]" />
              <StyledTextInput
                onChangeText={setEmail}
                placeholder="email"
                placeholderTextColor="#ffb9b9"
                className="text-[#fff] text-[16px] pl-[12px] w-full py-[6px]"
              />
            </StyledView>

            {/* Password */}
            <StyledView className="border-b-2 border-[#fff] w-full pb-[10px] flex flex-row items-center">
              <Icon name="lock" size={30} color="#fff" className="mr-[10px]" />
              <StyledTextInput
                onChangeText={setPassword}
                secureTextEntry={true}
                placeholder="password"
                placeholderTextColor="#ffb9b9"
                className="text-[#fff] text-[16px] pl-[12px] w-full py-[6px]"
              />
            </StyledView>
          </StyledView>

          {/* パスワードを忘れた方は */}
          <StyledText className="text-white absolute bottom-[4vh] left-[6vw]">
            パスワードを忘れた方は
            <StyledText className="text-[#1d4ed8] underline">こちら</StyledText>
          </StyledText>

          {/* ログインボタン */}
          <StyledTouchableOpacity
            onPress={handleLogin}
            className="absolute bottom-[8vh] right-[10vw] w-[100px] h-[48px] rounded-lg bg-[#fff] flex items-center justify-center"
          >
            <StyledText className="text-[#E04B36] text-[16px]">ログイン</StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </StyledView>
    </StyledView>

  );
};

export default LoginModal;
