import React, { useMemo, useState } from "react";
import { Text, View } from "react-native";
import { styled } from "nativewind";
import Icon from "react-native-vector-icons/Ionicons";
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";

const StyledView = styled(View);
const StyledText = styled(Text);

const GenderInput = ({
  setGender,
}: {
  setGender: React.Dispatch<React.SetStateAction<string>>;
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

  const handlePress = (id: string) => {
    setSelectedId(id);
    const selectedButton = radioButtons.find((button) => button.id === id);
    if (selectedButton) {
      setGender(selectedButton.value);
    }
  };

  return (
    <StyledView className="mx-auto w-[90vw]">
      <StyledView className="mb-[12px] flex flex-row items-center">
        <Icon name="man" size={36} color="#333" className="mr-[8px]" />
        <StyledText className="text-[16px]">
          性別(再設定不可)<StyledText className="text-[#f00]">*</StyledText>
        </StyledText>
      </StyledView>
      <StyledView className="mb-[28px] flex">
        <RadioGroup
          radioButtons={radioButtons}
          onPress={handlePress}
          selectedId={selectedId}
          containerStyle={{ flexDirection: "row" }}
        />
      </StyledView>
    </StyledView>
  );
};

export default GenderInput;
