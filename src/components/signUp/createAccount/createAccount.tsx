import React, { useState, useEffect } from "react";
import {
  Alert,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { styled } from "nativewind";
import Icon from "react-native-vector-icons/MaterialIcons";
import TermModal from "../../login/termModal";
import { auth, db } from "../../../firebase";
import { createUserWithEmailAndPassword, sendEmailVerification, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "expo-router";
import EmailInput from "../../../layout/signup/emailInput";
import PasswordInput from "../../../layout/signup/passwordInput";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const Registration = ({
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
  scene,
  setScene,
}: {
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
  scene: number;
  setScene: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const router = useRouter();

  const [isVisibleTermModal, setIsVisibleTermModal] = useState<boolean>(false);
  const [isVisibleWaitingVerificationModal, setIsVisibleWaitingVerificationModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSendingEmail, setIsSendingEmail] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(60);

  // バリデーションチェック
  function isValiedPassword(password: string) {
    const pattern = /^[A-Za-z1-9@]{8,}$/;
    return pattern.test(password);
  }

  const isValid: boolean =
    email.trim() != "" &&
    password.trim() != "" &&
    password == passwordAgain &&
    isOver18 &&
    isAgreeTerms &&
    isValiedPassword(password);

  // タイマーのロジック
  useEffect(() => {
    let countdown: NodeJS.Timeout;
    if (isSendingEmail && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsSendingEmail(false);
      setTimer(60); // タイマーをリセット
    }
    return () => clearInterval(countdown);
  }, [isSendingEmail, timer]);

  // サインアップ処理
  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        console.log("🎉sign up success");
        handleSendEmail();
        setIsVisibleWaitingVerificationModal(true);

        // ユーザー情報をFirestoreに保存
        const userRef = doc(db, "users", userCredential.user.uid);
        await setDoc(userRef, {
          private_info: {
            password: password,
            email: email,
            emailVerified: userCredential.user.emailVerified,
            createdAt: new Date(),
          },
        });
      })
      .catch(async() => {
        // エラー発生時の処理
        const userRef = doc(db, "users", auth.currentUser?.uid || "");
        const userDoc = await getDoc(userRef);
        const userData = userDoc.data();

        if (userData?.private_info?.emailVerified) {
          console.log("Email is verified.");
          setErrorMessage("すでに登録されています")
        } else {
          console.log("Email is not verified.");
          handleSendEmail();
        }
      });
  };

  // email送信処理
  const handleSendEmail = async () => {
    setIsSendingEmail(true);
    try {
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
        console.log("send email");
        setTimeout(() => setIsSendingEmail(false), 60000); // 1分間再送信ボタンを無効にする
      } else {
        console.log("No user is signed in.");
      }
    } catch (errorMessage: any) {
      console.log(errorMessage.message);
      setIsSendingEmail(false);
    }
  };

  // メール認証状態を監視
  const handleConfirm = () => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await user.reload(); // ユーザー情報をリフレッシュ
        if (user.emailVerified) {
          console.log("Email verified!");
          // Firestoreのユーザー情報を更新
          const userRef = doc(db, "users", user.uid);
          await updateDoc(userRef, {
            "private_info.emailVerified": true,
          });
          setScene((prev) => prev + 1);
          setIsVisibleWaitingVerificationModal(false);
        }
      }
    });
    return () => unsubscribe();
  };

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
                onPress={() => {
                  setIsVisibleTermModal(true);
                }}
                className="absolute right-0"
              >
                <StyledText className="text-[#1d4ed8]">利用規約</StyledText>
              </StyledTouchableOpacity>
            </StyledView>
            <StyledText className={`text-[#ff0000] ${!errorMessage && "opacity-0"}`}>
              {errorMessage}
            </StyledText>
          </StyledView>
        </StyledView>

        <TermModal
          visible={isVisibleTermModal}
          onClose={() => setIsVisibleTermModal(false)}
        />
      </StyledView>

      {/* 新規登録ボタン */}
      <StyledView className="absolute bottom-[8vh] w-screen flex-1 items-center">
        <StyledView className="mx-auto mb-4 flex w-[75vw] flex-row justify-end">
          <StyledTouchableOpacity
            onPress={() => {handleSignUp(); setIsVisibleWaitingVerificationModal(true) }}
            className={`flex h-[48px] w-[100px] items-center justify-center rounded-lg bg-[#44e25f] ${!isValid && "opacity-30"}`}
            disabled={!isValid}
          >
            <StyledText className="text-[16px] text-[#fff]">新規登録</StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </StyledView>

      {/* メール確認待ちモーダル */}
      {isVisibleWaitingVerificationModal && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isVisibleWaitingVerificationModal}
        >
          <StyledView className="flex-1 justify-center items-center"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <StyledView className="bg-white p-6 rounded-md w-[80%] relative">
              {/* モーダルの右上に閉じるボタンを追加 */}
              <StyledTouchableOpacity
                onPress={() => setIsVisibleWaitingVerificationModal(false)}
                className="absolute top-2 right-2"
              >
                <Icon name="close" size={24} color="#000" />
              </StyledTouchableOpacity>

              <StyledText className="text-center text-lg font-bold mb-4">
                メール確認
              </StyledText>
              <StyledText className="text-center mb-6">
                {email}に確認メールを送信しました。メール内のリンクをクリックして登録を完了してください。
              </StyledText>

              {/* メール再送信ボタン */}
              <StyledTouchableOpacity
                onPress={() => handleSendEmail()}
                className={`bg-[#57d0e0] p-3 rounded-md mb-3 ${isSendingEmail && "opacity-40"}`}
                disabled={isSendingEmail}
              >
                <StyledText className={`text-[#fff] text-center`}>
                  {isSendingEmail ? `再送信可能まで ${timer} 秒` : "メールを再送信"}
                </StyledText>
              </StyledTouchableOpacity>

              {/* リロードボタン */}
              <StyledTouchableOpacity
                onPress={() => handleConfirm()}
                className="bg-green-500 p-3 rounded-md"
              >
                <StyledText className="text-[#fff] text-center">
                  メールを確認しました
                </StyledText>
              </StyledTouchableOpacity>
            </StyledView>
          </StyledView>
        </Modal>
      )}
    </StyledView>
  );
};

export default Registration;
