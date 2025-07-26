import { Accessor, createContext, Setter } from "solid-js";

import { UserStatus } from "./constants";
import { UserType } from "./types";

interface UserContextType {
  user: Accessor<UserType | null>;
  setUser: Setter<UserType | null>;
  status: Accessor<UserStatus>;
  setStatus: Setter<UserStatus>;
  isIdle: Accessor<boolean>;
  isLoading: Accessor<boolean>;
  isSuccess: Accessor<boolean>;
  isError: Accessor<boolean>;
  isAuthenticated: Accessor<boolean>;
}

const UserContext = createContext<UserContextType>();

export { UserContext, type UserType };
