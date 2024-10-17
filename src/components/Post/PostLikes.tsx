import { useEffect } from "react";
import useLikes from "../../hooks/useLikes";
import Loading from "../Loading";
import { Post } from "../../types/globals";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { BiSolidUpvote } from "react-icons/bi";
import { BiSolidDownvote } from "react-icons/bi";

type Props = {
  post: Post;
};

// Child of PostCard
const PostLikes = ({ post }: Props) => {
  const {
    liked,
    disliked,
    loading,
    setLoading,
    likePost,
    removeLikeFromPost,
    dislikePost,
    removeDislikeFromPost,
    checkLikeStatus,
  } = useLikes();
  const userId = post.user_id;
  const postId = post.id;

  useEffect(() => {
    checkLikeStatus(userId, postId);
  }, [post]);

  const handleLike = async () => {
    setLoading(true);

    if (liked) {
      removeLikeFromPost(userId, postId);
      post.likes--;
      return;
    }

    if (disliked) {
      removeDislikeFromPost(userId, postId);
      post.dislikes--;
    }

    likePost(userId, postId);
    post.likes++;
  };

  const handleDisike = async () => {
    setLoading(true);

    if (disliked) {
      removeDislikeFromPost(userId, postId);
      post.dislikes--;
      return;
    }

    if (liked) {
      removeLikeFromPost(userId, postId);
      post.likes--;
    }

    dislikePost(userId, postId);
    post.dislikes++;
  };

  return (
    <div
      className="flex items-center gap-2 rounded-2xl max-w-min bg-gray-300"
      // style={liked ? { backgroundColor: "rgb(249 115 22)" } : {}}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {loading ? (
        <Loading />
      ) : (
        <>
          <div
            className={
              liked
                ? "p-2 rounded-full hover:bg-gray-400 text-orange-500"
                : "p-2 rounded-full hover:bg-gray-400 hover:text-orange-500"
            }
            onClick={handleLike}
          >
            {liked ? <BiSolidUpvote /> : <BiUpvote />}
          </div>
          <span>{post.likes - post.dislikes}</span>
          <div
            className={
              disliked
                ? "p-2 rounded-full hover:bg-gray-400 text-blue-600"
                : "p-2 rounded-full hover:bg-gray-400 hover:text-blue-600"
            }
            onClick={handleDisike}
          >
            {disliked ? <BiSolidDownvote /> : <BiDownvote />}
          </div>
        </>
      )}
    </div>
  );
};

export default PostLikes;
