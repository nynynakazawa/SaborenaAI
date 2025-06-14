import React, { useEffect, useState } from "react";
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styled } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { CurrentData, Message, PrivateData, TalkData, UserData } from "../../types/userDataTypes";
import NameDisplayComponent from "../../components/display/nameDisplayComponent";
import {
  convertTimestamp_hhmm,
  getRemainingTime,
} from "../../utils/convertTimestamp";
import { deleteDoc, deleteField, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { set as setCurrentTalkPartnerUid } from "../../store/currentTalkPartnerUidSlice";
import { set as setIsUnreadTalk } from "../../store/isUnreadTalkSlice";
import { deleteKey } from "../../store/talkHistoryDataSlice";
import { CircleProgress } from "../../features/main/talkList/circuleProgress";
import UserIcon from "../../features/main/talkList/userIcon";
import { countTalkFromMe } from "../../utils/countTalkFromMe";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const TalkListScreen = () => {
  const Container = Platform.OS === "android" ? SafeAreaView : View;
  const router = useRouter();
  const dispatch = useDispatch();
  // reduxから値を取得
  const myUid: string | null = useSelector(
    (state: RootState) => state.myUid.value,
  );
  const talkData: TalkData | null = useSelector(
    (state: RootState) => state.talkData.value,
  );
  const myTalkPartnerData: { [key: string]: UserData | null } = useSelector(
    (state: RootState) => state.talkPartnerData.value,
  );
  const myTalkHistroyData: { [key: string]: Message[] | null } = useSelector(
    (state: RootState) => state.talkHistoryData.value,
  );
  const allCurrentData: { [key: string]: CurrentData | null } = useSelector(
    (state: RootState) => state.allCurrentData.value,
  );
  const myPrivateData: PrivateData | null = useSelector(
    (state: RootState) => state.privateData.value,
  );
  const myTalkLastSeen: { [key: string]: number } = useSelector(
    (state: RootState) => state.talkLastSeen.value,
  );

  const [timeLeft, setTimeLeft] = useState<{ [key: string]: string }>({});

  // レンダリング時
  useEffect(() => {
    dispatch(setIsUnreadTalk(false));
    // currentTalkPartnerを初期化
    dispatch(setCurrentTalkPartnerUid(null));
    // 初回の残り時間と有効期限を設定
    updateTimesAndValidity();
    // 1秒ごとに残り時間とトークの有効期限を更新
    const intervalId = setInterval(() => {
      updateTimesAndValidity();
    }, 1000);
    // クリーンアップ
    return () => clearInterval(intervalId);
  }, [talkData]);

  // トークデータから対象のユーザーを削除する
  const deleteTalkPartner = async (myUid: string, uid: string) => {
    console.log("DELETE", uid);
    let talkRoomId: string = "";
    if (talkData && talkData[uid]) {
      talkRoomId = talkData[uid]?.talk_room_id as string;
    }
    // 自分 to 相手
    const myTalkRef = doc(db, "talk", myUid);
    await updateDoc(myTalkRef, {
      [uid]: deleteField(),
    });
    const talkRoomRef = doc(db, "talk_room", talkRoomId);
    await deleteDoc(talkRoomRef);
    // reduxに入っているトーク履歴を消す
    dispatch(deleteKey(uid));
  };

  // すべての残り有効期限を更新する
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
        if (updatedValidity[uid] == false && myUid) {
          deleteTalkPartner(myUid, uid);
        }
      }
    }
  };

  // そのトークが未読か判定
  const judegIsUnreadTalk = (uid: string) => {
    let isUnread: boolean = false;
    if (myTalkHistroyData[uid]) {
      isUnread =
        myTalkHistroyData[uid][myTalkHistroyData[uid].length - 1].timestamp >
        myTalkLastSeen[uid];
      if (isUnread) {
        // 未読のトークがあればトークバッジをつける
        dispatch(setIsUnreadTalk(true));
      }
    }
    return isUnread;
  };

  // トーク画面に遷移
  const handlePressTalkButton = (uid: string, userData: UserData | null) => {
    router.push({
      pathname: "/talkList/talkPage",
      params: {
        uid: uid,
        name: userData?.name,
        createAt: talkData && talkData[uid].created_at,
        expoPushToken: userData?.expo_push_token,
      },
    });
  };

  return (
    <Container edges={["left", "right"]} className="flex-1">
      <StyledView className="flex-1">
        {/* トークリスト画面 */}
        {myTalkPartnerData && Object.keys(myTalkPartnerData).length > 0 ? (
          <ScrollView className="flex-1">
            <StyledView className="flex">
              {Object.entries(myTalkPartnerData).map(([uid, userData]) => (
                <StyledTouchableOpacity
                  onPress={() => handlePressTalkButton(uid, userData)}
                  key={uid}
                  className="border-1 flex flex-row border-b border-[#aaa] p-4"
                >
                  {/* アイコン */}
                  <UserIcon uid={uid} userData={userData} currentData={allCurrentData[uid]} />

                  {/* テキスト表示 */}
                  <StyledView className="ml-[10px] flex flex-1 justify-center">
                    <StyledView className="mb-[6px] flex w-full flex-row items-center">
                      <NameDisplayComponent userData={userData} size="large" />
                      {myTalkHistroyData[uid] && (
                        <StyledText className="text-[#aaa]">
                          {convertTimestamp_hhmm(
                            myTalkHistroyData[uid][
                              myTalkHistroyData[uid].length - 1
                            ].timestamp,
                          )}
                        </StyledText>
                      )}
                    </StyledView>

                    <StyledView className="flex flex-row">
                      {/* 未読印 */}
                      {judegIsUnreadTalk(uid) && (
                        <StyledView className="mx-[4px] h-[8px] w-[8px] mt-[2px] rounded-full bg-[#f88373]"></StyledView>
                      )}
                      {myTalkHistroyData[uid] ? (
                        <StyledText
                          // 未読かによって色を変える
                          className={`ml-[2px] leading-[14px] ${judegIsUnreadTalk(uid) ? "text-[#666]" : "text-[#aaa]"}`}
                        >
                          {myTalkHistroyData[uid][myTalkHistroyData[uid].length - 1]
                            .text.length > 16
                            ? `${myTalkHistroyData[uid][myTalkHistroyData[uid].length - 1].text.substring(0, 16)} ...`
                            : myTalkHistroyData[uid][
                              myTalkHistroyData[uid].length - 1
                            ].text}
                        </StyledText>
                      ) : (
                        <StyledText className="text-[#7785ff]">
                          メッセージが届きました
                        </StyledText>
                      )}
                    </StyledView>
                  </StyledView>
                  {/* 残り時間表示 */}
                  <StyledView className="h-16">
                    <CircleProgress
                      timeString={timeLeft[uid]}
                      totalMinutes={180}
                    />
                  </StyledView>
                </StyledTouchableOpacity>
              ))}
            </StyledView>
          </ScrollView>
        ) :
          <StyledView className="flex items-center justify-center h-full">
            <StyledText className="text-[#666]">まだトーク相手がいません</StyledText>
          </StyledView>
        }
      </StyledView>

      {/* トークリクエスト表示 */}
      <StyledView className="absolute bottom-[2%] bg-[#fff] rounded-xl right-[2%] p-4 shadow-lg">
        <StyledView className="mb-[2px] h-[30px]">
          <StyledText>トークリクエスト</StyledText>
        </StyledView>
        <StyledText className="font-bold text-[#5494AD]">
          {/* 大きいXの部分 */}
          <StyledText className="text-[24px]">{countTalkFromMe({ myUid, myTalkHistroyData })}</StyledText>
          {/* 小さい / OO人の部分 */}
          <StyledText className="text-[12px]"> / {myPrivateData?.membership_status === "free" ? 10 : 30} 人</StyledText>
        </StyledText>
      </StyledView>
    </Container>
  );
};

export default TalkListScreen;
