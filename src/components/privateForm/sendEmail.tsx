import React from "react";
import { Text, View } from "react-native";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);

const SendMail = ({
  email,
  setScene,
}: {
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
