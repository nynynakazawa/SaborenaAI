import React, { useState } from "react"
import { Platform, Text, View } from "react-native"
import { styled } from "nativewind";
import Header from "../../../layout/header/header";
import ProgressBar from "../progressBar";
import SelfIntroductionInput from "../../../layout/form/selfIntroductionInput";
import WorkInput from "../../../layout/form/workInput";
import GoalInput from "../../../layout/form/goalInput";

const StyledView = styled(View)
const StyledText = styled(Text)

const FirstSetting_step3 = (
  {
    selfIntroduction,
    setSelfIntroduction,
    selectedWork,
    setSelectedWork,
    selectedGoal,
    setSelectedGoal,
  }:
    {
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
    }
) => {

  return (
    <StyledView className="h-screen">
      <Header />
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
  )
}

export default FirstSetting_step3

