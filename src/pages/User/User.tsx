import { createResource, createSignal, Show } from "solid-js";
import { A, useParams } from "@solidjs/router";

import { Container } from "@/components/Container";

import { useUser } from "@/contexts/user";

import { services } from "@/services";
import { FriendshipStatus } from "@/constants/friendship";

function User() {
  const params = useParams();
  const { user, isLoading: isUserLoading, isAuthenticated } = useUser();

  const { getUserByUserName } = services.user;
  const {
    getFriendRequest,
    sendFriendRequest,
    deleteFriendRequest,
    acceptFriendRequest,
  } = services.friendship;
  const { block, unblock, getBlocksBetweenUsers } = services.block;

  const [friendshipStatus, setFriendshipStatus] =
    createSignal<FriendshipStatus>();

  const [userResource] = createResource(() => {
    return getUserByUserName(params.username);
  });
  const userResourceData = () => userResource()?.data;

  const [blockResource, { refetch: refetchBlockResource }] = createResource(
    () => {
      const currentUserId = user()?.id;
      const otherUserId = userResourceData()?.id;
      return currentUserId && otherUserId ? [currentUserId, otherUserId] : null;
    },
    (ids) => {
      return ids ? getBlocksBetweenUsers(ids[0], ids[1]) : null;
    }
  );

  const [friendshipResource, { refetch: refetchFriendshipResource }] =
    createResource(
      () => userResourceData()?.id,
      async (id) => {
        if (!id) return null;

        try {
          const response = await getFriendRequest(id);
          setFriendshipStatus(response.data.status);
          return response;
        } catch (error) {
          setFriendshipStatus(undefined);
          console.error("friendshipResource error: ", error);
        }
      }
    );
  const friendshipResourceData = () => friendshipResource()?.data;

  async function handleAddFriend() {
    try {
      await sendFriendRequest(userResourceData()?.id!);
      refetchFriendshipResource();
    } catch (error) {
      console.error("Failed to add friend: ", error);
    }
  }

  async function handleRemoveFriend() {
    try {
      await deleteFriendRequest(userResourceData()?.id!);
      refetchFriendshipResource();
    } catch (error) {
      console.error("Failed to remove friend: ", error);
    }
  }

  async function handleAcceptFriend() {
    try {
      await acceptFriendRequest(userResourceData()?.id!);
      refetchFriendshipResource();
    } catch (error) {
      console.error("Failed to accept friend: ", error);
    }
  }

  async function handleBlockUser() {
    try {
      await block(userResourceData()?.id!);
      refetchFriendshipResource();
      refetchBlockResource();
    } catch (error) {
      console.log("Failed to block user: ", error);
    }
  }

  async function handleUnblockUser() {
    try {
      await unblock(userResourceData()?.id!);
      refetchFriendshipResource();
      refetchBlockResource();
    } catch (error) {
      console.log("Failed to unblock user: ", error);
    }
  }

  return (
    <main>
      <Container>
        <Show
          when={
            !isUserLoading() &&
            !userResource.loading &&
            !friendshipResource.loading &&
            !blockResource.loading
          }
          fallback={<p>Loading...</p>}
        >
          <h3>{userResourceData()?.username}</h3>
          <Show
            when={isAuthenticated()}
            fallback={
              <p>
                You wanna be a friend with {userResourceData()?.username}?{" "}
                <A href="/auth/sign-in">Sign in</A>
              </p>
            }
          >
            <Show
              when={userResourceData()?.id !== user()?.id}
              fallback={<button>Edit profile</button>}
            >
              <Show when={blockResource()?.data.length === 0}>
                <Show when={!friendshipStatus()}>
                  <button onClick={handleAddFriend}>Add friend</button>
                </Show>
                <Show when={friendshipStatus() === FriendshipStatus.Pending}>
                  <Show
                    when={user()?.id === friendshipResourceData()?.requesterId}
                  >
                    <button onClick={handleRemoveFriend}>Cancel request</button>
                  </Show>
                  <Show
                    when={user()?.id === friendshipResourceData()?.receiverId}
                  >
                    <button onClick={handleAcceptFriend}>Accept request</button>
                    <button onClick={handleRemoveFriend}>Remove request</button>
                  </Show>
                </Show>
                <Show when={friendshipStatus() === FriendshipStatus.Accepted}>
                  <p>Friends</p>
                  <button onClick={handleRemoveFriend}>Remove friend</button>
                </Show>
              </Show>
              <Show
                when={blockResource()?.data.some(
                  (b) => b.blockerId === user()?.id
                )}
                fallback={<button onClick={handleBlockUser}>Block</button>}
              >
                <button onClick={handleUnblockUser}>Unblock</button>
              </Show>
            </Show>
          </Show>
        </Show>
      </Container>
    </main>
  );
}

export { User };
