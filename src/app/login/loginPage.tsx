import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { styled } from "nativewind";
import LoginBackground from "../../components/login/loginBackground";
import LoginLogo from "../../components/login/loginLogo";
import LoginButtonContainer from "../../components/login/loginButtonContainer";
import LoginModal from "../../components/login/LoginModal";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

const LoginPage = () => {
  const [isVisibleLoginModal, setIsVisibleLoginModal] = useState<boolean>(false);

  return (
    <View>
      <LoginLogo />
      {!isVisibleLoginModal ?
        <LoginButtonContainer 
          isVisibleLoginModal={isVisibleLoginModal}
          setIsVisibleLoginModal={setIsVisibleLoginModal}
        /> 
        :
        <LoginModal
          isVisibleLoginModal={isVisibleLoginModal}
          setIsVisibleLoginModal={setIsVisibleLoginModal}
        />
      }
      <LoginBackground />
    </View>
  );
};

export default LoginPage;
