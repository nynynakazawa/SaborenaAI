import React from "react";
import { Text, View } from "react-native";
import { styled } from "nativewind";
import { useSelector } from "react-redux";
import { PrivateData, UserData } from "../../../types/userDataTypes";
import { RootState } from "../../../store/store";

const StyledView = styled(View);
const StyledText = styled(Text);

const AppInfoDisplay = () => {
  // reduxから値を取得
  const myPrivateData: PrivateData | null = useSelector(
    (state: RootState) => state.privateData.value,
  );
  const myTalkPartnerData: { [key: string]: UserData | null } = useSelector(
    (state: RootState) => state.talkPartnerData.value,
  );

  return (
    <StyledView className="flex h-[40px] w-full flex-row justify-between">
      <StyledView className="flex w-[50%] items-center justify-center">
        {/* 会員情報表示 */}
        <StyledText className="mb-[12px] h-[30px]">会員情報</StyledText>
        {myPrivateData?.membership_status == "free" ? (
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
      <StyledView className="flex w-[50%] items-center justify-center border-l-2 border-[#333]">
        <StyledView className="mb-[12px] h-[30px]">
          <StyledText>トーク人数</StyledText>
        </StyledView>
        <StyledText className="font-bold text-[#448FFF]">
          {/* 大きいXの部分 */}
          <StyledText className="text-[24px]">
            {Object.keys(myTalkPartnerData).length}
          </StyledText>
          {/* 小さい / OO人の部分 */}
          <StyledText className="text-[12px]">
            {" "}
            / {myPrivateData?.membership_status === "free" ? 10 : 30} 人
          </StyledText>
        </StyledText>
      </StyledView>
    </StyledView>
  );
};

export default AppInfoDisplay;
