import React, { useEffect, useState } from "react";
import { Platform, ScrollView, View } from "react-native";
import { styled } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserData } from "../../types/userDataTypes";
import { useSelector } from "react-redux";
import SelfIntroductionInput from "../../components/form/selfIntroductionInput";
import WorkInput from "../../components/form/workInput";
import GoalInput from "../../components/form/goalInput";
import MainImageInput from "../../components/form/mainImageInput";
import SubImageInput from "../../components/form/subImageInput";
import SetMyProfileHeader from "../../features/main/mySetting/setMyProfileHeader";
import NameInput from "../../components/form/nameInput";
import BirthdayInput from "../../components/form/birthInput";
import GenderInput from "../../components/form/genderInput";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import ResidentialInput from "../../components/form/residentialInput";
import { RootState } from "../../store/store";
import { uploadImage } from "../../utils/uploadImage";

const StyledView = styled(View);

const SetMyProfilePage = () => {
  const Container = Platform.OS === "android" ? SafeAreaView : View;

  // reduxから値を取得する
  const myUserData: UserData | null = useSelector(
    (state: RootState) => state.userData.value,
  );
  const myUid: string | null = useSelector(
    (state: RootState) => state.myUid.value,
  );

  // 各種state
  // 基本設定
  const [name, setName] = useState<string>(myUserData?.name || "");
  const [birthday, setBirthday] = useState<string>(myUserData?.birthday || "");
  const [gender, setGender] = useState<string>(myUserData?.gender || "");
  const residential = myUserData?.selected_residential?.split(",") || ["", ""];
  const [selectedPrefecture, setSelectedPrefecture] = useState<string>(
    residential[0],
  );
  const [selectedCity, setSelectedCity] = useState<string>(residential[1]);

  // 画像
  const [mainImage, setMainImage] = useState<string | null>(
    myUserData?.main_image_url || null,
  );
  const [subImages, setSubImages] = useState<(string | null)[]>(
    myUserData?.sub_images_url || [null, null, null],
  );

  // 詳細設定
  const [selfIntroduction, setSelfIntroduction] = useState<string>(
    myUserData?.self_introduction || "",
  );
  const [selectedWork, setSelectedWork] = useState<string>(
    myUserData?.selected_work || "",
  );
  const [selectedGoal, setSelectedGoal] = useState<string>(
    myUserData?.selected_goal || "",
  );

  // 変化したか判定
  const [isChange, setIsChange] = useState<boolean>(false);

  // プロフィールを更新する
  const handleSaveMyProfile = async () => {
    // データを送る量を減らすために変化したstateだけdbに送信する
    console.log("Saving profile...");

    const updates: Partial<UserData> = {};
    // メイン画像
    if (mainImage !== myUserData?.main_image_url && myUid) {
      let mainImageUrl = "";
      if (mainImage) {
        mainImageUrl = await uploadImage(myUid, "main_images", mainImage);
      }
      console.log("Main image has changed.");
      updates.main_image_url = mainImage ? mainImageUrl : null;
      const currentRef = doc(db, "current", myUid);
      await updateDoc(currentRef, {
        main_image_url: mainImageUrl,
      });
    }

    // サブ画像
    const subImageUrls = [...subImages];
    let subImagesChanged = false;
    for (let index = 0; index < 3; index++) {
      if (
        myUserData?.sub_images_url &&
        subImages[index] !== myUserData?.sub_images_url[index]
      ) {
        subImagesChanged = true;
        if (subImages[index]) {
          subImageUrls[index] = await uploadImage(
            myUid,
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

    if (selfIntroduction !== myUserData?.self_introduction) {
      console.log("Self introduction has changed.");
      updates.self_introduction = selfIntroduction;
    }

    if (selectedWork !== myUserData?.selected_work) {
      console.log("Selected work has changed.");
      updates.selected_work = selectedWork;
    }

    if (selectedGoal !== myUserData?.selected_goal) {
      console.log("Selected goal has changed.");
      updates.selected_goal = selectedGoal;
    }

    if (Object.keys(updates).length > 0 && myUid) {
      const userRef = doc(db, "user", myUid);
      await updateDoc(userRef, updates);
    } else {
      console.log("No changes detected. Firestore update not required.");
    }
  };

  useEffect(() => {
    setIsChange(
      myUserData?.main_image_url != mainImage ||
        myUserData?.sub_images_url != subImages ||
        myUserData?.self_introduction != selfIntroduction ||
        myUserData?.selected_work != selectedWork ||
        myUserData?.selected_goal != selectedGoal,
    );
  }, [mainImage, subImages, selfIntroduction, selectedWork, selectedGoal]);

  return (
    <Container style={{ flex: 1 }}>
      {/* ヘッダー */}
      <SetMyProfileHeader
        routerPage="main/mySettingScreen"
        text="プロフィール設定"
        isFetchUserProps="false"
        handleSaveMyProfile={handleSaveMyProfile}
        isChange={isChange}
      />

      {/* メインフォーム */}
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

        {/* フッター */}
        <StyledView className="absolute bottom-0 h-[20px] w-screen bg-[#E3422F]"></StyledView>
      </ScrollView>
    </Container>
  );
};

export default SetMyProfilePage;
