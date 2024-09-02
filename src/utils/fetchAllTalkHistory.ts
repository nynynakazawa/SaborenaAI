import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { Message, TalkData } from "../types/userDataTypes";
import { updateKey } from "../store/talkHistoryDataSlice";
import { Dispatch } from "redux";

// メッセージを取得
const fetchTalkHistory = (
  uid: string,
  talkRoomId: string,
  dispatch: Dispatch,
) => {
  const talkRoomRef = doc(db, "talk_room", talkRoomId);
  return onSnapshot(talkRoomRef, (doc) => {
    if (doc.exists()) {
      console.log("🟠 Fetched talkRoom data");
      const talkRoomData: { [key: string]: Message } = doc.data();
      const sortedMessages: Message[] = Object.values(talkRoomData).sort(
        (a: any, b: any) => a.timestamp - b.timestamp,
      );
      // talkHistoryに追加
      dispatch(updateKey({ key: uid, data: sortedMessages }));
    } else {
      console.log("❌ No such talk data!");
    }
  });
};

export const fetchAllTalkHistory = (talkData: TalkData, dispatch: Dispatch) => {
  for (const uid in talkData) {
    const talkRoomId = talkData[uid]?.talk_room_id;
    fetchTalkHistory(uid, talkRoomId as string, dispatch);
  }
};
