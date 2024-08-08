import React from "react";
import { Platform, Text, View } from "react-native";
import { styled } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import PageBackHeader from "../../layout/header/pageBackHeader";

const StyledView = styled(View);
const StyledText = styled(Text);

const LikeToPage = () => {
  const Container = Platform.OS === "android" ? SafeAreaView : View;

  return (
    <Container style={{ flex: 1 }}>
      <PageBackHeader
        routerPage="main/mySettingScreen"
        text="自分から"
        isFetchUserProps="false"
      />
      <StyledView className="h-full w-full bg-[#f2f2f2]">
        <StyledText>自分から</StyledText>
      </StyledView>
    </Container>
  );
};

export default LikeToPage;
