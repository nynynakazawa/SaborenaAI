import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useRouter } from "expo-router";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const SettingButtonContainer = () => {
  const router = useRouter();

  return (
    <StyledView className="flex w-full flex-row justify-between">
      <StyledTouchableOpacity
        onPress={() => router.push("/mySetting/likeToPage")}
        className="w-[30%]"
      >
        <StyledView className="flex items-center gap-[10px]">
          <AntDesign name="like1" size={30} color="#333" />
          <StyledText>自分から</StyledText>
        </StyledView>
      </StyledTouchableOpacity>

      <StyledTouchableOpacity
        onPress={() => router.push("/mySetting/ageVerificationPage")}
        className="w-[30%]"
      >
        <StyledView className="flex items-center gap-[10px]">
          <FontAwesome name="drivers-license-o" size={30} color="#333" />
          <StyledText>年齢確認</StyledText>
        </StyledView>
      </StyledTouchableOpacity>

      <StyledTouchableOpacity
        onPress={() => router.push("/mySetting/premiumPage")}
        className="w-[30%]"
      >
        <StyledView className="flex items-center gap-[10px]">
          <FontAwesome name="diamond" size={30} color="#333" />
          <StyledText>プレミアム</StyledText>
        </StyledView>
      </StyledTouchableOpacity>
    </StyledView>
  );
};

export default SettingButtonContainer;
