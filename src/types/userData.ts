export type UserData = {
  private_info?: {
    createdAt?: string;
    email?: string;
    email_verified?: boolean;
    verified_email?: boolean;
  };
  user_info?: {
    birthday?: string;
    gender?: string;
    image_url?: string;
    name?: string;
    selected_goal?: string;
    selected_residential?: string;
    selected_work?: string;
    self_introduction?: string;
  };
  app_info?: {
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
  current_info?: {
    peopleCount?: string;
    isGPS?: boolean;
    longitude?: number;
    latitude?: number;
    winZone?: string;
  };
};
