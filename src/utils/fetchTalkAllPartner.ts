import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { TalkData, UserData } from "../types/userDataTypes";
import { set as setTalkPartnerData } from "../store/talkPartnerDataSlice";
import { Dispatch } from "redux";

// userDataを取得
const fetchUserData = async (uid: string) => {
  const userRef = doc(db, "user", uid);
  const userSnapshot = await getDoc(userRef);

  if (userSnapshot.exists()) {
    console.log("🔵fetched user data");
    return userSnapshot.data() as UserData;
  } else {
    console.log("❌no such user data!");
    return null; 
  }
};

// 自分とトーク関係にある全ユーザーのユーザーデータを取得
export const fetchAllTalkPartners = async (talkData: TalkData | null, dispatch: Dispatch) => {

  const newTalkPartnerData: { [key: string]: UserData | null } = {};
  for (let uid in talkData) {
    const userData = await fetchUserData(uid);
    newTalkPartnerData[uid] = userData;
  }
  console.log("😁fetched user data");
  dispatch(setTalkPartnerData(newTalkPartnerData));
};
