import React, { useEffect, useState } from "react";
import { Platform, Text, View, TextInput, Button, FlatList, KeyboardAvoidingView } from "react-native";
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

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);

const TalkPage = () => {
  const myUid: string = useSelector((state: RootState) => state.myUid.value);
  const talkData: TalkData | null = useSelector((state: RootState) => state.talkData.value);
  const { uid, name } = useGlobalSearchParams();
  const Container = Platform.OS === "android" ? SafeAreaView : View;

  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);
  const [talkRoomId, setTalkRoomId] = useState<string | null>(null);

  // Create talkRoom
  const createTalkRoom = async (myUid: string, uid: string): Promise<string> => {
    const talkRoomId = uuid.v4() as string;
    if (talkData && !(uid in talkData)) {
      const myTalkRef = doc(db, "talk", myUid);
      await setDoc(myTalkRef, {
        [uid]: {
          talk_room_id: talkRoomId,
        }
      }, { merge: true });
      const partnerTalkRef = doc(db, "talk", uid);
      await setDoc(partnerTalkRef, {
        [myUid]: {
          talk_room_id: talkRoomId,
        },
      }, { merge: true });
    }
    return talkRoomId;
  };

  // Send message
  const sendMessage = async (uid: string) => {
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
        { merge: true }
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
          (a: any, b: any) => a.timestamp.seconds - b.timestamp.seconds
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
      className={`m-2 p-2 rounded-[24px]  ${item.senderId === myUid ? "bg-[#ff6767] self-end rounded-br-[6px]" : "bg-[#aaa] rounded-bl-[6px] self-start"
        }`}
    >
      <StyledText className="text-[#fff] text-[16px]">{item.text}</StyledText>
    </StyledView>
  );

  return (
    <Container style={{ flex: 1 }}>
      <PageBackHeader
        routerPage="main/talkListScreen"
        text={`${name}`}
        isFetchUserProps={"false"}
      />
      <StyledView className="flex-1 bg-[#f2f2f2] p-2">
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
        />

        {/* メッセージ入力 */}
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <StyledView className="flex-row items-center bg-white p-2 border-t border-gray-200">
            <StyledTextInput
              value={message}
              onChangeText={setMessage}
              placeholder="メッセージを入力"
              className="flex-1 p-2 border border-gray-300 rounded-lg"
            />
            {uid && (
              <Button title="送信" onPress={() => sendMessage(String(uid))} />
            )}
          </StyledView>
        </KeyboardAvoidingView>
      </StyledView>
    </Container>
  );
};

export default TalkPage;
