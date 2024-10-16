import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Forum } from "../types/globals";
import { UserContext } from "./userContext";

interface ForumContext {
  forum: Forum | undefined;
  setForum: (forum: Forum) => void;
  getForum: (forumName: string) => void;
  forumSubscribers: [] | undefined;
  userIsSubscribed: boolean;
  checkIfUserIsSubscribed: () => void;
  loading: boolean;
  getForumSubscribers: () => any;
  subscribeToForum: () => void;
  unsubscribeFromForum: () => void;
}

export const ForumContext = createContext<ForumContext>({} as ForumContext);

export const ForumProvider = ({ children }: { children: ReactNode }) => {
  const [forum, setForum] = useState<Forum | undefined>(undefined);
  const [forumSubscribers, setForumSubscribers] = useState<[] | undefined>(undefined);
  const [userIsSubscribed, setUserIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    setUserIsSubscribed(false);

    if (forum && user) {
      checkIfUserIsSubscribed();
    }
  }, [forum, user]);

  const getForum = async (name: string) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/forums/name/${name}`, {
        method: "GET",
      });
      const data = await res.json();
      setForum(data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const getForumSubscribers = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/forums/subscribers/forum/${forum?.id}`, {
        method: "GET",
      });
      const data = await res.json();
      setForumSubscribers(data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const checkIfUserIsSubscribed = async () => {
    if (forum?.id === undefined || user?.id === undefined) {
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/forums/subscribers/forum/${forum?.id}/${user?.id}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();

      if (data.forum_id) {
        setUserIsSubscribed(true);
      }
    } catch (error: any) {
      console.log(error.message);
    }

    setLoading(false);
  };

  const subscribeToForum = async () => {
    setLoading(true);

    try {
      await fetch(`${import.meta.env.VITE_SERVER_URL}/api/forums/subscribe/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          forumId: forum?.id,
          userId: user?.id,
        }),
      });
    } catch (error: any) {
      console.log(error.message);
    }

    setLoading(false);
  };

  const unsubscribeFromForum = async () => {
    setLoading(true);

    try {
      await fetch(`${import.meta.env.VITE_SERVER_URL}/api/forums/unsubscribe/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          forumId: forum?.id,
          userId: user?.id,
        }),
      });
    } catch (error: any) {
      console.log(error.message);
    }

    setLoading(false);
  };

  return (
    <ForumContext.Provider
      value={{
        forum,
        setForum,
        getForum,
        forumSubscribers,
        userIsSubscribed,
        checkIfUserIsSubscribed,
        loading,
        subscribeToForum,
        unsubscribeFromForum,
        getForumSubscribers,
      }}
    >
      {children}
    </ForumContext.Provider>
  );
};
