import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Button,
  Platform,
} from "react-native";
import { styled } from "nativewind";
import { UserData } from "../../types/userDataTypes";
import { SafeAreaView } from "react-native-safe-area-context";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);

const LikeFromScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const Container = Platform.OS === "android" ? SafeAreaView : View;

  return (
    <Container style={{ flex: 1 }}>
      <StyledText>talkList</StyledText>
    </Container>
  );
};

export default LikeFromScreen;
