import React, { useState } from "react";
import { Platform, ScrollView, Text, View, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import PageBackHeader from "../../layout/header/pageBackHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { convertTimestamp_yyyymmddhhmm } from "../../utils/convertTimestamp";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);

const NoticePage = () => {
  const Container = Platform.OS === "android" ? SafeAreaView : View;
  const notices = useSelector((state: RootState) => state.notices.value);
  const [expanded, setExpanded] = useState<number[]>([]); // 配列に変更

  const toggleExpand = (idx: number) => {
    setExpanded((prevExpanded) => {
      if (prevExpanded.includes(idx)) {
        // 既に開いている場合は閉じる
        return prevExpanded.filter(id => id !== idx);
      } else {
        // 新しく開く
        return [...prevExpanded, idx];
      }
    });
  };

  return (
    <Container style={{ flex: 1 }}>
      <PageBackHeader
        routerPage="main/mySettingScreen"
        text="お知らせ"
        isFetchUserProps="false"
      />
      <StyledScrollView className="bg-[#f2f2f2]">
        <StyledView className="py-[40px]">
          {/* // アナウンス */}
          {Object.keys(notices).length > 0 ? (
            Object.keys(notices).map((key, idx) => {
              const notice = notices[key];
              if (!notice) return null; // noticeがnullの場合は何も表示しない

              return (
                <StyledView key={key} className="p-4 m-2 bg-white rounded-lg">
                  <TouchableOpacity
                    onPress={() => toggleExpand(idx)}
                    style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 10 }}
                    activeOpacity={0.2}
                  >
                    {/* 左側にタイトル */}
                    <StyledView className="flex flex-row">
                      {notice.source === "personal" &&
                        <StyledText className="mt-2 mr-2 bg-[#e3422e] text-white p-1 rounded-xl text-[14px] leading-[20px]">
                          重要
                        </StyledText>
                      }
                      <StyledText className="font-bold text-lg">
                        {notice.title}
                      </StyledText>
                    </StyledView>

                    {/* 右側にアイコン */}
                    <Icon
                      name={expanded.includes(idx) ? "remove" : "add"} // 開閉によってアイコンを切り替え
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>

                  {/* アコーディオンコンテンツ（クリックされた場合に本文を表示） */}
                  {expanded.includes(idx) && (
                    <>
                      {notice.contents.split('<br>').map((content, index) => (
                        <StyledText className="mt-2" key={index}>
                          {content}
                        </StyledText>
                      ))}
                    </>
                  )}

                  {/* 日時表示 */}
                  <StyledText className="mt-2 text-gray-500">
                    {convertTimestamp_yyyymmddhhmm(notice.created_at)}
                  </StyledText>
                </StyledView>
              );
            })
          ) : (
            <StyledText className="p-4">お知らせはありません。</StyledText>
          )}
        </StyledView>
      </StyledScrollView>
    </Container>
  );
};

export default NoticePage;
