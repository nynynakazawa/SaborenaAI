import React, { useEffect, useState } from "react";
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
import { Message, TalkData, UserData } from "../../types/userDataTypes";
import NameDisplayComponent from "../../components/display/nameDisplayComponent";
import { convertTimestamp_hhmm, getRemainingTime } from "../../utils/convertTimestamp";
import { deleteDoc, deleteField, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

const TalkDictScreen = () => {
  const Container = Platform.OS === "android" ? SafeAreaView : View;
  const router = useRouter();

  const myUid: string = useSelector((state: RootState) => state.myUid.value);
  const talkData: TalkData | null = useSelector(
    (state: RootState) => state.talkData.value,
  );
  const myTalkPartnerData: { [key: string]: UserData | null } = useSelector(
    (state: RootState) => state.talkPartnerData.value,
  );
  const myTalkHistroyData: { [key: string]: Message[] | null } = useSelector(
    (state: RootState) => state.talkHistoryData.value,
  );

  const [timeLeft, setTimeLeft] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // 初回の残り時間と有効期限を設定
    updateTimesAndValidity();

    // 1分ごとに残り時間とトークの有効期限を更新
    const intervalId = setInterval(() => {
      updateTimesAndValidity();
    }, 60000);

    // クリーンアップ
    return () => clearInterval(intervalId);
  }, [talkData]);

  // トークデータから対象のユーザーを削除する
  const deleteTalkPartner = async (myUid: string, uid: string) => {
    console.log("DELETE", uid)
    let talkRoomId: string = ""
    if(talkData && talkData[uid]){
      talkRoomId = talkData[uid]?.talk_room_id as string;
    }
    const myTalkRef = doc(db, "talk", myUid)
    await updateDoc(myTalkRef, {
      [uid]: deleteField()
    });
    const partnerTalkRef = doc(db, "talk", uid)
    await updateDoc(partnerTalkRef, {
      [myUid]: deleteField()
    });
    const talkRoomRef = doc(db, "talk_room", talkRoomId)
    await deleteDoc(talkRoomRef)
  }

  const updateTimesAndValidity = () => {
    if (talkData) {
      const updatedTimes: { [key: string]: string } = {};
      const updatedValidity: { [key: string]: boolean } = {};

      for (const uid in talkData) {
        if (talkData[uid]?.created_at) {
          const remainingTimeData = getRemainingTime(talkData[uid].created_at);
          updatedTimes[uid] = remainingTimeData.leftTime;
          updatedValidity[uid] = remainingTimeData.isValid;
        }
      }

      setTimeLeft(updatedTimes);
      // talkUser削除
      for (const uid in updatedValidity) {
        if (updatedValidity[uid] == false) {
          deleteTalkPartner(myUid, uid);
        }
      }
    }
  };

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
                  {myTalkHistroyData[uid] && (
                    <StyledText className="text-[#aaa]">
                      {convertTimestamp_hhmm(myTalkHistroyData[uid][myTalkHistroyData[uid].length - 1].timestamp)}
                    </StyledText>
                  )}
                </StyledView>
                {myTalkHistroyData[uid] ? (
                  <StyledText className="text-[#aaa]">
                    {myTalkHistroyData[uid][myTalkHistroyData[uid].length - 1].text.length > 16
                      ? `${myTalkHistroyData[uid][myTalkHistroyData[uid].length - 1].text.substring(0, 16)} ...`
                      : myTalkHistroyData[uid][myTalkHistroyData[uid].length - 1].text}
                  </StyledText>
                ) : (
                  <StyledText className="text-[#7785ff]">メッセージが届きました</StyledText>
                )}
              </StyledView>
              {/* 残り時間表示 */}
              <StyledText className="absolute right-[12px] bottom-[6px] text-[#aaa]">
                {timeLeft[uid] || "N/A"}
              </StyledText>
            </StyledTouchableOpacity>
          ))}

        </StyledView>
      </ScrollView>
    </Container>
  );
};

export default TalkDictScreen;
