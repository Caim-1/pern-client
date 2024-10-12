export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  banner?: string;
};

export type Forum = {
  id: number;
  name: string;
  description: string;
  created_at: string;
  icon: string;
  banner: string;
};

export type Post = {
  id: number;
  title: string;
  body: string;
  image: string;
  created_at: string;
  user_id: number;
  forum_name: string;
  likes: number;
  dislikes: number;
};

export type ForumUserRelation = {
  forum_id: number;
  user_id: number;
};
