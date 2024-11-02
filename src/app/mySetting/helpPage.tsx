import React from "react";
import { Platform, Text, View } from "react-native";
import { styled } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import PageBackHeader from "../../layout/header/pageBackHeader";
import AgeVerificationHelp from "../../features/main/mySetting/ageVerificationHelp";
import FunctionHelp from "../../features/main/mySetting/functionHelp";

const StyledView = styled(View);
const StyledText = styled(Text);

const HelpPage = () => {
  const Container = Platform.OS === "android" ? SafeAreaView : View;

  return (
    <Container style={{ flex: 1 }}>
      <PageBackHeader
        routerPage="main/mySettingScreen"
        text="ヘルプ"
        isFetchUserProps="false"
      />
      <StyledView className="h-full w-full bg-[#f2f2f2]">
        <AgeVerificationHelp />
        <FunctionHelp />
      </StyledView>

      <StyledView className="absolute bottom-0 h-[20px] w-screen bg-[#00000]"></StyledView>
    </Container>
  );
};

export default HelpPage;
