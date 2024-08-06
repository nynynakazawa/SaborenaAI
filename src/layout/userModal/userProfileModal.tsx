import React, { useEffect } from "react";
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
import NameDisplayComponent from "../display/nameDisplayComponent";
import TopProfile from "./topProfile";
import SelfIntroductionProfile from "./selfIntroductionProfile";
import WorkProfile from "./workProfile";
import GoalProfile from "./goalProfile";
import WhatNowProfile from "./whatNowProfile";
import { useSelector } from "react-redux";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);
const StyledScrollView = styled(ScrollView);

const UserModal = ({
  isVisibleUserModal,
  setIsVisibleUserModal,
}: {
  isVisibleUserModal: boolean;
  setIsVisibleUserModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const userData: UserData = useSelector((state: any) => state.userData.value);
  const currentData: CurrentData = useSelector(
    (state: any) => state.currentData.value,
  );

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
        <StyledView className="relative h-[60vh] w-[86vw] rounded-lg bg-[#fff] p-[24px]">
          {/* モーダルの右上に閉じるボタンを追加 */}
          <StyledTouchableOpacity
            onPress={() => setIsVisibleUserModal(false)}
            className="absolute right-[8px] top-[8px]"
          >
            <Icon name="close" size={24} color="#f00" />
          </StyledTouchableOpacity>

          <StyledScrollView className="h-full w-full">
            <TopProfile userData={userData} />
            <WhatNowProfile whatNow={currentData?.what_now} />
            <SelfIntroductionProfile
              selfIntroduction={userData?.self_introduction}
            />
            <WorkProfile selectedWork={userData?.selected_work} />
            <GoalProfile selectedGoal={userData?.selected_goal} />
          </StyledScrollView>
        </StyledView>
      </StyledView>
    </Modal>
  );
};

export default UserModal;
