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
  未設定: ["未設定"],
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
  神奈川県: [
    "非公開",
    "横浜市",
    "川崎市",
    "相模原市",
    "横須賀市",
    "藤沢市",
    "平塚市",
    "鎌倉市",
    "茅ヶ崎市",
    "逗子市",
    "三浦市",
    "秦野市",
    "厚木市",
    "大和市",
    "伊勢原市",
    "海老名市",
    "座間市",
    "南足柄市",
    "綾瀬市",
  ],
  千葉県: [
    "非公開",
    "千葉市",
    "銚子市",
    "市川市",
    "船橋市",
    "館山市",
    "木更津市",
    "松戸市",
    "野田市",
    "茂原市",
    "成田市",
    "佐倉市",
    "東金市",
    "旭市",
    "習志野市",
    "柏市",
    "勝浦市",
    "市原市",
    "流山市",
    "八千代市",
    "我孫子市",
    "鴨川市",
    "鎌ケ谷市",
    "君津市",
    "富津市",
    "浦安市",
    "四街道市",
    "袖ケ浦市",
    "八街市",
    "印西市",
    "白井市",
    "富里市",
    "南房総市",
    "匝瑳市",
    "香取市",
    "山武市",
    "いすみ市",
    "大網白里市",
  ],
  埼玉県: [
    "非公開",
    "さいたま市",
    "川越市",
    "熊谷市",
    "川口市",
    "行田市",
    "秩父市",
    "所沢市",
    "飯能市",
    "加須市",
    "本庄市",
    "東松山市",
    "春日部市",
    "狭山市",
    "羽生市",
    "鴻巣市",
    "深谷市",
    "上尾市",
    "草加市",
    "越谷市",
    "蕨市",
    "戸田市",
    "入間市",
    "朝霞市",
    "志木市",
    "和光市",
    "新座市",
    "桶川市",
    "久喜市",
    "北本市",
    "八潮市",
    "富士見市",
    "三郷市",
    "蓮田市",
    "坂戸市",
    "幸手市",
    "鶴ヶ島市",
    "日高市",
    "吉川市",
    "ふじみ野市",
    "白岡市",
  ],
  茨城県: [
    "非公開",
    "水戸市",
    "日立市",
    "土浦市",
    "古河市",
    "石岡市",
    "結城市",
    "龍ケ崎市",
    "下妻市",
    "常総市",
    "常陸太田市",
    "高萩市",
    "北茨城市",
    "笠間市",
    "取手市",
    "牛久市",
    "つくば市",
    "ひたちなか市",
    "鹿嶋市",
    "潮来市",
    "守谷市",
    "常陸大宮市",
    "那珂市",
    "筑西市",
    "坂東市",
    "稲敷市",
    "かすみがうら市",
    "桜川市",
    "神栖市",
    "行方市",
    "鉾田市",
    "つくばみらい市",
    "小美玉市",
  ],
  群馬県: [
    "非公開",
    "前橋市",
    "高崎市",
    "桐生市",
    "伊勢崎市",
    "太田市",
    "沼田市",
    "館林市",
    "渋川市",
    "藤岡市",
    "富岡市",
    "安中市",
    "みどり市",
  ],
  栃木県: [
    "非公開",
    "宇都宮市",
    "足利市",
    "栃木市",
    "佐野市",
    "鹿沼市",
    "日光市",
    "小山市",
    "真岡市",
    "大田原市",
    "矢板市",
    "那須塩原市",
    "さくら市",
    "那須烏山市",
    "下野市",
  ],
  その他: ["その他"],
};

const ResidentialInput = ({
  selectedPrefecture,
  setSelectedPrefecture,
  selectedCity,
  setSelectedCity,
  isEditable = true,
}: {
  selectedPrefecture: string;
  setSelectedPrefecture: React.Dispatch<React.SetStateAction<string>>;
  selectedCity: string;
  setSelectedCity: React.Dispatch<React.SetStateAction<string>>;
  isEditable: boolean;
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
    <StyledView className="mx-auto mb-[24px] w-[90vw]">
      <StyledView className="mb-[8px] flex flex-row items-center">
        <Icon
          name="map-marker"
          size={32}
          color="#333"
          className="ml-[8px] mr-[16px]"
        />
        <StyledText className="text-[16px]">
          居住区
          {isEditable ? (
            <StyledText className="text-[#f00]">*</StyledText>
          ) : (
            <StyledText className="text-[#333]">(編集不可)</StyledText>
          )}
        </StyledText>
      </StyledView>

      <StyledTouchableOpacity
        onPress={toggleModal}
        activeOpacity={0.8}
        disabled={!isEditable}
      >
        <StyledView className="flex w-[58vw] flex-row justify-around border-b-2 border-[#333] py-[6px] pl-[12px] text-[16px] text-[#333]">
          <StyledText
            className={`text-[16px] text-[#333] ${selectedPrefecture == "未設定" && "text-[#ccc]"}`}
          >
            {selectedPrefecture}
          </StyledText>
          <StyledText
            className={`text-[16px] text-[#333] ${selectedCity == "未設定" && "text-[#ccc]"}`}
          >
            {selectedCity}
          </StyledText>
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
            className="mt-4 rounded-full bg-[#57d0e0] p-3"
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
