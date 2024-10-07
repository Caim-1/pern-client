import PostMenu from "./PostMenu";
import PostUserInfo from "./PostUserInfo";
import PostLikes from "./Post/PostLikes";
import { Post } from "../types/globals";

type Props = {
  post: Post;
};

// Child of ForumPage
const PostCard = ({ post }: Props) => {
  return (
    <article className="flex flex-col gap-2 px-4 py-1 my-1 rounded-2xl hover:cursor-pointer hover:bg-gray-200">
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
