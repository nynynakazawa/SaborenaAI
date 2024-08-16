import React, { useEffect, useState } from "react";
import { Image, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { TalkData, UserData } from "../../types/userDataTypes";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import NameDisplayComponent from "../../layout/display/nameDisplayComponent";
import { set as setTalkPartnerData } from "../../store/talkPartnerDataSlice";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

const TalkDictScreen = () => {
  const Container = Platform.OS === "android" ? SafeAreaView : View;
  const dispatch = useDispatch();
  const router = useRouter();
  const { isFetchUserData } = useGlobalSearchParams();

  // トークデータ
  const talkData: TalkData | null = useSelector((state: RootState) => state.talkData.value);
  // 自分とトーク関係にある人のユーザーデータ辞書(キーは相手のuid)
  const talkPartnerData: { [key: string]: UserData | null } = useSelector((state: RootState) => state.talkPartnerData.value);

  // userDataを取得
  const fetchUserData = async (uid: string) => {
    const userRef = doc(db, "user", uid);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      console.log("🔵fetched user data");
      return userSnapshot.data() as UserData;
    } else {
      console.log("❌no such user data!");
      return null;
    }
  };

  // 自分とトーク関係にある全ユーザーのユーザーデータを取得
  const fetchAllTalkPartners = async () => {
    const newTalkPartnerData: { [key: string]: UserData | null } = {};
    for (let uid in talkData) {
      const userData = await fetchUserData(uid);
      newTalkPartnerData[uid] = userData;
    }
    dispatch(setTalkPartnerData(newTalkPartnerData));
  };

  // レンダリング時、データフェチ
  useEffect(() => {
    fetchAllTalkPartners();
  }, []);

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
