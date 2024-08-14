import React, { useEffect } from "react";
import { Image, Text, View } from "react-native";
import { styled } from "nativewind";
import NameDisplayComponent from "../display/nameDisplayComponent";
import { CurrentData, UserData } from "../../types/userDataTypes";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useSelector } from "react-redux";

const StyledView = styled(View);
const StyledImage = styled(Image);
const StyledText = styled(Text);

const TopProfile = ({ 
  currentData,
  userData, 
  uid,
} : {
  currentData: CurrentData | null;
  userData: UserData | null;
  uid: string;
}) => {
  // * ################################################################################## *
  
  const myUid: string = useSelector((state: any) => state.myUid.value);
  const myPeopleCount: number = useSelector(
    (state: any) => state.peopleCount.value,
  );

  return (
    <StyledView className="mb-[24px] flex w-full flex-row items-center">
      <StyledImage
        source={{ uri: userData?.main_image_url || undefined }}
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
            <StyledText>
              {myUid == uid ? myPeopleCount : currentData?.people_count}
            </StyledText>
          </StyledView>
        </StyledView>

        {/* sub images */}
        <StyledImage
          source={{ uri: userData?.main_image_url || undefined }}
          style={{ width: 36, height: 58 }}
          className="rounded-lg"
        />
      </StyledView>
    </StyledView>
  );
};

export default TopProfile;
