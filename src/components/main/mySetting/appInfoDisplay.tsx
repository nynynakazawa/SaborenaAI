import React from "react";
import { Text, View } from "react-native";
import { styled } from "nativewind";
import { useSelector } from "react-redux";
import { AppData } from "../../../types/userDataTypes";

const StyledView = styled(View);
const StyledText = styled(Text);

const AppInfoDisplay = () => {
  const myAppData: AppData = useSelector((state: any) => state.appData.value);
  return (
    <StyledView className="flex h-[40px] w-full flex-row justify-between">
      <StyledView className="flex w-[33.33%] items-center justify-center">
        {/* 会員情報表示 */}
        <StyledText className="mb-[12px] h-[30px]">会員情報</StyledText>
        {myAppData?.membership_status == "free" ? (
          <StyledText className="text-[16px] font-bold text-[#8FE07A]">
            無料会員
          </StyledText>
        ) : (
          <StyledText className="text-[16px] font-bold text-[#e0c07a]">
            有料会員
          </StyledText>
        )}
      </StyledView>

      {/* トーク人数表示 */}
      <StyledView className="flex w-[33.33%] items-center justify-center border-l-2 border-r-2 border-[#333]">
        <StyledView className="mb-[12px] h-[30px]">
          <StyledText>トーク人数</StyledText>
        </StyledView>
        {myAppData?.membership_status == "free" ? (
          <StyledText className="text-[16px] font-bold text-[#448FFF]">
            10 人
          </StyledText>
        ) : (
          <StyledText className="text-[16px] font-bold text-[#448FFF]">
            30 人
          </StyledText>
        )}
      </StyledView>

      {/* いいね数表示 */}
      <StyledView className="flex w-[33.33%] items-center justify-center">
        <StyledText className="mb-[12px] h-[30px]">いいね</StyledText>
        <StyledText className="text-[16px] font-bold text-[#DC6CF8]">
          *仮* 回分
        </StyledText>
      </StyledView>
    </StyledView>
  );
};

export default AppInfoDisplay;
