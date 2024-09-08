// timestampをhh:mmに変換
export const convertTimestamp_hhmm = (timestamp: number): string => {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

// timestampをyyyy:mm:dd:hh:mmに変換
export const convertTimestamp_yyyymmddhhmm = (timestamp: number): string => {
  const date = new Date(timestamp);
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${year}:${month}:${day}:${hours}:${minutes}`;
};

// トークの残り時間を計算
export const getRemainingTime = (
  pastTime: number,
): { isValid: boolean; leftTime: string } => {
  const date = new Date();
  const nowTime = date.getTime();
  // 3時間 - 時間差
  const leftTime = 3 * 60 * 60 * 1000 - (nowTime - pastTime);
  const hour = Math.floor(leftTime / (1000 * 60 * 60));
  const minute = Math.floor((leftTime % (1000 * 60 * 60)) / (1000 * 60));
  const res = {
    isValid: leftTime > 0,
    leftTime: `残り: ${hour}時間${minute}分`,
  };
  return res;
};
