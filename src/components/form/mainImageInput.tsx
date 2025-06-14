import React from "react";
import {
  Button,
  View,
  Image,
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";
import { styled } from "nativewind";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/Entypo";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

const MainImageInput = ({
  mainImage,
  setMainImage,
  isRequired,
}: {
  mainImage: string | null;
  setMainImage: React.Dispatch<React.SetStateAction<string | null>>;
  isRequired: boolean;
}) => {
  const pickImage = async (): Promise<void> => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedAsset = result.assets[0];
      if (selectedAsset.uri) {
        setMainImage(selectedAsset.uri);
      }
    }
  };

  return (
    <StyledView className="mx-auto mb-[24px] w-[90vw]">
      <StyledView className="mb-[12px] flex flex-row items-center">
        <Icon name="image" size={36} color="#333" className="mr-[10px]" />
        <StyledText className="text-[16px]">
          <StyledText className="text-[16px] text-[#333]">
            メイン画像
            {isRequired && <StyledText className="text-[#f00]">*</StyledText>}
          </StyledText>
        </StyledText>
      </StyledView>

      <StyledView className="w-full items-center">
        <StyledTouchableOpacity onPress={pickImage} activeOpacity={0.6}>
          {!(mainImage == null) ? (
            <StyledView className="rounded-[22px] border-[2px] border-[#8a8a8a]">
              <StyledImage
                source={{ uri: mainImage || undefined }}
                className="h-[64vw] w-[64vw] rounded-[20px]"
              />
            </StyledView>
          ) : (
            <StyledView className="flex h-[64vw] w-[64vw] items-center justify-center rounded-[20px] border-[4px] border-dotted border-[#8a8a8a] bg-[#cfcfcf]">
              <Icon name="circle-with-plus" size={60} color="#fff" />
            </StyledView>
          )}
        </StyledTouchableOpacity>
      </StyledView>
    </StyledView>
  );
};

export default MainImageInput;
