import React, { useState, useEffect } from "react";
import { Platform, Text, View, TextInput, Button, FlatList, KeyboardAvoidingView } from "react-native";
import { styled } from "nativewind";
import { useGlobalSearchParams } from "expo-router";
import PageBackHeader from "../../layout/header/pageBackHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { db } from "../../firebase";
import { collection, addDoc, onSnapshot, query, orderBy, doc, setDoc, getDoc } from "firebase/firestore";
import { RootState } from "../../store/store";
import { TalkData } from "../../types/userDataTypes";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);

const TalkPage = () => {
  const myUid: string = useSelector((state: RootState) => state.myUid.value);
  const { uid, name } = useGlobalSearchParams();
  const Container = Platform.OS === "android" ? SafeAreaView : View;
  
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);

  // メッセージの送信
  const sendMessage = async (uid: string | string[]) => {
    const key = uid as string
    if (message.trim().length > 0) {
      try {
        const talkRef = doc(db, "talk", myUid);
        // メッセージを追加
        await setDoc(
          talkRef,
          {
            [key]: {
              messages: {
                text: message,
                senderId: myUid,
              },
            },
          }, { merge: true },
        );
        setMessage("");
      } catch (error) {
        console.error("Error sending message: ", error);
      }
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <StyledView
      className={`m-2 p-2 rounded-lg ${item.senderId === myUid ? "bg-blue-500 self-end" : "bg-gray-300 self-start"
        }`}
    >
      <StyledText className="text-white">{item.text}</StyledText>
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
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <StyledView className="flex-row items-center bg-white p-2 border-t border-gray-200">
            <StyledTextInput
              value={message}
              onChangeText={setMessage}
              placeholder="メッセージを入力"
              className="flex-1 p-2 border border-gray-300 rounded-lg"
            />
            {uid &&
              <Button title="送信" onPress={() => sendMessage(uid)} />
            }
          </StyledView>
        </KeyboardAvoidingView>
      </StyledView>
    </Container>
  );
};

export default TalkPage;
