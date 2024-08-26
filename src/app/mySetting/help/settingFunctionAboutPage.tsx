import React from "react"
import { Platform, ScrollView, Text, View } from "react-native"
import { styled } from "nativewind";
import PageBackHeader from "../../../layout/header/pageBackHeader";
import { SafeAreaView } from "react-native-safe-area-context";

const StyledView = styled(View)
const StyledText = styled(Text)

const AgeVerificationAboutPage = () => {
  const Container = Platform.OS === "android" ? SafeAreaView : View;

  return (
    <Container style={{ flex: 1 }}>
      <PageBackHeader
        routerPage="mySetting/helpPage"
        text="設定機能について"
        isFetchUserProps="false"
      />
      <StyledView className="h-full w-full bg-[#f2f2f2]">
        <StyledView className="mt-[5vh] w-[80vw] mx-auto h-[70vh]">
          <ScrollView>
            <StyledView className="w-full border-b-2 mb-[24px] border-[#333]">
              <StyledText className="text-[18px] mb-[8px]">設定機能について</StyledText>
            </StyledView>
            <StyledView className="mx-[6px]">
              <StyledText>
                画面下部のメールアイコンから選択できます。この画面から様々な設定を行うことが出来ます。
              </StyledText>
              <StyledText>
                自分のアイコンをタップすることで自分のプロフィール設定を変更することができます。
              </StyledText>
            </StyledView>
          </ScrollView>
        </StyledView>
      </StyledView>

      <StyledView className="absolute bottom-0 h-[20px] w-screen bg-[#c52fe3]"></StyledView>
    </Container>
  )
}

export default AgeVerificationAboutPage
