import React, { useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { styled } from "nativewind";
import TermModal from "../../login/termModal";
import PrivacyPolicyModal from "../../login/privacyPolicyModal";

const StyledView = styled(View)
const StyledText = styled(Text)
const StyledTouchableOpacity = styled(TouchableOpacity);

const StatementManagement = () => {
  const [isVisibleTermModal, setIsVisibleTermModal] = useState<boolean>(false);
  const [isVisiblePrivacyPolicyModal, setIsVisiblePrivacyPolicyModal] =
    useState<boolean>(false);

  return (
    <StyledView className="mt-[6vh]">
      {/* アカウント管理 */}
      <StyledText className="mx-auto mb-[12px] w-[90%] text-[18px] font-bold text-[#333]">
        規約
      </StyledText>
      <StyledView>
        {/* 利用規約 */}
        <StyledTouchableOpacity
          onPress={() => setIsVisibleTermModal(true)}
          className="w-screen border-t-[1px] border-[#ddd] bg-[#fff]"
        >
          <StyledView className="mx-auto flex h-[6vh] w-[90%] flex-row items-center justify-between">
            <StyledText className="text-[16px] text-[#333]">
              利用規約
            </StyledText>
          </StyledView>
        </StyledTouchableOpacity>
        {/* プライバシーポリシー */}
        <StyledTouchableOpacity
          className="w-screen border-t-[1px] border-[#ddd] bg-[#fff]"
          onPress={() => setIsVisiblePrivacyPolicyModal(true)}
        >
          <StyledView className="mx-auto flex h-[6vh] w-[90%] flex-row items-center justify-between">
            <StyledText className="text-[16px] text-[#333]">
              プライバシーポリシー
            </StyledText>
          </StyledView>
        </StyledTouchableOpacity>
      </StyledView>

      {/* モーダル */}
      <TermModal
        visible={isVisibleTermModal}
        onClose={() => setIsVisibleTermModal(false)}
      />
      <PrivacyPolicyModal
        visible={isVisiblePrivacyPolicyModal}
        onClose={() => setIsVisiblePrivacyPolicyModal(false)}
      />
    </StyledView>
  )
}

export default StatementManagement
