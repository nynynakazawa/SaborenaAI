import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Button,
} from "react-native";
import { styled } from "nativewind";
import { UserData } from "../../../types/userDataTypes";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);

const LikeFromScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <StyledView className="flex-1 items-center justify-center bg-red-100 p-4">
      <Button title="Open Modal" onPress={() => setIsModalVisible(true)} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <StyledView
          className="flex-1 items-center justify-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          // onPress={() => setIsModalVisible(false)}
        >
          <StyledView className="h-[80%] w-[80%] rounded-lg border border-gray-300 bg-white p-4">
            <StyledScrollView className="h-full w-full bg-white p-4">
              <StyledText className="text-[48px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </StyledText>
            </StyledScrollView>
          </StyledView>
        </StyledView>
      </Modal>
    </StyledView>
  );
};

export default LikeFromScreen;
