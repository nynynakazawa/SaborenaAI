import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

type TermModalProps = {
  visible: boolean;
  onClose: () => void;
};

const TermModal = ({ visible, onClose }: TermModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <StyledTouchableOpacity
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        onPress={onClose}
      >
        <StyledView className="w-[80%] rounded-lg bg-[#fff] p-[20px]">
          <StyledText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </StyledText>
          <StyledTouchableOpacity
            onPress={onClose}
            className="mt-[20px] items-center"
          >
            <StyledText>閉じる</StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </StyledTouchableOpacity>
    </Modal>
  );
};

export default TermModal;
