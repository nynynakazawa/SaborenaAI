import React from "react"
import { Platform, ScrollView, Text, View } from "react-native"
import { styled } from "nativewind";
import PageBackHeader from "../../../layout/header/pageBackHeader";
import { SafeAreaView } from "react-native-safe-area-context";

const StyledView = styled(View)
const StyledText = styled(Text)

const talkFunctionAboutPage = () => {
  const Container = Platform.OS === "android" ? SafeAreaView : View;

  return (
    <Container style={{ flex: 1 }}>
      <PageBackHeader
        routerPage="mySetting/helpPage"
        text="トーク機能について"
        isFetchUserProps="false"
      />
      <StyledView className="h-full w-full bg-[#f2f2f2]">
        <StyledView className="mt-[5vh] w-[80vw] mx-auto h-[70vh]">
          <ScrollView>
            <StyledView className="w-full border-b-2 mb-[24px] border-[#333]">
              <StyledText className="text-[18px] mb-[8px]">トーク機能について</StyledText>
            </StyledView>
            <StyledView>
              <StyledText>
                画面下部のメールアイコンから選択できます。
              </StyledText>
              <StyledText>
                Now Matchではすぐに出会えることを目的としているため、トーク履歴は3時間で削除されます。
              </StyledText>
            </StyledView>
          </ScrollView>
        </StyledView>
      </StyledView>

      <StyledView className="absolute bottom-0 h-[20px] w-screen bg-[#c52fe3]"></StyledView>
    </Container>
  )
}

export default talkFunctionAboutPage
