import React, { useState } from "react";
import { Platform, ScrollView, Text, View } from "react-native";
import { styled } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import PageBackHeader from "../../layout/header/pageBackHeader";
import MyProfileIcon from "../../components/main/mySetting/myProfileIcon";
import { UserData } from "../../types/userDataTypes";
import { useSelector } from "react-redux";
import SelfIntroductionInput from "../../layout/form/selfIntroductionInput";
import WorkInput from "../../layout/form/workInput";
import GoalInput from "../../layout/form/goalInput";
import MainImageInput from "../../layout/form/mainImageInput";
import SubImageInput from "../../layout/form/subImageInput";

const StyledView = styled(View);
const StyledText = styled(Text);

const SetMyProfilePage = () => {
  const myUserData: UserData = useSelector((state: any) => state.userData.value);

  const [mainImage, setMainImage] = useState<string | null>(myUserData?.main_image_url || null);
  const [subImages, setSubImages] = useState<(string | null)[]>(myUserData?.sub_images_url || [null, null, null]);

  const [selfIntroduction, setSelfIntroduction] = useState<string>(myUserData?.self_introduction || "");
  const [selectedWork, setSelectedWork] = useState<string>(myUserData?.selected_work || "");
  const [selectedGoal, setSelectedGoal] = useState<string>(myUserData?.selected_goal || "");
  const Container = Platform.OS === "android" ? SafeAreaView : View;

  return (
    <Container style={{ flex: 1 }}>
      <PageBackHeader
        routerPage="main/mySettingScreen"
        text="プロフィール設定"
        isFetchUserProps="false"
      />
      <ScrollView className="bg-[#f2f2f2]">
        <StyledView>

          <StyledView className="top-[8vh] mb-[36vh]">
            <MainImageInput mainImage={mainImage} setMainImage={setMainImage} />
            <SubImageInput subImages={subImages} setSubImages={setSubImages} />
            <SelfIntroductionInput
              selfIntroduction={selfIntroduction}
              setSelfIntroduction={setSelfIntroduction}
            />
            <WorkInput
              selectedWork={selectedWork}
              setSelectedWork={setSelectedWork}
            />
            <GoalInput
              selectedGoal={selectedGoal}
              setSelectedGoal={setSelectedGoal}
            />
          </StyledView>

        </StyledView>
      </ScrollView>
    </Container>
  );
};

export default SetMyProfilePage;
