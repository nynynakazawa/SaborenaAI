import React from "react";
import { Platform, ScrollView, Text, View } from "react-native";
import { styled } from "nativewind";
import PageBackHeader from "../../../layout/header/pageBackHeader";
import { SafeAreaView } from "react-native-safe-area-context";

const StyledView = styled(View);
const StyledText = styled(Text);

const MapFunctionAboutPage = () => {
  const Container = Platform.OS === "android" ? SafeAreaView : View;

  return (
    <Container style={{ flex: 1 }}>
      <PageBackHeader
        routerPage="mySetting/helpPage"
        text="マップ機能について"
        isFetchUserProps="false"
      />
      <StyledView className="flex h-full w-full bg-[#f2f2f2]">
        <StyledView className="mx-auto mt-[5vh] h-[70vh] w-[80vw]">
          <ScrollView>
            <StyledView className="mb-[24px] w-full border-b-2 border-[#333]">
              <StyledText className="mb-[8px] text-[18px]">
                マップ機能について
              </StyledText>
            </StyledView>
            <StyledView className="mx-[6px]">
              <StyledText>
                Now
                Matchに新規登録したときやログインしたときに一番最初にこの画面が表示されます。
              </StyledText>
              <StyledText className="mb-[12px]">
                画面下部のマップアイコンから選択できます。
              </StyledText>
              <StyledText>・ユーザーピン</StyledText>
              <StyledText>
                現在渋谷上にいるユーザーにユーザーピンが刺さります。
              </StyledText>
              <StyledText>
                オレンジ色の枠が自分、ピンク枠が女性、水色枠が男性、緑枠がその他です。
              </StyledText>
              <StyledText>
                ユーザーピンをクリックするとそのユーザー情報が出ます。
              </StyledText>
              <StyledText className="mb-[12px]">
                メールのアイコンからメッセージを送信することも可能です。
              </StyledText>
              <StyledText>・現在ステータス</StyledText>
              <StyledText>
                右上のポップアップより、現在のあなたの状態を設定することができます。
              </StyledText>
              <StyledText>
                「位置公開」のスイッチでは、現在位置を他のユーザーに表示するか選択することができます。
              </StyledText>
              <StyledText>
                ONにすると、位置情報が公開され、他のユーザーが見ることができます。
              </StyledText>
              <StyledText>
                OFFにすると位置情報が非公開となり、他のユーザーから位置を隠すことができます。
              </StyledText>
              <StyledText className="mb-[12px]">
                すなわち自分のユーザーピンが他のユーザーの画面に表示されなくなります。
              </StyledText>
              <StyledText>・いまなにしてる？</StyledText>
              <StyledText>
                下側のメッセージボックスに文字を打って送信することで、メッセージを送信することが出来ます。
              </StyledText>
              <StyledText>
                自分の送ったメッセージや他人のメッセージはユーザーピンをタップすることで閲覧することが出来ます。
              </StyledText>
              <StyledText>送信できる間隔は60秒です。</StyledText>
              <StyledText className="mb-[12px]">
                すなわち自分のユーザーピンが他のユーザーの画面に表示されなくなります。
              </StyledText>
            </StyledView>
          </ScrollView>
        </StyledView>
      </StyledView>

      <StyledView className="absolute bottom-0 h-[20px] w-screen bg-[#c52fe3]"></StyledView>
    </Container>
  );
};

export default MapFunctionAboutPage;
