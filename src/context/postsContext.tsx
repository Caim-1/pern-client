import { createContext, ReactNode, useEffect, useState } from "react";
import { Post } from "../types/globals";
import { SelectChangeEvent } from "@mui/material";

interface PostsContext {
  posts: Post[] | undefined;
  setPosts: (posts: Post[]) => void;
  getPosts: (forumName: string) => void;
  sortOption: string;
  sortPosts: () => void;
  handleChangeSortOption: (e: SelectChangeEvent<string>) => void;
}

export const PostsContext = createContext<PostsContext>({} as PostsContext);

export const PostsProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Post[] | undefined>([]);
  const [sortOption, setSortOption] = useState<string>("new");

  useEffect(() => {
    sortPosts();
  }, [sortOption]);

  const getPosts = async (forumName: string) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/posts/forum/${forumName}`, {
        method: "GET",
      });

      if (res.ok) {
        const data = await res.json();

        const sortedPosts = sortByNew(data);
        return setPosts(sortedPosts);
      }

      return setPosts([]);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const sortPosts = () => {
    if (!posts) {
      return;
    }

    if (sortOption === "new") {
      const sortedPosts = sortByNew(posts);
      return setPosts([...sortedPosts]);
    } else if (sortOption === "old") {
      const sortedPosts = sortByOld(posts);
      return setPosts([...sortedPosts]);
    } else if (sortOption === "top") {
    }
  };

  const sortByNew = (data: Post[]) => {
    const sortedPosts = data.sort((a, b) => (a.created_at > b.created_at ? -1 : a.created_at < b.created_at ? 1 : 0));

    return sortedPosts;
  };

  const sortByOld = (data: Post[]) => {
    const sortedPosts = data.sort((a, b) => (a.created_at < b.created_at ? -1 : a.created_at > b.created_at ? 1 : 0));

    return sortedPosts;
  };

  const handleChangeSortOption = (e: SelectChangeEvent<string>) => {
    return setSortOption(e.target.value);
  };

  return (
    <PostsContext.Provider value={{ posts, setPosts, getPosts, sortOption, sortPosts, handleChangeSortOption }}>
      {children}
    </PostsContext.Provider>
  );
};
