import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { Dispatch } from "redux";
import { set as setNotices, updateKey } from "../store/noticesSlice";
import { NoticeData } from "../types/otherDataTypes";

export const fetchNotices = (dispatch: Dispatch) => {
  const noticesRef = collection(db, "general_notice");
  return onSnapshot(noticesRef, (snapshot) => {
    // 現在の状態を取得
    const currentNotices = snapshot.docs.reduce((acc, doc) => {
      acc[doc.id] = doc.data() as NoticeData | null;
      return acc;
    }, {} as { [key: string]: NoticeData | null });
    
    // 変更があったドキュメントの処理
    snapshot.docChanges().forEach((change) => {
      const doc = change.doc;
      switch (change.type) {
        case "added":
          console.log(`🔔 Added: ${doc.id}`);
          dispatch(updateKey({ key: doc.id, data: null }));
          break;
        case "modified":
          console.log(`🔄 Modified: ${doc.id}`);
          break;
        case "removed":
          console.log(`❌ Removed: ${doc.id}`);
          break;
        default:
          console.log(`Unknown change type: ${change.type}`);
      }
    });
    
    // 状態を更新
    console.log("Updated Notices:", currentNotices);
    dispatch(setNotices(currentNotices));
  });
};
