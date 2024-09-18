import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import Modal from "react-native-modal";
import { styled } from "nativewind";
import { CurrentData, UserData } from "../../types/userDataTypes";
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
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const StyledView = styled(View);
const StyledScrollView = styled(ScrollView);

const UserModal = ({
  uid,
  visible,
  onClose,
}: {
  uid: string;
  visible: boolean;
  onClose: () => void;
}) => {
  // * ################################################################################## *
  // reduxから値を取得
  const myCurrentData: CurrentData | null = useSelector(
    (state: RootState) => state.currentData.value,
  );
  const myUserData: UserData | null = useSelector(
    (state: RootState) => state.userData.value,
  );
  const myUid: string | null = useSelector(
    (state: RootState) => state.myUid.value,
  );
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
    <StyledView className="flex-1 items-center justify-center bg-gray-100">
      <Modal isVisible={visible} onBackdropPress={onClose}>
        {/* 白枠 */}
        <StyledView className="max-h-[50vh] w-full rounded-lg bg-[#fff] p-4">

        {/* 年齢認証バッジ */}
        {userData?.is_age_verified && (
          <StyledView className="absolute top-[6px] left-[6px] flex h-[40px] w-[40px] items-center justify-center">
            <MaterialIcons
              name="verified-user"
              size={26}
              color="#448fff"
              className="bottom-0 right-0"
            />
          </StyledView>
        )}

          {userData ? (
            <>
              {/* メッセージ送信ボタン */}
              {uid != myUid && (
                <SendMessageButton
                  userData={userData}
                  uid={uid}
                  setIsVisibleUserModal={onClose}
                />
              )}
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
        </StyledView>
      </Modal>
    </StyledView>
  );
};

export default UserModal;
