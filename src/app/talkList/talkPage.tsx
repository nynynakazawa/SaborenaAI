import React from "react"
import { Platform, Text, View } from "react-native"
import { styled } from "nativewind";
import { useGlobalSearchParams } from "expo-router";
import PageBackHeader from "../../layout/header/pageBackHeader";
import { SafeAreaView } from "react-native-safe-area-context";

const StyledView = styled(View)
const StyledText = styled(Text)

const TalkList = () => {
  const { uid, name } = useGlobalSearchParams();
  const Container = Platform.OS === "android" ? SafeAreaView : View;

  return (
    <Container style={{ flex: 1 }}>
      <PageBackHeader
        routerPage="main/talkListScreen"
        text={`${name}`}
        isFetchUserProps="false"
      />
      <StyledView className="h-full w-full bg-[#f2f2f2]">
        <StyledText>トーク画面</StyledText>
      </StyledView>
    </Container>

  )
}

export default TalkList
