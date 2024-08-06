import React, { useEffect, useState } from "react";
import { Keyboard, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { UserData } from "../../../types/userDataTypes";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { useSelector } from "react-redux";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);

const WhatNowInput = () => {
  const myUid: string = useSelector((state: any) => state.myUid.value);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      },
    );
  },[]);

  const handleSend = async() => {
    console.log("handleSend");
    const currentRef = doc(db, "current", myUid);
    await setDoc(
      currentRef,
      {
        peopleCount: 1,
        isGPS: false,
        longitude: -1,
        latitude: -1,
        what_now: whatNow,
      },
      { merge: true },
    );
    console.log(whatNow);
    setIsSendingWhatNow(true);
    setWhatNow("");
  };

  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
  const [isSendingWhatNow, setIsSendingWhatNow] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(60);
  const [whatNow, setWhatNow] = useState<string>("");

  // タイマーのロジック
  useEffect(() => {
    let countdown: NodeJS.Timeout;
    if (isSendingWhatNow && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsSendingWhatNow(false);
      setTimer(60);
    }
    return () => clearInterval(countdown);
  }, [isSendingWhatNow, timer]);


  return (
    <StyledView className={`absolute bottom-[20px] mb-[80px] flex h-[60px] w-screen items-center justify-center ${Platform.OS == "ios" ? keyboardHeight > 0 && "bottom-[36vh]" : keyboardHeight > 0 && "bottom-[36vh]" && "mb-0"}`}>
      <StyledView className="shadow-2xl mx-auto flex h-full w-[90vw] flex-row items-center justify-center rounded-full bg-white">
        <StyledView>
          {isSendingWhatNow ? 
            <StyledView className="h-full flex justify-center text-[16px] w-[60vw] text-[#aaa]">
              <StyledText className="text-[16px] text-[#555]">再送信可能まで{timer}秒</StyledText>
            </StyledView>
          :
            <StyledTextInput 
              className="h-full text-[16px] w-[60vw] text-[#333]"
              onChangeText={setWhatNow}
              value={whatNow}
              placeholder="いまなにしてる？ (最大30文字)"
              maxLength={30}
              placeholderTextColor={"#ccc"}
            />
          }
        </StyledView>
        <StyledTouchableOpacity
          onPress={() => handleSend()}
          className="border-l-2 pl-[12px] border-[#ccc] h-[40px]"
          disabled={whatNow?.trim() == "" || isSendingWhatNow}
        >
          <Icon name="send" size={34} color="#73BBFD" className={`translate-y-[2px] ${(whatNow.trim() == "" || isSendingWhatNow) && "opacity-30"}`} />
        </StyledTouchableOpacity>
      </StyledView>
    </StyledView>
  );
};

export default WhatNowInput;
