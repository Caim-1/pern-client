import { useContext, useEffect } from "react";
import { ForumContext } from "../context/forumContext";

type Props = {
  numberOfPosts: number;
};

// Child of ForumPage.tsx
const SidebarRight = ({ numberOfPosts }: Props) => {
  const { forum, forumSubscribers, getForumSubscribers } = useContext(ForumContext);

  useEffect(() => {
    getForumSubscribers();
  }, []);

  return (
    <div className="flex flex-col w-80 gap-2 p-4 border-black border-2 rounded-lg">
      <div>{forum?.description}</div>
      <div className="text-sm">
        Users: <span className="text-xs">{forumSubscribers?.length}</span>
      </div>
      <div className="text-sm">Posts: {numberOfPosts}</div>
      <div className="text-sm">Created at: {forum?.created_at.substring(0, 10)}</div>
    </div>
  );
};

export default SidebarRight;
