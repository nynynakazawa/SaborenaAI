import React, { useState } from "react";
import {
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { styled } from "nativewind";
import Icon from "react-native-vector-icons/MaterialIcons";
import TermModal from "../../login/termModal";
import { auth } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useRouter } from "expo-router";
import TransitionButton from "../transitionButton";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);

const SignUpScreen = ({
  scene,
  setScene,
  email,
  setEmail,
  password,
  setPassword,
}:{
  scene: number;
  setScene: React.Dispatch<React.SetStateAction<number>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}) => {
  // サインアップ処理
  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.push("/firstSettingPage");
        console.log("🎉sign up success");
      })
      .catch(() => {
        setIsError(true);
      });
  };

  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  const [passwordAgain, setPasswordAgain] = useState<string>("");
  const [isVisiblePasswordAgain, setIsVisiblePasswordAgain] =
    useState<boolean>(false);
  const [isOver18, setIsOver18] = useState<boolean>(false);
  const [isAgreeTerms, setIsAgreeTerms] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const router = useRouter();
  
  const [isVisibleTermModal, setIsVisibleTermModal] = useState<boolean>(false);
  // バリデーションチェック
  function isValiedPassword(password: string) {
    const pattern = /^[A-Za-z@]{8,}$/;
    return pattern.test(password);
  }
  const isValid: boolean =
    email.trim() != "" &&
    password.trim() != "" &&
    password == passwordAgain &&
    isOver18 &&
    isAgreeTerms &&
    isValiedPassword(password);

  return (
    <StyledView>
      <StyledView className="relative h-screen w-screen bg-[#fff]">
        {/* バックボタン */}
        <StyledTouchableOpacity
          onPress={() => router.push("/loginPage")}
          className={`${Platform.OS === "ios" && "mt-[50px]"} h-[70px]`}
        >
          <StyledView className="mx-auto flex h-full w-[90vw] flex-row items-center">
            <Icon
              name="chevron-left"
              size={40}
              color="#333"
              className="mr-[10px]"
            />
            <StyledText className="text-[16px] text-[#333]">戻る</StyledText>
          </StyledView>
        </StyledTouchableOpacity>

        {/* サインアップフォーム */}
        <StyledView className="mx-auto mt-[10vh] w-[90%] flex-1 items-center">
          {/* メールアドレス */}
          <StyledView className="mb-[56px] flex w-full flex-row items-center border-b-2 border-[#333] pb-[10px]">
            <Icon name="email" size={30} color="#333" className="mr-[10px]" />
            <StyledTextInput
              onChangeText={setEmail}
              placeholder="メールアドレス"
              placeholderTextColor="#ccc"
              className="w-full pb-[2px] pl-[12px] pt-[6px] text-[16px] text-[#333]"
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
                className="w-[72%] pb-[2px] pl-[12px] pt-[6px] text-[16px] text-[#333]"
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
              className={`mb-[18px] ml-[4px] text-[12px] text-[#FF0000] ${!(password && !isValiedPassword(password)) && "opacity-0"}`}
            >
              ※ 英文字8文字以上である必要があります
            </StyledText>
          </StyledView>

          {/* もう一度入力 */}
          <StyledView className="w-full">
            <StyledText className="mb-[6px] ml-[4px] text-[#333]">
              もう一度パスワードを入力してください
            </StyledText>
            <StyledView className="mb-[6px] flex w-full flex-row items-center border-b-2 border-[#333] pb-[10px]">
              <Icon name="lock" size={30} color="#333" className="mr-[10px]" />
              <StyledTextInput
                onChangeText={setPasswordAgain}
                secureTextEntry={!isVisiblePasswordAgain}
                placeholder="パスワード"
                placeholderTextColor="#ccc"
                className="w-[72%] pb-[2px] pl-[12px] pt-[6px] text-[16px] text-[#333]"
              />
              <TouchableOpacity
                onPress={() =>
                  setIsVisiblePasswordAgain(!isVisiblePasswordAgain)
                }
                className="ml-[10px]"
              >
                <Icon
                  name={
                    isVisiblePasswordAgain ? "visibility" : "visibility-off"
                  }
                  size={30}
                  color="#333"
                />
              </TouchableOpacity>
            </StyledView>
            <StyledText
              className={`mb-[24px] ml-[4px] text-[12px] text-[#FF0000] ${!(password && passwordAgain && passwordAgain != password) && "opacity-0"}`}
            >
              ※ 一致しません
            </StyledText>
          </StyledView>

          {/* チェックボックス */}
          <StyledView className="mt-[20px] flex w-full gap-[22px]">
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
                <StyledText className="text-[#1d4ed8]">利用規約</StyledText>
              </StyledTouchableOpacity>
            </StyledView>
            <StyledText className={`text-[#ff0000] ${!isError && "opacity-0"}`}>
              登録に失敗しました
            </StyledText>
          </StyledView>
        </StyledView>

        <TermModal
          visible={isVisibleTermModal}
          onClose={() => setIsVisibleTermModal(false)}
        />
      </StyledView>

      <TransitionButton
        scene={scene}
        setScene={setScene}
        isValid={true}
      ></TransitionButton>
    </StyledView>
  );
};

export default SignUpScreen;
