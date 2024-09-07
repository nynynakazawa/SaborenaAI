import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, Modal } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { styled } from "nativewind";
import Icon from "react-native-vector-icons/MaterialIcons";
import TermModal from "../login/termModal";
import { auth, db } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
} from "firebase/auth";
import EmailInput from "../../components/privateForm/emailInput";
import PasswordInput from "../../components/privateForm/passwordInput";
import { doc, getDoc, setDoc } from "firebase/firestore";
import PageBackHeader from "../../layout/header/pageBackHeader";
import { FirebaseError } from "firebase/app";
import PrivacyPolicyModal from "../login/privacyPolicyModal";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const CreateAccount = ({
  email,
  setEmail,
  password,
  setPassword,
  passwordAgain,
  setPasswordAgain,
  isOver18,
  setIsOver18,
  isAgreeTerm,
  setIsAgreeTerm,
  isAgreePrivacyPolicy,
  setIsAgreePrivacyPolicy,
  scene,
  setScene,
  isLoading,
  setIsLoading,
}: {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  passwordAgain: string;
  setPasswordAgain: React.Dispatch<React.SetStateAction<string>>;
  isOver18: boolean;
  setIsOver18: React.Dispatch<React.SetStateAction<boolean>>;
  isAgreeTerm: boolean;
  setIsAgreeTerm: React.Dispatch<React.SetStateAction<boolean>>;
  isAgreePrivacyPolicy: boolean;
  setIsAgreePrivacyPolicy: React.Dispatch<React.SetStateAction<boolean>>;
  scene: number;
  setScene: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // * ############################################################################## *
  const myExpoPushToken: string | null = useSelector(
    (state: RootState) => state.myExpoPushToken.value,
  );

  const [isVisibleTermModal, setIsVisibleTermModal] = useState<boolean>(false);
  const [isVisiblePrivacyPolicyModal, setIsVisiblePrivacyPolicyModal] =
    useState<boolean>(false);
  const [
    isVisibleWaitingVerificationModal,
    setIsVisibleWaitingVerificationModal,
  ] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSendingEmail, setIsSendingEmail] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(60);

  // バリデーションチェック
  function isValiedPassword(password: string) {
    const pattern = /^[A-Za-z1-9@]{6,}$/;
    return pattern.test(password);
  }

  const isValid: boolean =
    email.trim() != "" &&
    password.trim() != "" &&
    password == passwordAgain &&
    isOver18 &&
    isAgreeTerm &&
    isAgreePrivacyPolicy &&
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
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        console.log("🎉sign up success");
        const date = new Date();
        const timestamp = date.getTime();
        handleSendEmail();
        setIsVisibleWaitingVerificationModal(true);

        // ユーザー情報をFirestoreに保存
        const userRef = doc(db, "private", userCredential.user.uid);
        await setDoc(userRef, {
          email: email,
          password: password,
          created_at: timestamp,
          uid: userCredential.user.uid,
          expo_push_token: myExpoPushToken,
          membership_status: "free",
        });
      })
      .catch(async () => {
        // エラー発生時の処理
        const userRef = doc(db, "user", auth.currentUser?.uid || "");
        const userDoc = await getDoc(userRef);
        const userData = userDoc.data();

        if (userData?.email_verified) {
          console.log("Email is verified.");
          setErrorMessage("すでに登録されています");
        } else {
          console.log("Email is not verified.");
          handleSendEmail();
        }
      });
    setIsLoading(false);
  };

  // email送信処理
  const handleSendEmail = async () => {
    setIsSendingEmail(true);
    try {
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
        console.log("send email");
        // setTimeout(() => setIsSendingEmail(false), 60000); // 1分間再送信ボタンを無効にする
      } else {
        console.log("No user is signed in.");
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error(`Firebase error: ${error.code} - ${error.message}`);
      } else {
        console.error(`Unexpected error: ${error}`);
      }
    }
  };

  // メール認証状態を監視
  const handleConfirm = () => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await user.reload(); // ユーザー情報をリフレッシュ
        if (user.emailVerified) {
          console.log("Email verified!");
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
        <PageBackHeader
          routerPage="loginPage"
          text="新規登録"
          isFetchUserProps="true"
        />

        {/* フォーム */}
        <StyledView className="mx-auto mt-[8vh] w-[90vw] flex-1 items-center">
          <StyledView className="mb-[36px] w-full">
            <EmailInput email={email} setEmail={setEmail} option={"black"} />
          </StyledView>

          <StyledView className="mb-[20px] w-full">
            <PasswordInput
              password={password}
              setPassword={setPassword}
              option={"first"}
              isValid={isValiedPassword(password)}
            />
          </StyledView>
          <StyledView className="mb-[20px] w-full">
            <PasswordInput
              password={passwordAgain}
              setPassword={setPasswordAgain}
              option={"again"}
              isValid={passwordAgain.trim() != "" && passwordAgain == password}
            />
          </StyledView>

          <StyledView className="flex w-full gap-[22px]">
            {/* isOver18 */}
            <BouncyCheckbox
              size={25}
              fillColor="red"
              text="18歳以上です"
              iconStyle={{ borderColor: "red" }}
              textStyle={{ textDecorationLine: "none", fontSize: 14 }}
              isChecked={isOver18}
              onPress={(isChecked: boolean) => setIsOver18(isChecked)}
            />
            {/* isAgreeTerm */}
            <StyledView className="flex h-[54px]">
              <BouncyCheckbox
                size={25}
                fillColor="red"
                text="利用規約に同意します"
                iconStyle={{ borderColor: "red" }}
                textStyle={{ textDecorationLine: "none", fontSize: 14 }}
                isChecked={isAgreeTerm}
                onPress={(isChecked: boolean) => setIsAgreeTerm(isChecked)}
              />
              <StyledTouchableOpacity
                onPress={() => {
                  setIsVisibleTermModal(true);
                }}
                className="absolute bottom-0 right-0"
              >
                <StyledText className="text-[12px] text-[#1d4ed8] underline">
                  利用規約
                </StyledText>
              </StyledTouchableOpacity>
            </StyledView>

            {/* isAgreePrivacyPolicy */}
            <StyledView className="flex h-[54px]">
              <BouncyCheckbox
                size={25}
                fillColor="red"
                text="プライバシーポリシーに同意します"
                iconStyle={{ borderColor: "red" }}
                textStyle={{ textDecorationLine: "none", fontSize: 14 }}
                isChecked={isAgreePrivacyPolicy}
                onPress={(isChecked: boolean) =>
                  setIsAgreePrivacyPolicy(isChecked)
                }
              />
              <StyledTouchableOpacity
                onPress={() => {
                  setIsVisiblePrivacyPolicyModal(true);
                }}
                className="absolute bottom-0 right-0"
              >
                <StyledText className="text-[12px] text-[#1d4ed8] underline">
                  プライバシーポリシー
                </StyledText>
              </StyledTouchableOpacity>
            </StyledView>

            <StyledText
              className={`text-[#ff0000] ${!errorMessage && "opacity-0"}`}
            >
              {errorMessage}
            </StyledText>
          </StyledView>
        </StyledView>
      </StyledView>

      {/* 新規登録ボタン */}
      <StyledView className="absolute bottom-[8vh] w-screen flex-1 items-center">
        <StyledView className="mx-auto mb-4 flex w-[75vw] flex-row justify-end">
          <StyledTouchableOpacity
            onPress={() => {
              handleSignUp();
              setIsVisibleWaitingVerificationModal(true);
            }}
            className={`flex h-[48px] w-[100px] items-center justify-center rounded-lg bg-[#44e25f] ${!isValid && "opacity-30"}`}
            disabled={!isValid}
          >
            <StyledText className="text-[16px] text-[#fff]">
              新規登録
            </StyledText>
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
          <StyledView
            className="flex-1 items-center justify-center"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <StyledView className="relative w-[80%] rounded-md bg-white p-[24px]">
              {/* モーダルの右上に閉じるボタンを追加 */}
              <StyledTouchableOpacity
                onPress={() => setIsVisibleWaitingVerificationModal(false)}
                className="absolute right-[8px] top-[8px]"
              >
                <Icon name="close" size={24} color="#f00" />
              </StyledTouchableOpacity>

              <StyledText className="mb-[16px] text-center text-lg font-bold">
                メール確認
              </StyledText>
              <StyledText className="mb-[24px] text-center">
                {email}
                に確認メールを送信しました。メール内のリンクをクリックして登録を完了してください。
              </StyledText>

              {/* メール再送信ボタン */}
              <StyledTouchableOpacity
                onPress={() => handleSendEmail()}
                className={`mb-[12px] rounded-md bg-[#57d0e0] p-[12px] ${isSendingEmail && "opacity-70"}`}
                disabled={isSendingEmail}
              >
                <StyledText className={`text-center text-[#fff]`}>
                  {isSendingEmail
                    ? `再送信可能まで ${timer} 秒`
                    : "メールを再送信"}
                </StyledText>
              </StyledTouchableOpacity>

              {/* リロードボタン */}
              <StyledTouchableOpacity
                onPress={() => handleConfirm()}
                className="rounded-md bg-[#44e25f] p-[12px]"
              >
                <StyledText className="text-center text-[#fff]">
                  メールを確認しました
                </StyledText>
              </StyledTouchableOpacity>
            </StyledView>
          </StyledView>
        </Modal>
      )}

      {/* 利用規約モーダル */}
      <TermModal
        visible={isVisibleTermModal}
        onClose={() => setIsVisibleTermModal(false)}
      />
      {/* プライバシーポリシーモーダル */}
      <PrivacyPolicyModal
        visible={isVisiblePrivacyPolicyModal}
        onClose={() => setIsVisiblePrivacyPolicyModal(false)}
      />
    </StyledView>
  );
};

export default CreateAccount;
