import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View, Keyboard, Dimensions } from "react-native";
import { styled } from "nativewind";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import { UserData } from "../../../types/userDataTypes";
import { useRouter } from "expo-router";
import Animated, {
  useSharedValue,
  withSequence,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

const BottomNavigation = ({
  screen,
  setScreen,
  myUserData,
}: {
  screen: string;
  setScreen: React.Dispatch<React.SetStateAction<string>>;
  myUserData: UserData | null;
}) => {

  const router = useRouter();
  const scale = useSharedValue(1);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handlePress = () => {
    scale.value = withSequence(
      withSpring(0.8),
      withSpring(1)
    );
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const screenHeight = Dimensions.get('window').height;

  return (
    !keyboardVisible && (
      <StyledView className="absolute bottom-0 z-[100] flex h-[80px] w-screen items-center justify-center bg-[#fff]">
        <StyledView className="flex w-[70vw] flex-row items-center justify-between">
          {/* map */}
          <StyledTouchableOpacity onPress={() => setScreen("mapScreen")}>
            <FontAwesome
              name="map"
              size={26}
              color={`${screen == "mapScreen" ? "#45e645" : "#333"}`}
            />
          </StyledTouchableOpacity>

          {/* likeFrom */}
          <StyledTouchableOpacity onPress={() => setScreen("likeFromScreen")}>
            <Entypo
              name="heart"
              size={30}
              color={`${screen == "likeFromScreen" ? "#f91880" : "#333"}`}
            />
          </StyledTouchableOpacity>

          {/* messsageList */}
          <StyledTouchableOpacity onPress={() => setScreen("talkListScreen")}>
            <Entypo
              name="mail"
              size={30}
              color={`${screen == "talkListScreen" ? "#1a8cd8" : "#333"}`}
            />
          </StyledTouchableOpacity>

          {/* mySettingScreen */}
          <StyledTouchableOpacity onPress={() => setScreen("mySettingScreen")}>
            <StyledView className="relative">
              <StyledImage
                source={
                  myUserData?.image_url
                    ? { uri: myUserData.image_url }
                    : require("../../../../assets/logo/icon.png")
                }
                style={{ width: 34, height: 34 }}
                className={`rounded-full ${!(screen == "mySettingScreen") ? "opacity-60" : "opacity-100"}`}
              />
            </StyledView>
          </StyledTouchableOpacity>
        </StyledView>
      </StyledView>
    )
  );
};

export default BottomNavigation;
