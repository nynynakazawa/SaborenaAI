import React from "react"
import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { styled } from "nativewind";

const StyledView = styled(View)
const StyledText = styled(Text)

const Index = () => {
  return (
    <StyledView className="flex-1 items-center justify-center">
      <StyledText className="text-red-800">Tailwind CSS Test</StyledText>
    </StyledView>
  )
}

export default Index
