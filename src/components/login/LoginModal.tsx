import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { styled } from "nativewind";
import Icon from "react-native-vector-icons/MaterialIcons";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);

const LoginModal = ({
  setIsVisibleLoginModal,
}: {
  setIsVisibleLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  const handleLogin = () => {
    console.log("Login");
  };

  return (
    <StyledView className="relative z-40 flex-1">
      <StyledView
        className={`absolute z-40 h-screen w-screen flex-1 items-center ${keyboardHeight > 0 && "top-[-38vh]"}`}
      >
        {/* クローズボタン */}
        <StyledTouchableOpacity
          onPress={() => setIsVisibleLoginModal(false)}
          className="absolute top-0 z-40 h-[62vh] w-screen"
        ></StyledTouchableOpacity>
        {/* 赤色オーバーレイ */}
        <StyledView className="absolute bottom-[-62vh] h-[100vh] w-screen bg-[#ff3e25] opacity-80"></StyledView>

        {/* ログインフォーム */}
        <StyledView className="absolute bottom-0 flex h-[38vh] w-screen items-center px-8 py-4">
          <StyledView className="mt-[30px] w-[90%] flex-1 items-center">
            {/* メールアドレス */}
            <StyledView className="mb-[12px] flex w-full flex-row items-center border-b-2 border-[#fff] pb-[10px]">
              <Icon name="email" size={30} color="#fff" className="mr-[10px]" />
              <StyledTextInput
                onChangeText={setEmail}
                placeholder="メールアドレス"
                placeholderTextColor="#ffb9b9"
                className="w-full py-[6px] pl-[12px] text-[16px] text-[#fff]"
              />
            </StyledView>

            {/* Password */}
            <StyledView className="flex w-full flex-row items-center border-b-2 border-[#fff] pb-[10px]">
              <Icon name="lock" size={30} color="#fff" className="mr-[10px]" />
              <StyledTextInput
                onChangeText={setPassword}
                secureTextEntry={!isVisiblePassword}
                placeholder="パスワード"
                placeholderTextColor="#ffb9b9"
                className="w-[72%] py-[6px] pl-[12px] text-[16px] text-[#fff]"
              />
              <TouchableOpacity
                onPress={() => setIsVisiblePassword(!isVisiblePassword)}
                className="ml-[10px]"
              >
                <Icon
                  name={isVisiblePassword ? "visibility" : "visibility-off"}
                  size={30}
                  color="#fff"
                />
              </TouchableOpacity>
            </StyledView>
          </StyledView>

          {/* パスワードを忘れた方は */}
          <StyledText className="absolute bottom-[4vh] left-[6vw] text-white">
            パスワードを忘れた方は
            <StyledText className="text-[#1d4ed8] underline">こちら</StyledText>
          </StyledText>

          {/* ログインボタン */}
          <StyledTouchableOpacity
            onPress={handleLogin}
            className="absolute bottom-[8vh] right-[10vw] flex h-[48px] w-[100px] items-center justify-center rounded-lg bg-[#fff]"
          >
            <StyledText className="text-[16px] text-[#E04B36]">
              ログイン
            </StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </StyledView>
    </StyledView>
  );
};

export default LoginModal;
