import React from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";
import { router } from "expo-router";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const PageBackHeader = ({
  routerPage,
  text,
  isFetchUserProps,
}: {
  routerPage: string;
  text: string;
  isFetchUserProps: string;
}) => {
  const Container = Platform.OS === "ios" ? SafeAreaView : View;
  return (
    <Container edges={["top", "left", "right"]}>
      <StyledView className="border-b-[1px] border-[#e8e8e8]">
        <StyledView className="mx-auto flex h-[70px] w-[90vw] flex-row items-center">
          <StyledTouchableOpacity
            onPress={() =>
              router.push({
                pathname: `/${routerPage}`,
                params: { isFetchUserData: isFetchUserProps },
              })
            }
            className="absolute z-[20] h-[70px] w-[40px]"
          >
            <Icon
              name="chevron-left"
              size={40}
              color="#333"
              className="absolute top-[18px]"
            />
          </StyledTouchableOpacity>
          <StyledText className="w-full text-center text-[16px] font-bold text-[#333]">
            {text}
          </StyledText>
        </StyledView>
      </StyledView>
    </Container>
  );
};

export default PageBackHeader;
