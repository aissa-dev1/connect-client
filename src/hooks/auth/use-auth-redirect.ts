import { createEffect } from "solid-js";

import { useUser } from "@/contexts/user";

interface Options {
  redirectTo?: string;
}

function useAuthRedirect({ redirectTo = "/" }: Options = {}) {
  const { isAuthenticated } = useUser();

  createEffect(() => {
    if (isAuthenticated()) {
      window.location.replace(redirectTo);
    }
  });
}

export { useAuthRedirect };
