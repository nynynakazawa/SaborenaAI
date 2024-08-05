import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { styled } from "nativewind";
import { auth, db } from "../firebase";
import { useRouter } from "expo-router";
import { doc, getDoc } from "firebase/firestore";

const StyledView = styled(View);
const StyledText = styled(Text);

const Index = () => {
  const router = useRouter();

  const handleFirstRouting = () => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      try {
        if (user) {
          // mapPage
          const userRef = doc(db, "user", user.uid);
          const userSnapshot = await getDoc(userRef);
          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            // 初期設定がされているならmapPage, されていないならsignupPageに飛ばす
            if (userData.name) {
              router.push("/main/mainPage");
            } else {
              router.push({
                pathname: "/signupPage",
                params: { isExitUser: "exit" },
              });
            }
          } else {
            // loginPage
            router.push("/loginPage");
          }
        } else {
          // loginPage
          router.push("/loginPage");
        }
      } catch (error) {
        // loginPage
        router.push("/loginPage");
        console.error("Error fetching user data: ", error);
      }
    });

    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = handleFirstRouting();
    return () => unsubscribe();
  }, []);

  return (
    <StyledView className="flex-1 items-center justify-center">
      <StyledText></StyledText>
    </StyledView>
  );
};

export default Index;
