import React from "react";
import { Platform, Text, View } from "react-native";
import { styled } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import PageBackHeader from "../../layout/header/pageBackHeader";
import AccountManagement from "../../components/main/mySetting/accountManagement";

const StyledView = styled(View);

const HelpPage = () => {
  const Container = Platform.OS === "android" ? SafeAreaView : View;

  return (
    <Container style={{ flex: 1 }}>
      <PageBackHeader
        routerPage="main/mySettingScreen"
        text="各種設定"
        isFetchUserProps="false"
      />
      <StyledView className="h-full w-full bg-[#f2f2f2]">
        <AccountManagement />
      </StyledView>
      <StyledView className="absolute bottom-0 h-[20px] w-screen bg-[#E3422F]"></StyledView>
    </Container>
  );
};

export default HelpPage;
