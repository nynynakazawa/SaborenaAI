import React from "react"
import { Text, View } from "react-native"
import { styled } from "nativewind";
import Icon from "react-native-vector-icons/FontAwesome";

const StyledView = styled(View)
const StyledText = styled(Text)

const ResidentialInput = () => {
  return (
    <StyledView className="mx-auto w-[80vw]">
      <StyledView className="flex flex-row items-center">
        <Icon
          name="map-marker"
          size={30}
          color="#333"
          className="mr-[10px]"
        />
        <StyledText className="text-[16px]">
          居住区<StyledText className="text-[#f00]">*</StyledText>
        </StyledText>
      </StyledView>
    </StyledView>
  )
}

export default ResidentialInput
