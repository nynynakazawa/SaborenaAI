import React, { useState } from "react"
import { Image, ScrollView, TouchableOpacity, View } from "react-native"
import Modal from "react-native-modal";
import { styled } from "nativewind";
import { CurrentData, UserData } from "../../../types/userDataTypes";
import TopProfile from "../../../components/userModal/topProfile";
import WhatNowProfile from "../../../components/userModal/whatNowProfile";
import SelfIntroductionProfile from "../../../components/userModal/selfIntroductionProfile";
import WorkProfile from "../../../components/userModal/workProfile";
import GoalProfile from "../../../components/userModal/goalProfile";

const StyledView = styled(View)
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity)
const StyledScrollView = styled(ScrollView);

const UserIcon = ({
  uid,
  userData,
  currentData,
}: {
  uid: string;
  userData: UserData | null;
  currentData: CurrentData | null;
}
) => {

  const [isVisibleUserModal, setIsVisibleUserModal] = useState<boolean>(false);

  return (
    <StyledView>
      {userData?.main_image_url && (
        <StyledTouchableOpacity
          onPress={() => setIsVisibleUserModal(true)}
        >
          <StyledImage
            source={{ uri: userData.main_image_url }}
            className="h-16 w-16 rounded-full"
          />
        </StyledTouchableOpacity>
      )}
      {isVisibleUserModal && (
        <Modal isVisible={isVisibleUserModal} onBackdropPress={() => setIsVisibleUserModal(false)}>
          <StyledView className="max-h-[50vh] w-full rounded-lg bg-[#fff] p-4">
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
          </StyledView>
        </Modal>
      )}
    </StyledView>
  )
}

export default UserIcon
