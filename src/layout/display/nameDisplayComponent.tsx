import React from "react";
import { Text, View } from "react-native";
import { styled } from "nativewind";
import { UserData } from "../../types/userDataTypes";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const StyledView = styled(View);
const StyledText = styled(Text);

type Birthday = {
  year: number;
  month: number;
  date: number;
};

const NameDisplayComponent = ({
  userData,
  size,
}: {
  userData: UserData | null;
  size: "small" | "large";
}) => {
  // 生年月日から年齢を取得
  function getAge(birthday: Birthday) {
    const today = new Date();
    const birthDate = new Date(
      birthday.year,
      birthday.month - 1,
      birthday.date,
    );
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }

  const birthday = userData?.birthday;
  const birthdayDic: Birthday | null = birthday
    ? {
        year: parseInt(birthday.split(",")[0]),
        month: parseInt(birthday.split(",")[1]),
        date: parseInt(birthday.split(",")[2]),
      }
    : null;

  const gender: string = userData?.gender || "";
  const age: number = birthdayDic ? getAge(birthdayDic) : 0;

  // サイズによるスタイルの変更
  const fontSize = size === "large" ? 16: 12;
  const iconSize = size === "large" ? 24 : 16;
  
  return (
    <StyledView className="flex flex-row flex-wrap items-center">
      <StyledText
        className={`ml-[4px] font-bold text-[#333] text-[${fontSize}px]`}
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
