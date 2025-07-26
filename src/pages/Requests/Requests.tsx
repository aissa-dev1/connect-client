import { createResource, For, Show } from "solid-js";

import { useNotAuthRedirect } from "@/hooks/auth";

import { services } from "@/services";

function Requests() {
  useNotAuthRedirect();

  const { getFriendRequests, acceptFriendRequest, deleteFriendRequest } =
    services.friendship;

  const [requestsResource, { refetch }] = createResource(getFriendRequests);

  async function handleAcceptRequest(id: number) {
    try {
      await acceptFriendRequest(id);
      refetch();
    } catch (error) {
      console.error("Failed to accept friend request: ", error);
    }
  }

  async function handleDeleteRequest(id: number) {
    try {
      await deleteFriendRequest(id);
      refetch();
    } catch (error) {
      console.error("Failed to delete friend request: ", error);
    }
  }

  return (
    <main>
      <p>Requests</p>
      <Show when={!requestsResource.loading} fallback={<p>Loading...</p>}>
        <For each={requestsResource()?.data}>
          {(user) => (
            <div>
              <h1>{user.username}</h1>
              <button onClick={() => handleAcceptRequest(user.id)}>
                Accept request
              </button>
              <button onClick={() => handleDeleteRequest(user.id)}>
                Delete request
              </button>
            </div>
          )}
        </For>
      </Show>
    </main>
  );
}

export { Requests };
