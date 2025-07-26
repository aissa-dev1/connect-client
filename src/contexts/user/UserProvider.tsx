import { createSignal, ParentProps } from "solid-js";

import { UserContext, UserType } from "./user-context";
import { UserStatus } from "./constants";

interface Props extends ParentProps {}

function UserProvider(props: Props) {
  const [user, setUser] = createSignal<UserType | null>(null);
  const [status, setStatus] = createSignal<UserStatus>(UserStatus.Idle);
  const isIdle = () => status() === UserStatus.Idle;
  const isLoading = () => status() === UserStatus.Loading;
  const isSuccess = () => status() === UserStatus.Success;
  const isError = () => status() === UserStatus.Error;
  const isAuthenticated = () => isSuccess();

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        status,
        setStatus,
        isIdle,
        isLoading,
        isSuccess,
        isError,
        isAuthenticated,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export { UserProvider };
