import React from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { styled } from "nativewind";
import LoginBackground from "../../components/login/loginBackground";
import LoginLogo from "../../components/login/loginLogo";
import LoginButtonContainer from "../../components/login/loginButtonContainer";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

const LoginPage = () => {
  return (
    <SafeAreaView>
      <LoginLogo />

      <LoginButtonContainer />

      <LoginBackground />
    </SafeAreaView>
  );
};

export default LoginPage;
