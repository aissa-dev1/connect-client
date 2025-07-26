import { A } from "@solidjs/router";
import { Show } from "solid-js";

import { Container } from "@/components/Container";

import { useUser } from "@/contexts/user";

function Settings() {
  const { isAuthenticated } = useUser();

  return (
    <main>
      <Container>
        <h1>Settings</h1>
        <Show when={isAuthenticated()}>
          <A href="/auth/sign-out">Sign out</A>
        </Show>
      </Container>
    </main>
  );
}

export { Settings };
