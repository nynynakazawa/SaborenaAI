import React from "react";
import {
  View,
  Image,
  Alert,
  TouchableOpacity,
  Text,
  FlatList,
  ListRenderItemInfo,
} from "react-native";
import { styled } from "nativewind";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/Entypo";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

const SubImageInput = ({
  subImages,
  setSubImages,
}: {
  subImages: (string | null)[];
  setSubImages: React.Dispatch<React.SetStateAction<(string | null)[]>>;
}) => {
  const pickImage = async (index: number): Promise<void> => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedAsset = result.assets[0];
      if (selectedAsset.uri) {
        const newSubImages = [...subImages];
        newSubImages[index] = selectedAsset.uri;
        setSubImages(newSubImages);
      }
    }
  };

  const renderItem = ({ item, index }: ListRenderItemInfo<string | null>) => (
    <StyledTouchableOpacity
      onPress={() => pickImage(index)}
      activeOpacity={0.6}
      className="mr-[8px]"
    >
      {item ? (
        <StyledView className="rounded-[22px] border-[2px] border-[#8a8a8a]">
          <StyledImage
            source={{ uri: item || undefined }}
            className="h-[42.6vw] w-[24vw] rounded-[20px]"
          />
        </StyledView>
      ) : (
        <StyledView className="flex h-[42.6vw] w-[24vw] items-center justify-center rounded-[20px] border-[4px] border-dotted border-[#8a8a8a] bg-[#cfcfcf]">
          <Icon name="circle-with-plus" size={40} color="#fff" />
        </StyledView>
      )}
    </StyledTouchableOpacity>
  );

  return (
    <StyledView className="mx-auto mb-[24px] w-[90vw]">
      <StyledView className="mb-[12px] flex flex-row items-center">
        <Icon name="image" size={36} color="#333" className="mr-[10px]" />
        <StyledText className="text-[16px]">サブ画像</StyledText>
      </StyledView>

      <StyledView className="flex w-full justify-center">
        <StyledView className="mx-auto w-max">
          <FlatList
            data={subImages}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </StyledView>
      </StyledView>
    </StyledView>
  );
};

export default SubImageInput;
