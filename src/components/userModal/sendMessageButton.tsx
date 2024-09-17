import React, { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { styled } from "nativewind";
import Icon from "react-native-vector-icons/Entypo";
import { useRouter } from "expo-router";
import { PrivateData, UserData } from "../../types/userDataTypes";
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

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
  const myTalkPartnerData: { [key: string]: UserData | null } = useSelector(
    (state: RootState) => state.talkPartnerData.value,
  );
  const myPrivateData: PrivateData | null = useSelector(
    (state: RootState) => state.privateData.value,
  );

  const [isWarningVisible, setIsWarningVisible] = useState(false);
  const isLocked: boolean =
    Object.keys(myTalkPartnerData).length >=
    (myPrivateData?.membership_status === "free" ? 10 : 30);

  // アニメーション用のshared value
  const lockOpacity = useSharedValue(0);
  const warningScale = useSharedValue(0);

  // 鍵ボタンのアニメーションスタイル
  const lockAnimatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(lockOpacity.value, {
      duration: 200,
      easing: Easing.inOut(Easing.ease),
    }),
  }));

  // 警告メッセージのアニメーションスタイル（拡縮アニメーション）
  const warningAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(warningScale.value, { duration: 300 }) }],
  }));

  // メッセージ送信処理
  const handleSendMessage = async () => {
    setIsVisibleUserModal(false);
    router.push({
      pathname: "/talkList/talkPage",
      params: { uid: uid, name: userData?.name },
    });
  };

  // 鍵マークを押したときの処理
  const handleLockPress = () => {
    setIsWarningVisible(true);
    warningScale.value = 1; // 拡大表示
    setTimeout(() => {
      warningScale.value = 0; // 縮小して非表示
      setIsWarningVisible(false);
    }, 1500); // 1.5秒後に自動で消える
  };

  // 鍵の表示アニメーション開始
  React.useEffect(() => {
    if (isLocked) {
      lockOpacity.value = 1;
    }
  }, [isLocked]);

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
      {isLocked && (
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

      {/* 自動で消える警告メッセージ（ボタンの上に表示・拡縮アニメーション） */}
      {isWarningVisible && (
        <StyledView className="absolute bottom-[30%] right-[8%] z-[300] items-center justify-center">
          <Animated.View
            style={[
              warningAnimatedStyle,
              {
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                padding: 20,
                borderRadius: 10,
              },
            ]}
          >
            <StyledText className="text-center text-white">
              メッセージ上限に達したため、メッセージを送信できません。
            </StyledText>
          </Animated.View>
        </StyledView>
      )}
    </>
  );
};

export default SendMessageButton;
