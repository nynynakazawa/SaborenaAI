import React from "react";
import { Platform, ScrollView, Text, View } from "react-native";
import { styled } from "nativewind";
import PageBackHeader from "../../layout/header/pageBackHeader";
import { SafeAreaView } from "react-native-safe-area-context";

const StyledView = styled(View);
const StyledText = styled(Text);

const NoticePage = () => {
  const Container = Platform.OS === "android" ? SafeAreaView : View;

  return (
    <Container style={{ flex: 1 }}>
      <PageBackHeader
        routerPage="mySetting/mySettingScreen"
        text="おしらせ"
        isFetchUserProps="false"
      />
      <StyledView className="h-full w-full bg-[#f2f2f2]">
        <StyledText>おしらせ</StyledText>
      </StyledView>
    </Container>
  );
};

export default NoticePage;
