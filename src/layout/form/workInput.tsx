import React, { useState } from "react";
import { Text, TouchableOpacity, View, ViewStyle } from "react-native";
import Modal from "react-native-modal";
import { styled } from "nativewind";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Picker } from "@react-native-picker/picker";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const works = [
  "未設定",
  "仕事1",
  "仕事2",
  "仕事3",
  "仕事4",
  "仕事5",
  // Add more Works as needed
];

const WorkInput = ({
  selectedWork,
  setSelectedWork,
}: {
  selectedWork: string;
  setSelectedWork: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const toggleModal = (): void => {
    setModalVisible(!isModalVisible);
  };

  return (
    <StyledView className="mx-auto mb-[12px] flex w-[90vw] flex-row justify-between">
      <StyledView className="mb-[8px] flex flex-row items-center">
        <Icon
          name="work"
          size={32}
          color="#333"
          className="ml-[8px] mr-[16px]"
        />
        <StyledText className="text-[16px]">仕事</StyledText>
      </StyledView>
      <StyledTouchableOpacity
        onPress={toggleModal}
        activeOpacity={0.8}
        className="flex"
      >
        <StyledView className="flex justify-around border-b-2 border-[#333] p-[6px] px-[20px] text-[16px] text-[#333]">
          <StyledText
            className={`text-[16px] text-[#333] ${selectedWork == "未設定" && "text-[#ccc]"}`}
          >
            {selectedWork}
          </StyledText>
        </StyledView>
      </StyledTouchableOpacity>

      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <StyledView className="items-center rounded-lg bg-white p-5">
          <Picker
            selectedValue={selectedWork}
            onValueChange={(itemValue: string) => setSelectedWork(itemValue)}
            style={{ width: "100%", height: 200 } as ViewStyle}
          >
            {works.map((work) => (
              <Picker.Item key={work} label={work} value={work} />
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

export default WorkInput;
