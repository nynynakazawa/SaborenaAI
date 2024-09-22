import { Message } from "../types/userDataTypes";

export const countTalkFromMe = ({
  myUid,
  myTalkHistroyData,
}: {
  myUid: string | null;
  myTalkHistroyData: { [key: string]: Message[] | null };
}): number => {
  let count = 0;

  if(!myUid){
    return 0
  }
  for (const uid of Object.keys(myTalkHistroyData)) {
    const messages = myTalkHistroyData[uid];
    
    if (messages && messages.length > 0) {
      // 最も古いメッセージを取得
      const oldestMessage = messages.reduce<Message>((oldest, current) =>
        current.timestamp < oldest.timestamp ? current : oldest,
        messages[0] // 初期値を最初のメッセージに設定
      );

      // senderIdがmyUidと一致する場合、カウントを増やす
      if (oldestMessage.senderId === myUid) {
        count++;
      }
    }
  }

  return count;
};
