import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";
import { User } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "expo-router";
import { uploadImage } from "../../utils/uploadImage";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const UserRegistationButton = ({
  name,
  email,
  password,
  birthday,
  gender,
  selectedPrefecture,
  selectedCity,
  mainImage,
  selfIntroduction,
  selectedWork,
  selectedGoal,
  setScene,
  isLoading,
  setIsLoading,
}: {
  name: string;
  email: string;
  password: string;
  birthday: string;
  gender: string;
  selectedPrefecture: string;
  selectedCity: string;
  mainImage: string | null;
  selfIntroduction: string;
  selectedWork: string;
  selectedGoal: string;
  setScene: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // * ############################################################################## *
  const router = useRouter();

  // ユーザー登録
  const handleRegistration = async () => {
    setIsLoading(true);
    try {
      const user = auth.currentUser as User;
      let mainImageUrl = "";
      if (mainImage) {
        mainImageUrl = await uploadImage(user.uid, "main_images", mainImage);
      }
      // userData
      const userRef = doc(db, "user", user.uid);
      await setDoc(
        userRef,
        {
          name: name,
          gender: gender,
          birthday: birthday,
          selected_residential: `${selectedPrefecture},${selectedCity}`,
          main_image_url: mainImageUrl,
          sub_images_url: [null, null, null],
          self_introduction:
          selfIntroduction == "" ? "はじめまして" : selfIntroduction,
          selected_work: selectedWork,
          selected_goal: selectedGoal,
        },
        { merge: true },
      );
      // currentData
      const currentRef = doc(db, "current", user.uid);
      await setDoc(
        currentRef,
        {
          longitude: null,
          latitude: null,
          gender: gender,
          people_count: "1人",
          what_now: "こんにちは",
          main_image_url: mainImageUrl,
        },
        { merge: true },
      );
      // talkData
      const talkRef = doc(db, "talk", user.uid);
      await setDoc(talkRef, {}, { merge: true });

      router.push("/main");
    } catch (error) {
      console.error("Error registering user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StyledView className="absolute bottom-[8vh] w-screen flex-1 items-center">
      <StyledView className="mx-auto mb-4 flex w-[75vw] flex-row justify-between">
        {/* prevボタン */}
        <StyledTouchableOpacity
          onPress={() => setScene((prev) => prev - 1)}
          className={`flex h-[48px] w-[100px] items-center justify-center rounded-lg bg-[#E04B36]`}
        >
          <StyledText className="text-[16px] text-[#fff]">戻る</StyledText>
        </StyledTouchableOpacity>

        <StyledTouchableOpacity
          onPress={handleRegistration}
          className={`flex h-[48px] w-[100px] items-center justify-center rounded-lg bg-[#44e25f]`}
        >
          <StyledText className="text-[16px] text-[#fff]">はじめる</StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    </StyledView>
  );
};

export default UserRegistationButton;
