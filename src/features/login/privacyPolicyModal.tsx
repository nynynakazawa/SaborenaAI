import React from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

type PrivacyPolicyModalProps = {
  visible: boolean;
  onClose: () => void;
};

const PrivacyPolicyModal = ({ visible, onClose }: PrivacyPolicyModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <StyledTouchableOpacity
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        onPress={onClose}
      >

        <StyledTouchableOpacity
          activeOpacity={1}
          className="w-[80vw] h-[60vh] rounded-lg bg-[#fff] p-[18px]"
        >
          <StyledText className="text-[22px] font-bold mb-[14px]">■ プライバシーポリシー</StyledText>
          <ScrollView>
            <StyledView className="p-[14px]">
              <StyledText className="text-[22px] font-bold mb-[14px]">個人情報の収集:</StyledText>

              <StyledText className="text-[18px] font-bold mb-[8px]">収集する情報:</StyledText>
              <StyledText className="text-[14px] mb-[8px]">
                NowMatchは、ユーザーの名前、連絡先情報（メールアドレスや電話番号）、プロフィール写真、位置情報、アプリの使用状況データ、デバイス情報を含む個人情報を収集します。
              </StyledText>

              <StyledText className="text-[22px] font-bold mb-[14px]">データの利用目的:</StyledText>

              <StyledText className="text-[14px] mb-[8px]">
                • アカウント管理、ユーザー認証、メッセージ機能の提供。
              </StyledText>
              <StyledText className="text-[14px] mb-[8px]">
                • サービスのパーソナライズ、ユーザー体験の向上。
              </StyledText>
              <StyledText className="text-[14px] mb-[8px]">
                • マーケティングおよび広告の提供（ユーザーの同意が必要）。
              </StyledText>
              <StyledText className="text-[14px] mb-[8px]">
                • 法的義務の遵守およびセキュリティ確保。
              </StyledText>

              <StyledText className="text-[22px] font-bold mb-[14px]">データの共有:</StyledText>

              <StyledText className="text-[14px] mb-[8px]">
                • NowMatchは、サービス提供に必要な場合、パートナー企業やサービスプロバイダーとデータを共有します。
              </StyledText>
              <StyledText className="text-[14px] mb-[8px]">
                • 法的要求があれば、当局にデータを提供することがあります。
              </StyledText>

              <StyledText className="text-[22px] font-bold mb-[14px]">ユーザーの権利:</StyledText>

              <StyledText className="text-[14px] mb-[8px]">
                • ユーザーは自身のデータにアクセスし、修正、削除を求める権利を有します。
              </StyledText>
              <StyledText className="text-[14px] mb-[8px]">
                • ユーザーはデータポータビリティ権を有し、他のサービスプロバイダーにデータを移行できます。
              </StyledText>
              <StyledText className="text-[14px] mb-[8px]">
                • マーケティング目的でのデータ処理に対して異議を申し立てることができます。
              </StyledText>

              <StyledText className="text-[22px] font-bold mb-[14px]">データセキュリティ:</StyledText>

              <StyledText className="text-[14px] mb-[8px]">
                • NowMatchは、適切な技術的および組織的措置を講じ、ユーザーのデータを保護します。
              </StyledText>
              <StyledText className="text-[14px] mb-[8px]">
                • ユーザーには、自身のアカウント情報の管理や安全性確保に努めていただくことが推奨されます。
              </StyledText>

              <StyledText className="text-[22px] font-bold mb-[14px]">サポートと連絡:</StyledText>

              <StyledText className="text-[14px] mb-[8px]">
                • プライバシーポリシーに関するご質問やサポートは、nowmatch.cs@gmail.com までご連絡ください。
              </StyledText>

              <StyledText className="text-[14px] mb-[8px]">
                プライバシーポリシーは、ユーザーの個人情報の保護を目的として定められています。NowMatchのサービスをご利用いただく際は、プライバシーポリシーを十分にご理解いただきますようお願いいたします。
              </StyledText>
            </StyledView>
          </ScrollView>
        </StyledTouchableOpacity>

      </StyledTouchableOpacity>
    </Modal>
  );
};

export default PrivacyPolicyModal;
