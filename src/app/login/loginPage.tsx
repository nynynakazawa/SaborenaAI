import React, { useState } from "react";
import { Image, Text, View, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { styled } from "nativewind";
import LoginBackground from "../../components/login/loginBackground";
import LoginLogo from "../../components/login/loginLogo";
import LoginButtonContainer from "../../components/login/loginButtonContainer";
import LoginModal from "../../components/login/LoginModal";
import SignUpScreen from "../../components/login/signUpScreen";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

const LoginPage = () => {
  const [isVisibleLoginModal, setIsVisibleLoginModal] = useState<boolean>(false);
  const [isVisibleSignUpScreen, setIsVisibleSignUpScreen] = useState<boolean>(false);

  const Container = Platform.OS === "android" ? SafeAreaView : View;

  return (
    <Container style={{ flex: 1 }}>
      <LoginLogo />
      {!isVisibleLoginModal && !isVisibleSignUpScreen &&
        <LoginButtonContainer
          setIsVisibleLoginModal={setIsVisibleLoginModal}
          setIsVisibleSignUpScreen={setIsVisibleSignUpScreen}
        />
      }
      {isVisibleLoginModal &&
        <LoginModal
          setIsVisibleLoginModal={setIsVisibleLoginModal}
        />
      }
      {/* {isVisibleSignUpScreen &&
      } */}
      <SignUpScreen
        setIsVisibleSignUpScreen={setIsVisibleSignUpScreen}
      />
      <LoginBackground />
    </Container>
  );
};

export default LoginPage;
