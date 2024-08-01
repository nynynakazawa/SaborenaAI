import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, ViewStyle } from "react-native";
import Modal from "react-native-modal";
import { styled } from "nativewind";
import Icon from "react-native-vector-icons/FontAwesome";
import { Picker } from "@react-native-picker/picker";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const prefectures: { [key: string]: string[] } = {
  "-": ["-"],
  東京都: [
    "非公開",
    "千代田区",
    "中央区",
    "港区",
    "新宿区",
    "文京区",
    "台東区",
    "墨田区",
    "江東区",
    "品川区",
    "目黒区",
    "大田区",
    "世田谷区",
    "渋谷区",
    "中野区",
    "杉並区",
    "豊島区",
    "北区",
    "荒川区",
    "板橋区",
    "練馬区",
    "足立区",
    "葛飾区",
    "江戸川区",
  ],
  大阪府: [
    "非公開",
    "大阪市",
    "堺市",
    "東大阪市",
    "枚方市",
    "豊中市",
    "吹田市",
    "高槻市",
    "茨木市",
    "八尾市",
    "寝屋川市",
  ],
  // 他の県と市も追加できます
};

const ResidentialInput = ({
  selectedPrefecture,
  setSelectedPrefecture,
  selectedCity,
  setSelectedCity,
}: {
  selectedPrefecture: string;
  setSelectedPrefecture: React.Dispatch<React.SetStateAction<string>>;
  selectedCity: string;
  setSelectedCity: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    if (!selectedPrefecture) {
      setSelectedPrefecture(Object.keys(prefectures)[0]);
    }
    if (!selectedCity) {
      setSelectedCity(prefectures[Object.keys(prefectures)[0]][0]);
    }
  }, []);

  const toggleModal = (): void => {
    setModalVisible(!isModalVisible);
  };

  return (
    <StyledView className="mx-auto w-[90vw]">
      <StyledView className="mb-[8px] flex flex-row items-center">
        <Icon
          name="map-marker"
          size={32}
          color="#333"
          className="ml-[8px] mr-[16px]"
        />
        <StyledText className="text-[16px]">
          居住区<StyledText className="text-[#f00]">*</StyledText>
        </StyledText>
      </StyledView>

      <StyledTouchableOpacity onPress={toggleModal} activeOpacity={0.8}>
        <StyledView className="flex w-[58vw] flex-row justify-around border-b-2 border-[#333] py-[6px] pl-[12px] text-[16px] text-[#333]">
          <StyledText className="text-[16px]">{selectedPrefecture}</StyledText>
          <StyledText className="text-[16px]">{selectedCity}</StyledText>
        </StyledView>
      </StyledTouchableOpacity>
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <StyledView className="items-center rounded-lg bg-white p-5">
          <StyledView className="w-full flex-row">
            <StyledView className="flex-1">
              <Picker
                selectedValue={selectedPrefecture}
                onValueChange={(itemValue: string) => {
                  setSelectedPrefecture(itemValue);
                  setSelectedCity(prefectures[itemValue][0]);
                }}
                style={{ height: 180 } as ViewStyle}
              >
                {Object.keys(prefectures).map((prefecture) => (
                  <Picker.Item
                    key={prefecture}
                    label={prefecture}
                    value={prefecture}
                  />
                ))}
              </Picker>
            </StyledView>
            <StyledView className="ml-4 flex-1">
              <Picker
                selectedValue={selectedCity}
                onValueChange={(itemValue: string) =>
                  setSelectedCity(itemValue)
                }
                style={{ height: 180 } as ViewStyle}
              >
                {prefectures[selectedPrefecture]?.map((city) => (
                  <Picker.Item key={city} label={city} value={city} />
                ))}
              </Picker>
            </StyledView>
          </StyledView>
          <StyledTouchableOpacity
            onPress={toggleModal}
            className="mt-4 rounded-full bg-[#E06557] p-3"
          >
            <StyledText className="text-center text-xl text-white">
              決定
            </StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </Modal>
    </StyledView>
  );
};

export default ResidentialInput;
