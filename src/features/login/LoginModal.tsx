import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Keyboard } from "react-native";
import { styled } from "nativewind";
import { auth, db } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "expo-router";
import EmailInput from "../../components/privateForm/emailInput";
import PasswordInput from "../../components/privateForm/passwordInput";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const LoginModal = ({
  email,
  setEmail,
  password,
  setPassword,
  setIsVisibleLoginModal,
}: {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setIsVisibleLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const myExpoPushToken: string | null = useSelector(
    (state: RootState) => state.myExpoPushToken.value,
  );

  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  // ログイン処理
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const privateRef = doc(db, "private", userCredential.user.uid);
      const privateSnapshot = await getDoc(privateRef);

      if (privateSnapshot.exists()) {
        // ログイン成功時
        if (userCredential.user.emailVerified == true) {
          // パスワードをprivateに保存
          await setDoc(
            privateRef,
            {
              password: password,
            },
            { merge: true },
          );
          // ExpoPushTokenをuserに保存
          const userRef = doc(db, "user", userCredential.user.uid);
          await setDoc(
            userRef,
            {
              expo_push_token: myExpoPushToken,
            },
            { merge: true },
          );
          console.log("🎉login success");
          // 初期設定がされているならmapPage, されていないならsignupPageに飛ばす
          const useRef = doc(db, "user", userCredential.user.uid);
          const userSnapshot = await getDoc(useRef);
          const userData = userSnapshot.data();
          if (userData?.name && true) {
            router.push("/main");
          } else {
            router.push({
              pathname: "/signUpPage",
              params: { isExitUser: "exit" },
            });
          }
        } else {
          setErrorMessage(
            "メールアドレスが確認されていません 新規登録してください",
          );
          auth.signOut();
        }
      } else {
        setErrorMessage("ユーザー情報が見つかりません");
      }
    } catch (error) {
      console.error("Error signing in with email and password:", error);
      setErrorMessage("ユーザーが存在しません");
    }
  };

  return (
    <StyledView className="relative z-40 flex-1">
      <StyledView
        className={"absolute z-40 h-screen w-screen flex-1 items-center"}
        style={{ top: -keyboardHeight }}
      >
        {/* クローズボタン */}
        <StyledTouchableOpacity
          onPress={() => setIsVisibleLoginModal(false)}
          className="absolute top-0 z-40 h-[62vh] w-screen"
        ></StyledTouchableOpacity>
        {/* ログインフォーム */}
        <StyledView
          className="absolute bottom-0 flex h-[38vh] w-screen items-center px-8 py-4"
          style={{ backgroundColor: "rgba(210, 63, 63, 0.9)" }}
        >
          <StyledView className="mt-[30px] w-[80vw] flex-1 items-center">
            <StyledView className="mb-[12px] w-[80vw]">
              <EmailInput email={email} setEmail={setEmail} option={"login"} />
            </StyledView>
            <StyledView className="mb-[12px] w-[80vw]">
              <StyledView className="w-[80vw]">
                <PasswordInput
                  password={password}
                  setPassword={setPassword}
                  option={"login"}
                  isValid={true}
                />
              </StyledView>
              <StyledText
                className={`text-[12px] text-[#fff] ${!errorMessage && "opacity-0"}`}
              >
                {errorMessage}
              </StyledText>
            </StyledView>
          </StyledView>

          {/* パスワードを忘れた方は */}
          <StyledText className="absolute bottom-[4vh] left-[6vw] text-white">
            パスワードを忘れた方は
            <StyledTouchableOpacity
              onPress={() => {
                router.push("resettingPasswordPage");
              }}
            >
              <StyledText className="translate-y-[4px] text-[#1d4ed8] underline">
                こちら
              </StyledText>
            </StyledTouchableOpacity>
          </StyledText>

          {/* ログインボタン */}
          <StyledTouchableOpacity
            onPress={() => handleLogin()}
            className={`absolute bottom-[8vh] right-[10vw] flex h-[48px] w-[100px] items-center justify-center rounded-lg bg-[#fff] ${!(password && email) && "opacity-30"}`}
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
