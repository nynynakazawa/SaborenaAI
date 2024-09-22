import React, { useEffect, useRef, useState } from "react";
import {
  Platform,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { styled } from "nativewind";
import { router, useGlobalSearchParams } from "expo-router";
import PageBackHeader from "../../layout/header/pageBackHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { RootState } from "../../store/store";
import { Message, TalkData } from "../../types/userDataTypes";
import uuid from "react-native-uuid";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  convertTimestamp_hhmm,
  getRemainingTime,
} from "../../utils/convertTimestamp";
import { set as setCurrentTalkPartnerUid } from "../../store/currentTalkPartnerUidSlice";
import { updateKey as updateKeyTalkLastSeen } from "../../store/talkLastSeenSlice";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);

type PushNotification = {
  to: string;
  sound: "default" | null;
  title: string;
  body: string;
  data?: Record<string, any>;
};

type RemainType = {
  leftTime: string;
  isValid: boolean;
};

// Expo Push通知を送信する関数
async function sendPushNotification(
  expoPushToken: string,
  myUid: string,
  myName: string,
  message: string,
): Promise<void> {
  const notification: PushNotification = {
    to: expoPushToken, // ExpoPushTokenを指定
    sound: "default", // 通知サウンド
    title: `${myName} からのメッセージ`, // 通知のタイトル
    body: `${message}`, // 通知の本文
    // 詳細
    data: {
      type: "message",
      message: {
        senderId: `${myUid}`,
      },
    },
  };

  try {
    // Expo Push通知サービスにリクエストを送信
    const response = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notification),
    });

    const data = await response.json();
    console.log(data); // レスポンスデータをログに出力
  } catch (error) {
    console.error("Push Notification Error: ", error);
  }
}

