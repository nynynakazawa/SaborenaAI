import React, { useState } from "react";
import { Platform, Text, View } from "react-native";
import { styled } from "nativewind";
import ProgressBar from "../progressBar";
import SelfIntroductionInput from "../../../components/form/selfIntroductionInput";
import WorkInput from "../../../components/form/workInput";
import GoalInput from "../../../components/form/goalInput";
import NowMatchHeader from "../../../layout/header/nowMatchHeader";

const StyledView = styled(View);

const FirstSetting_step3 = ({
  selfIntroduction,
  setSelfIntroduction,
  selectedWork,
  setSelectedWork,
  selectedGoal,
  setSelectedGoal,
}: {
  selfIntroduction: string;
  setSelfIntroduction: React.Dispatch<React.SetStateAction<string>>;
  selectedWork: string;
  setSelectedWork: React.Dispatch<React.SetStateAction<string>>;
  selectedGoal: string;
  setSelectedGoal: React.Dispatch<React.SetStateAction<string>>;
  scene: number;
  setScene: React.Dispatch<React.SetStateAction<number>>;
  email: string;
  password: string;
}) => {
  return (
    <StyledView className="h-screen">
      <NowMatchHeader />
      <ProgressBar percentage={300 / 3} text={String(3)} />
      <StyledView
        className={`absolute mt-[80px] w-screen ${Platform.OS == "android" ? "top-[10vh]" : "top-[18vh]"}`}
      >
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
  );
};

export default FirstSetting_step3;
