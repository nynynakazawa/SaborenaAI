import React, { useEffect, useRef, useState } from "react";
import { Keyboard, Text, TextInput, View } from "react-native";
import { styled } from "nativewind";
import Icon from "react-native-vector-icons/Entypo";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);

const BirthdayInput = ({
  birthday,
  setBirthday,
}: {
  birthday: string;
  setBirthday: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [year, setYear] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const monthInputRef = useRef<TextInput>(null);
  const dayInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (year.length === 4 && month.length === 2 && day.length === 2) {
      const formattedDate = `${year.padStart(4, "0")}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
      console.log("選択した日付:", formattedDate);
      Keyboard.dismiss();
    }
  }, [year, month, day]);

  const handleYearChange = (text : string) => {
    setYear(text);
    if (text.length === 4) {
      monthInputRef.current?.focus();
    }
    setBirthday(`${text},${month},${day}`);
  };

  const handleMonthChange = (text : string) => {
    setMonth(text);
    if (text.length === 2) {
      dayInputRef.current?.focus();
    }
    setBirthday(`${year},${text},${day}`);
  };

  const handleDayChange = (text : string) => {
    setDay(text);
    setBirthday(`${year},${month},${text}`);
  };

  return (
    <StyledView className="mx-auto mb-[12px] w-[90vw]">
      <StyledView className="mb-[12px] flex flex-row items-center">
        <Icon name="calendar" size={36} color="#333" className="mr-[10px]" />
        <StyledText className="text-[16px]">
          生年月日<StyledText className="text-[#f00]">*</StyledText>
        </StyledText>
      </StyledView>
      <StyledView className="mb-[12px] flex w-full flex-row items-center border-b-2 border-[#fff] pb-[10px]">
        <StyledTextInput
          value={year}
          onChangeText={handleYearChange}
          placeholder="YYYY"
          keyboardType="numeric"
          placeholderTextColor="#ccc"
          maxLength={4}
          className="border-b-2 p-[2px] text-center text-[16px]"
          style={{ width: 90 }}
        />
        <StyledText className="px-[4px]">年</StyledText>
        <StyledTextInput
          value={month}
          onChangeText={handleMonthChange}
          placeholder="MM"
          keyboardType="numeric"
          placeholderTextColor="#ccc"
          maxLength={2}
          ref={monthInputRef}
          className="border-b-2 p-[2px] text-center text-[16px]"
          style={{ width: 70 }}
        />
        <StyledText className="px-[4px]">月</StyledText>
        <StyledTextInput
          value={day}
          onChangeText={handleDayChange}
          placeholder="DD"
          keyboardType="numeric"
          placeholderTextColor="#ccc"
          maxLength={2}
          ref={dayInputRef}
          className="border-b-2 p-[2px] text-center text-[16px]"
          style={{ width: 60 }}
        />
        <StyledText className="px-[4px]">日</StyledText>
      </StyledView>
    </StyledView>
  );
};

export default BirthdayInput;
