import React from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

type TermModalProps = {
  visible: boolean;
  onClose: () => void;
};

const TermModal = ({ visible, onClose }: TermModalProps) => {
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
          <StyledText className="text-[22px] font-bold mb-[14px]">■ 利用規約</StyledText>
          <ScrollView>
            <StyledView className="p-[14px]">
              <StyledText className="text-[22px] font-bold mb-[14px]">個人情報の収集:</StyledText>

              <StyledText className="text-[18px] font-bold mb-[8px]">必須データ:</StyledText>
              <StyledText className="text-[14px] mb-[8px]">
                NowMatchは、サービスの提供および改善のため、ユーザーの名前、年齢、メールアドレスまたは電話番号、プロフィール写真、地理的な位置情報を収集します。
              </StyledText>

              <StyledText className="text-[18px] font-bold mb-[8px]">必要データ:</StyledText>
              <StyledText className="text-[14px] mb-[8px]">
                アプリ内でのアクティビティデータ（メッセージや通話の履歴、購買情報など）およびGPS位置情報も収集し、サービス向上やパーソナライズに役立てます。
              </StyledText>

              <StyledText className="text-[18px] font-bold mb-[8px]">自動収集データ:</StyledText>
              <StyledText className="text-[14px] mb-[8px]">
                NowMatchは、デバイス情報（IPアドレス、広告ID、アプリのクラッシュデータなど）や使用状況データ（ログイン日時、通知履歴）を自動的に収集します。
              </StyledText>

              <StyledText className="text-[22px] font-bold mb-[14px]">データの利用目的:</StyledText>

              <StyledText className="text-[14px] mb-[8px]">
                • ユーザーアカウントの作成、管理、削除を行うため。
              </StyledText>
              <StyledText className="text-[14px] mb-[8px]">
                • メッセージ、ボイスメッセージ、ビデオ通話の管理および提供のため。
              </StyledText>
              <StyledText className="text-[14px] mb-[8px]">
                • プロフィール認証を行い、ユーザーの安全性を確保するため（バイオメトリクスデータや動画での顔認証を含む）。
              </StyledText>
              <StyledText className="text-[14px] mb-[8px]">
                • ユーザーが交差した他のメンバーの提案と、そのプロフィールの表示を提供するため。
              </StyledText>
              <StyledText className="text-[14px] mb-[8px]">
                • 同意を得た場合に限り、マーケティングや広告メッセージを配信し、アプリ内で広告を表示するため。
              </StyledText>
              <StyledText className="text-[14px] mb-[8px]">
                • サービスの改善、最適化、統計分析を行い、ユーザーの満足度を高めるため。
              </StyledText>

              <StyledText className="text-[22px] font-bold mb-[14px]">データの共有:</StyledText>

              <StyledText className="text-[14px] mb-[8px]">
                • NowMatchは、サービスの提供に必要な範囲で、内部の担当者、サービスプロバイダー、および認証済みのパートナーとデータを共有します。
              </StyledText>
              <StyledText className="text-[14px] mb-[8px]">
                • 法的要求があった場合、NowMatchはデータを当局や司法機関に提供することがあります。
              </StyledText>

              <StyledText className="text-[22px] font-bold mb-[14px]">データの保管期間:</StyledText>

              <StyledText className="text-[14px] mb-[8px]">
                • アクティブなアカウント: 登録期間中、ユーザーのデータは保持されます。
              </StyledText>
              <StyledText className="text-[14px] mb-[8px]">
                • 非アクティブなアカウント: 一定期間後にデータは削除されますが、具体的な時期は未定です。
              </StyledText>

              <StyledText className="text-[22px] font-bold mb-[14px]">ユーザーの権利:</StyledText>

              <StyledText className="text-[14px] mb-[8px]">
                • アクセス権: ユーザーは自身のデータにアクセスする権利を有します。
              </StyledText>
              <StyledText className="text-[14px] mb-[8px]">
                • 訂正権: ユーザーは不正確なデータを修正する権利を有します。
              </StyledText>
              <StyledText className="text-[14px] mb-[8px]">
                • 削除権: ユーザーは自身のデータの削除を要求する権利を有します。
              </StyledText>
              <StyledText className="text-[14px] mb-[8px]">
                • データポータビリティ権: ユーザーはデータを機械可読形式で取得し、他の事業者に転送する権利を有します。
              </StyledText>
              <StyledText className="text-[14px] mb-[8px]">
                • 異議権: ユーザーは特にマーケティング目的でのデータ処理に対して異議を申し立てる権利を有します。
              </StyledText>
              <StyledText className="text-[14px] mb-[8px]">
                • 処理制限権: ユーザーは一時的にデータ処理を制限する権利を有します。
              </StyledText>

              <StyledText className="text-[22px] font-bold mb-[14px]">未成年者のデータ:</StyledText>

              <StyledText className="text-[14px] mb-[8px]">
                • NowMatchは未成年者からのデータを収集しない方針を採用しています。
              </StyledText>
              <StyledText className="text-[14px] mb-[8px]">
                • 万が一、未成年者が虚偽の情報を提供した場合、親は当該データの削除を求めることができます。
              </StyledText>

              <StyledText className="text-[22px] font-bold mb-[14px]">クッキーとトラッキング:</StyledText>

              <StyledText className="text-[14px] mb-[8px]">
                • NowMatchは、技術的目的、広告配信、アクセス解析のためにクッキーを使用します。
              </StyledText>
              <StyledText className="text-[14px] mb-[8px]">
                • クッキーの使用に関する詳細は、別途クッキーポリシーをご参照ください。
              </StyledText>

              <StyledText className="text-[22px] font-bold mb-[14px]">データセキュリティ:</StyledText>

              <StyledText className="text-[14px] mb-[8px]">
                • NowMatchは、ユーザーの個人情報を適切に保護するために、最大限の努力を払っています。
              </StyledText>
              <StyledText className="text-[14px] mb-[8px]">
                • ユーザーには、自身のデータを守るために適切な措置を取ることが推奨されます。
              </StyledText>

              <StyledText className="text-[22px] font-bold mb-[14px]">サポートと連絡:</StyledText>

              <StyledText className="text-[14px] mb-[8px]">
                • NowMatchは、ユーザーサポートおよび技術的支援を提供し、プライバシーポリシーに関する問い合わせに対応します。
              </StyledText>
              <StyledText className="text-[14px] mb-[8px]">
                • お問い合わせやサポートの要請は、カスタマーサポート (nowmatch.cs@gmail.com) までご連絡ください。
              </StyledText>

              <StyledText className="text-[14px] mb-[8px]">
                これらの利用規約は、NowMatchを安全かつ快適に利用するために定められたものです。ユーザーの皆様には、利用規約をよくお読みいただき、ご理解いただいた上でNowMatchをご利用ください。
              </StyledText>
            </StyledView>
          </ScrollView>
        </StyledTouchableOpacity>

      </StyledTouchableOpacity>
    </Modal>
  );
};

export default TermModal;
