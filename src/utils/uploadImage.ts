import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

export const uploadImage = async (myUid: string | null, path: string, uri: string) => {
  if (myUid) {
    console.log(`Uploading image to path: ${path}, uri: ${uri}`);
    
    // 画像のリサイズ・圧縮処理
    const compressedImage = await manipulateAsync(
      uri,
      [{ resize: { width: 800 } }], // 必要に応じてリサイズ
      { compress: 0.7, format: SaveFormat.JPEG } // 圧縮率を設定
    );
    
    const storage = getStorage();
    const storageRef = ref(storage, `${path}/${myUid}/${Date.now()}.jpg`);
  
    const response = await fetch(compressedImage.uri);
    const blob = await response.blob();
  
    try {
      await uploadBytesResumable(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image: ", error);
      throw new Error("Image upload failed");
    }
  } else {
    console.log("Upload Failed. No User");
    return "";
  }
};
