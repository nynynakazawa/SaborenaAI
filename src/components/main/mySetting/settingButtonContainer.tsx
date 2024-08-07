import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { styled } from "nativewind";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const StyledView = styled(View)
const StyledText = styled(Text)
const StyledTouchableOpacity = styled(TouchableOpacity);

const SettingButtonContainer = () => {
  return (
    <StyledView className="flex flex-row w-full justify-between">
      <StyledTouchableOpacity
        onPress={()=>console.log("test")}
        className="w-[30%]"
      >
        <StyledView className="flex items-center gap-[10px]">
          <AntDesign
            name="like1"
            size={30}
            color="#333"
          />
          <StyledText>自分から</StyledText>
        </StyledView>
      </StyledTouchableOpacity>

      <StyledTouchableOpacity
        onPress={()=>console.log("test")}
        className="w-[30%]"
      >
        <StyledView className="flex items-center gap-[10px]">
          <FontAwesome
            name="drivers-license-o"
            size={30}
            color="#333"
          />
          <StyledText>年齢確認</StyledText>
        </StyledView>
      </StyledTouchableOpacity>

      <StyledTouchableOpacity
        onPress={()=>console.log("test")}
        className="w-[30%]"
      >
        <StyledView className="flex items-center gap-[10px]">
          <FontAwesome
            name="diamond"
            size={30}
            color="#333"
          />
          <StyledText>プレミアム</StyledText>
        </StyledView>
      </StyledTouchableOpacity>

    </StyledView>
  )
}

export default SettingButtonContainer
