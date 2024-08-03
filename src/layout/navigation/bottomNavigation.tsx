import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import { UserData } from "../../types/userData";
import { useRouter } from "expo-router";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

const BottomNavigation = ({
  screen,
  setScreen,
  user,
}: {
  screen: string;
  setScreen: React.Dispatch<React.SetStateAction<string>>;
  user: UserData | undefined;
}) => {
  const router = useRouter();
  return (
    <StyledView className="z-[100] absolute bottom-0 h-[80px] w-screen flex items-center justify-center">
      <StyledView className="w-[70vw] flex flex-row justify-between items-center">
        {/* map */}
        <StyledTouchableOpacity onPress={() => setScreen("mapScreen")}>
          <FontAwesome name="map" size={26} color={`${screen=="mapScreen" ? "#45e645":"#333"}`} />
        </StyledTouchableOpacity>

        {/* likeFrom */}
        <StyledTouchableOpacity onPress={() => setScreen("likeFromScreen")}>
          <Entypo name="heart" size={30} color={`${screen=="likeFromScreen" ? "#f91880":"#333"}`} />
        </StyledTouchableOpacity>

        {/* messsageList */}
        <StyledTouchableOpacity onPress={() => setScreen("talkListScreen")}>
          <Entypo name="mail" size={30} color={`${screen=="talkListScreen" ? "#1a8cd8":"#333"}`} />
        </StyledTouchableOpacity>

          {/* mapScreen */}
        <StyledTouchableOpacity onPress={() =>setScreen("myProfileScreen")}>
          {user?.user_info?.imageUrl && (
            <StyledView className="relative">
              <StyledView className={`absolute z-[120] top-0 left-0 w-[34px] h-[34px] bg-[#000] rounded-full ${!(screen == "myProfileScreen") ? "opacity-60" : "opacity-0"}`}></StyledView>
              <StyledImage
                source={{ uri: user.user_info.imageUrl }}
                style={{ width: 34, height: 34 }}
                className="rounded-full"
              />
            </StyledView>
          )}
        </StyledTouchableOpacity>
      </StyledView>
    </StyledView>
  );
}

export default BottomNavigation;
