import { createResource, For, Show } from "solid-js";

import { useNotAuthRedirect } from "@/hooks/auth";

import { services } from "@/services";

function Blocks() {
  useNotAuthRedirect();

  const { getBlockerBlocks, unblock } = services.block;

  const [blocksResource, { refetch }] = createResource(getBlockerBlocks);

  async function handleUnblockUser(id: number) {
    try {
      await unblock(id);
      refetch();
    } catch (error) {
      console.error("Failed to unblock user request: ", error);
    }
  }

  return (
    <main>
      <p>Blocks</p>
      <Show when={!blocksResource.loading} fallback={<p>Loading...</p>}>
        <For each={blocksResource()?.data}>
          {(user) => (
            <div>
              <h1>{user.username}</h1>
              <button onClick={() => handleUnblockUser(user.id)}>
                Unblock
              </button>
            </div>
          )}
        </For>
      </Show>
    </main>
  );
}

export { Blocks };
