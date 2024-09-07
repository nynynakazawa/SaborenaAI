declare module 'react-native-push-notification' {
  import { Component } from 'react';

  interface Notification {
    title: string;
    message: string;
    // 他の必要なプロパティを追加
  }

  class PushNotification extends Component {
    static configure(config: {
      onNotification: (notification: Notification) => void;
      requestPermissions?: boolean;
    }): void;
    static localNotification(notification: Notification): void;
    static createChannel(
      channelId: string,
      channelName: string,
      options?: object
    ): Promise<void>;
  }

  export default PushNotification;
}
