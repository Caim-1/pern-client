import PostUserInfo from "./PostUserInfo";
import PostMenu from "./Post/PostMenu";
import PostLikes from "./Post/PostLikes";
import { Post } from "../types/globals";
import { useNavigate } from "react-router-dom";

type Props = {
  post: Post;
  forumName: string;
};

// Child of ForumPage
const PostCard = ({ post, forumName }: Props) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();

    navigate(`/forum/${forumName}/post/${post.id}`);
  };

  return (
    <article
      className="flex flex-col gap-2 px-4 py-1 my-1 rounded-2xl hover:cursor-pointer hover:bg-gray-200"
      onClick={(e) => handleClick(e)}
    >
      <div className="flex justify-between">
        <PostUserInfo post={post} />
        <PostMenu />
      </div>
      <span className="font-semibold text-lg">{post.title}</span>
      <span>{post.body}</span>
      <PostLikes post={post} />
    </article>
  );
};

export default PostCard;
