import { onMount } from "solid-js";

import { useUser } from "./use-user";

import { UserStatus } from "../constants";
import { services } from "@/services";

interface Options {
  shouldFetchOnMount?: boolean;
}

function useFetchUser({ shouldFetchOnMount = true }: Options = {}) {
  const { setUser, setStatus } = useUser();

  async function fetch() {
    try {
      setStatus(UserStatus.Loading);
      const response = await services.profile.getMyProfile();
      setUser(response.data);
      setStatus(UserStatus.Success);
    } catch (error) {
      setStatus(UserStatus.Error);
    }
  }

  function refetch() {
    setUser(null);
    setStatus(UserStatus.Idle);
    return fetch();
  }

  onMount(() => {
    if (shouldFetchOnMount) {
      fetch();
    }
  });

  return { refetch };
}

export { useFetchUser };
