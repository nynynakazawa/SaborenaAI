import React from "react";
import { Text, View } from "react-native";
import { styled } from "nativewind";
import { PrivateData } from "../../../types/userDataTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import Icon from "react-native-vector-icons/MaterialIcons";

const StyledView = styled(View);
const StyledText = styled(Text);

const AccountManagement = () => {
  const myPrivateData: PrivateData | null = useSelector(
    (state: RootState) => state.privateData.value,
  );
  const password = myPrivateData?.password || "";
  let passwordDisplay: string = password[0];
  for (let i = 0; i < password.length - 1; i += 1) {
    passwordDisplay += "*";
  }

  // * ############################################################################## *
  return (
    <StyledView className="mt-[10vh]">
      {/* アカウント管理 */}
      <StyledText className="mx-auto mb-[12px] w-[90%] text-[18px] font-bold text-[#333]">
        アカウント管理
      </StyledText>
      <StyledView>
        {/* 会員情報表示 */}
        <StyledView className="w-screen border-t-[1px] border-[#ddd] bg-[#fff]">
          <StyledView className="mx-auto flex h-[6vh] w-[90%] flex-row items-center justify-between">
            <StyledText className="w-[40%] text-[16px] text-[#333]">
              会員情報
            </StyledText>
            {myPrivateData?.membership_status == "free" ? (
              <StyledText className="max-w-[60%] text-[16px] font-bold text-[#8FE07A]">
                無料会員
              </StyledText>
            ) : (
              <StyledText className="max-w-[60%] text-[16px] font-bold text-[#e0c07a]">
                有料会員
              </StyledText>
            )}
          </StyledView>
        </StyledView>
        {/* メールアドレス表示 */}
        <StyledView className="w-screen border-t-[1px] border-[#ddd] bg-[#fff]">
          <StyledView className="mx-auto flex h-[6vh] w-[90%] flex-row items-center justify-between">
            <StyledText className="w-[40%] text-[16px] text-[#333]">
              メールアドレス
            </StyledText>
            <StyledText className="max-w-[60%] text-[12px] text-[#EF6B5C]">
              {myPrivateData?.email}
            </StyledText>
          </StyledView>
        </StyledView>
        {/* パスワード表示 */}
        <StyledView className="w-screen border-b-[1px] border-t-[1px] border-[#ddd] bg-[#fff]">
          <StyledView className="mx-auto flex h-[6vh] w-[90%] flex-row items-center justify-between">
            <StyledText className="w-[40%] text-[16px] text-[#333]">
              パスワード
            </StyledText>
            <StyledView className="flex flex-row items-center">
              <StyledText className="max-w-[60%] text-[12px] text-[#333]">
                {passwordDisplay}
              </StyledText>
              <Icon name="chevron-right" size={40} color="#333" />
            </StyledView>
          </StyledView>
        </StyledView>
      </StyledView>
    </StyledView>
  );
};

export default AccountManagement;
