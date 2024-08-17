import React, { useState } from "react";
import { View, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import LoginBackground from "../components/login/loginBackground";
import LoginLogo from "../components/login/loginLogo";
import LoginButtonContainer from "../components/login/loginButtonContainer";
import LoginModal from "../components/login/LoginModal";

const LoginPage = () => {
  const Container = Platform.OS === "android" ? SafeAreaView : View;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isVisibleLoginModal, setIsVisibleLoginModal] =
    useState<boolean>(false);

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

      <LoginBackground />
    </Container>
  );
};

export default LoginPage;
