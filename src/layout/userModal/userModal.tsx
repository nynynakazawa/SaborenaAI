import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
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

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);
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
  // reduxから値を取得
  const myCurrentData: CurrentData = useSelector(
    (state: any) => state.currentData.value,
  );
  const myUserData: UserData = useSelector(
    (state: any) => state.userData.value,
  );
  const myUid: string = useSelector((state: any) => state.myUid.value);
  const allCurrentData = useSelector(
    (state: any) => state.allCurrentData.value,
  );

  // 各state
  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentData, setCurrentData] = useState<CurrentData | null>(null);
  const [gender, setGender] = useState<string | undefined>("");

  useEffect(() => {
    if (uid === myUid) {
      setUserData(myUserData);
      setCurrentData(myCurrentData);
      setGender(myUserData?.gender);
    } else {
      setCurrentData(allCurrentData[uid]);
      const userRef = doc(db, "user", uid);
      return onSnapshot(userRef, (doc) => {
        if (doc.exists()) {
          console.log("fetched current data");
          const userData_tmp = doc.data();
          setUserData(userData_tmp);
          setGender(userData_tmp?.gender);
        } else {
          console.log("No such current data!");
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
      <StyledView
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <StyledView
          className={`relative h-[60vh] w-[86vw] rounded-lg p-[24px] ${
            uid == myUid
              ? "bg-[#fff0d9]"
              : gender == "male"
                ? "bg-[#E4F5FF]"
                : gender == "female"
                  ? "bg-[#FFE4E4]"
                  : "bg-[#E4FFEB]"
          }`}
        >
          {/* メッセージ送信ボタン */}
          {uid != myUid && <SendMessageButton />}
          {/* モーダルの右上に閉じるボタンを追加 */}
          <StyledTouchableOpacity
            onPress={() => setIsVisibleUserModal(false)}
            className="absolute right-[8px] top-[8px]"
          >
            <Icon name="close" size={24} color="#f00" />
          </StyledTouchableOpacity>

          {/* プロフィールを */}
          <StyledScrollView className="h-full w-full pt-[10%]">
            <TopProfile userData={userData} />
            <WhatNowProfile whatNow={currentData?.what_now} />
            <SelfIntroductionProfile
              selfIntroduction={userData?.self_introduction}
            />
            <WorkProfile selectedWork={userData?.selected_work} />
            <GoalProfile selectedGoal={userData?.selected_goal} />
            <StyledView className="h-[30px]" />
          </StyledScrollView>
        </StyledView>
      </StyledView>
    </Modal>
  );
};

export default UserModal;
