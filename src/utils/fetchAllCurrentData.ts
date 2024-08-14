import { collection, onSnapshot, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Dispatch } from "redux";
import { CurrentData } from "../types/userDataTypes";
import {
  updateKey,
  set as setAllCurrentData,
} from "../store/allCurrentDataSlice";

export const monitorCurrentCollection = (dispatch: Dispatch) => {
  const currentRef = collection(db, "current");

  onSnapshot(currentRef, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      const documentId = change.doc.id;
      const documentData = change.doc.data() as CurrentData;
      if (change.type === "added") {
        console.log(`🔵Document added with ID: ${change.doc.id}`);
      }
      if (change.type === "modified") {
        console.log(`🔵Document modified with ID: ${change.doc.id}`);
        dispatch(updateKey({ key: documentId, data: documentData }));
      }
      if (change.type === "removed") {
        console.log(`🔵Document removed with ID: ${change.doc.id}`);
        dispatch(updateKey({ key: documentId, data: null }));
      }
    });
  });
};

export const fetchAllCurrentData = async (dispatch: Dispatch) => {
  const currentRef = collection(db, "current");
  try {
    const querySnapshot = await getDocs(currentRef);
    if (!querySnapshot.empty) {
      console.log("🔵fetched all current data");
      let allCurrentDataDict: { [key: string]: CurrentData | null } = {};

      querySnapshot.forEach((doc) => {
        allCurrentDataDict[doc.id] = doc.data() as CurrentData;
      });
      console.log("################################");
      console.log(JSON.stringify(allCurrentDataDict, null, 2));
      console.log("################################");
      dispatch(setAllCurrentData(allCurrentDataDict));
    } else {
      console.log("❌no user data found!");
    }
  } catch (error) {
    console.error("❌error fetching user data:", error);
  }
};
