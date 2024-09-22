import { collection, doc, onSnapshot, QuerySnapshot, DocumentSnapshot, DocumentData } from "firebase/firestore";
import { db } from "../firebase";
import { Dispatch } from "redux";
import { set as setNotices } from "../store/noticesSlice";
import { NoticeData } from "../types/otherDataTypes";

type SourceType = 'general' | 'personal';

interface ExtendedNoticeData extends NoticeData {
  source: SourceType;
}

// QuerySnapshotを処理する関数
const handleQuerySnapshot = (snapshot: QuerySnapshot<DocumentData>, source: SourceType) => {
  const currentNotices = snapshot.docs.reduce((acc, doc) => {
    const docData = doc.data() as DocumentData;
    if (source === 'personal') {
      for (const postKey in docData) {
        if (postKey !== 'source') {
          acc[`personal_${doc.id}_${postKey}`] = { ...docData[postKey], source } as ExtendedNoticeData;
        }
      }
    } else {
      acc[`general_${doc.id}`] = { ...docData, source } as ExtendedNoticeData;
    }
    return acc;
  }, {} as { [key: string]: ExtendedNoticeData | null });

  return currentNotices;
};

// DocumentSnapshotを処理する関数
const handleDocumentSnapshot = (snapshot: DocumentSnapshot<DocumentData>, source: SourceType) => {
  const docData = snapshot.data() as DocumentData | undefined;
  let currentNotices: { [key: string]: ExtendedNoticeData | null } = {};

  if (docData && source === 'personal') {
    for (const postKey in docData) {
      if (postKey !== 'source') {
        currentNotices[`personal_${snapshot.id}_${postKey}`] = { ...docData[postKey], source } as ExtendedNoticeData;
      }
    }
  }

  return currentNotices;
};

// 通知を取得する関数
export const fetchNotices = (dispatch: Dispatch, myUid: string) => {
  let mergedNotices: { [key: string]: ExtendedNoticeData | null } = {};

  // general_noticeコレクションからの通知を取得
  const generalNoticesRef = collection(db, "general_notice");
  const unsubscribeGeneral = onSnapshot(generalNoticesRef, (snapshot) => {
    const generalNotices = handleQuerySnapshot(snapshot, 'general');

    mergedNotices = { ...mergedNotices, ...generalNotices };
    dispatch(setNotices(mergedNotices));
    console.log("🔔 fetched general notice");
  });

  // personal_noticeを常に取得する
  const personalNoticesRef = doc(db, "personal_notice", myUid || "guest");
  const unsubscribePersonal = onSnapshot(personalNoticesRef, (snapshot) => {
    const personalNotices = handleDocumentSnapshot(snapshot, 'personal');

    mergedNotices = { ...mergedNotices, ...personalNotices };
    dispatch(setNotices(mergedNotices));
    console.log("🔔 fetched personal notice");
  });

  // 両方のリスナーを解除するための関数を返す
  return () => {
    unsubscribeGeneral();
    unsubscribePersonal();
  };
};
