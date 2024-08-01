import React, { useState } from "react";
import { Text, View } from "react-native";
import { styled } from "nativewind";
import Header from "../../../layout/header/header";
import ProgressBar from "../progressBar";
import TransitionButton from "../transitionButton";
import MainImageInput from "./mainImageInput";
import ImageCaution from "./imageCaution";

const StyledView = styled(View);

const FirstSetting_step2 = ({
  scene,
  setScene,
}: {
  scene: number;
  setScene: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [image, setImage] = useState<string | null>(null);

  return (
    <StyledView className="h-screen">
      <Header />
      <ProgressBar percentage={200 / 3} text={String(2)} />

      <StyledView className="absolute top-[18vh] mt-[80px] w-screen">
        <MainImageInput image={image} setImage={setImage} />
      </StyledView>
      
      <ImageCaution />

      <TransitionButton scene={scene} setScene={setScene} isValid={true} />
    </StyledView>
  );
};

export default FirstSetting_step2;
