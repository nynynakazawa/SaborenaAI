import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";
import Icon from "react-native-vector-icons/Entypo";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const ActionButton = () => {
  return (
    <StyledTouchableOpacity
      onPress={() => console.log("message")}
      className="absolute bottom-[6%] right-[10%] z-[200] gap-[20px]"
    >
      <StyledView className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#448FFF] shadow-2xl">
        <Icon name="mail" size={30} color="#fff" />
      </StyledView>
    </StyledTouchableOpacity>
  );
};

export default ActionButton;
