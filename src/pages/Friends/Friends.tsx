import { A } from "@solidjs/router";
import { createResource, For, Show } from "solid-js";

import { Container } from "@/components/Container";

import { useNotAuthRedirect } from "@/hooks/auth";

import { services } from "@/services";

function Friends() {
  useNotAuthRedirect();

  const { getFriends, deleteFriendRequest } = services.friendship;

  const [friendsResource, { refetch }] = createResource(getFriends);

  async function handleRemoveFriend(receiverId: number) {
    try {
      await deleteFriendRequest(receiverId);
      refetch();
    } catch (error) {
      console.error("Failed to remove friend: ", error);
    }
  }

  return (
    <main>
      <Container>
        <h1>Friends</h1>
        <A href="/requests">Requests</A>
        <Show when={!friendsResource.loading} fallback={<p>Loading...</p>}>
          <For
            each={friendsResource()?.data}
            fallback={
              <p>
                Your friends list is empty.{" "}
                <A href="/search">Add new people?</A>
              </p>
            }
          >
            {(user) => (
              <div>
                <p>{user.username}</p>
                <A href={`/u/${user.username}`}>Profile</A>
                <button onClick={() => handleRemoveFriend(user.id)}>
                  Remove friend
                </button>
              </div>
            )}
          </For>
        </Show>
      </Container>
    </main>
  );
}

export { Friends };
