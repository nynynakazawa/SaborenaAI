import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";
import LoginPage from "./loginPage";
import { auth } from "../firebase";
import { useRouter } from "expo-router";

const StyledView = styled(View);
const StyledText = styled(Text);

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push("/loginPage");
      } else {
        router.push("/loginPage");
      }
    });
    return () => unsubscribe();
  }, []);

  return <StyledView></StyledView>;
};

export default Index;
