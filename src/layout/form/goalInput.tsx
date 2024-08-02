import React, { useState } from "react";
import { Text, TouchableOpacity, View, ViewStyle } from "react-native";
import Modal from "react-native-modal";
import { styled } from "nativewind";
import Icon from "react-native-vector-icons/Feather";
import { Picker } from "@react-native-picker/picker";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const goals = [
  "未設定",
  "目標1",
  "目標2",
  "目標3",
  "目標4",
  "目標5",
  // Add more goals as needed
];

const GoalInput = ({
  selectedGoal,
  setSelectedGoal,
}: {
  selectedGoal: string;
  setSelectedGoal: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const toggleModal = (): void => {
    setModalVisible(!isModalVisible);
  };

  return (
    <StyledView className="mx-auto w-[90vw] mb-[12px] flex flex-row justify-between">
      <StyledView className="mb-[8px] flex flex-row items-center">
        <Icon
          name="target"
          size={32}
          color="#333"
          className="ml-[8px] mr-[16px]"
        />
        <StyledText className="text-[16px]">
          目的
        </StyledText>
      </StyledView>
        <StyledTouchableOpacity onPress={toggleModal} activeOpacity={0.8} className="flex">
          <StyledView className="flex flex-row justify-around border-b-2 border-[#333] p-[6px] px-[20px] text-[16px] text-[#333]">
            <StyledText className={`text-[16px] text-[#333] ${selectedGoal == "未設定" && "text-[#ccc]"}`}>{selectedGoal}</StyledText>
          </StyledView>
        </StyledTouchableOpacity>

      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <StyledView className="items-center rounded-lg bg-white p-5">
          <Picker
            selectedValue={selectedGoal}
            onValueChange={(itemValue: string) => setSelectedGoal(itemValue)}
            style={{ width: "100%", height: 200 } as ViewStyle}
          >
            {goals.map((goal) => (
              <Picker.Item key={goal} label={goal} value={goal} />
            ))}
          </Picker>
          <StyledTouchableOpacity
            onPress={toggleModal}
            className="mt-4 rounded-full bg-[#57d0e0] p-3"
          >
            <StyledText className="text-center text-xl text-white">
              決定
            </StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </Modal>
    </StyledView>
  );
};

export default GoalInput;
