import React from "react";
import { ActivityIndicator, Platform, Text, View } from "react-native";
import { styled } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";

const StyledText = styled(Text);

const TalkListScreen = () => {
  const Container = Platform.OS === "android" ? SafeAreaView : View;
  return (
    <Container style={{ flex: 1 }}>
      <ActivityIndicator size="large" />
    </Container>
  );
};

export default TalkListScreen;
