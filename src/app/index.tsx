import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";
import LoginPage from "./login/loginPage";

const StyledView = styled(View);
const StyledText = styled(Text);

const Index = () => {
  return (
    <StyledView>
      <LoginPage />
    </StyledView>
  );
};

export default Index;
