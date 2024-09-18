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
      <StyledView className="h-full w-full bg-[#f2f2f2]">
        <ScrollView>
          {Object.keys(notices).length > 0 ? (
            Object.keys(notices).map((key, idx) => {
              const notice = notices[key];
              if (!notice) return null; // noticeがnullの場合は何も表示しない

              return (
                <View key={key} className="p-4 m-2 bg-white rounded-lg">
                  <TouchableOpacity
                    onPress={() => toggleExpand(idx)}
                    style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 10 }}
                    activeOpacity={0.2}
                  >
                    {/* 左側にタイトル */}
                    <StyledText className="font-bold text-lg">{notice.title}</StyledText>

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
                </View>
              );
            })
          ) : (
            <StyledText className="p-4">お知らせはありません。</StyledText>
          )}
        </ScrollView>
      </StyledView>
    </Container>
  );
};

export default NoticePage;
