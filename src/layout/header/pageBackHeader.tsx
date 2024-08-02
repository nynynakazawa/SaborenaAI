import React from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";
import { router } from "expo-router";
import Icon from "react-native-vector-icons/MaterialIcons";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const PageBackHeader = () => {
  return (
    <StyledView>
      {/* バックボタン */}
      <StyledTouchableOpacity
        onPress={() => router.push("/loginPage")}
        className={`${Platform.OS === "ios" && "mt-[50px]"} h-[70px]`}
      >
        <StyledView className="mx-auto flex h-full w-[90vw] flex-row items-center">
          <Icon
            name="chevron-left"
            size={40}
            color="#333"
            className="mr-[10px]"
          />
          <StyledText className="text-[16px] text-[#333]">戻る</StyledText>
        </StyledView>
      </StyledTouchableOpacity>
    </StyledView>
  );
};

export default PageBackHeader;
