import React from "react";
import { Platform, ScrollView, Text, View } from "react-native";
import { styled } from "nativewind";
import PageBackHeader from "../../../layout/header/pageBackHeader";
import { SafeAreaView } from "react-native-safe-area-context";

const StyledView = styled(View);
const StyledText = styled(Text);

const AgeVerificationAboutPage = () => {
  const Container = Platform.OS === "android" ? SafeAreaView : View;

  return (
    <Container style={{ flex: 1 }}>
      <PageBackHeader
        routerPage="mySetting/helpPage"
        text="年齢確認について"
        isFetchUserProps="false"
      />
      <StyledView className="h-full w-full bg-[#f2f2f2]">
        <StyledView className="mx-auto mt-[5vh] h-[70vh] w-[80vw]">
          <ScrollView>
            <StyledView className="mb-[24px] w-full border-b-2 border-[#333]">
              <StyledText className="mb-[8px] text-[18px]">
                年齢確認について
              </StyledText>
            </StyledView>
            <StyledView className="mx-[6px]">
              <StyledText>
                出会い系サイト規制法により、サービスの利用対象者が18歳以上であることの確認が義務付けられました。
              </StyledText>
              <StyledText>
                この法律に従い登録後に本人の年齢確認をしています。
              </StyledText>
              <StyledText className="mb-[12px]">
                本人の年齢確認の手続きが完了しないと、一部の機能が制限されます。
              </StyledText>
              <StyledText>
                年齢確認の方法は、設定画面の「年齢確認」より以下が分かる画像をお送りください。
              </StyledText>
              <StyledText>・生年月日、または年齢</StyledText>
              <StyledText>・書面の名称</StyledText>
              <StyledText>・書面の発行者名</StyledText>
            </StyledView>
          </ScrollView>
        </StyledView>
      </StyledView>

      <StyledView className="absolute bottom-0 h-[20px] w-screen bg-[#c52fe3]"></StyledView>
    </Container>
  );
};

export default AgeVerificationAboutPage;
