import React from "react";
import { Platform, View } from "react-native";
import { styled } from "nativewind";
import ProgressBar from "../../firstSetting/progressBar";
import TransitionButton from "../../firstSetting/transitionButton";
import MainImageInput from "../../../layout/form/mainImageInput";
import ImageCaution from "../../firstSetting/step2/imageCaution";
import NowMatchHeader from "../../../layout/header/nowMatchHeader";

const StyledView = styled(View);

const FirstSetting_step2 = ({
  mainImage,
  setMainImage,
  scene,
  setScene,
}: {
  mainImage: string | null;
  setMainImage: React.Dispatch<React.SetStateAction<string | null>>;
  scene: number;
  setScene: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const isValid: boolean = mainImage != null;

  return (
    <StyledView className="h-screen">
      <NowMatchHeader />
      <ProgressBar percentage={200 / 3} text={String(2)} />

      <StyledView
        className={`absolute mt-[80px] w-screen ${Platform.OS == "android" ? "top-[10vh]" : "top-[18vh]"}`}
      >
        <MainImageInput
          mainImage={mainImage}
          setMainImage={setMainImage}
          isRequired={true}
        />
      </StyledView>

      <ImageCaution />

      <TransitionButton scene={scene} setScene={setScene} isValid={isValid} />
    </StyledView>
  );
};

export default FirstSetting_step2;
