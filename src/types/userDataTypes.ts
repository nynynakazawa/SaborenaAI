export type UserData = {
  birthday?: string;
  gender?: string;
  main_image_url?: string | null;
  sub_images_url?: (string | null)[];
  name?: string;
  selected_goal?: string;
  selected_residential?: string;
  selected_work?: string;
  self_introduction?: string;
};

export type PrivateData = {
  createdAt?: any;
  email?: string;
  email_verified?: boolean;
  uid?: string;
  expo_push_token?: string;
  password?: string;
  membership_status?: "free" | "premium";
};

export type TalkData = {
  [uid: string]: {
    talk_room_id?: string;
    created_at?: number;
  };
};

export type Message = {
  id: string;
  text: string;
  senderId: string;
  timestamp: number;
};

export type ChatroomData = {
  chatroom_id?: {
    message_id?: {
      senderId?: string;
      text?: string;
    };
  };
};

export type CurrentData = {
  longitude?: number;
  latitude?: number;
  gender?: string;
  people_count?: "1人" | "2人" | "3人" | "複数人";
  what_now?: string;
  main_image_url?: string;
};
