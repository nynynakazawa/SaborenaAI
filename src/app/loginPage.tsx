import React, { useEffect, useState } from "react";
import { Image, Text, View, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { styled } from "nativewind";
import LoginBackground from "../components/login/loginBackground";
import LoginLogo from "../components/login/loginLogo";
import LoginButtonContainer from "../components/login/loginButtonContainer";
import LoginModal from "../components/login/LoginModal";
import ResettingPassword from "../layout/signup/resettingPassword";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

const LoginPage = () => {
  const Container = Platform.OS === "android" ? SafeAreaView : View;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isVisibleLoginModal, setIsVisibleLoginModal] =
    useState<boolean>(false);
  const [
    isVisibleResettingPasswordScreen,
    setIsVisibleResettingPasswordScreen,
  ] = useState<boolean>(false);

  return (
    <Container style={{ flex: 1 }}>
      <LoginLogo />

      {!isVisibleLoginModal && (
        <LoginButtonContainer setIsVisibleLoginModal={setIsVisibleLoginModal} />
      )}

      {isVisibleLoginModal && (
        <LoginModal
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          setIsVisibleLoginModal={setIsVisibleLoginModal}
        />
      )}

      {isVisibleResettingPasswordScreen && <ResettingPassword />}
      <LoginBackground />
    </Container>
  );
};

export default LoginPage;
