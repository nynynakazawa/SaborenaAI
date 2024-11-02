import React from "react";
import { Text, View } from "react-native";
import { styled } from "nativewind";
import { useSelector } from "react-redux";
import { Message, PrivateData, UserData } from "../../../types/userDataTypes";
import { RootState } from "../../../store/store";
import { countTalkFromMe } from "../../../utils/countTalkFromMe";

const StyledView = styled(View);
const StyledText = styled(Text);

const AppInfoDisplay = () => {
  // reduxから値を取得
  const myPrivateData: PrivateData | null = useSelector(
    (state: RootState) => state.privateData.value,
  );
  const myTalkHistroyData: { [key: string]: Message[] | null } = useSelector(
    (state: RootState) => state.talkHistoryData.value,
  );
  const myUid: string | null = useSelector(
    (state: RootState) => state.myUid.value,
  );
  return (
    <StyledView className="flex h-[40px] w-full flex-row justify-between">
      <StyledView className="flex w-[50%] items-center justify-center">
        {/* 会員情報表示 */}
        <StyledText className="mb-[12px] h-[30px]">会員情報</StyledText>
        {myPrivateData?.membership_status == "free" ? (
          <StyledText className="text-[16px] font-bold text-[#5294AC]">
            無料会員
          </StyledText>
        ) : (
          <StyledText className="text-[16px] font-bold text-[#e0c07a]">
            有料会員
          </StyledText>
        )}
      </StyledView>

      {/* トークリクエスト
      表示 */}
      <StyledView className="flex w-[50%] items-center justify-center border-l-2 border-[#333]">
        <StyledView className="mb-[12px] h-[30px]">
          <StyledText>トークリクエスト</StyledText>
        </StyledView>
        <StyledText className="font-bold text-[#5294AC]">
          {/* 大きいXの部分 */}
          <StyledText className="text-[24px]">
            {countTalkFromMe({ myUid, myTalkHistroyData })}
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
