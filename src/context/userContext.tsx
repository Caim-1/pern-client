import { createContext } from "react";
import { User } from "../types/globals";

const UserContext = createContext<User | undefined>(undefined);

export default UserContext;
