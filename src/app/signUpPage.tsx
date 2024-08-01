import React, { useState } from "react";
import { Platform, Text, View } from "react-native";
import { styled } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import SignUpScreen from "../components/signUp/step0/signUpScreen";
import FirstSetting_step1 from "../components/signUp/step1/firstSetting_step1";
import TransitionButton from "../components/signUp/transitionButton";
import FirstSetting_step2 from "../components/signUp/step2/firstSetting_step2";

const StyledView = styled(View);
const StyledText = styled(Text);

const FirstSetting = () => {
  const Container = Platform.OS === "android" ? SafeAreaView : View;

  const [scene, setScene] = useState<number>(1);
  // SignUpScreen
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // FirsetSetting_Step1
  const [name, setName] = useState<string>("");
  const [birth, setBirth] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [selectedPrefecture, setSelectedPrefecture] = useState<string>("未設定");
  const [selectedCity, setSelectedCity] = useState<string>("未設定");

  return (
    <Container style={{ flex: 1 }}>
      {scene == 0 &&
        <SignUpScreen
          scene={scene}
          setScene={setScene}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        />
      }
      {/* step1 */}
      {scene == 1 &&
        <FirstSetting_step1
          name={name}
          setName={setName}
          birth={birth}
          setBirth={setBirth}
          gender={gender}
          setGender={setGender}
          selectedPrefecture={selectedPrefecture}
          setSelectedPrefecture={setSelectedPrefecture}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          scene={scene}
          setScene={setScene}
        />
      }
      {scene == 2 &&
        <FirstSetting_step2
          scene={scene}
          setScene={setScene}
        />
      }

      <StyledView className="absolute bottom-0 h-[20px] w-screen bg-[#E3422F]"></StyledView>
    </Container>
  );
};

export default FirstSetting;
