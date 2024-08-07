import React from "react";
import { Image, Text, View } from "react-native";
import { styled } from "nativewind";
import NameDisplayComponent from "../display/nameDisplayComponent";
import { UserData } from "../../types/userDataTypes";
import Icon from "react-native-vector-icons/MaterialIcons";

const StyledView = styled(View);
const StyledImage = styled(Image);
const StyledText = styled(Text);

const TopProfile = ({ userData }: { userData: UserData | null }) => {
  return (
    <StyledView className="mb-[24px] flex w-full flex-row items-center">
      <StyledImage
        source={{ uri: userData?.image_url }}
        style={{ width: 140, height: 140 }}
        className="rounded-lg"
      />
      <StyledView className="ml-[12px] flex w-full justify-between">
        <StyledView>
          <StyledView className="mb-[6px] w-full border-b-2 border-[#aaa] pb-[12px]">
            <NameDisplayComponent userData={userData} />
          </StyledView>
          <StyledView className="mb-[12px] flex flex-row items-center">
            <Icon name={"person"} size={24} color={"#333"} />
            <StyledText>*仮*</StyledText>
          </StyledView>
        </StyledView>

        {/* sub images */}
        <StyledImage
          source={{ uri: userData?.image_url }}
          style={{ width: 36, height: 58 }}
          className="rounded-lg"
        />
      </StyledView>
    </StyledView>
  );
};

export default TopProfile;
