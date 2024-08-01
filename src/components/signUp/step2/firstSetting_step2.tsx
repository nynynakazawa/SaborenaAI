import React from "react"
import { Text, View } from "react-native"
import { styled } from "nativewind";
import Header from "../../../layout/header/header";
import ProgressBar from "../progressBar";
import TransitionButton from "../transitionButton";

const StyledView = styled(View)
const StyledText = styled(Text)

const FirstSetting_step2 = ({
  scene,
  setScene,
} : {
  scene: number;
  setScene: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <StyledView className="h-screen">
      <Header />
      <ProgressBar percentage={200 / 3} text={String(scene)} />
      <TransitionButton
        scene={scene}
        setScene={setScene}
        isValid={true}
      />
    </StyledView>
  )
}

export default FirstSetting_step2
