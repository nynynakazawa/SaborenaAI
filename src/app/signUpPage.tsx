import React, { useEffect, useState } from "react";
import { ActivityIndicator, Platform, View } from "react-native";
import { styled } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";

import CreateAccount from "../features/signUp/createAccount";
import FirstSetting_step1 from "../features/firstSetting/step1/firstSetting_step1";
import FirstSetting_step2 from "../features/firstSetting/step2/firstSetting_step2";
import FirstSetting_step3 from "../features/firstSetting/step3/firstSetting_step3";
import UserRegistationButton from "../features/signUp/userRegistrationButton";
import { useGlobalSearchParams } from "expo-router";

const StyledView = styled(View);

const SignupPage = () => {
  const Container = Platform.OS === "android" ? SafeAreaView : View;

  const { isExitUser } = useGlobalSearchParams();

  useEffect(() => {
    if (isExitUser === "exit") {
      setScene(1);
    }
  }, [isExitUser]);

  const [scene, setScene] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // CreateAccount
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordAgain, setPasswordAgain] = useState<string>("");
  const [isOver18, setIsOver18] = useState<boolean>(false);
  const [isAgreeTerm, setIsAgreeTerm] = useState<boolean>(false);
  const [isAgreePrivacyPolicy, setIsAgreePrivacyPolicy] = useState<boolean>(false);

  // FirstSetting_Step1
  const [name, setName] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [selectedPrefecture, setSelectedPrefecture] =
    useState<string>("未設定");
  const [selectedCity, setSelectedCity] = useState<string>("未設定");

  // FirstSetting_Step2
  const [mainImage, setMainImage] = useState<string | null>(null);

  // FirstSetting_Step3
  const [selfIntroduction, setSelfIntroduction] = useState<string>("");
  const [selectedWork, setSelectedWork] = useState<string>("未設定");
  const [selectedGoal, setSelectedGoal] = useState<string>("未設定");

  return (
    <Container style={{ flex: 1 }}>
      {!isLoading ? (
        <>
          {/* CreateAccount */}
          {scene === 0 && (
            <CreateAccount
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              passwordAgain={passwordAgain}
              setPasswordAgain={setPasswordAgain}
              isOver18={isOver18}
              setIsOver18={setIsOver18}
              isAgreeTerm={isAgreeTerm}
              setIsAgreeTerm={setIsAgreeTerm}
              isAgreePrivacyPolicy={isAgreePrivacyPolicy}
              setIsAgreePrivacyPolicy={setIsAgreePrivacyPolicy}
              scene={scene}
              setScene={setScene}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          )}
          {/* Step 1 */}
          {scene === 1 && (
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
          {/* Step 2 */}
          {scene === 2 && (
            <FirstSetting_step2
              mainImage={mainImage}
              setMainImage={setMainImage}
              scene={scene}
              setScene={setScene}
            />
          )}
          {/* Step 3 */}
          {scene === 3 && (
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
                mainImage={mainImage}
                gender={gender}
                selectedPrefecture={selectedPrefecture}
                selectedCity={selectedCity}
                selfIntroduction={selfIntroduction}
                selectedWork={selectedWork}
                selectedGoal={selectedGoal}
                setScene={setScene}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            </StyledView>
          )}
        </>
      ) : (
        <StyledView className="flex h-full items-center justify-center">
          <ActivityIndicator size="large" />
        </StyledView>
      )}

      <StyledView className="absolute bottom-0 h-[20px] w-screen bg-[#E3422F]" />
    </Container>
  );
};

export default SignupPage;
