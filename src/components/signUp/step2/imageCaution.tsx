import React from "react"
import { Image, Text, View } from "react-native"
import { styled } from "nativewind";
import Icon from "react-native-vector-icons/AntDesign";

const StyledView = styled(View)
const StyledText = styled(Text)
const StyledImage = styled(Image)

const ImageCaution = () => {
  return (
    <StyledView className="absolute top-[64vh]">
      <StyledView className="flex-1 justify-center items-center w-screen flex">
        <StyledView className="flex flex-row items-center w-[80vw]">
          <StyledView className="flex justify-center items-center w-[30vw] mr-[12px]">
            <Icon name="checkcircle" size={22} color="#519cf3" className="mb-[6px]" />
            <StyledImage
              source={require("../../../../assets/login/109.jpg")}
              className="mb-[26px] h-[100px] w-[100px] rounded-md"
            />
          </StyledView>
          <StyledView className="flex gap-[4px]">
            <StyledText className="text-[16px]">適切な画像の例</StyledText>
            <StyledText>・顔が映っている</StyledText>
            <StyledText>・雰囲気が読み取れる</StyledText>
            <StyledText>・不適切な画像ではない</StyledText>
            <StyledText>etc...</StyledText>
          </StyledView>
        </StyledView>
      </StyledView>
    </StyledView>
  )
}

export default ImageCaution
