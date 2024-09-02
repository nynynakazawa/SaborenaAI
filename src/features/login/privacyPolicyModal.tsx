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
          className="h-[60vh] w-[80vw] rounded-lg bg-[#fff] p-[18px]"
        >
          <StyledText className="mb-[14px] text-[22px] font-bold">
            ■ プライバシーポリシー
          </StyledText>
          <ScrollView>
            <StyledView className="p-[14px]">
              <StyledText className="mb-[14px] text-[22px] font-bold">
                個人情報の収集:
              </StyledText>

              <StyledText className="mb-[8px] text-[18px] font-bold">
                収集する情報:
              </StyledText>
              <StyledText className="mb-[8px] text-[14px]">
                NowMatchは、ユーザーの名前、連絡先情報（メールアドレスや電話番号）、プロフィール写真、位置情報、アプリの使用状況データ、デバイス情報を含む個人情報を収集します。
              </StyledText>

              <StyledText className="mb-[14px] text-[22px] font-bold">
                データの利用目的:
              </StyledText>

              <StyledText className="mb-[8px] text-[14px]">
                • アカウント管理、ユーザー認証、メッセージ機能の提供。
              </StyledText>
              <StyledText className="mb-[8px] text-[14px]">
                • サービスのパーソナライズ、ユーザー体験の向上。
              </StyledText>
              <StyledText className="mb-[8px] text-[14px]">
                • マーケティングおよび広告の提供（ユーザーの同意が必要）。
              </StyledText>
              <StyledText className="mb-[8px] text-[14px]">
                • 法的義務の遵守およびセキュリティ確保。
              </StyledText>

              <StyledText className="mb-[14px] text-[22px] font-bold">
                データの共有:
              </StyledText>

              <StyledText className="mb-[8px] text-[14px]">
                •
                NowMatchは、サービス提供に必要な場合、パートナー企業やサービスプロバイダーとデータを共有します。
              </StyledText>
              <StyledText className="mb-[8px] text-[14px]">
                • 法的要求があれば、当局にデータを提供することがあります。
              </StyledText>

              <StyledText className="mb-[14px] text-[22px] font-bold">
                ユーザーの権利:
              </StyledText>

              <StyledText className="mb-[8px] text-[14px]">
                •
                ユーザーは自身のデータにアクセスし、修正、削除を求める権利を有します。
              </StyledText>
              <StyledText className="mb-[8px] text-[14px]">
                •
                ユーザーはデータポータビリティ権を有し、他のサービスプロバイダーにデータを移行できます。
              </StyledText>
              <StyledText className="mb-[8px] text-[14px]">
                •
                マーケティング目的でのデータ処理に対して異議を申し立てることができます。
              </StyledText>

              <StyledText className="mb-[14px] text-[22px] font-bold">
                データセキュリティ:
              </StyledText>

              <StyledText className="mb-[8px] text-[14px]">
                •
                NowMatchは、適切な技術的および組織的措置を講じ、ユーザーのデータを保護します。
              </StyledText>
              <StyledText className="mb-[8px] text-[14px]">
                •
                ユーザーには、自身のアカウント情報の管理や安全性確保に努めていただくことが推奨されます。
              </StyledText>

              <StyledText className="mb-[14px] text-[22px] font-bold">
                サポートと連絡:
              </StyledText>

              <StyledText className="mb-[8px] text-[14px]">
                •
                プライバシーポリシーに関するご質問やサポートは、nowmatch.cs@gmail.com
                までご連絡ください。
              </StyledText>

              <StyledText className="mb-[8px] text-[14px]">
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
