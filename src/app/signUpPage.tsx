import React, { useEffect, useState } from "react";
import { Platform, Text, View } from "react-native";
import { styled } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";

import FirstSetting_step1 from "../components/signUp/step1/firstSetting_step1";
import FirstSetting_step2 from "../components/signUp/step2/firstSetting_step2";
import Registration from "../components/signUp/createAccount/createAccount";
import FirstSetting_step3 from "../components/signUp/step3/firstSetting_step3";
import UserRegistationButton from "../components/signUp/userRegistrationButton";
import { useGlobalSearchParams } from "expo-router";

const StyledView = styled(View);
const StyledText = styled(Text);

const FirstSetting = () => {
  const Container = Platform.OS === "android" ? SafeAreaView : View;

  const { isExitUser }  = useGlobalSearchParams();
  useEffect(() => {
    if (isExitUser == "exit") {
      setScene(1);
    }
  }, []);

  const [scene, setScene] = useState<number>(0);
  // Registation
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordAgain, setPasswordAgain] = useState<string>("");
  const [isOver18, setIsOver18] = useState<boolean>(false);
  const [isAgreeTerms, setIsAgreeTerms] = useState<boolean>(false);

  // FirsetSetting_Step1
  const [name, setName] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [selectedPrefecture, setSelectedPrefecture] =
    useState<string>("未設定");
  const [selectedCity, setSelectedCity] = useState<string>("未設定");

  // FirsetSetting_Step2
  const [image, setImage] = useState<string | null>(null);

  // FirsetSetting_Step3
  const [selfIntroduction, setSelfIntroduction] = useState<string>("");
  const [selectedWork, setSelectedWork] = useState<string>("未設定");
  const [selectedGoal, setSelectedGoal] = useState<string>("未設定");

  return (
    <Container style={{ flex: 1 }}>
      {/* Registration */}
      {scene == 0 && (
        <Registration
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          passwordAgain={passwordAgain}
          setPasswordAgain={setPasswordAgain}
          isOver18={isOver18}
          setIsOver18={setIsOver18}
          isAgreeTerms={isAgreeTerms}
          setIsAgreeTerms={setIsAgreeTerms}
          scene={scene}
          setScene={setScene}
        />
      )}
      {/* step1 */}
      {scene == 1 && (
        <FirstSetting_step1
          name={name}
          setName={setName}
          birthday={birthday}
          setBirthday={setBirthday}
          gender={gender}
          setGender={setGender}
          selectedPrefecture={selectedPrefecture}
          setSelectedPrefecture={setSelectedPrefecture}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          scene={scene}
          setScene={setScene}
        />
      )}
      {/* step2 */}
      {scene == 2 && (
        <FirstSetting_step2
          image={image}
          setImage={setImage}
          scene={scene}
          setScene={setScene}
        />
      )}
      {scene == 3 && (
        <StyledView>
          <FirstSetting_step3
            selfIntroduction={selfIntroduction}
            setSelfIntroduction={setSelfIntroduction}
            selectedWork={selectedWork}
            setSelectedWork={setSelectedWork}
            selectedGoal={selectedGoal}
            setSelectedGoal={setSelectedGoal}
            scene={scene}
            setScene={setScene}
            email={email}
            password={password}
          />
          <UserRegistationButton
            name={name}
            email={email}
            password={password}
            birthday={birthday}
            image={image}
            gender={gender}
            selectedPrefecture={selectedPrefecture}
            selectedCity={selectedCity}
            selfIntroduction={selfIntroduction}
            selectedWork={selectedWork}
            selectedGoal={selectedGoal}
            setScene={setScene}
          />
        </StyledView>
      )}

      <StyledView className="absolute bottom-0 h-[20px] w-screen bg-[#E3422F]"></StyledView>
    </Container>
  );
};

export default FirstSetting;
