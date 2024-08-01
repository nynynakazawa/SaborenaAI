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
import { useRouter } from "expo-router";
import TransitionButton from "../transitionButton";
import EmailInput from "../../../layout/form/emailInput";
import PasswordInput from "../../../layout/form/passwordInput";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);

const Registration = ({
  scene,
  setScene,
  email,
  setEmail,
  password,
  setPassword,
  passwordAgain,
  setPasswordAgain,
  isOver18,
  setIsOver18,
  isAgreeTerms,
  setIsAgreeTerms,
}: {
  scene: number;
  setScene: React.Dispatch<React.SetStateAction<number>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  passwordAgain: string;
  setPasswordAgain: React.Dispatch<React.SetStateAction<string>>;
  isOver18: boolean;
  setIsOver18: React.Dispatch<React.SetStateAction<boolean>>;
  isAgreeTerms: boolean;
  setIsAgreeTerms: React.Dispatch<React.SetStateAction<boolean>>;
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
          <StyledView className="mb-[56px] w-full">
            <EmailInput email={email} setEmail={setEmail} option={"black"} />
          </StyledView>

          {/* パスワード */}
          <StyledView className="w-full">
            <PasswordInput
              password={password}
              setPassword={setPassword}
              option={"first"}
              isValid={isValiedPassword(password)}
            />
          </StyledView>
          {/* もう一度入力 */}
          <PasswordInput
            password={passwordAgain}
            setPassword={setPasswordAgain}
            option={"again"}
            isValid={passwordAgain.trim() != "" && passwordAgain == password}
          />

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
        isValid={isValid}
        email={""} 
        password={""}
      ></TransitionButton>
    </StyledView>
  );
};

export default Registration;
