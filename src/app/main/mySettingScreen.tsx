import React from "react";
import { Platform, View } from "react-native";
import { styled } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import AppInfoDisplay from "../../features/main/mySetting/appInfoDisplay";
import MyProfileIcon from "../../features/main/mySetting/myProfileIcon";
import SettingButtonContainer from "../../features/main/mySetting/settingButtonContainer";

const StyledView = styled(View);

const MySettingScreen = () => {
  const Container = Platform.OS === "android" ? SafeAreaView : View;

  return (
    <Container edges={["left", "right"]}>
      <StyledView className="absolute mt-[8vh] flex w-screen items-center">
        {/* プロフィールアイコン */}
        <StyledView className="h-[150px] w-full">
          <MyProfileIcon isEditable={true} />
        </StyledView>

        {/* アプリ情報 */}
        <StyledView className="mx-auto mt-[8vh] w-[94vw]">
          <AppInfoDisplay />
        </StyledView>

        {/* 各種ボタン */}
        <StyledView className="mx-auto mt-[8vh] w-[80vw]">
          <SettingButtonContainer />
        </StyledView>
      </StyledView>
    </Container>
  );
};

export default MySettingScreen;
