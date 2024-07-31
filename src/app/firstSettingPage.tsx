import React from "react"
import { Text, View } from "react-native"
import { styled } from "nativewind";

const StyledView = styled(View)
const StyledText = styled(Text)

const FirstSetting = () => {
  return (
    <StyledView>
      <StyledText>firstSetting</StyledText>
    </StyledView>
  )
}

export default FirstSetting
