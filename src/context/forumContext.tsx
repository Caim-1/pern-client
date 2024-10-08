import { createContext, ReactNode, useState } from "react";
import { Forum } from "../types/globals";

interface ForumContext {
  forum: Forum | undefined;
  setForum: (forum: Forum) => void;
  getForum: (forumName: string) => void;
  subscribeToForum: () => void;
}

export const ForumContext = createContext<ForumContext>({} as ForumContext);

export const ForumProvider = ({ children }: { children: ReactNode }) => {
  const [forum, setForum] = useState<Forum | undefined>(undefined);

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
      await fetch(``, {
        method: "POST",
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <ForumContext.Provider value={{ forum, setForum, getForum, subscribeToForum }}>{children}</ForumContext.Provider>
  );
};
