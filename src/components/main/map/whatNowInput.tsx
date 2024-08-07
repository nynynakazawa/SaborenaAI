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
import { auth, db } from "../../../firebase";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);

const WhatNowInput = () => {
  const myUid: string = useSelector((state: any) => state.myUid.value);

  const [defaultKeyboardHeight, setDefaultKeyboardHeight] = useState<number>();
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
  const [isSendingWhatNow, setIsSendingWhatNow] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(60);
  const [whatNow, setWhatNow] = useState<string>("");
  const [isTextInputFocused, setIsTextInputFocused] = useState<boolean>(false);

  const handleSend = async () => {
    console.log("whatnow Send");
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
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
        setDefaultKeyboardHeight(e.endCoordinates.height);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
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
        <StyledView>
          {isSendingWhatNow ? (
            <StyledView className="flex h-full w-[60vw] justify-center text-[16px] text-[#aaa]">
              <StyledText className="text-[16px] text-[#555]">
                再送信可能まで{timer}秒
              </StyledText>
            </StyledView>
          ) : (
            <StyledTextInput
              className="h-full w-[60vw] text-[16px] text-[#333]"
              onChangeText={setWhatNow}
              value={whatNow}
              placeholder="いまなにしてる？ (最大30文字)"
              maxLength={30}
              placeholderTextColor={"#ccc"}
              onFocus={() => setIsTextInputFocused(true)}
              onBlur={() => setIsTextInputFocused(false)}
            />
          )}
        </StyledView>
        <StyledTouchableOpacity
          onPress={() => handleSend()}
          className="h-[40px] border-l-2 border-[#ccc] pl-[16px]"
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
