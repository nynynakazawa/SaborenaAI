import React from "react";
import { Platform, Text, View } from "react-native";
import { styled } from "nativewind";
import { UserData } from "../../types/userDataTypes";
import { SafeAreaView } from "react-native-safe-area-context";

const StyledView = styled(View);
const StyledText = styled(Text);

const TalkListScreen = () => {
  const Container = Platform.OS === "android" ? SafeAreaView : View;
  return (
    <Container style={{ flex: 1 }}>
      <StyledText>talkList</StyledText>
    </Container>
  );
};

export default TalkListScreen;
