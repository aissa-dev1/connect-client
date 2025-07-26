import { createEffect } from "solid-js";

import { useUser } from "@/contexts/user";

interface Options {
  redirectTo?: string;
}

function useNotAuthRedirect({ redirectTo = "/" }: Options = {}) {
  const { isError } = useUser();

  createEffect(() => {
    if (isError()) {
      window.location.replace(redirectTo);
    }
  });
}

export { useNotAuthRedirect };
