const base = 257; // 素数を基数として選択
const mod = 1_000_000_007; // 大きな素数をモジュロとして使用
const dateWeight = 1000; // 日付の影響を大きくするための重み

// ローリングハッシュを計算するヘルパー関数
const rollingHash = (inputStr: string, date: string): number => {
  let hash = 0;
  let power = 1;

  // 日付部分を重み付きでハッシュに加算
  for (let i = 0; i < date.length; i++) {
    hash = (hash + (date.charCodeAt(i) * dateWeight * power) % mod) % mod;
    power = (power * base) % mod; // 基数の累乗を更新
  }

  // 残りの文字列部分をハッシュに加算
  power = 1; // 累乗をリセット
  for (let i = 0; i < inputStr.length; i++) {
    hash = (hash + (inputStr.charCodeAt(i) * power) % mod) % mod;
    power = (power * base) % mod; // 基数の累乗を更新
  }

  return hash;
};

// ハッシュ値からシードを生成し、それに基づく乱数生成を行う
const seedRandom = (seed: number) => {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

// r (200 <= r <= 1000) と Θ (0 <= Θ <= 360) を生成する関数
const generateRTheta = (date: string, uid: string) => {
  // ステップ 1: 日付とUIDを結合
  const inputStr = `${uid}`;

  // ステップ 2: ローリングハッシュを生成
  const hashValue = rollingHash(inputStr, date);

  // ハッシュ値の最初の部分を使ってシード値を作成
  const seed = hashValue % mod; // ハッシュ値をモジュロで制約

  // ステップ 3: シード値に基づき乱数生成
  const randomR = seedRandom(seed) * (1000 - 200) + 200; // rの範囲 [200, 1000] で乱数生成
  const randomTheta = seedRandom(seed + 1) * 360; // Θの範囲 [0, 360] で乱数生成

  return [randomR, randomTheta];
};

// 極座標 (r, theta) から座標 (x, y) を移動した新しい座標 (x', y') を計算する関数
// y: latitude
// x: longitude
// x = 経度, y = 緯度, r = メートル
const polarToCartesian = (y: number, x: number, r: number, theta: number) => {
  // thetaをラジアンに変換 (Math.cos, Math.sinはラジアンを使用するため)
  const thetaRad = theta * (Math.PI / 180);
  
  // 地球の半径 (メートル)
  const earthRadius = 6371e3; // 6371km = 6371e3メートル

  // 1度の緯度の距離 (一定)
  const latDistancePerDegree = 111320; // おおよそ111.32km = 111,320メートル

  // 緯度に基づく1度の経度の距離
  const lonDistancePerDegree = latDistancePerDegree * Math.cos(y * (Math.PI / 180));

  // メートル単位の距離を度数に変換
  const deltaLat = (r * Math.sin(thetaRad)) / latDistancePerDegree;
  const deltaLon = (r * Math.cos(thetaRad)) / lonDistancePerDegree;

  // 新しい緯度経度を計算
  const newLatitude = y + deltaLat;
  const newLongitude = x + deltaLon;

  return {
    latitude: newLatitude,
    longitude: newLongitude
  };
}

const date = new Date();

// 年、月、日を取得
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0'); // 月は0から始まるので+1
const day = String(date.getDate()).padStart(2, '0'); // 日

export const convertLatitudeLongitude = (x: number, y: number, uid: string) => {
  const [r, theta]: number[] = generateRTheta( `${day}${year}${day}${month+day}${day+3}`, uid); // ハッシュ値を生成
  const { latitude, longitude } = polarToCartesian(x, y, r, theta); // 新しい座標を計算

  return {
    latitude,
    longitude
  };
};
