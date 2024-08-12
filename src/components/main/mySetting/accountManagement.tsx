import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";
import { AppData, PrivateData } from "../../../types/userDataTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import Icon from "react-native-vector-icons/MaterialIcons";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "expo-router";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const AccountManagement = () => {
  const router = useRouter();
  const myPrivateData: PrivateData | null = useSelector(
    (state: RootState) => state.privateData.value,
  );
  const myAppData: AppData | null = useSelector(
    (state: RootState) => state.appData.value,
  );
  const password = myPrivateData?.password || "";
  let passwordDisplay: string = password[0] + password[1];
  for (let i = 0; i < password.length; i += 1) {
    passwordDisplay += "*";
  }

  // ログアウト処理
  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      router.push("loginPage");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <StyledView>
      {/* アカウント管理 */}
      <StyledText className="mx-auto mb-[12px] mt-[10vh] w-[90%] text-[18px] font-bold text-[#333]">
        アカウント管理
      </StyledText>
      <StyledView>
        {/* 会員情報表示 */}
        <StyledView className="w-screen border-t-[1px] border-[#ddd] bg-[#fff]">
          <StyledView className="mx-auto flex h-[6vh] w-[90%] flex-row items-center justify-between">
            <StyledText className="text-[16px] text-[#333]">
              会員情報
            </StyledText>
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
        </StyledView>
        {/* メールアドレス表示 */}
        <StyledView className="w-screen border-t-[1px] border-[#ddd] bg-[#fff]">
          <StyledView className="mx-auto flex h-[6vh] w-[90%] flex-row items-center justify-between">
            <StyledText className="text-[16px] text-[#333]">
              メールアドレス
            </StyledText>
            <StyledText className="text-[12px] text-[#EF6B5C]">
              {myPrivateData?.email}
            </StyledText>
          </StyledView>
        </StyledView>
        {/* パスワード表示 */}
        <StyledView className="w-screen border-b-[1px] border-t-[1px] border-[#ddd] bg-[#fff]">
          <StyledView className="mx-auto flex h-[6vh] w-[90%] flex-row items-center justify-between">
            <StyledText className="text-[16px] text-[#333]">
              パスワード
            </StyledText>
            <StyledView className="flex flex-row items-center">
              <StyledText className="text-[12px] text-[#333]">
                {passwordDisplay}
              </StyledText>
              <Icon name="chevron-right" size={40} color="#333" />
            </StyledView>
          </StyledView>
        </StyledView>
      </StyledView>

      {/* ログアウトボタン */}
      <StyledTouchableOpacity
        onPress={() => handleLogout()}
        className="mt-[6vh]"
      >
        <StyledView className="w-screen border-b-[1px] border-t-[1px] border-[#ddd] bg-[#fff]">
          <StyledView className="mx-auto flex h-[6vh] w-[90%] flex-row items-center justify-between">
            <StyledText className="text-[16px] text-[#EF6B5C]">
              ログアウト
            </StyledText>
          </StyledView>
        </StyledView>
      </StyledTouchableOpacity>
    </StyledView>
  );
};

export default AccountManagement;
