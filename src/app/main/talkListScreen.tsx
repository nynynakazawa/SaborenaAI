import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styled } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Message, UserData } from "../../types/userDataTypes";
import NameDisplayComponent from "../../components/display/nameDisplayComponent";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

const TalkDictScreen = () => {
  const Container = Platform.OS === "android" ? SafeAreaView : View;
  const router = useRouter();

  // 自分とトーク関係にある人のユーザーデータ辞書(キーは相手のuid)
  const myTalkPartnerData: { [key: string]: UserData | null } = useSelector(
    (state: RootState) => state.talkPartnerData.value,
  );
  const myTalkHistroyData: { [key: string]: Message[] | null } = useSelector(
    (state: RootState) => state.talkHistoryData.value,
  );
  
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

  // timestampをhh:mmに変換
  const formatTimestampToTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0'); // Ensure 2 digits for hours
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Ensure 2 digits for minutes
    return `${hours}:${minutes}`;
  };

  return (
    <Container edges={["left", "right"]}>
      {/* トークリスト画面 */}
      <ScrollView className="h-full">
        <StyledView className="flex">
          {Object.entries(myTalkPartnerData).map(([uid, userData]) => (
            <StyledTouchableOpacity
              onPress={() => handlePressTalkButton(uid, userData)}
              key={uid}
              className="border-1 flex flex-row border-b border-[#aaa] p-4"
            >
              {userData?.main_image_url && (
                <StyledImage
                  source={{ uri: userData.main_image_url }}
                  className="h-16 w-16 rounded-full"
                />
              )}
              <StyledView className="ml-[10px] flex flex-1 justify-center">
                <StyledView className="w-full flex flex-row items-center mb-[6px]">
                  <NameDisplayComponent userData={userData} size="large" />
                  {myTalkHistroyData[uid] &&
                    <StyledText className="text-[#aaa]">{formatTimestampToTime(myTalkHistroyData[uid][myTalkHistroyData[uid].length - 1].timestamp)}</StyledText>
                  }
                </StyledView>
                {myTalkHistroyData[uid] ?
                  <StyledText className="text-[#aaa]">
                    {myTalkHistroyData[uid][myTalkHistroyData[uid].length - 1].text.length > 16
                      ? `${myTalkHistroyData[uid][myTalkHistroyData[uid].length - 1].text.substring(0, 16)} ...`
                      : myTalkHistroyData[uid][myTalkHistroyData[uid].length - 1].text}
                  </StyledText>
                  :
                  <StyledText className="text-[#7785ff]">
                    新しいユーザー
                  </StyledText>
                }
              </StyledView>
            </StyledTouchableOpacity>
          ))}
        </StyledView>
      </ScrollView>
    </Container>
  );
};

export default TalkDictScreen;
