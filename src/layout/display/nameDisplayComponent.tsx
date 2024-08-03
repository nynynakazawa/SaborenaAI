import React from "react";
import { Text, View } from "react-native";
import { styled } from "nativewind";
import { UserData } from "../../types/userData";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const StyledView = styled(View);
const StyledText = styled(Text);

type Birthday = {
  year: number;
  month: number;
  date: number;
};

const NameDisplayComponent = ({
  myUser,
}: {
  myUser: UserData | undefined;
}) => {
  function getAge(birthday: Birthday) {
    const today = new Date();
    const birthDate = new Date(birthday.year, birthday.month - 1, birthday.date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  const birthday = myUser?.user_info?.birthday;
  const birthdayDic: Birthday | null = birthday
    ? {
      year: parseInt(birthday.split(",")[0]),
      month: parseInt(birthday.split(",")[1]),
      date: parseInt(birthday.split(",")[2]),
    }
    : null;

  const gender: string = myUser?.user_info?.gender || "";
  const age: number = birthdayDic ? getAge(birthdayDic) : 0;

  return (
    <StyledView className="flex flex-row items-center">
      <StyledText className="text-[16px] ml-[6px] font-bold">
        {myUser?.user_info?.name} ({age})
      </StyledText>
      {gender === "male" && (
        <Icon name="gender-male" size={24} color={"#79C7FF"} className="ml-[4px]" />
      )}
      {gender === "female" && (
        <Icon name="gender-female" size={24} color={"#F479FF"} className="ml-[4px]" />
      )}
      {gender === "other" && (
        <Icon name="gender-male-female" size={24} color={"#79FF82"} className="ml-[4px]" />
      )}
    </StyledView>
  );
};

export default NameDisplayComponent;
