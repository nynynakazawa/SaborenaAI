import React from "react";
import { Text, View } from "react-native";
import { styled } from "nativewind";
import { UserData } from "../../types/userDataTypes";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { getAge } from "../../utils/getAge";

const StyledView = styled(View);
const StyledText = styled(Text);

const NameDisplayComponent = ({
  userData,
  size,
}: {
  userData: UserData | null;
  size: "small" | "large";
}) => {
  const birthday = userData?.birthday;
  const birthdayDic = birthday
    ? {
        year: parseInt(birthday.split(",")[0]),
        month: parseInt(birthday.split(",")[1]),
        date: parseInt(birthday.split(",")[2]),
      }
    : null;

  const gender: string = userData?.gender || "";
  const age: number = birthdayDic ? getAge(birthdayDic) : 0;

  // サイズによるスタイルの変更
  const fontSize = size === "large" ? 16 : 12;
  const iconSize = size === "large" ? 24 : 16;

  return (
    <StyledView className="flex flex-row flex-wrap items-center">
      <StyledText
        className={`font-bold text-[#333] text-[${fontSize}px]`}
      >
        {userData?.name} ({age})
      </StyledText>
      <StyledView className={`w-[${iconSize}px]`}>
        {gender == "male" && (
          <Icon
            name="gender-male"
            size={iconSize}
            color={"#79C7FF"}
            className="ml-[4px] translate-y-[2px]"
          />
        )}
        {gender == "female" && (
          <Icon
            name="gender-female"
            size={iconSize}
            color={"#F479FF"}
            className="ml-[4px] translate-y-[2px]"
          />
        )}
        {gender != "male" && gender != "female" && (
          <Icon
            name="gender-male-female"
            size={iconSize}
            color={"#79FF82"}
            className="ml-[4px] translate-y-[2px]"
          />
        )}
      </StyledView>
    </StyledView>
  );
};

export default NameDisplayComponent;
