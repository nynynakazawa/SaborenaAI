import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { styled } from "nativewind";
import { useRouter } from "expo-router";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const AgeVerificationHelp = () => {
  const router = useRouter();

  return (
    <StyledView className="mt-[10vh]">
      {/* アカウント管理 */}
      <StyledText className="mx-auto mb-[12px] w-[90%] text-[18px] font-bold text-[#333]">
        年齢確認
      </StyledText>
      <StyledView>
        {/* 年齢確認について */}
        <StyledTouchableOpacity
          onPress={() => router.push("/mySetting/help/ageVerificationAboutPage")}
          className="w-screen border-t-[1px] border-[#ddd] bg-[#fff]"
        >
          <StyledView className="mx-auto flex h-[6vh] w-[90%] flex-row items-center justify-between">
            <StyledText className="text-[16px] text-[#333]">
              年齢確認について
            </StyledText>
          </StyledView>
        </StyledTouchableOpacity>
      </StyledView>
    </StyledView>
  )
}

export default AgeVerificationHelp
