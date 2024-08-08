import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";
import { createUserWithEmailAndPassword, User } from "firebase/auth";
import { auth, db } from "../../firebase";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "expo-router";

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
  image,
  selfIntroduction,
  selectedWork,
  selectedGoal,
  setScene,
}: {
  name: string;
  email: string;
  password: string;
  birthday: string;
  gender: string;
  selectedPrefecture: string;
  selectedCity: string;
  image: string | null;
  selfIntroduction: string;
  selectedWork: string;
  selectedGoal: string;
  setScene: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const router = useRouter();

  const uploadImage = async (uri: string) => {
    const storage = getStorage();
    const storageRef = ref(
      storage,
      `images/${auth.currentUser?.uid}/${Date.now()}.jpg`,
    );

    const response = await fetch(uri);
    const blob = await response.blob();

    try {
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image: ", error);
      throw new Error("Image upload failed");
    }
  };

  const handleRegistration = async () => {
    try {
      const user = auth.currentUser as User;
      let imageUrl = "";
      if (image) {
        imageUrl = await uploadImage(image);
      }
      const userRef = doc(db, "user", user.uid);
      await setDoc(
        userRef,
        {
          name: name,
          gender: gender,
          birthday: birthday,
          selected_residential: `${selectedPrefecture},${selectedCity}`,
          main_image_url: imageUrl,
          self_introduction: selfIntroduction,
          selected_work: selectedWork,
          selected_goal: selectedGoal,
        },
        { merge: true },
      );
      const appRef = doc(db, "app", user.uid);
      await setDoc(
        appRef,
        {
          like_to: [],
          like_from: [],
          talk_list: {},
          membership_status: "free",
        },
        { merge: true },
      );
      const currentRef = doc(db, "current", user.uid);
      await setDoc(
        currentRef,
        {
          people_count: "1人",
          longitude: -1,
          latitude: -1,
          what_now: "こんにちは",
          main_image_url: imageUrl,
        },
        { merge: true },
      );

      router.push("/main");
    } catch (error) {
      console.error("Error registering user:", error);
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
