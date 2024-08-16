import React, { useEffect, useState } from "react";
import {
  Platform,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { styled } from "nativewind";
import { useGlobalSearchParams } from "expo-router";
import PageBackHeader from "../../layout/header/pageBackHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { db } from "../../firebase";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { RootState } from "../../store/store";
import { TalkData } from "../../types/userDataTypes";
import uuid from "react-native-uuid";
import Icon from "react-native-vector-icons/MaterialIcons";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);

const TalkPage = () => {
  const myUid: string = useSelector((state: RootState) => state.myUid.value);
  const talkData: TalkData | null = useSelector(
    (state: RootState) => state.talkData.value,
  );
  const { uid, name } = useGlobalSearchParams();
  const [defaultKeyboardHeight, setDefaultKeyboardHeight] = useState<number>();
  const Container = Platform.OS === "android" ? SafeAreaView : View;

  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);
  const [talkRoomId, setTalkRoomId] = useState<string | null>(null);
  const [isTextInputFocused, setIsTextInputFocused] = useState<boolean>(false);

  // Create talkRoom
  const createTalkRoom = async (
    myUid: string,
    uid: string,
  ): Promise<string> => {
    const talkRoomId = uuid.v4() as string;
    if (talkData && !(uid in talkData)) {
      const myTalkRef = doc(db, "talk", myUid);
      await setDoc(
        myTalkRef,
        {
          [uid]: {
            talk_room_id: talkRoomId,
          },
        },
        { merge: true },
      );
      const partnerTalkRef = doc(db, "talk", uid);
      await setDoc(
        partnerTalkRef,
        {
          [myUid]: {
            talk_room_id: talkRoomId,
          },
        },
        { merge: true },
      );
    }
    return talkRoomId;
  };

  // Send message
  const handleSend = async (uid: string) => {
    let talkRoomIdToUse: string | null = talkRoomId;

    if (!talkRoomIdToUse) {
      talkRoomIdToUse = await createTalkRoom(myUid, uid);
      setTalkRoomId(talkRoomIdToUse);
    }

    if (talkRoomIdToUse) {
      const talkRoomRef = doc(db, "talk_room", talkRoomIdToUse);
      const messageId = uuid.v4() as string;
      await setDoc(
        talkRoomRef,
        {
          [messageId]: {
            id: messageId,
            text: message,
            senderId: myUid,
            timestamp: new Date(),
          },
        },
        { merge: true },
      );
      setMessage("");
    }
  };

  // Fetch messages
  const fetchMessages = (talkRoomId: string) => {
    const talkRoomRef = doc(db, "talk_room", talkRoomId);
    return onSnapshot(talkRoomRef, (doc) => {
      if (doc.exists()) {
        console.log("🟠 Fetched talk data");
        const talkRoomData = doc.data();
        const sortedMessages = Object.values(talkRoomData).sort(
          (a: any, b: any) => a.timestamp.seconds - b.timestamp.seconds,
        );
        setMessages(sortedMessages);
      } else {
        console.log("❌ No such talk data!");
      }
    });
  };

  useEffect(() => {
    if (talkData && uid) {
      const existingTalkRoomId = talkData[uid as string]?.talk_room_id;
      if (existingTalkRoomId) {
        setTalkRoomId(existingTalkRoomId);
        fetchMessages(existingTalkRoomId);
      }
    }
  }, [talkData, uid]);

  // Render item
  const renderItem = ({ item }: { item: any }) => (
    <StyledView
      className={`m-2 rounded-[24px] px-[20px] py-[16px] ${
        item.senderId === myUid
          ? "self-end rounded-br-[6px] bg-[#ff6767]"
          : "self-start rounded-bl-[6px] bg-[#aaa]"
      }`}
    >
      <StyledText className="text-[16px] text-[#fff]">{item.text}</StyledText>
    </StyledView>
  );

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

  return (
    <Container style={{ flex: 1 }}>
      <PageBackHeader
        routerPage="main/talkListScreen"
        text={`${name}`}
        isFetchUserProps={"false"}
      />
      <StyledView className="flex-1 bg-[#f2f2f2] p-2">
        {/* メッセージ表示部 */}
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
        />

        {/* メッセージ入力 */}
        <StyledView className="bg-[fff]">
          <StyledView
            className={`mx-auto my-[14px] w-[90vw] rounded-full border-[1px] border-[#aaa] bg-[#fff] ${isTextInputFocused ? "border-2 border-blue-500" : ""}`}
            style={
              Platform.OS == "ios" &&
              isTextInputFocused && {
                bottom: defaultKeyboardHeight,
                marginBottom: -2,
              }
            }
          >
            <StyledView className="mx-auto w-[80vw] flex-row items-center p-[8px]">
              <StyledTextInput
                className="h-full flex-1 text-[16px] text-[#333]"
                value={message}
                onChangeText={setMessage}
                placeholder="メッセージを送る"
                maxLength={30}
                placeholderTextColor={"#ccc"}
                onFocus={() => setIsTextInputFocused(true)}
                onBlur={() => setIsTextInputFocused(false)}
              />
              <StyledTouchableOpacity
                onPress={() => {
                  handleSend(myUid);
                  setIsTextInputFocused(false);
                  Keyboard.dismiss();
                }}
                className="h-[40px] border-l-2 border-[#ccc] pl-[16px]"
                disabled={message?.trim() == ""}
              >
                <Icon
                  name="send"
                  size={34}
                  color="#73BBFD"
                  className={`translate-y-[2px] ${
                    message.trim() == "" && "opacity-30"
                  }`}
                />
              </StyledTouchableOpacity>
            </StyledView>
          </StyledView>
        </StyledView>
      </StyledView>
    </Container>
  );
};

export default TalkPage;
