import React, { useEffect } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { styled } from "nativewind";
import { useRouter } from "expo-router";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const FunctionHelp = () => {
  const router = useRouter();

  return (
    <StyledView>
      {/* 機能 */}
      <StyledText className="mx-auto mb-[12px] mt-[6vh] w-[90%] text-[18px] font-bold text-[#333]">
        機能
      </StyledText>
      <StyledView>
        {/* マップ機能について */}
        <StyledTouchableOpacity
          onPress={() => router.push("/mySetting/help/mapFunctionAboutPage")}
          className="w-screen border-t-[1px] border-[#ddd] bg-[#fff]"
        >
          <StyledView className="mx-auto flex h-[6vh] w-[90%] flex-row items-center justify-between">
            <StyledText className="text-[16px] text-[#333]">
              マップ機能について
            </StyledText>
          </StyledView>
        </StyledTouchableOpacity>
        {/*  トーク機能について */}
        <StyledTouchableOpacity
          onPress={() => router.push("/mySetting/help/talkFunctionAboutPage")}
          className="w-screen border-t-[1px] border-[#ddd] bg-[#fff]"
        >
          <StyledView className="mx-auto flex h-[6vh] w-[90%] flex-row items-center justify-between">
            <StyledText className="text-[16px] text-[#333]">
              トーク機能について
            </StyledText>
          </StyledView>
        </StyledTouchableOpacity>
        {/* 設定機能について */}
        <StyledTouchableOpacity
          onPress={() => router.push("/mySetting/help/settingFunctionAboutPage")}
          className="w-screen border-t-[1px] border-[#ddd] bg-[#fff]"
        >
          <StyledView className="mx-auto flex h-[6vh] w-[90%] flex-row items-center justify-between">
            <StyledText className="text-[16px] text-[#333]">
              設定機能について
            </StyledText>
          </StyledView>
        </StyledTouchableOpacity>
      </StyledView>

    </StyledView>
  )
}

export default FunctionHelp
