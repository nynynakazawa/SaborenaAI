import React, { useEffect, useState } from "react";
import { Image, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { TalkData, UserData } from "../../types/userDataTypes";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import NameDisplayComponent from "../../layout/display/nameDisplayComponent";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

const TalkDictScreen = () => {
  const Container = Platform.OS === "android" ? SafeAreaView : View;
  const router = useRouter();

  const talkData: TalkData | null = useSelector((state: RootState) => state.talkData.value);
  const [TalkuserDataDict, setTalkUserDataDict] = useState<{ [key: string]: UserData | null }>({});

  // userData取得
  const fetchUserData = async (uid: string): Promise<UserData | null> => {
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

  // 自分とトーク関係にある全ユーザーのデータを取得
  useEffect(() => {
    const fetchAllTalkUserData = async () => {
      if (talkData) {
        const newTalkUserDataDict: { [key: string]: UserData | null } = {};

        for (const key of Object.keys(talkData)) {
          const userData = await fetchUserData(key);
          newTalkUserDataDict[key] = userData;
        }

        setTalkUserDataDict(newTalkUserDataDict);
      }
    };

    fetchAllTalkUserData();
  }, [talkData]);

  // トーク画面に遷移
  const handlePressTalkButton = (uid: string, userData: UserData | null) => {
    router.push({
      pathname: "/talkList/talkPage",
      params: { 
        uid: uid,
        name: userData?.name,
      },
    });
  }

  return (
    <Container edges={["left", "right"]}>
      {/* トークリスト画面 */}
      <ScrollView className="h-full">
        <StyledView className="flex">
          {Object.entries(TalkuserDataDict).map(([uid, userData]) => (
            <StyledTouchableOpacity
              onPress={() => handlePressTalkButton(uid, userData)}
              key={uid}
              className="p-4 border-b  border-1 border-[#aaa] flex flex-row"
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
