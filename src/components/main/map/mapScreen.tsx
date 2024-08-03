import React from "react"
import { Text, View } from "react-native"
import { styled } from "nativewind";
import { UserData } from "../../../types/userData";

const StyledView = styled(View)
const StyledText = styled(Text)

const MapScreen = ({
  myUser
}:
{
  myUser: UserData | undefined
}) => {
  return (
    <StyledView>
      <StyledText>m</StyledText>
    </StyledView>
  )
}

export default MapScreen
