import React from "react";
import { Platform, View } from "react-native";
import { styled } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import PageBackHeader from "../../layout/header/pageBackHeader";
import AccountManagement from "../../features/main/mySetting/accountManagement";
import LogoutManegement from "../../features/main/mySetting/logoutManegement";
import StatementManagement from "../../features/main/mySetting/statementManagement";

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
        <StatementManagement />
        <LogoutManegement />
      </StyledView>
      <StyledView className="absolute bottom-0 h-[20px] w-screen bg-[#00000]"></StyledView>
    </Container>
  );
};

export default HelpPage;
