import { useEffect, useState } from "react";
import { Forum } from "../types/globals";
import usePosts from "./usePosts";

type Props = {
  forum: Forum | undefined;
  setForum: (forum: Forum) => void;
  getForum: (name: string) => void;
  subscribeToForum: () => void;
};

const useForum = (): Props => {
  const [forum, setForum] = useState<Forum>();
  const { getPosts } = usePosts();

  useEffect(() => {
    if (forum) {
      getPosts(forum.name);
    }
  }, [forum]);

  const getForum = async (name: string) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/forums/${name}`, {
        method: "GET",
      });
      const data = await res.json();
      setForum(data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const subscribeToForum = async () => {
    try {
      const res = await fetch(``, {
        method: "POST",
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return { forum, setForum, getForum, subscribeToForum };
};

export default useForum;
