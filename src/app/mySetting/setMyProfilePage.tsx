import React, { useEffect, useState } from "react";
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styled } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import PageBackHeader from "../../layout/header/pageBackHeader";
import MyProfileIcon from "../../components/main/mySetting/myProfileIcon";
import { UserData } from "../../types/userDataTypes";
import { useSelector } from "react-redux";
import SelfIntroductionInput from "../../layout/form/selfIntroductionInput";
import WorkInput from "../../layout/form/workInput";
import GoalInput from "../../layout/form/goalInput";
import MainImageInput from "../../layout/form/mainImageInput";
import SubImageInput from "../../layout/form/subImageInput";
import SetMyProfileHeader from "../../components/main/mySetting/setMyProfileHeader";
import NameInput from "../../layout/form/nameInput";
import BirthdayInput from "../../layout/form/birthInput";
import GenderInput from "../../layout/form/genderInput";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import ResidentialInput from "../../layout/form/residentialInput";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const SetMyProfilePage = () => {
  const myUserData: UserData = useSelector(
    (state: any) => state.userData.value,
  );
  const myUid: string = useSelector((state: any) => state.myUid.value);

  const [name, setName] = useState<string>(myUserData?.name || "");
  const [birthday, setBirthday] = useState<string>(myUserData?.birthday || "");
  const [gender, setGender] = useState<string>(myUserData?.gender || "");
  const residential = myUserData?.selected_residential?.split(",") || ["", ""];
  const [selectedPrefecture, setSelectedPrefecture] = useState<string>(
    residential[0],
  );
  const [selectedCity, setSelectedCity] = useState<string>(residential[1]);

  const [mainImage, setMainImage] = useState<string | null>(
    myUserData?.main_image_url || null,
  );
  const [subImages, setSubImages] = useState<(string | null)[]>(
    myUserData?.sub_images_url || [null, null, null],
  );

  const [selfIntroduction, setSelfIntroduction] = useState<string>(
    myUserData?.self_introduction || "",
  );
  const [selectedWork, setSelectedWork] = useState<string>(
    myUserData?.selected_work || "",
  );
  const [selectedGoal, setSelectedGoal] = useState<string>(
    myUserData?.selected_goal || "",
  );
  const [isChange, setIsChange] = useState<boolean>(false);
  const Container = Platform.OS === "android" ? SafeAreaView : View;

  const uploadImage = async (path: string, uri: string) => {
    console.log(`Uploading image to path: ${path}, uri: ${uri}`);
    const storage = getStorage();
    const storageRef = ref(storage, `${path}/${myUid}/${Date.now()}.jpg`);

    const response = await fetch(uri);
    const blob = await response.blob();

    try {
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      console.log(`Image uploaded successfully. Download URL: ${downloadURL}`);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image: ", error);
      throw new Error("Image upload failed");
    }
  };

  const handleSaveMyProfile = async () => {
    console.log("Saving profile...");

    const updates: Partial<UserData> = {};

    if (mainImage !== myUserData.main_image_url) {
      console.log("Main image has changed.");
      updates.main_image_url = mainImage
        ? await uploadImage("main_images", mainImage)
        : null;
    }

    const subImageUrls = [...subImages];
    let subImagesChanged = false;
    for (let index = 0; index < 3; index++) {
      if (
        myUserData?.sub_images_url &&
        subImages[index] !== myUserData?.sub_images_url[index]
      ) {
        subImagesChanged = true;
        console.log(`Sub image at index ${index} has changed.`);
        if (subImages[index]) {
          subImageUrls[index] = await uploadImage(
            "sub_images",
            subImages[index]!,
          );
        } else {
          subImageUrls[index] = null;
        }
      }
    }

    if (subImagesChanged) {
      updates.sub_images_url = subImageUrls;
    }

    if (selfIntroduction !== myUserData.self_introduction) {
      console.log("Self introduction has changed.");
      updates.self_introduction = selfIntroduction;
    }

    if (selectedWork !== myUserData.selected_work) {
      console.log("Selected work has changed.");
      updates.selected_work = selectedWork;
    }

    if (selectedGoal !== myUserData.selected_goal) {
      console.log("Selected goal has changed.");
      updates.selected_goal = selectedGoal;
    }

    if (Object.keys(updates).length > 0) {
      console.log("Updating Firestore with the following data: ", updates);
      const userRef = doc(db, "user", myUid);
      await updateDoc(userRef, updates);
      console.log("Firestore updated successfully.");
    } else {
      console.log("No changes detected. Firestore update not required.");
    }
  };

  useEffect(() => {
    console.log("Checking for changes in profile data...");
    setIsChange(
      myUserData?.main_image_url != mainImage ||
        myUserData?.sub_images_url != subImages ||
        myUserData?.self_introduction != selfIntroduction ||
        myUserData?.selected_work != selectedWork ||
        myUserData?.selected_goal != selectedGoal,
    );
    console.log("isChange set to: ", isChange);
  }, [mainImage, subImages, selfIntroduction, selectedWork, selectedGoal]);

  return (
    <Container style={{ flex: 1 }}>
      <SetMyProfileHeader
        routerPage="main/mySettingScreen"
        text="プロフィール設定"
        isFetchUserProps="false"
        handleSaveMyProfile={() => handleSaveMyProfile}
        isChange={isChange}
      />

      <ScrollView className="bg-[#f2f2f2]">
        <StyledView>
          <StyledView className="top-[8vh] mb-[36vh]">
            <MainImageInput
              mainImage={mainImage}
              setMainImage={setMainImage}
              isRequired={false}
            />
            <SubImageInput subImages={subImages} setSubImages={setSubImages} />
            <NameInput name={name} setName={setName} isEditable={false} />
            <BirthdayInput
              birthday={birthday}
              setBirthday={setBirthday}
              isEditable={false}
            />
            <GenderInput
              gender={gender}
              setGender={setGender}
              isEditable={false}
            />
            <ResidentialInput
              selectedPrefecture={selectedPrefecture}
              setSelectedPrefecture={setSelectedPrefecture}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              isEditable={true}
            />

            <SelfIntroductionInput
              selfIntroduction={selfIntroduction}
              setSelfIntroduction={setSelfIntroduction}
            />
            <WorkInput
              selectedWork={selectedWork}
              setSelectedWork={setSelectedWork}
            />
            <GoalInput
              selectedGoal={selectedGoal}
              setSelectedGoal={setSelectedGoal}
            />
          </StyledView>
        </StyledView>
      </ScrollView>
    </Container>
  );
};

export default SetMyProfilePage;
