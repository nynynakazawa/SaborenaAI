import React, { useEffect, useState } from "react";
import { Platform, Text, View } from "react-native";
import { styled } from "nativewind";
import BottomNavigation from "../../layout/navigation/bottomNavigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../../firebase";
import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { UserData } from "../../types/userData";
import MapScreen from "../../components/main/map/mapScreen";
import LikeFromScreen from "../../components/main/likeFrom/likeFromScreen";
import TalkListScreen from "../../components/main/talkList/talkListScreen";
import MySettingScreen from "../../components/main/mySetting/mySettingScreen";

const StyledView = styled(View);
const StyledText = styled(Text);

const MapPage = () => {
  const Container = Platform.OS === "android" ? SafeAreaView : View;

  const [myUser, setMyUser] = useState<UserData>()

  const fetchMyUser = async() => {
    const user = auth.currentUser as User;
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.exists()) {
        setMyUser(userSnapshot.data());
      } else {
        console.log("No such document!");
      }
    }
  }

  useEffect(()=>{
    fetchMyUser();
  },[])

  const [screen, setScreen] = useState<string>("mySettingScreen")

  return (
    <Container style={{ flex: 1 }}>
      {screen == "mapScreen" &&
        <MapScreen myUser={myUser} />
      }
      {screen == "likeFromScreen" &&
        <LikeFromScreen myUser={myUser} />
      }
      {screen == "talkListScreen" &&
        <TalkListScreen myUser={myUser} />
      }
      {screen == "mySettingScreen" &&
        <MySettingScreen myUser={myUser} />
      }
      <BottomNavigation screen={screen} setScreen={setScreen} myUser={myUser}/>
    </Container>
  );
};

export default MapPage;
