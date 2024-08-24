import React, { useState } from "react";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { set as setMyUid } from "../../../store/myUidSlice";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const LogoutManegement = () => {
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

  // ログアウト処理
  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <StyledView>
      {/* ログアウトボタン */}
      <StyledTouchableOpacity
        onPress={() => setIsLogoutModalVisible(true)}
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

      {/* ログアウト確認モーダル */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={isLogoutModalVisible}
        onRequestClose={() => setIsLogoutModalVisible(false)}
      >
        <Pressable
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
          onPress={() => setIsLogoutModalVisible(false)}
        >
          <StyledView className="w-[80%] rounded-lg bg-white p-[20px]">
            <StyledText className="mb-[20px] text-center text-[18px] font-bold">
              本当にログアウトしますか?
            </StyledText>
            <StyledView className="flex-row justify-between">
              <StyledTouchableOpacity
                onPress={() => setIsLogoutModalVisible(false)}
                className="mr-[10px] flex-1 items-center justify-center rounded-lg bg-[#ddd] px-[10px] py-[12px]"
              >
                <StyledText className="text-[16px] text-[#333]">
                  いいえ
                </StyledText>
              </StyledTouchableOpacity>
              <StyledTouchableOpacity
                onPress={() => {
                  setIsLogoutModalVisible(false);
                  handleLogout();
                }}
                className="flex-1 items-center justify-center rounded-lg bg-[#EF6B5C] px-[10px] py-[12px]"
              >
                <StyledText className="text-[16px] text-white">はい</StyledText>
              </StyledTouchableOpacity>
            </StyledView>
          </StyledView>
        </Pressable>
      </Modal>
    </StyledView>
  );
};

export default LogoutManegement;
