import React from "react";
import { Image, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {  useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {  UserData } from "../../types/userDataTypes";
import NameDisplayComponent from "../../layout/display/nameDisplayComponent";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

const TalkDictScreen = () => {
  const Container = Platform.OS === "android" ? SafeAreaView : View;

  const router = useRouter();

  // 自分とトーク関係にある人のユーザーデータ辞書(キーは相手のuid)
  const talkPartnerData: { [key: string]: UserData | null } = useSelector((state: RootState) => state.talkPartnerData.value);

  // トーク画面に遷移
  const handlePressTalkButton = (uid: string, userData: UserData | null) => {
    router.push({
      pathname: "/talkList/talkPage",
      params: {
        uid: uid,
        name: userData?.name,
      },
    });
  };

  return (
    <Container edges={["left", "right"]}>
      {/* トークリスト画面 */}
      <ScrollView className="h-full">
        <StyledView className="flex">
          {Object.entries(talkPartnerData).map(([uid, userData]) => (
            <StyledTouchableOpacity
              onPress={() => handlePressTalkButton(uid, userData)}
              key={uid}
              className="p-4 border-b border-1 border-[#aaa] flex flex-row"
            >
              {userData?.main_image_url && (
                <StyledImage
                  source={{ uri: userData.main_image_url }}
                  className="w-16 h-16 rounded-full"
                />
              )}
              <StyledView className="flex flex-col flex-1 justify-center ml-[10px]">
                <StyledView className="mb-[6px]"></StyledView>
                <NameDisplayComponent userData={userData} size="large" />
                <StyledText className="text-[#aaa]">はじめまして！</StyledText>
              </StyledView>
            </StyledTouchableOpacity>
          ))}
        </StyledView>
      </ScrollView>
    </Container>
  );
};

export default TalkDictScreen;
