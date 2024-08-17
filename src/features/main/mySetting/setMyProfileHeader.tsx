import React from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";
import { router } from "expo-router";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const SetMyProfileHeader = ({
  routerPage,
  text,
  isFetchUserProps,
  handleSaveMyProfile,
  isChange,
}: {
  routerPage: string;
  text: string;
  isFetchUserProps: string;
  handleSaveMyProfile: () => void;
  isChange: boolean;
}) => {
  const Container = Platform.OS === "ios" ? SafeAreaView : View;

  const setMyProfile = () => {
    handleSaveMyProfile();
    router.push({
      pathname: `/${routerPage}`,
      params: { isFetchUserData: isFetchUserProps },
    });
  };

  return (
    <Container edges={["top", "left", "right"]}>
      <StyledView className="mx-auto flex h-[70px] w-[90vw] flex-row items-center">
        {/* バックボタン */}
        <StyledTouchableOpacity
          onPress={() =>
            router.push({
              pathname: `/${routerPage}`,
              params: { isFetchUserData: isFetchUserProps },
            })
          }
          className="absolute z-[20] h-[70px] w-[40px] border-b-[1px] border-[#e8e8e8]"
        >
          <Icon
            name="chevron-left"
            size={40}
            color="#333"
            className="absolute top-[18px]"
          />
        </StyledTouchableOpacity>
        {/* 表示テキスト */}
        <StyledText className="w-full text-center text-[16px] font-bold text-[#333]">
          {text}
        </StyledText>
        {/* 確定ボタン */}
        <StyledTouchableOpacity
          onPress={() => setMyProfile()}
          className="translate-x-[-40px]"
        >
          <StyledText
            className={`text-[16px] text-[#57d0e0] ${!isChange && "opacity-0"}`}
          >
            完了
          </StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    </Container>
  );
};

export default SetMyProfileHeader;
