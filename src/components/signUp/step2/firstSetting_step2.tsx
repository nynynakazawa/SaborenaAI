import React, { useState } from "react";
import { Platform, Text, View } from "react-native";
import { styled } from "nativewind";
import Header from "../../../layout/header/header";
import ProgressBar from "../progressBar";
import TransitionButton from "../transitionButton";
import MainImageInput from "../../../layout/form/mainImageInput";
import ImageCaution from "./imageCaution";

const StyledView = styled(View);

const FirstSetting_step2 = ({
  image,
  setImage,
  scene,
  setScene,
}: {
  image: string | null;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
  scene: number;
  setScene: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const isValid: boolean = image != null;
  return (
    <StyledView className="h-screen">
      <Header />
      <ProgressBar percentage={200 / 3} text={String(2)} />

      <StyledView
        className={`absolute mt-[80px] w-screen ${Platform.OS == "android" ? "top-[10vh]" : "top-[18vh]"}`}
      >
        <MainImageInput image={image} setImage={setImage} />
      </StyledView>

      <ImageCaution />

      <TransitionButton scene={scene} setScene={setScene} isValid={isValid} email={""} password={""} />
    </StyledView>
  );
};

export default FirstSetting_step2;
