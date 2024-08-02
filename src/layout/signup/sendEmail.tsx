import React, { useEffect } from "react";
import { Alert, Button, Platform, Text, View } from "react-native";
import { styled } from "nativewind";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { auth } from "../../firebase"; // firebase.tsで初期化された認証モジュールをインポート

const StyledView = styled(View);
const StyledText = styled(Text);


const SendMail= ({
  email,
  setScene,
} :
{
  email: string;
  setScene: React.Dispatch<React.SetStateAction<number>>;
}) => {

  return (
    <StyledView className="h-screen">
      <StyledText>{email}に確認メールを送りました。</StyledText>
    </StyledView>
  );
};

export default SendMail;
