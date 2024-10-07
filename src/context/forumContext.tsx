import { createContext, ReactNode, useContext, useState } from "react";
import { Forum } from "../types/globals";

interface ForumContext {
  forum: Forum | undefined;
  setForum: (forum: Forum) => void;
  getForum: (forumName: string) => void;
  subscribeToForum: () => void;
}

const ForumContext = createContext<ForumContext | undefined>(undefined);

const ForumProvider = ({ children }: { children: ReactNode }) => {
  const [forum, setForum] = useState<Forum | undefined>(undefined);

  return <ForumContext.Provider value={{}}>{children}</ForumContext.Provider>;
};

const useForum = () => {
  const context = useContext(ForumContext);

  if (context === null) {
    throw new Error("useForum must be used within a ForumProvider");
  }

  return context;
};

export default ForumProvider;
