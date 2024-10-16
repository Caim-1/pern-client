import { useState } from "react";

type Props = {
  liked: boolean;
  setLiked: (value: boolean) => void;
  disliked: boolean;
  setDisliked: (value: boolean) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  likePost: (userId: number, postId: number) => void;
  removeLikeFromPost: (userId: number, postId: number) => void;
  dislikePost: (userId: number, postId: number) => void;
  removeDislikeFromPost: (userId: number, postId: number) => void;
  checkLikeStatus: (userId: number, postId: number) => void;
};

const useLikes = (): Props => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [loading, setLoading] = useState(false);

  const likePost = async (userId: number, postId: number) => {
    try {
      const [likePostRes, createUserLikedPostRelationRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_SERVER_URL}/api/posts/${postId}/like`, {
          method: "PUT",
        }),
        fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/post/like`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ userId, postId }),
        }),
      ]);

      if (!likePostRes.ok || !createUserLikedPostRelationRes.ok) {
        throw new Error("One of the requests has failed.");
      }

      setLiked(!liked);
      setLoading(false);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const removeLikeFromPost = async (userId: number, postId: number) => {
    try {
      const [removeLikeFromPostRes, removeUserLikedPostRelationRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_SERVER_URL}/api/posts/${postId}/removelike`, {
          method: "PUT",
        }),
        fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/post/removelike`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ userId, postId }),
        }),
      ]);

      if (!removeLikeFromPostRes.ok || !removeUserLikedPostRelationRes.ok) {
        throw new Error("One of the requests has failed.");
      }

      setLiked(!liked);
      setLoading(false);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const dislikePost = async (userId: number, postId: number) => {
    try {
      const [dislikePostRes, createUserDislikedPostRelationRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_SERVER_URL}/api/posts/${postId}/dislike`, {
          method: "PUT",
        }),
        fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/post/dislike`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ userId, postId }),
        }),
      ]);

      if (!dislikePostRes.ok || !createUserDislikedPostRelationRes.ok) {
        throw new Error("One of the requests has failed.");
      }

      setDisliked(!disliked);
      setLoading(false);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const removeDislikeFromPost = async (userId: number, postId: number) => {
    try {
      const [removeDislikeFromPostRes, removeUserDislikedPostRelationRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_SERVER_URL}/api/posts/${postId}/removedislike`, {
          method: "PUT",
        }),
        fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/post/removedislike`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ userId, postId }),
        }),
      ]);

      if (!removeDislikeFromPostRes.ok || !removeUserDislikedPostRelationRes.ok) {
        throw new Error("One of the requests has failed.");
      }

      setDisliked(!disliked);
      setLoading(false);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const checkLikeStatus = async (userId: number, postId: number) => {
    try {
      const userLikedPostsResById = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/users/post/likes/${userId}/${postId}`,
        {
          method: "GET",
        }
      );
      const userDislikedPostsResById = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/users/post/dislikes/${userId}/${postId}`,
        {
          method: "GET",
        }
      );

      const data1 = await userLikedPostsResById.json();
      const data2 = await userDislikedPostsResById.json();

      if (data1.length > 0) {
        setLiked(true);
      } else if (data2.length > 0) {
        setDisliked(false);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return {
    liked,
    setLiked,
    disliked,
    setDisliked,
    loading,
    setLoading,
    likePost,
    removeLikeFromPost,
    dislikePost,
    removeDislikeFromPost,
    checkLikeStatus,
  };
};

export default useLikes;
