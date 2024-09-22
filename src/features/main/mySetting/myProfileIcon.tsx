import React, { useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import NameDisplayComponent from "../../../components/display/nameDisplayComponent";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { RootState } from "../../../store/store";

const StyledView = styled(View);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface ProfileProps {
  isEditable?: boolean;
}

const MyProfileIcon = ({ isEditable }: ProfileProps) => {
  const myUserData = useSelector((state: RootState) => state.userData.value);
  const router = useRouter();

  return (
    <StyledTouchableOpacity
      className="flex h-[200px] items-center"
      onPress={() => {
        if (isEditable) {
          router.push("mySetting/setMyProfilePage");
        }
      }}
      activeOpacity={isEditable ? 0.6 : 1}
    >
      {/* MYアイコン */}
      <StyledView className="absolute">
        <StyledImage
          source={{ uri: myUserData?.main_image_url || undefined }}
          style={{ width: 100, height: 100 }}
          className="rounded-full"
        />
        {isEditable && (
          // 筆アイコン
          <StyledView className="absolute bottom-[-4px] right-[-4px] flex h-[40px] w-[40px] items-center justify-center rounded-full border-[1px] border-[#eee] bg-[#fafafa]">
            <Entypo
              name="pencil"
              size={26}
              color="#333"
              className="bottom-0 right-0"
            />
          </StyledView>
        )}
        {/* 年齢認証バッジ */}
        {myUserData?.is_age_verified && (
          <StyledView className="absolute top-[-4px] left-[-4px] flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#fafafa]">
            <MaterialIcons
              name="verified-user"
              size={26}
              color="#448fff"
              className="bottom-0 right-0"
              />
          </StyledView>
        )}
      </StyledView>
      {/* 名前 */}
      <StyledView className="absolute bottom-[-50px] top-[120px] text-[16px]">
        <NameDisplayComponent userData={myUserData} size={"large"} />
      </StyledView>
    </StyledTouchableOpacity>
  );
};

export default MyProfileIcon;
