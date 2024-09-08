import React, { useEffect, useState } from "react";
import {
  Keyboard,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styled } from "nativewind";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { RootState } from "../../../store/store";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);

const WhatNowInput = () => {
  const myUid: string | null = useSelector(
    (state: RootState) => state.myUid.value,
  );
  const [defaultKeyboardHeight, setDefaultKeyboardHeight] = useState<number>();

  const [isSendingWhatNow, setIsSendingWhatNow] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(60);
  const [whatNow, setWhatNow] = useState<string>("");
  const [isTextInputFocused, setIsTextInputFocused] = useState<boolean>(false);

  const handleSend = async (myUid: string | null) => {
    if (myUid) {
      console.log("🎉whatnow send");
      const currentRef = doc(db, "current", myUid);
      await setDoc(
        currentRef,
        {
          what_now: whatNow,
        },
        { merge: true },
      );
      setIsSendingWhatNow(true);
      setWhatNow("");
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (e) => {
        setDefaultKeyboardHeight(e.endCoordinates.height);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

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
    <StyledView
      className={
        "absolute bottom-0 mb-[30px] flex h-[60px] w-screen items-center justify-center"
      }
      style={
        Platform.OS == "ios" &&
        isTextInputFocused && {
          bottom: defaultKeyboardHeight,
          marginBottom: -60,
        }
      }
    >
      <StyledView
        className={`mx-auto flex h-full w-[90vw] flex-row items-center justify-center rounded-full bg-white shadow-2xl ${
          isTextInputFocused ? "border-2 border-blue-500" : ""
        }`}
      >
        <StyledView className="w-[60vw]">
          {isSendingWhatNow ? (
            <StyledView className="flex h-full justify-center text-[16px] text-[#aaa]">
              <StyledText className="text-[16px] text-[#555]">
                再送信可能まで{timer}秒
              </StyledText>
            </StyledView>
          ) : (
            <StyledTextInput
              className="h-full w-[60vw] pr-[20px] text-[16px] text-[#333]"
              onChangeText={setWhatNow}
              value={whatNow}
              placeholder="いまなにしてる？ (30文字まで)"
              maxLength={30}
              placeholderTextColor={"#ccc"}
              onFocus={() => setIsTextInputFocused(true)}
              onBlur={() => setIsTextInputFocused(false)}
            />
          )}
        </StyledView>
        {/* 送信ボタン */}
        <StyledView className="h-[40px] w-[2px] bg-[#ccc]"></StyledView>
        <StyledTouchableOpacity
          onPress={() => {
            handleSend(myUid);
            setIsTextInputFocused(false);
            Keyboard.dismiss();
          }}
          className="h-[40px] pl-[16px]"
          disabled={whatNow?.trim() == "" || isSendingWhatNow}
        >
          <Icon
            name="send"
            size={34}
            color="#73BBFD"
            className={`translate-y-[2px] ${
              (whatNow.trim() == "" || isSendingWhatNow) && "opacity-30"
            }`}
          />
        </StyledTouchableOpacity>
      </StyledView>
    </StyledView>
  );
};

export default WhatNowInput;
