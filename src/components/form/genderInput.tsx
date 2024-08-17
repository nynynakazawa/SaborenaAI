import React, { useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";
import { styled } from "nativewind";
import Icon from "react-native-vector-icons/Ionicons";
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";

const StyledView = styled(View);
const StyledText = styled(Text);

const GenderInput = ({
  gender,
  setGender,
  isEditable = true,
}: {
  gender: string;
  setGender: React.Dispatch<React.SetStateAction<string>>;
  isEditable: boolean;
}) => {
  const radioButtons = useMemo(
    () => [
      {
        id: "1",
        label: "男性",
        value: "male",
      },
      {
        id: "2",
        label: "女性",
        value: "female",
      },
      {
        id: "3",
        label: "その他",
        value: "other",
      },
    ],
    [],
  );

  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const initialSelectedButton = radioButtons.find(
      (button) => button.value === gender,
    );
    if (initialSelectedButton) {
      setSelectedId(initialSelectedButton.id);
    }
  }, [gender, radioButtons]);

  const handlePress = (id: string) => {
    setSelectedId(id);
    const selectedButton = radioButtons.find((button) => button.id === id);
    if (selectedButton) {
      setGender(selectedButton.value);
    }
  };

  return (
    <StyledView className="mx-auto mb-[24px] w-[90vw]">
      <StyledView className="mb-[12px] flex flex-row items-center">
        <Icon name="man" size={36} color="#333" className="mr-[8px]" />
        <StyledText className="text-[16px]">
          性別 {isEditable && "(再変更不可)"}
          {isEditable ? (
            <StyledText className="text-[#f00]">*</StyledText>
          ) : (
            <StyledText className="text-[#333]">(編集不可)</StyledText>
          )}
        </StyledText>
      </StyledView>
      <StyledView className="flex">
        {isEditable ? (
          <RadioGroup
            radioButtons={radioButtons}
            onPress={handlePress}
            selectedId={selectedId}
            containerStyle={{ flexDirection: "row" }}
          />
        ) : (
          <StyledView className="flex w-[100px] justify-around border-b-2 border-[#333] py-[6px] text-[16px] text-[#333]">
            <StyledText className="text-center text-[16px] text-[#333]">
              {gender == "male"
                ? "男性"
                : gender == "female"
                  ? "女性"
                  : "その他"}
            </StyledText>
          </StyledView>
        )}
      </StyledView>
    </StyledView>
  );
};

export default GenderInput;
