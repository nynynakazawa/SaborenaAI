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
    imageUrl?: string;
    name?: string;
    selected_goal?: string;
    selected_residential?: string;
    selected_work?: string;
    self_introduction?: string;
  };
};
