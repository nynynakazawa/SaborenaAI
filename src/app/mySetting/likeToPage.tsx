import React from "react";
import { Button, Platform, Text, View } from "react-native";
import { styled } from "nativewind";
import { UserData } from "../../types/userDataTypes";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import PageBackHeader from "../../layout/header/pageBackHeader";

const StyledView = styled(View);
const StyledText = styled(Text);

const LikeToPage = () => {
  const Container = Platform.OS === "android" ? SafeAreaView : View;
  const router = useRouter();

  return (
    <Container style={{ flex: 1 }}>
      <PageBackHeader routerPage="main/mySettingScreen" />
      <StyledView className="bg-[#f2f2f2] w-full h-full">
        <StyledText>自分から</StyledText>
      </StyledView>
    </Container>
  );
};

export default LikeToPage;
