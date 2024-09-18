import React, { useState } from "react";
import { Platform, View, Alert, TouchableOpacity, Text, Image, ScrollView } from "react-native";
import { styled } from "nativewind";
import * as ImagePicker from "expo-image-picker";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import PageBackHeader from "../../layout/header/pageBackHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { uploadImage } from "../../utils/uploadImage";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

const AgeVerificationPage = () => {
  const Container = Platform.OS === "android" ? SafeAreaView : View;
    // reduxから値を取得
    const myUid: string | null = useSelector(
      (state: RootState) => state.myUid.value,
    );

  const [ageVerificationImage, setAgeVerificationImage] = useState<string | null>(null);

  const pickImage = async (): Promise<void> => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedAsset = result.assets[0];
      if (selectedAsset.uri) {
        setAgeVerificationImage(selectedAsset.uri);
      }
    }
  };

  const handleSubmit = () => {
    if (ageVerificationImage) {
      uploadImage(myUid, "age_verification", ageVerificationImage)
      Alert.alert("送信成功", "年齢確認の写真が送信されました。");
    } else {
      Alert.alert("エラー", "写真を選択してください。");
    }
  };

  return (
    <Container style={{ flex: 1 }}>
      <PageBackHeader
        routerPage="main/mySettingScreen"
        text="年齢確認"
        isFetchUserProps="false"
      />
      <ScrollView className="h-full w-full bg-[#f2f2f2]">
        <StyledView className="items-center py-[8vh]">
          {/* テキスト */}
          <StyledView className="w-[90vw] mb-[48px]">
            <StyledView className="border border-yellow-500 bg-yellow-100 p-6 mb-[34px] rounded-lg">
              <StyledText className="text-[16px] text-[#e3422e]">
                Now Matchの機能を十分に使うためには、年齢確認を行う必要があります。
              </StyledText>
            </StyledView>
            <StyledText>
              年齢確認を行うためには以下が分かる画像をお送りください。
            </StyledText>
            <StyledText>・生年月日、または年齢</StyledText>
            <StyledText>・書面の名称</StyledText>
            <StyledText>・書面の発行者名</StyledText>
          </StyledView>
          {/* 画像選択エリア */}
          <StyledView className="mx-auto mb-8 w-[90vw]">
            <StyledView className="mb-3 flex flex-row items-center">
              <FontAwesome name="drivers-license-o" size={36} color="#333" className="mr-3" />
              <StyledText className="text-[16px] text-[#333]">本人確認書類</StyledText>
            </StyledView>
            <StyledView className="w-full items-center">
              <StyledTouchableOpacity onPress={pickImage} activeOpacity={0.6}>
                {ageVerificationImage ? (
                  <StyledView className="rounded-[22px] border-[2px] border-[#8a8a8a]">
                    <StyledImage
                      source={{ uri: ageVerificationImage }}
                      className="h-[64vw] w-[64vw] rounded-[20px]"
                    />
                  </StyledView>
                ) : (
                  <StyledView className="flex h-[64vw] w-[64vw] items-center justify-center rounded-[20px] border-[4px] border-dotted border-[#8a8a8a] bg-[#cfcfcf]">
                    <Entypo name="circle-with-plus" size={60} color="#fff" />
                  </StyledView>
                )}
              </StyledTouchableOpacity>
            </StyledView>
          </StyledView>
          {/* 送信ボタン */}
          <StyledView className="w-[90vw] flex items-end mr-[80px]">
            <StyledTouchableOpacity
              onPress={handleSubmit}
              className={`bg-[#57d0e0] px-6 py-2 rounded-full ${!ageVerificationImage && "opacity-70"}`}
              activeOpacity={0.6}
              disabled={!ageVerificationImage}
            >
              <StyledText className="text-white text-lg">写真を送信</StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>
      </ScrollView>
    </Container>
  );
};

export default AgeVerificationPage;
