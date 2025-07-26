import { useContext } from "solid-js";

import { UserContext } from "../user-context";

function useUser() {
  const ctx = useContext(UserContext);

  if (!ctx) throw new Error("useUser must be used within UserProvider");

  return ctx;
}

export { useUser };
