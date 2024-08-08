import React from "react"
import { Text, View } from "react-native"
import { styled } from "nativewind";
import { useSelector } from "react-redux";
import { AppData } from "../../../types/userDataTypes";

const StyledView = styled(View)
const StyledText = styled(Text)

const AppInfoDisplay = () => {
  const myAppData: AppData = useSelector((state: any) => state.appData.value);
  return (
    <StyledView className="flex flex-row w-full justify-between h-[40px]">
      <StyledView className="w-[33.33%] flex justify-center items-center">
        <StyledText className="mb-[12px] h-[30px]">会員情報</StyledText>
        {myAppData?.membership_status == "free" ?
          <StyledText className="text-[16px] text-[#8FE07A] font-bold">無料会員</StyledText>
          :
          <StyledText className="text-[16px] text-[#e0c07a] font-bold">有料会員</StyledText>
        }
      </StyledView>

      <StyledView className="w-[33.33%] flex justify-center items-center border-r-2 border-l-2 border-[#333]">
        <StyledView className="mb-[12px] h-[30px]">
          <StyledText>トーク人数</StyledText>
        </StyledView>
        {myAppData?.membership_status == "free" ?
          <StyledText className="text-[16px] text-[#448FFF] font-bold">10 人</StyledText>
          :
          <StyledText className="text-[16px] text-[#448FFF] font-bold">30 人</StyledText>
        }
      </StyledView>

      <StyledView className="w-[33.33%] flex justify-center items-center">
        <StyledText className="mb-[12px] h-[30px]">いいね</StyledText>
        <StyledText className="text-[16px] text-[#DC6CF8] font-bold">*仮* 回分</StyledText>
      </StyledView>

    </StyledView>
  )
}

export default AppInfoDisplay 
