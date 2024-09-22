import React, { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { styled } from "nativewind";
import Icon from "react-native-vector-icons/Entypo";
import { useRouter } from "expo-router";
import { Message, PrivateData, UserData } from "../../types/userDataTypes";
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { countTalkFromMe } from "../../utils/countTalkFromMe";

const StyledText = styled(Text);
const StyledView = styled(View);
const StyledTouchableOpacity = styled(TouchableOpacity);

const SendMessageButton = ({
  userData,
  uid,
  setIsVisibleUserModal,
}: {
  userData: UserData | null;
  uid: string;
  setIsVisibleUserModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();

  // reduxから値を取得
  const myUid: string | null = useSelector(
    (state: RootState) => state.myUid.value,
  );
  const myPrivateData: PrivateData | null = useSelector(
    (state: RootState) => state.privateData.value,
  );
  const myUserData: UserData | null = useSelector(
    (state: RootState) => state.userData.value,
  );
  const myTalkHistroyData: { [key: string]: Message[] | null } = useSelector(
    (state: RootState) => state.talkHistoryData.value,
  );

  const [isWarningVisible, setIsWarningVisible] = useState(false);
  
  // トークリクエストが限界に達していないか
  const flag1: boolean =
    countTalkFromMe({ myUid, myTalkHistroyData }) <
    (myPrivateData?.membership_status === "free" ? 10 : 30);
  // 自分が年齢確認済か
  const flag2 = myUserData?.is_age_verified;
  // 相手が年齢確認済か
  const flag3 = userData?.is_age_verified;
  const canSend = flag1 && flag2 && flag3;

  // アニメーション用のshared value
  const lockOpacity = useSharedValue(0);
  const warningScale = useSharedValue(0);
  const warningTranslateY = useSharedValue(20); // 初期位置を下に設定

  // 鍵ボタンのアニメーションスタイル
  const lockAnimatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(lockOpacity.value, {
      duration: 200,
      easing: Easing.inOut(Easing.ease),
    }),
  }));

  // 警告メッセージのアニメーションスタイル（拡縮＋移動アニメーション）
  const warningAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: withTiming(warningScale.value, { duration: 300 }) },
      { translateY: withTiming(warningTranslateY.value, { duration: 300 }) }, // Y軸の移動
    ],
  }));

  // 警告メッセージ内容生成
  const warningMessages: string[] = [];
  if (!flag1) warningMessages.push("トークリクストが上限に達しています。");
  if (!flag2) warningMessages.push("あなたの年齢確認が完了していません。");
  if (!flag3) warningMessages.push("相手の年齢確認が完了していません。");

  const warningMessage = warningMessages.join("\n");

  // メッセージ送信処理
  const handleSendMessage = async () => {
    if (canSend) {
      setIsVisibleUserModal(false);
      router.push({
        pathname: "/talkList/talkPage",
        params: { uid: uid, name: userData?.name },
      });
    }
  };

  // 鍵マークを押したときの処理
  const handleLockPress = () => {
    setIsWarningVisible(true);
    warningScale.value = 1; // 拡大表示
    warningTranslateY.value = 0; // 下から上に移動

    setTimeout(() => {
      warningScale.value = 0; // 縮小して非表示
      warningTranslateY.value = 20; // 元の位置に戻す
      setIsWarningVisible(false);
    }, 3000); // 3秒後に自動で消える
  };

  // 鍵の表示アニメーション開始
  React.useEffect(() => {
    if (!canSend) {
      lockOpacity.value = 1;
    }
  }, [canSend]);

  return (
    <>
      {/* メッセージボタン */}
      <StyledTouchableOpacity
        onPress={handleSendMessage}
        className="absolute bottom-[8%] right-[8%] z-[200] gap-[20px]"
      >
        <StyledView className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#448FFF] shadow-2xl">
          <Icon name="mail" size={30} color="#fff" />
        </StyledView>
      </StyledTouchableOpacity>

      {/* ロックボタン（別のTouchableOpacity） */}
      {!canSend && (
        <TouchableOpacity
          onPress={handleLockPress}
          className="absolute bottom-[8%] right-[8%] z-[300]" // メッセージボタンの上に配置
          activeOpacity={1}
        >
          <Animated.View
            style={[
              lockAnimatedStyle,
              {
                height: 50,
                width: 50,
                backgroundColor: "rgba(0, 0, 0, 0.5)", // 黒いレイヤー
                borderRadius: 25,
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
          >
            <Icon name="lock" size={24} color="#fff" />
          </Animated.View>
        </TouchableOpacity>
      )}

      {/* 自動で消える警告メッセージ（ふきだしスタイル） */}
      {isWarningVisible && (
        <StyledView className="absolute bottom-[26%] right-[8%] z-[300] items-end justify-center">
          <Animated.View
            style={[
              warningAnimatedStyle,
              {
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                padding: 15,
                borderRadius: 10,
                maxWidth: 250,
                position: "relative",
              },
            ]}
          >
            <StyledText className="text-center text-white">
              {warningMessage}
            </StyledText>
          </Animated.View>
        </StyledView>
      )}
    </>
  );
};

export default SendMessageButton;
