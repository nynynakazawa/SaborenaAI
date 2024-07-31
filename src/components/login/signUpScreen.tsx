import React, { useState } from "react";
import { Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { styled } from "nativewind";
import Icon from "react-native-vector-icons/MaterialIcons";
import TermModal from "./TermModal";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "expo-router";

const StyledView = styled(View)
const StyledText = styled(Text)
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);

const SignUpScreen = ({
  setIsVisibleSignUpScreen
}: {
  setIsVisibleSignUpScreen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // サインアップ処理
  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.push("/firstSettingPage");
        console.log("🎉sign up success")
      })
      .catch(() => {
        setIsError(true);
      });
  };

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  const [passwordAgain, setPasswordAgain] = useState<string>("");
  const [isVisiblePasswordAgain, setIsVisiblePasswordAgain] = useState<boolean>(false);
  const [isOver18, setIsOver18] = useState<boolean>(false);
  const [isAgreeTerms, setIsAgreeTerms] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const router = useRouter();

  function isValiedPassword(password: string) {
    const pattern = /^[A-Za-z@]{8,}$/;
    return pattern.test(password);
  }

  const [isVisibleTermModal, setIsVisibleTermModal] = useState<boolean>(false);
  const isValid: boolean = (email.trim() != "" && password.trim() != "") && (password == passwordAgain) && (isOver18 && isAgreeTerms) && isValiedPassword(password);

  return (
    <StyledView className="relative flex-1 z-50">
      <StyledView className="bg-[#fff] w-screen h-screen relative">
        {/* バックボタン */}
        <StyledTouchableOpacity
          onPress={() => setIsVisibleSignUpScreen(false)}
          className={`${Platform.OS === "ios" && "mt-[50px]"} h-[70px]`}
        >
          <StyledView className="flex flex-row items-center w-[90vw] h-full mx-auto">
            <Icon name="chevron-left" size={40} color="#333" className="mr-[10px]" />
            <StyledText className="text-[16px] text-[#333]">戻る</StyledText>
          </StyledView>
        </StyledTouchableOpacity>

        {/* サインアップフォーム */}
        <StyledView className="mt-[10vh] w-[90%] mx-auto flex-1 items-center">
          {/* メールアドレス */}
          <StyledView className="mb-[56px] flex w-full flex-row items-center border-b-2 border-[#333] pb-[10px]">
            <Icon name="email" size={30} color="#333" className="mr-[10px]" />
            <StyledTextInput
              onChangeText={setEmail}
              placeholder="メールアドレス"
              placeholderTextColor="#ccc"
              className="w-full pt-[6px] pb-[2px] pl-[12px] text-[16px] text-[#333]"
            />
          </StyledView>

          {/* パスワード */}
          <StyledView className="w-full">
            <StyledView className="mb-[6px] flex w-full flex-row items-center border-b-2 border-[#333] pb-[10px]">
              <Icon name="lock" size={30} color="#333" className="mr-[10px]" />
              <StyledTextInput
                onChangeText={setPassword}
                secureTextEntry={!isVisiblePassword}
                placeholder="パスワード"
                placeholderTextColor="#ccc"
                className="w-[72%] pt-[6px] pb-[2px] pl-[12px] text-[16px] text-[#333]"
              />
              <TouchableOpacity
                onPress={() => setIsVisiblePassword(!isVisiblePassword)}
                className="ml-[10px]"
              >
                <Icon
                  name={isVisiblePassword ? "visibility" : "visibility-off"}
                  size={30}
                  color="#333"
                />
              </TouchableOpacity>
            </StyledView>
            <StyledText
              className={`ml-[4px] text-[12px] text-[#FF0000] mb-[18px] ${!(password && !isValiedPassword(password)) && "opacity-0"}`}
            >※ 英文字8文字以上である必要があります
            </StyledText>
          </StyledView>

          {/* もう一度入力 */}
          <StyledView className="w-full">
            <StyledText className="mb-[6px] ml-[4px] text-[#333]">もう一度パスワードを入力してください</StyledText>
            <StyledView className="flex w-full flex-row items-center border-b-2 border-[#333] pb-[10px] mb-[6px]">
              <Icon name="lock" size={30} color="#333" className="mr-[10px]" />
              <StyledTextInput
                onChangeText={setPasswordAgain}
                secureTextEntry={!isVisiblePasswordAgain}
                placeholder="パスワード"
                placeholderTextColor="#ccc"
                className="w-[72%] pt-[6px] pb-[2px]  pl-[12px] text-[16px] text-[#333]"
              />
              <TouchableOpacity
                onPress={() => setIsVisiblePasswordAgain(!isVisiblePasswordAgain)}
                className="ml-[10px]"
              >
                <Icon
                  name={isVisiblePasswordAgain ? "visibility" : "visibility-off"}
                  size={30}
                  color="#333"
                />
              </TouchableOpacity>
            </StyledView>
            <StyledText
              className={`mb-[24px] text-[12px] ml-[4px] text-[#FF0000] ${!(password && passwordAgain && passwordAgain != password) && "opacity-0"}`}
            >※ 一致しません
            </StyledText>
          </StyledView>

          {/* チェックボックス */}
          <StyledView className="w-full mt-[20px] flex gap-[22px]">
            <BouncyCheckbox
              size={25}
              fillColor="red"
              text="18歳以上です"
              iconStyle={{ borderColor: "red" }}
              textStyle={{ textDecorationLine: "none" }}
              isChecked={isOver18}
              onPress={(isChecked: boolean) => setIsOver18(isChecked)}
            />
            <StyledView>
              <BouncyCheckbox
                size={25}
                fillColor="red"
                text="利用規約に同意します"
                iconStyle={{ borderColor: "red" }}
                textStyle={{ textDecorationLine: "none" }}
                isChecked={isAgreeTerms}
                onPress={(isChecked: boolean) => setIsAgreeTerms(isChecked)}
              />
              <StyledTouchableOpacity
                onPress={() => setIsVisibleTermModal(true)}
                className="absolute right-0"
              >
                <StyledText className="text-[#1d4ed8]">
                  利用規約
                </StyledText>
              </StyledTouchableOpacity>
            </StyledView>
          <StyledText className={`text-[#ff0000] ${!isError && "opacity-0"}`}>
            登録に失敗しました
          </StyledText>
          </StyledView>
        </StyledView>
        {/* ログインボタン */}
        <StyledTouchableOpacity
          onPress={handleSignUp}
          className={
            `absolute bottom-[12vh] right-[10vw] flex h-[48px] w-[100px] items-center justify-center rounded-lg bg-[#E04B36]
            ${!isValid && "opacity-30"}`
          }
          disabled={!isValid}
        >
          <StyledText className="text-[16px] text-[#fff]">
            新規登録
          </StyledText>
        </StyledTouchableOpacity>

        <TermModal
          visible={isVisibleTermModal}
          onClose={() => setIsVisibleTermModal(false)}
        />

        <StyledView className="absolute w-screen h-[20px] bg-[#E3422F] bottom-0"></StyledView>
      </StyledView>
    </StyledView>
  )
}

export default SignUpScreen;
