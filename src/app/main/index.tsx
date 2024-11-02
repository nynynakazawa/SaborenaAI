import MapScreen from "./mapScreen";
export default MapScreen;

import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import BackgroundFetch, {
  BackgroundFetchResult,
  BackgroundFetchStatus,
} from "expo-background-fetch";
import { auth } from "../../firebase";
import { sendLocation } from "../../utils/sendLocation";

// バックグラウンドタスクの名前を定義
const BACKGROUND_FETCH_TASK = "background-fetch";

// タスクを定義
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  try {
    // バックグラウンド位置情報の権限をリクエスト
    const { status } = await Location.requestBackgroundPermissionsAsync();
    if (status !== "granted") {
      console.log("バックグラウンド位置情報の権限がありません");
      return BackgroundFetchResult.NoData;
    }

    // 現在のユーザーを取得
    const user = auth.currentUser;
    if (!user) {
      console.log("ユーザーがログインしていません");
      return BackgroundFetchResult.NoData;
    }

    // 位置情報を取得
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    // isGps の値を設定（必要に応じて変更可能）
    const isGps = true;

    // 位置情報を送信
    await sendLocation(isGps, user.uid, location);

    return BackgroundFetchResult.NewData;
  } catch (error) {
    console.log("バックグラウンドタスクでエラーが発生しました:", error);
    return BackgroundFetchResult.Failed;
  }
});

// バックグラウンドタスクを登録
const registerBackgroundFetch = async () => {
  const status = await BackgroundFetch.getStatusAsync();
  if (
    status === BackgroundFetchStatus.Restricted ||
    status === BackgroundFetchStatus.Denied
  ) {
    console.log("バックグラウンド実行が許可されていません");
    return;
  }

  const tasks = await TaskManager.getRegisteredTasksAsync();
  if (tasks.find((task) => task.taskName === BACKGROUND_FETCH_TASK)) {
    console.log(`タスク ${BACKGROUND_FETCH_TASK} は既に登録されています`);
    return;
  }

  await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 30, // 30秒ごとに実行
    stopOnTerminate: false,
    startOnBoot: true,
  });
  console.log(`タスク ${BACKGROUND_FETCH_TASK} を登録しました`);
};

// タスクを登録する関数を実行
registerBackgroundFetch();