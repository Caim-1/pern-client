import { createContext, ReactNode, useState } from "react";
import { User } from "../types/globals";

interface UserContext {
  user: User | undefined;
  setUser: (user: User) => void;
  getUser: (userId: number) => void;
}

export const UserContext = createContext<UserContext>({} as UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  const getUser = async (userId: number) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/${userId}`, {
        method: "GET",
      });
      const data = await res.json();
      setUser(data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return <UserContext.Provider value={{ user, setUser, getUser }}>{children}</UserContext.Provider>;
};
