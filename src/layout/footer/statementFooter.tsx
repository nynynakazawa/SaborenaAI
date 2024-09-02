import React, { useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { styled } from "nativewind";
import TermModal from "../../features/login/termModal";
import PrivacyPolicyModal from "../../features/login/privacyPolicyModal";

const StyledView = styled(View)
const StyledText = styled(Text)
const StyledTouchableOpacity = styled(TouchableOpacity);

const StatementFooter = () => {
  const [isVisibleTermModal, setIsVisibleTermModal] = useState<boolean>(false);
  const [isVisiblePrivacyPolicyModal, setIsVisiblePrivacyPolicyModal] =
    useState<boolean>(false);
  return (
    // 利用規約 | プライバシーポリシー 
    <StyledView className="w-screen h-screen absolute top-0 bg-blue-600 opacity-30">
      <StyledView className="absolute flex w-full items-center bottom-[5vh]">
        <StyledView className="flex flex-row gap-[20px]">
          {/* 利用規約 */}
          <StyledTouchableOpacity onPress={() => setIsVisibleTermModal(true)}>
            <StyledText className="text-[#fff]">利用規約</StyledText>
          </StyledTouchableOpacity>
          <StyledText className="text-[#fff]">|</StyledText>

          {/* プライバシーポリシー */}
          <StyledTouchableOpacity
            onPress={() => setIsVisiblePrivacyPolicyModal(true)}
          >
            <StyledText className="text-[#fff]">
              プライバシーポリシー
            </StyledText>
          </StyledTouchableOpacity>
        </StyledView>
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

export default StatementFooter
