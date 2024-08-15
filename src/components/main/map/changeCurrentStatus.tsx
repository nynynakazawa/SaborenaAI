import React, { useEffect, useState, useRef } from "react";
import { Switch, Text, TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";
import { useDispatch, useSelector } from "react-redux";
import { set as setIsGps } from "../../../store/isGpsSlice";
import { set as setPeopleCount } from "../../../store/peopleCountSlice";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import Icon from "react-native-vector-icons/MaterialIcons";
import { RootState } from "../../../store/store";
import * as Location from "expo-location";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const ChangeCurrentStatus = () => {
  const location: Location.LocationObject = useSelector(
    (state: any) => state.location.value,
  );
  const peopleCount = useSelector(
    (state: RootState) => state.peopleCount.value,
  );
  const isGps = useSelector((state: RootState) => state.isGps.value);
  const myUid = useSelector((state: RootState) => state.myUid.value);
  const dispatch = useDispatch();

  const prevPeopleCountRef = useRef(peopleCount);
  const prevIsGpsRef = useRef(isGps);

  // 人数送信処理
  const sendPeopleCount = async (uid: string) => {
    if (isGps === false) {
      return;
    }
    console.log("🎉send people count");
    const currentRef = doc(db, "current", uid);
    await setDoc(
      currentRef,
      {
        people_count: peopleCount,
      },
      { merge: true },
    );
  };

  // 人数の変更関数
  const changePeopleCount = () => {
    let newPeopleCount;
    if (peopleCount === "1人") {
      newPeopleCount = "2人";
    } else if (peopleCount === "2人") {
      newPeopleCount = "3人";
    } else if (peopleCount === "3人") {
      newPeopleCount = "複数人";
    } else {
      newPeopleCount = "1人";
    }
    dispatch(setPeopleCount(newPeopleCount));
  };

  // 位置情報送信
  const sendLocation = async (uid: string, isGps: boolean) => {
    console.log("🎉send location");
    const currentRef = doc(db, "current", uid);
    await setDoc(
      currentRef,
      {
        latitude: isGps ? location?.coords.latitude : null,
        longitude: isGps ? location?.coords.longitude : null,
      },
      { merge: true },
    );
  };

  // * 送信ロジック * //
  // peopleCountが10秒間変化がなかったときにだけ送信 (db通信量を減らすため)
  useEffect(() => {
    const interval = setInterval(() => {
      if (prevPeopleCountRef.current !== peopleCount) {
        sendPeopleCount(myUid);
        prevPeopleCountRef.current = peopleCount;
      }
    }, 10 * 1000); // 10秒

    return () => clearInterval(interval);
  }, [peopleCount]);

  // isGpsが10秒間変化がなかったときにだけ送信 (db通信量を減らすため)
  useEffect(() => {
    const interval = setInterval(() => {
      if (prevIsGpsRef.current !== isGps) {
        sendLocation(myUid, isGps);
        prevIsGpsRef.current = isGps;
      }
    }, 10 * 1000); // 10秒

    return () => clearInterval(interval);
  }, [isGps]);

  const toggleSwitch = () => {
    dispatch(setIsGps(!isGps));
  };

  return (
    <StyledView className="absolute right-[6vw] top-[8vh] z-[100] flex h-[16vh] w-[60vw] justify-center rounded-lg bg-white shadow-xl">
      {/* isGps */}
      <StyledView className="flex h-[50%] flex-row items-center justify-center gap-[20px]">
        <StyledView className="flex w-[40%] flex-row">
          <Icon name={"pin-drop"} size={24} color={"#333"} />
          <StyledText className="text-center text-[16px]">位置公開</StyledText>
        </StyledView>
        <StyledView className="flex w-[26%] items-center">
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isGps ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isGps}
          />
        </StyledView>
      </StyledView>

      {/* peopleCount */}
      <StyledView className="flex h-[50%] flex-row items-center justify-center gap-[20px]">
        <StyledView className="flex w-[40%] flex-row">
          <Icon name={"person"} size={24} color={"#333"} />
          <StyledText className="text-[16px]">人数</StyledText>
        </StyledView>
        <StyledTouchableOpacity
          onPress={changePeopleCount}
          activeOpacity={1.0}
          className="w-[26%] translate-y-[6px] border-b-2 border-[#ccc] pb-[6px]"
        >
          <StyledText className="text-center text-[16px]">
            {peopleCount}
          </StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    </StyledView>
  );
};

export default ChangeCurrentStatus;