const TalkPage = () => {
  // reduxから値を取得
  const dispatch = useDispatch();
  const myUid: string | null = useSelector(
    (state: RootState) => state.myUid.value,
  );
  const myTalkData: TalkData | null = useSelector(
    (state: RootState) => state.talkData.value,
  );
  const myTalkHistroyData: { [key: string]: Message[] | null } = useSelector(
    (state: RootState) => state.talkHistoryData.value,
  );
  const myUserData = useSelector((state: RootState) => state.userData.value);

  const Container = Platform.OS === "android" ? SafeAreaView : View;
  // パラメータを受け取る
  const { uid, name, createAt, expoPushToken } = useGlobalSearchParams();

  const [defaultKeyboardHeight, setDefaultKeyboardHeight] = useState<number>();
  const messages = myTalkHistroyData[uid as string];
  const [message, setMessage] = useState<string>("");
  const [isTextInputFocused, setIsTextInputFocused] = useState<boolean>(false);
  const flatListRef = useRef<FlatList>(null);
  const [remain, setRemain] = useState<RemainType>({
    leftTime: "3時間0分",
    isValid: true,
  });

  // talkRoom作成
  const createTalkRoom = async (
    myUid: string,
    uid: string,
  ): Promise<string> => {
    const talkRoomId = uuid.v4() as string;
    const date = new Date();
    const timestamp = date.getTime();

    if (myTalkData && !(uid in myTalkData)) {
      const myTalkRef = doc(db, "talk", myUid);
      // 自分のtalkへ書き込む
      await setDoc(
        myTalkRef,
        {
          [uid]: {
            talk_room_id: talkRoomId,
            created_at: timestamp,
          },
        },
        { merge: true },
      );
      // 相手のtalkへ書き込む
      const partnerTalkRef = doc(db, "talk", uid);
      await setDoc(
        partnerTalkRef,
        {
          [myUid]: {
            talk_room_id: talkRoomId,
            created_at: timestamp,
          },
        },
        { merge: true },
      );
    }
    return talkRoomId;
  };

  // メッセージを送信処理
  const handleSend = async (
    myUid: string | null,
    myName: string,
    uid: string,
  ) => {
    // myUid: 自分のUID
    // uid: 相手のUID
    const date = new Date();
    const timestamp = date.getTime();
    let talkRoomId: string = "";
    if (myTalkData) {
      talkRoomId = myTalkData[uid as string]?.talk_room_id as string;
    }

    if (!talkRoomId && myUid) {
      talkRoomId = await createTalkRoom(myUid, uid);
    }

    // メッセージを追加
    if (talkRoomId) {
      setMessage("");
      const talkRoomRef = doc(db, "talk_room", talkRoomId);
      const messageId = uuid.v4() as string;
      await setDoc(
        talkRoomRef,
        {
          [messageId]: {
            id: messageId,
            text: message,
            senderId: myUid,
            timestamp: timestamp,
          },
        },
        { merge: true },
      );

      // 相手に通知を送る
      sendPushNotification(
        expoPushToken as string,
        myUid as string,
        myName,
        message,
      );
    }
  };

  // レンダリング時
  useEffect(() => {
    // CurrentTalkPartnerを設定
    dispatch(setCurrentTalkPartnerUid(uid));
    // 新しいメッセージが追加されたら自動的に一番下にスクロール
    if (messages) {
      if (messages.length > 0) {
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 200);
      }
    }

    // ### 定期実行 ###
    const date = new Date();
    const timestamp = date.getTime();
    dispatch(updateKeyTalkLastSeen({ key: uid as string, data: timestamp }));
    setRemain(getRemainingTime(parseInt(createAt as string)));
    // 最終閲覧時刻を定期的に更新する処理
    const intervalId = setInterval(() => {
      const date = new Date();
      const timestamp = date.getTime();
      dispatch(updateKeyTalkLastSeen({ key: uid as string, data: timestamp }));
      const tmpRemain = getRemainingTime(parseInt(createAt as string));
      setRemain(tmpRemain);
      // 有効期限が切れたらページをもどす
      if (tmpRemain.isValid == false && remain.leftTime === "0時間0分") {
        router.push("main/talkListScreen");
      }
    }, 1000); // 1秒ごとに実行

    // クリーンアップ処理
    return () => clearInterval(intervalId); // コンポーネントのアンマウント時にタイマーを解除
  }, [messages]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (e) => {
        setDefaultKeyboardHeight(e.endCoordinates.height);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  // Render item
  const renderItem = ({ item }: { item: any }) => (
    <StyledView
      className={`pt-6 ${item.senderId === myUid ? "self-end" : "self-start"}`}
    >
      <StyledView
        className={`rounded-[24px] px-[20px] py-[16px] ${
          item.senderId === myUid
            ? "rounded-br-[6px] bg-[#ff6767]"
            : "rounded-bl-[6px] bg-[#aaa]"
        }`}
      >
        <StyledText className="text-[16px] text-[#fff]">{item.text}</StyledText>
      </StyledView>
      <StyledText
        className={`text-[#aaa] ${item.senderId === myUid ? "mr-[12px] self-end" : "mr-[12px] self-start"}`}
      >
        {convertTimestamp_hhmm(item.timestamp)}
      </StyledText>
    </StyledView>
  );

  return (
    <Container style={{ flex: 1 }}>
      <PageBackHeader
        routerPage="main/talkListScreen"
        text={`${name}`}
        isFetchUserProps={"false"}
      />
      <StyledView className="flex-1 bg-[#f2f2f2] p-2">
        {/* メッセージ表示部 */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
        />

        {/* メッセージ入力 */}
        <StyledView className="bg-[fff]">
          <StyledText className="ml-[30px] translate-y-[10px] text-[12px] text-[#aaa]">
            {remain.leftTime !== "NaN時間NaN分" &&
              `トーク残り有効期限: ${remain.leftTime || ""}`}
          </StyledText>
          <StyledView
            className={`mx-auto my-[14px] w-[90vw] rounded-full border-[1px] border-[#aaa] bg-[#fff] ${isTextInputFocused ? "border-2 border-blue-500" : ""}`}
            style={
              Platform.OS == "ios" &&
              isTextInputFocused && {
                bottom: defaultKeyboardHeight,
                marginBottom: -2,
              }
            }
          >
            <StyledView className="mx-auto w-[80vw] flex-row items-center p-[8px]">
              <StyledTextInput
                className="h-full flex-1 text-[16px] text-[#333]"
                value={message}
                onChangeText={setMessage}
                placeholder="メッセージを送る"
                maxLength={30}
                placeholderTextColor={"#ccc"}
                onFocus={() => setIsTextInputFocused(true)}
                onBlur={() => setIsTextInputFocused(false)}
              />
              {/* 送信ボタン */}
              <StyledView className="h-[40px] w-[2px] bg-[#ccc]"></StyledView>
              <StyledTouchableOpacity
                onPress={() => {
                  handleSend(myUid, myUserData?.name as string, uid as string);
                  setIsTextInputFocused(false);
                  Keyboard.dismiss();
                }}
                className="h-[40px] pl-[16px]"
                disabled={message?.trim() == ""}
              >
                <Icon
                  name="send"
                  size={34}
                  color="#73BBFD"
                  className={`translate-y-[2px] ${
                    message.trim() == "" && "opacity-30"
                  }`}
                />
              </StyledTouchableOpacity>
            </StyledView>
          </StyledView>
        </StyledView>
      </StyledView>
    </Container>
  );
};

export default TalkPage;
