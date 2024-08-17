import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { styled } from "nativewind";
import { CurrentData, UserData } from "../../types/userDataTypes";
import Icon from "react-native-vector-icons/MaterialIcons";
import TopProfile from "./topProfile";
import SelfIntroductionProfile from "./selfIntroductionProfile";
import WorkProfile from "./workProfile";
import GoalProfile from "./goalProfile";
import WhatNowProfile from "./whatNowProfile";
import { useSelector } from "react-redux";
import SendMessageButton from "./sendMessageButton";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { RootState } from "../../store/store";

const StyledView = styled(View);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);

const UserModal = ({
  uid,
  isVisibleUserModal,
  setIsVisibleUserModal,
}: {
  uid: string;
  isVisibleUserModal: boolean;
  setIsVisibleUserModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // * ################################################################################## *
  // reduxから値を取得
  const myCurrentData: CurrentData | null = useSelector(
    (state: RootState) => state.currentData.value,
  );
  const myUserData: UserData | null = useSelector(
    (state: RootState) => state.userData.value,
  );
  const myUid: string = useSelector((state: RootState) => state.myUid.value);
  const allCurrentData = useSelector(
    (state: RootState) => state.allCurrentData.value,
  );

  // 各state
  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentData, setCurrentData] = useState<CurrentData | null>(null);

  // ユーザーがモーダルを開いたとき
  useEffect(() => {
    // 対象が自分の場合はローカルのデータを使う
    if (uid === myUid) {
      setUserData(myUserData);
      setCurrentData(myCurrentData);
    } else {
      // 対象が他のユーザーの時はユーザーデータを取得
      setCurrentData(allCurrentData[uid]);
      const userRef = doc(db, "user", uid);
      return onSnapshot(userRef, (doc) => {
        if (doc.exists()) {
          console.log("🔵fetched user data");
          const userData_tmp = doc.data();
          setUserData(userData_tmp);
        } else {
          console.log("No such user data!");
        }
      });
    }
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisibleUserModal}
      onRequestClose={() => setIsVisibleUserModal(false)}
    >
      <StyledTouchableOpacity
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        activeOpacity={1}
        onPressOut={() => setIsVisibleUserModal(false)}
      >
        <StyledTouchableOpacity
          className={`relative h-[60vh] w-[90vw] rounded-lg p-[24px] ${
            uid == myUid ? "bg-[#fff0d9]" : "bg-[#fff]"
          }`}
          activeOpacity={1}
          onPress={() => {}}
        >
          {userData ? (
            <>
              {/* メッセージ送信ボタン */}
              {uid != myUid && (
                <SendMessageButton
                  userData={userData}
                  uid={uid}
                  setIsVisibleUserModal={setIsVisibleUserModal}
                />
              )}

              {/* モーダルの右上に閉じるボタンを追加 */}
              <StyledTouchableOpacity
                onPress={() => setIsVisibleUserModal(false)}
                className="absolute right-[8px] top-[8px]"
              >
                <Icon name="close" size={24} color="#f00" />
              </StyledTouchableOpacity>

              {/* プロフィールを表示する */}
              <StyledScrollView
                showsVerticalScrollIndicator={false}
                className="h-full w-full pt-[10%]"
              >
                <TopProfile
                  currentData={currentData}
                  userData={userData}
                  uid={uid}
                />
                <WhatNowProfile whatNow={currentData?.what_now} />
                <SelfIntroductionProfile
                  selfIntroduction={userData?.self_introduction}
                />
                <WorkProfile selectedWork={userData?.selected_work} />
                <GoalProfile selectedGoal={userData?.selected_goal} />
                <StyledView className="h-[30px]" />
              </StyledScrollView>
            </>
          ) : (
            <StyledView className="flex h-full items-center justify-center">
              <ActivityIndicator size="large" />
            </StyledView>
          )}
        </StyledTouchableOpacity>
      </StyledTouchableOpacity>
    </Modal>
  );
};

export default UserModal;
