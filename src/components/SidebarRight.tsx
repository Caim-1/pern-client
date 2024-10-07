import { Forum } from "../types/globals";

type Props = {
  forum: Forum;
  numberOfPosts: number;
};

// Child of ForumPage.tsx
const SidebarRight = ({ forum, numberOfPosts }: Props) => {
  return (
    <div className="flex flex-col w-80 gap-2 p-4 border-black border-2 rounded-lg">
      <div>{forum?.description}</div>
      <div className="text-sm">
        Users: <span className="text-xs">{/* Fetch comments by user.id (foreign key) */}</span>
      </div>
      <div className="text-sm">Posts: {numberOfPosts}</div>
      <div className="text-sm">Created at: {forum?.created_at.substring(0, 10)}</div>
    </div>
  );
};

export default SidebarRight;
