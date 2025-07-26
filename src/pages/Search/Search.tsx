import { createSignal, For, Show } from "solid-js";
import { A } from "@solidjs/router";

import { Container } from "@/components/Container";

import { useDebounce } from "@/hooks/use-debounce";

import { services } from "@/services";
import { SearchUserType } from "@/contexts/user";

function Search() {
  const [query, setQuery] = createSignal("");
  const [users, setUsers] = createSignal<SearchUserType[]>([]);

  const { debounce } = useDebounce();

  function handleSearch(
    e: InputEvent & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    }
  ) {
    debounce(async () => {
      try {
        setQuery(e.target.value);
        const response = await services.user.searchUsers(query());
        setUsers(response.data);
      } catch (error) {}
    });
  }

  return (
    <main>
      <Container>
        <h1>Search</h1>
        <input
          placeholder="Type something..."
          value={query()}
          onInput={handleSearch}
        />
        <Show when={users().length > 0} fallback={<p>No users to show.</p>}>
          <For each={users()}>
            {(user) => (
              <div>
                <h3>{user.username}</h3>
                <A href={`/u/${user.username}`}>Profile</A>
              </div>
            )}
          </For>
        </Show>
      </Container>
    </main>
  );
}

export { Search };
