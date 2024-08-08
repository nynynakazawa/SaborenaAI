import React from "react";
import { Platform, Text, View } from "react-native";
import { styled } from "nativewind";
import ResettingPassword from "../layout/privateForm/resettingPassword";
import { SafeAreaView } from "react-native-safe-area-context";
import PageBackHeader from "../layout/header/pageBackHeader";

const StyledView = styled(View);
const StyledText = styled(Text);

const ResettingPasswordPage = () => {
  const Container = Platform.OS === "android" ? SafeAreaView : View;

  return (
    <Container style={{ flex: 1 }}>
      <PageBackHeader
        routerPage="/login"
        text="パスワード再発行"
        isFetchUserProps="false"
      />
      <ResettingPassword />
      <StyledView className="absolute bottom-0 h-[20px] w-screen bg-[#2f77e3]"></StyledView>
    </Container>
  );
};

export default ResettingPasswordPage;
