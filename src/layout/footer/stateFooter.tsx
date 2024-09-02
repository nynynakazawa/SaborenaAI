import React, { useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { styled } from "nativewind";
import TermModal from "../../features/login/termModal";
import PrivacyPolicyModal from "../../features/login/privacyPolicyModal";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const StateFooter = () => {
  const [isVisibleTermModal, setIsVisibleTermModal] = useState<boolean>(false);
  const [isVisiblePrivacyPolicyModal, setIsVisiblePrivacyPolicyModal] =
    useState<boolean>(false);
  return (
    <StyledView className="relative z-10 flex-1 h-[4vh]">
    {/* 規約 */}
    <StyledView className="absolute top-[92vh] w-screen flex-1 items-center">
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

export default StateFooter
