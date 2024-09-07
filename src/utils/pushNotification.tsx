import React, { useState, useEffect, useRef } from "react";
import { Text, View, Button, Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { styled } from "nativewind";
import { useDispatch, useSelector } from "react-redux";
import { set as setMyExpoPushToken } from "../store/myExpoPushTokenSlice";
import { RootState } from "../store/store";

const StyledView = styled(View)
const StyledText = styled(Text)

export default function Push() {
  // reduxから値を取得
  const dispatch = useDispatch();
  const myExpoPushToken: string | null = useSelector(
    (state: RootState) => state.myExpoPushToken.value,
  );
  let currentTalkPartnerUid: string | null = useSelector(
    (state: RootState) => state.currentTalkPartnerUid.value,
  );
  
  const [channels, setChannels] = useState<Notifications.NotificationChannel[]>([]); // Androidの通知チャンネルを格納
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(undefined); // 最新の通知を格納
  const notificationListener = useRef<Notifications.Subscription>(); // 通知リスナーの参照
  const responseListener = useRef<Notifications.Subscription>(); // 通知応答リスナーの参照

  useEffect(() => {
    // 通知ハンドラーの設定    
    Notifications.setNotificationHandler({
      handleNotification: async (notification) => {
        const type = notification.request.content.data?.type;
        // type: message
        if(type === "message"){
          const senderId = notification.request.content.data?.message?.senderId;
          // 送られたメッセージ
          console.log(JSON.stringify(notification.request.content.data))
          // トーク中の相手には通知を送らない
          if (senderId === currentTalkPartnerUid) {
            return {
              shouldShowAlert: false, // アラート
              shouldPlaySound: false, // 音
              shouldSetBadge: false, // バッジ表示
            };
          }
          else{
            return {
              shouldShowAlert: true,
              shouldPlaySound: true,
              shouldSetBadge: true,
            };
          }
        // type: other
        } else {
          return {
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
          };
        }
      },
    });

    // Push通知の登録を行い、トークンを取得
    registerForPushNotificationsAsync().then(token => token && 
      dispatch(setMyExpoPushToken(token))
    );

    // Androidプラットフォームの場合は通知チャンネルを取得
    if (Platform.OS === "android") {
      Notifications.getNotificationChannelsAsync().then(value => setChannels(value ?? []));
    }

    // 通知が受信されたときのリスナーを追加
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification); // 受信した通知を保存
    });

    // 通知の応答が行われたときのリスナーを追加
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response); // 通知応答の内容をログに出力
    });

    // コンポーネントがアンマウントされたときにリスナーを削除
    return () => {
      notificationListener.current && Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current && Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [currentTalkPartnerUid]);

  return (
    // ? テスト用 ?
    // <StyledView>
    //   {/* Pushトークンを表示 */}
    //   <StyledText className="mt-[10vh]">Now Match</StyledText>
    //   <StyledText className="text-red-300">currentTalkPartnerUid: {currentTalkPartnerUid} </StyledText>

    //   <StyledText>Your expo push token: {myExpoPushToken}</StyledText>

    //   <StyledView>
    //     {/* 通知のタイトルを表示 */}
    //     <StyledText>Title: {notification && notification.request.content.title} </StyledText>
    //     {/* 通知の本文を表示 */}
    //     <StyledText>Body: {notification && notification.request.content.body}</StyledText>
    //     {/* 通知のデータを表示 */}
    //     <StyledText>Data: {notification && JSON.stringify(notification.request.content.data)}</StyledText> 
    //   </StyledView>
    //   <Button
    //     title="Press to schedule a notification"
    //     onPress={async () => {
    //       await schedulePushNotification(); // 通知をスケジュール
    //     }}
    //   />
    // </StyledView>
    // ? テスト用 ?
    <></>
  );
}

// 通知をスケジュールする関数
async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You have got mail! 📬", // 通知タイトル
      body: "Here is the notification body", // 通知本文
      data: { data: "goes here", test: { test1: "more data" } }, // 通知に含めるデータ
    },
    trigger: { seconds: 2 }, // 2秒後に通知をトリガー
  });
}

// Push通知を登録する関数
async function registerForPushNotificationsAsync() {
  let token;

  // Androidの場合、通知チャンネルを設定
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default", // チャンネル名
      importance: Notifications.AndroidImportance.MAX, // チャンネルの重要度
      vibrationPattern: [0, 250, 250, 250], // バイブレーションパターン
      lightColor: "#FF231F7C", // 通知ランプの色
    });
  }

  // デバイスが物理デバイスかどうか確認（エミュレータではPush通知は動作しない）
  if (Device.isDevice) {
    // 現在の通知権限を取得
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    // 権限が未取得の場合は、ユーザーに権限をリクエスト
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    // 通知権限が取得できない場合はエラーメッセージを表示して終了
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }

    // Expo Pushトークンを取得
    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId; // プロジェクトIDを取得

      if (!projectId) {
        throw new Error("Project ID not found");
      }

      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId, // プロジェクトIDを指定してトークンを取得
        })
      ).data;

      console.log(token); // トークンをログに出力
    } catch (e) {
      token = `${e}`; // エラー時にはエラーメッセージをトークンとして格納
    }
  } else {
    // 物理デバイスでない場合はエラーメッセージを表示
    alert("Must use physical device for Push Notifications");
  }

  return token; // 取得したトークンを返す
}
