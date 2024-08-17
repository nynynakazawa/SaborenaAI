import React, { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";
import { auth } from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import EmailInput from "./emailInput";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const ResettingPassword = () => {
  const [isSendingEmail, setIsSendingEmail] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(60);
  const [email, setEmail] = React.useState("");

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

  // パスワードリセットメール送信
  const handleResetPassword = async () => {
    setIsSendingEmail(true);
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        "パスワードリセットメール送信",
        `${email}にパスワードリセットのためのメールを送信しました。メールを確認してパスワードを再設定してください。`,
      );
    } catch (error: unknown) {
      console.error("Error sending password reset email:", error);
      Alert.alert(
        "エラー",
        "パスワードリセットメールの送信中にエラーが発生しました。",
      );
    }
  };

  return (
    <StyledView className="z-[200] w-screen bg-[#fff]">
      <StyledView className={`absolute mt-[80px] w-screen`}>
        <StyledView className="mx-auto mt-[10vh] flex w-[90%]">
          <StyledView>
            <StyledText className="mb-[24px] border-b-2 border-[#ccc] pb-[12px] text-[18px] font-bold text-[#333]">
              パスワード再発行
            </StyledText>
          </StyledView>

          <StyledText className="mb-[6px] text-[#333]">
            登録したメールアドレスを入力してください
          </StyledText>
          {/* メールアドレス */}
          <StyledView className="mb-[56px] w-full">
            <EmailInput email={email} setEmail={setEmail} option={"black"} />
          </StyledView>

          <StyledView className="flex w-full items-end">
            <StyledTouchableOpacity
              onPress={handleResetPassword}
              className={`w-[200px] rounded-md bg-[#57d0e0] p-[12px] ${!email ? "opacity-30" : isSendingEmail && "opacity-60"} `}
              disabled={isSendingEmail}
            >
              <StyledText className="text-center text-white">
                {isSendingEmail
                  ? `再送信可能まで ${timer} 秒`
                  : "パスワードを再発行する"}
              </StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>
      </StyledView>
    </StyledView>
  );
};

export default ResettingPassword;
