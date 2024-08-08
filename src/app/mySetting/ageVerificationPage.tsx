import React from "react";
import { Platform, Text, View } from "react-native";
import { styled } from "nativewind";
import { UserData } from "../../types/userDataTypes";
import { SafeAreaView } from "react-native-safe-area-context";
import PageBackHeader from "../../layout/header/pageBackHeader";

const StyledView = styled(View);
const StyledText = styled(Text);

const AgeVerificationPage = () => {
  const Container = Platform.OS === "android" ? SafeAreaView : View;
  return (
    <Container style={{ flex: 1 }}>
      <PageBackHeader routerPage="main/mySettingScreen" text="年齢確認"/>
      <StyledView className="bg-[#f2f2f2] w-full h-full">
        <StyledText>年齢確認</StyledText>
      </StyledView>
    </Container>
  );
};

export default AgeVerificationPage;
