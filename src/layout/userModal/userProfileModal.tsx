import React from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styled } from "nativewind";
import { UserData } from "../../types/userData";
import Icon from "react-native-vector-icons/MaterialIcons";
import NameDisplayComponent from "../display/nameDisplayComponent";
import TopProfile from "./topProfile";
import SelfIntroductionProfile from "./selfIntroductionProfile";
import WorkProfile from "./workProfile";
import GoalProfile from "./goalProfile";
import WhatNowProfile from "./whatNowProfile";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);
const StyledScrollView = styled(ScrollView);

const UserModal = ({
  isVisibleUserModal,
  setIsVisibleUserModal,
  user,
}: {
  isVisibleUserModal: boolean;
  setIsVisibleUserModal: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserData | null;
}) => {
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
            <Icon name="close" size={24} color="#000" />
          </StyledTouchableOpacity>

          <StyledScrollView className="h-full w-full">
              <TopProfile user={user} />
              <WhatNowProfile whatNow={user?.current_info?.what_now} />
              <SelfIntroductionProfile
                selfIntroduction={user?.user_info?.self_introduction}
              />
              <WorkProfile selectedWork={user?.user_info?.selected_work} />
              <GoalProfile selectedGoal={user?.user_info?.selected_goal} />
          </StyledScrollView>
        </StyledView>
      </StyledView>
    </Modal>
  );
};

export default UserModal;
