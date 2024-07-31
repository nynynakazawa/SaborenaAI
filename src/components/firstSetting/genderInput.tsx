import React, { useMemo, useState } from "react";
import { Text, View } from "react-native";
import { styled } from "nativewind";
import Icon from "react-native-vector-icons/Ionicons";
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';

const StyledView = styled(View);
const StyledText = styled(Text);

const GenderInput = ({
  setJender,
}: {
  setJender: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const radioButtons = useMemo(() => ([
    {
      id: "1",
      label: "男性",
      value: "male"
    },
    {
      id: "2",
      label: "女性",
      value: "female"
    },
    {
      id: "3",
      label: "その他",
      value: "other"
    },
  ]), []);

  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  const handlePress = (id: string) => {
    setSelectedId(id);
    const selectedButton = radioButtons.find(button => button.id === id);
    if (selectedButton) {
      setJender(selectedButton.value);
    }
  };

  return (
    <StyledView className="mx-auto w-[80vw]">
      <StyledView className="flex flex-row items-center mb-[12px]">
        <Icon name="man" size={36} color="#333" className="mr-[10px]" />
        <StyledText className="text-[16px]">
          性別(再設定不可)<StyledText className="text-[#f00]">*</StyledText>
        </StyledText>
      </StyledView>
      <StyledView className="flex mb-[28px]">
        <RadioGroup
          radioButtons={radioButtons}
          onPress={handlePress}
          selectedId={selectedId}
          containerStyle={{ flexDirection: 'row' }}
        />
      </StyledView>
    </StyledView>
  );
};

export default GenderInput;
