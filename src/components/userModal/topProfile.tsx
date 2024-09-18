import React from "react";
import { FlatList, Image, ListRenderItemInfo, Text, View } from "react-native";
import { styled } from "nativewind";
import NameDisplayComponent from "../display/nameDisplayComponent";
import { CurrentData, UserData } from "../../types/userDataTypes";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const StyledView = styled(View);
const StyledImage = styled(Image);
const StyledText = styled(Text);

const TopProfile = ({
  currentData,
  userData,
  uid,
}: {
  currentData: CurrentData | null;
  userData: UserData | null;
  uid: string;
}) => {
  // * ################################################################################## *
  const myUid: string | null = useSelector(
    (state: RootState) => state.myUid.value,
  );
  const myPeopleCount: string = useSelector(
    (state: RootState) => state.peopleCount.value,
  );

  const renderItem = ({ item }: ListRenderItemInfo<string | null>) => (
    <StyledImage
      source={{ uri: item || undefined }}
      style={{ width: 36, height: 58 }}
      className="w-[33%] rounded-lg"
    />
  );

  return (
    <StyledView className="mb-[24px] flex w-full flex-1 flex-row ">
      {/* メイン画像 */}
      <StyledView>
        <StyledImage
          source={{ uri: userData?.main_image_url || undefined }}
          style={{ width: 140, height: 140 }}
          className="rounded-lg"
        />
      </StyledView>

      <StyledView className="ml-[12px] flex flex-1 items-end">
        <StyledView className="mb-[12px] w-full flex-1 justify-between">
          {/* 名前 */}
          <StyledView className="w-full border-b-2 border-[#aaa] pb-[8px]">
            <NameDisplayComponent userData={userData} size={"large"} />
          </StyledView>
          {/* 人数 */}
          <StyledView className="flex flex-row items-center">
            <MaterialIcons name={"person"} size={24} color={"#333"} className="mt-[2px]"/>
            <StyledText className="text-[#333] text-[16px]">
              {myUid == uid ? myPeopleCount : currentData?.people_count}
            </StyledText>
          </StyledView>
        </StyledView>

        {/* サブ画像 */}
        <StyledView className="w-full flex-1 justify-end">
          <StyledView className="w-[70%] min-w-[140px] items-start">
            <FlatList
              data={userData?.sub_images_url}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                justifyContent: "space-between",
                flexGrow: 1,
              }}
            />
          </StyledView>
        </StyledView>
      </StyledView>
    </StyledView>
  );
};

export default TopProfile;
