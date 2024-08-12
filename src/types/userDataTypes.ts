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
  password?: string;
};

export type AppData = {
  membership_status?: "free" | "premium";
  like_to?: {
    [key: string]: string[];
  };
  like_from?: {
    [key: string]: string[];
  };
  talk_list?: {
    [key: string]: {
      messages?: {
        people?: string;
        text?: string;
      }[];
    };
  };
};

export type CurrentData = {
  peopleCount?: "1人" | "2人" | "3人" | "複数人";
  isGPS?: boolean;
  longitude?: number;
  latitude?: number;
  what_now?: string;
  uid?: string;
};
