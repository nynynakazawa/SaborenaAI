import React, { useState } from 'react';
import { View, Text, ScrollView, Button } from 'react-native';
import Modal from 'react-native-modal';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledScrollView = styled(ScrollView);
const StyledText = styled(Text);

type TermModalProps = {
  visible: boolean;
  onClose: () => void;
};

const TermModal = ({ visible, onClose }: TermModalProps) => {
  return (
    <StyledView className="flex-1 items-center justify-center bg-gray-100">
      <Modal isVisible={visible} onBackdropPress={onClose}>
        <StyledView className="bg-white p-4 rounded-lg max-h-[50vh] w-full">
          <StyledText className="text-lg font-bold text-black fong-bold py-[4px]">利用規約</StyledText>
          <StyledScrollView>
            <StyledView className="space-y-4">
              <StyledText className="font-bold text-lg">個人情報の収集:</StyledText>
              <StyledText className="text-base">NowMatchは、サービスの提供および改善のため、ユーザーの名前、年齢、メールアドレスまたは電話番号、プロフィール写真、地理的な位置情報を収集します。</StyledText>
              <StyledText className="text-base">アプリ内でのアクティビティデータ（メッセージや通話の履歴、購買情報など）およびGPS位置情報も収集し、サービス向上やパーソナライズに役立てます。</StyledText>
              <StyledText className="text-base">NowMatchは、デバイス情報（IPアドレス、広告ID、アプリのクラッシュデータなど）や使用状況データ（ログイン日時、通知履歴）を自動的に収集します。</StyledText>

              <StyledText className="font-bold text-lg">データの利用目的:</StyledText>
              <StyledText className="text-base">• ユーザーアカウントの作成、管理、削除を行うため。</StyledText>
              <StyledText className="text-base">• メッセージ、ボイスメッセージ、ビデオ通話の管理および提供のため。</StyledText>
              <StyledText className="text-base">• プロフィール認証を行い、ユーザーの安全性を確保するため（バイオメトリクスデータや動画での顔認証を含む）。</StyledText>
              <StyledText className="text-base">• ユーザーが交差した他のメンバーの提案と、そのプロフィールの表示を提供するため。</StyledText>
              <StyledText className="text-base">• 同意を得た場合に限り、マーケティングや広告メッセージを配信し、アプリ内で広告を表示するため。</StyledText>
              <StyledText className="text-base">• サービスの改善、最適化、統計分析を行い、ユーザーの満足度を高めるため。</StyledText>

              <StyledText className="font-bold text-lg">データの共有:</StyledText>
              <StyledText className="text-base">• NowMatchは、サービスの提供に必要な範囲で、内部の担当者、サービスプロバイダー、および認証済みのパートナーとデータを共有します。</StyledText>
              <StyledText className="text-base">• 法的要求があった場合、NowMatchはデータを当局や司法機関に提供することがあります。</StyledText>

              <StyledText className="font-bold text-lg">データの保管期間:</StyledText>
              <StyledText className="text-base">• アクティブなアカウント: 登録期間中、ユーザーのデータは保持されます。</StyledText>
              <StyledText className="text-base">• 非アクティブなアカウント: 一定期間後にデータは削除されますが、具体的な時期は未定です。</StyledText>

              <StyledText className="font-bold text-lg">ユーザーの権利:</StyledText>
              <StyledText className="text-base">• アクセス権: ユーザーは自身のデータにアクセスする権利を有します。</StyledText>
              <StyledText className="text-base">• 訂正権: ユーザーは不正確なデータを修正する権利を有します。</StyledText>
              <StyledText className="text-base">• 削除権: ユーザーは自身のデータの削除を要求する権利を有します。</StyledText>
              <StyledText className="text-base">• データポータビリティ権: ユーザーはデータを機械可読形式で取得し、他の事業者に転送する権利を有します。</StyledText>
              <StyledText className="text-base">• 異議権: ユーザーは特にマーケティング目的でのデータ処理に対して異議を申し立てる権利を有します。</StyledText>
              <StyledText className="text-base">• 処理制限権: ユーザーは一時的にデータ処理を制限する権利を有します。</StyledText>

              <StyledText className="font-bold text-lg">未成年者のデータ:</StyledText>
              <StyledText className="text-base">• NowMatchは未成年者からのデータを収集しない方針を採用しています。</StyledText>
              <StyledText className="text-base">• 万が一、未成年者が虚偽の情報を提供した場合、親は当該データの削除を求めることができます。</StyledText>

              <StyledText className="font-bold text-lg">クッキーとトラッキング:</StyledText>
              <StyledText className="text-base">• NowMatchは、技術的目的、広告配信、アクセス解析のためにクッキーを使用します。</StyledText>
              <StyledText className="text-base">• クッキーの使用に関する詳細は、別途クッキーポリシーをご参照ください。</StyledText>

              <StyledText className="font-bold text-lg">データセキュリティ:</StyledText>
              <StyledText className="text-base">• NowMatchは、ユーザーの個人情報を適切に保護するために、最大限の努力を払っています。</StyledText>
              <StyledText className="text-base">• ユーザーには、自身のデータを守るために適切な措置を取ることが推奨されます。</StyledText>

              <StyledText className="font-bold text-lg">サポートと連絡:</StyledText>
              <StyledText className="text-base">• NowMatchは、ユーザーサポートおよび技術的支援を提供し、プライバシーポリシーに関する問い合わせに対応します。</StyledText>
              <StyledText className="text-base">• お問い合わせやサポートの要請は、カスタマーサポート (nowmatch.cs@gmail.com) までご連絡ください。</StyledText>

              <StyledText className="text-base">これらの利用規約は、NowMatchを安全かつ快適に利用するために定められたものです。ユーザーの皆様には、利用規約をよくお読みいただき、ご理解いただいた上でNowMatchをご利用ください。</StyledText>
            </StyledView>
          </StyledScrollView>
        </StyledView>
      </Modal>
    </StyledView>
  );
};

export default TermModal;
