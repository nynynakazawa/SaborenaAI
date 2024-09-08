import { Tabs, useGlobalSearchParams } from "expo-router";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import { auth } from "../../firebase";
import { set as setMyUid } from "../../store/myUidSlice";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { useEffect, useRef } from "react";
import BottomNavigation from "../../features/main/navigation/bottomNavigation";
import {
  fetchAllCurrentData,
  monitorCurrentCollection,
} from "../../utils/fetchAllCurrentData";
import {
  fetchCurrentData,
  fetchLocation,
  fetchPrivateData,
  fetchTalkData,
  fetchUserData,
} from "../../utils/fetchMyData";
import { styled } from "nativewind";
import { View } from "react-native";
import { RootState } from "../../store/store";

const StyledView = styled(View);

export default function Layout() {
  const { isFetchUserData } = useGlobalSearchParams();
  const dispatch = useDispatch();
  const isUnreadTalk: boolean = useSelector((state: RootState) => state.isUnreadTalk.value)

  // 自身の情報を取得
  const fetchMyUser = async (dispatch: Dispatch) => {
    const user = auth.currentUser;
    dispatch(setMyUid(user?.uid));
    if (user) {
      const unsubscribes = [
        fetchUserData(user.uid, dispatch),
        fetchPrivateData(user.uid, dispatch),
        fetchCurrentData(user.uid, dispatch),
        fetchTalkData(user.uid, dispatch),
      ];
      return () => unsubscribes.forEach((unsub) => unsub());
    }
  };

  // レンダリング時に各ユーザーデータ取得
  useEffect(() => {
    if (isFetchUserData != "false") {
      fetchAllCurrentData(dispatch);
      monitorCurrentCollection(dispatch);
      fetchLocation(dispatch);
      fetchMyUser(dispatch);
    }
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { height: 80 },
        tabBarShowLabel: false,
      }}
    >
      {/* マップタブ */}
      <Tabs.Screen
        name="mapScreen"
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="map"
              size={26}
              color={focused ? "#45e645" : "#333"}
            />
          ),
          headerShown: false,
        }}
      />
      {/* トークタブ */}
      <Tabs.Screen
        name="talkListScreen"
        options={{
          tabBarIcon: ({ focused }) => (
            <StyledView>
              <Entypo
                name="mail"
                size={30}
                color={focused ? "#1a8cd8" : "#333"}
              />
              {isUnreadTalk &&
                <StyledView className="absolute w-[12px] h-[12px] [z-10] bg-[#e3422e] rounded-full right-[-6px]"></StyledView>
              }
            </StyledView>
          ),
          headerShown: true,
          headerTitleAlign: "center",
          headerTitle: "トーク",
          headerStyle: { height: 90 },
          headerTitleStyle: { fontSize: 16 },
        }}
      />
      {/* 設定タブ */}
      <Tabs.Screen
        name="mySettingScreen"
        options={{
          tabBarIcon: ({ focused }) => <BottomNavigation focused={focused} />,
          headerShown: true,
          headerTitleAlign: "center",
          headerTitle: "設定",
          headerStyle: { height: 90 },
          headerTitleStyle: { fontSize: 16 },
        }}
      />
    </Tabs>
  );
}
