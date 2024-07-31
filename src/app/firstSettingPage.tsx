import React, { useState } from "react";
import { Platform, Text, View } from "react-native";
import { styled } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../layout/header/header";
import NameInput from "../components/firstSetting/nameInput";
import BirthInput from "../components/firstSetting/birthInput";
import GenderInput from "../components/firstSetting/genderInput";
import ResidentialInput from "../components/firstSetting/residentialInput";

const StyledView = styled(View);
const StyledText = styled(Text);

const FirstSetting = () => {
  const Container = Platform.OS === "android" ? SafeAreaView : View;

  const [name, setName] = useState<string>("");
  const [birth, setBirth] = useState<string>("");
  const [jender, setJender] = useState<string>("");
  const [residential, setResidential] = useState<string>("");

  return (
    <Container style={{ flex: 1 }}>
      <StyledView>
        <Header />
        <NameInput setName={setName} />
        <BirthInput setBirth={setBirth} />
        <GenderInput setJender={setJender}/>
        <ResidentialInput />
      </StyledView>
    </Container>
  );
};

export default FirstSetting;
