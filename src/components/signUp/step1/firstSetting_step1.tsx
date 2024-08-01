import React from "react";
import { Platform, Text, View } from "react-native";
import { styled } from "nativewind";
import NameInput from "../../../layout/form/nameInput";
import BirthInput from "../../../layout/form/birthInput";
import GenderInput from "../../../layout/form/genderInput";
import ResidentialInput from "../../../layout/form/residentialInput";
import TransitionButton from "../transitionButton";
import Header from "../../../layout/header/header";
import ProgressBar from "../progressBar";

const StyledView = styled(View);
const StyledText = styled(Text);

const FirstSetting_step1 = ({
  name,
  setName,
  birth,
  setBirth,
  gender,
  setGender,
  selectedPrefecture,
  setSelectedPrefecture,
  selectedCity,
  setSelectedCity,
  scene,
  setScene,
}: {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  birth: string;
  setBirth: React.Dispatch<React.SetStateAction<string>>;
  gender: string;
  setGender: React.Dispatch<React.SetStateAction<string>>;
  selectedPrefecture: string;
  setSelectedPrefecture: React.Dispatch<React.SetStateAction<string>>;
  selectedCity: string;
  setSelectedCity: React.Dispatch<React.SetStateAction<string>>;
  scene: number;
  setScene: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const isValidDate = (dateString: string): boolean => {
    if (dateString.length !== 8) {
      return false;
    }
    const year = parseInt(dateString.substring(0, 4), 10);
    const month = parseInt(dateString.substring(4, 6), 10) - 1;
    const day = parseInt(dateString.substring(6, 8), 10);
    if (isNaN(year) || isNaN(month) || isNaN(day)) {
      return false;
    }
    const date = new Date(year, month, day);
    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month ||
      date.getDate() !== day
    ) {
      return false;
    }
    const now = new Date();
    if (date > now) {
      return false;
    }
    return true;
  };
  const isValid =
    name.trim() != "" &&
    isValidDate(birth) &&
    gender.trim() != "" &&
    selectedPrefecture != "未設定";

  return (
    <StyledView className="h-screen">
      <Header />
      <ProgressBar percentage={100 / 3} text={String(scene)} />
      <StyledView
        className={`absolute mt-[80px] w-screen ${Platform.OS == "android" ? "top-[10vh]" : "top-[18vh]"}`}
      >
        <NameInput name={name} setName={setName} />
        <BirthInput birth={birth} setBirth={setBirth} />
        <GenderInput gender={gender} setGender={setGender} />
        <ResidentialInput
          selectedPrefecture={selectedPrefecture}
          setSelectedPrefecture={setSelectedPrefecture}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
        />
      </StyledView>

      <TransitionButton scene={scene} setScene={setScene} isValid={isValid} />
    </StyledView>
  );
};

export default FirstSetting_step1;
