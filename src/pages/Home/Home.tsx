import { Show } from "solid-js";
import { A } from "@solidjs/router";

import { Container } from "@/components/Container";

import { useUser } from "@/contexts/user";

function Home() {
  const { user, isError, isAuthenticated } = useUser();

  return (
    <main>
      <Container>
        <h1>Hello {user()?.username || "There"}!</h1>
        <Show when={isAuthenticated()}>
          <A href={`/u/${user()?.username}`}>Profile</A>
        </Show>
        <Show when={isError()}>
          <A href="/auth/sign-in">Sign in</A>
          <A href="/auth/sign-up">Sign up</A>
        </Show>
        <Show when={isAuthenticated()}>
          <A href="/friends">Friends</A>
          <A href="/blocks">Blocks</A>
        </Show>
        <A href="/search">Search</A>
        <A href="/settings">Settings</A>
      </Container>
    </main>
  );
}

export { Home };
