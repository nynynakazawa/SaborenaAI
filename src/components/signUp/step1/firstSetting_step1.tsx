import React from "react";
import { Platform, Text, View } from "react-native";
import { styled } from "nativewind";
import NameInput from "../../../layout/form/nameInput";
import GenderInput from "../../../layout/form/genderInput";
import ResidentialInput from "../../../layout/form/residentialInput";
import TransitionButton from "../transitionButton";
import ProgressBar from "../progressBar";
import BirthdayInput from "../../../layout/form/birthInput";
import NowMatchHeader from "../../../layout/header/nowMatchHeader";

const StyledView = styled(View);

const FirstSetting_step1 = ({
  name,
  setName,
  birthday,
  setBirthday,
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
  birthday: string;
  setBirthday: React.Dispatch<React.SetStateAction<string>>;
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
    const parts = dateString.split(",");
    if (parts.length !== 3) {
      return false;
    }

    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);

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
    isValidDate(birthday) &&
    gender.trim() != "" &&
    selectedPrefecture != "未設定";

  return (
    <StyledView className="h-screen">
      <NowMatchHeader />
      <ProgressBar percentage={100 / 3} text={String(1)} />
      <StyledView
        className={`absolute mt-[80px] w-screen ${Platform.OS == "android" ? "top-[10vh]" : "top-[18vh]"}`}
      >
        <NameInput name={name} setName={setName} />
        <BirthdayInput birthday={birthday} setBirthday={setBirthday} />
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
