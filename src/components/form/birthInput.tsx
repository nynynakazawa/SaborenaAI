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
  isEditable = true,
}: {
  birthday: string;
  setBirthday: React.Dispatch<React.SetStateAction<string>>;
  isEditable: boolean;
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

  const handleYearChange = (text: string) => {
    setYear(text);
    if (text.length === 4) {
      monthInputRef.current?.focus();
    }
    setBirthday(`${text},${month},${day}`);
  };

  const handleMonthChange = (text: string) => {
    setMonth(text);
    if (text.length === 2) {
      dayInputRef.current?.focus();
    }
    setBirthday(`${year},${text},${day}`);
  };

  const handleDayChange = (text: string) => {
    setDay(text);
    setBirthday(`${year},${month},${text}`);
  };

  return (
    <StyledView className="mx-auto mb-[24px] w-[90vw]">
      <StyledView className="mb-[12px] flex flex-row items-center">
        <Icon name="calendar" size={36} color="#333" className="mr-[10px]" />
        <StyledText className="text-[16px]">
          生年月日 {isEditable && "(再変更不可)"}
          {isEditable ? (
            <StyledText className="text-[#f00]">*</StyledText>
          ) : (
            <StyledText className="text-[$333]">(編集不可)</StyledText>
          )}
        </StyledText>
      </StyledView>
      <StyledView className="flex w-full flex-row items-center">
        <StyledTextInput
          value={birthday.split(",")[0]}
          onChangeText={handleYearChange}
          placeholder="YYYY"
          keyboardType="numeric"
          placeholderTextColor="#ccc"
          maxLength={4}
          editable={isEditable}
          className="border-b-2 p-[2px] text-center text-[16px] text-[#333]"
          style={{ width: 90 }}
        />
        <StyledText className="px-[4px] text-[#333]">年</StyledText>
        <StyledTextInput
          value={birthday.split(",")[1]}
          onChangeText={handleMonthChange}
          placeholder="MM"
          keyboardType="numeric"
          placeholderTextColor="#ccc"
          maxLength={2}
          ref={monthInputRef}
          editable={isEditable}
          className="border-b-2 p-[2px] text-center text-[16px] text-[#333]"
          style={{ width: 70 }}
        />
        <StyledText className="px-[4px] text-[#333]">月</StyledText>
        <StyledTextInput
          value={birthday.split(",")[2]}
          onChangeText={handleDayChange}
          placeholder="DD"
          keyboardType="numeric"
          placeholderTextColor="#ccc"
          maxLength={2}
          ref={dayInputRef}
          editable={isEditable}
          className="border-b-2 p-[2px] text-center text-[16px] text-[#333]"
          style={{ width: 60 }}
        />
        <StyledText className="px-[4px] text-[#333]">日</StyledText>
      </StyledView>
    </StyledView>
  );
};

export default BirthdayInput;
