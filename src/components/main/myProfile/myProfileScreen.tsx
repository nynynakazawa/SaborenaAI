import React from "react"
import { Text, View } from "react-native"
import { styled } from "nativewind";

const StyledView = styled(View)
const StyledText = styled(Text)

const MyProfileScreen = () => {
  return (
    <StyledView>
      <StyledText>p</StyledText>
    </StyledView>
  )
}

export default MyProfileScreen
