import { onMount } from "solid-js";

import { services } from "@/services";

function SignOut() {
  onMount(async () => {
    try {
      await services.auth.signOut();
      window.location.replace("/auth/sign-in");
    } catch (error) {
      window.location.replace("/");
    }
  });

  return null;
}

export { SignOut };
