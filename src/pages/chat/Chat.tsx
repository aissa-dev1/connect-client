import { DOMElement } from "solid-js/jsx-runtime";
import {
  createResource,
  createSignal,
  For,
  onCleanup,
  onMount,
  Show,
} from "solid-js";
import { useParams } from "@solidjs/router";

import { useUser } from "@/contexts/user";
import { useNotAuthRedirect } from "@/hooks/auth";
import { useDebounce } from "@/hooks/use-debounce";

import { fromJSON, toJSON } from "@/utils/json";

import { WSChatType } from "@/constants/ws";
import { services } from "@/services";
import { WSEnvelope, WSMessagePayload, WSTypingPayload } from "@/types/ws";
import { MessageType } from "@/types/message";

function Chat() {
  useNotAuthRedirect();

  const protocol = window.location.protocol === "https:" ? "wss" : "ws";
  const socket = new WebSocket(
    `${protocol}://${import.meta.env.VITE_WS_SERVER}/ws/chat`
  );

  const params = useParams();
  const { user } = useUser();
  const { debounce: typingDebounce } = useDebounce({
    debounceMS: 3000,
  });

  const [textMessage, setTextMessage] = createSignal("");
  const [typingPayload, setTypingPayload] = createSignal<WSTypingPayload>({
    from: 0,
    to: 0,
    isTyping: false,
  });
  const [messages, setMessages] = createSignal<MessageType[]>([]);

  const [userResource] = createResource(() => {
    return services.user.getUserByUserName(params.username);
  });
  const [messagesResource] = createResource(
    () => {
      const userId = user()?.id;
      const friendId = userResource()?.data.id;
      return userId && friendId ? [userId, friendId] : null;
    },
    async (ids) => {
      if (!ids) return;

      try {
        const response = await services.message.getMessagesBetweenUsers(
          ids[0],
          ids[1]
        );
        setMessages(response.data);
        return response;
      } catch (error) {}
    }
  );

  onMount(() => {
    socket.onopen = (event) => {
      console.log("Socket connected successfully");
    };

    socket.onmessage = (event) => {
      try {
        const msg = fromJSON<WSEnvelope<WSChatType>>(event.data);

        switch (msg.type) {
          case WSChatType.Message: {
            const payload: MessageType = msg.payload;
            setMessages((prev) => [...prev, payload]);
            break;
          }

          case WSChatType.Typing: {
            const payload: WSTypingPayload = msg.payload;
            setTypingPayload(payload);
            break;
          }
        }
      } catch (error) {
        console.error("Failed to parse JSON: ", error);
      }
    };

    socket.onclose = (event) => {
      console.log("Socket closed successfully");
    };
  });

  onCleanup(() => {
    if (socket.readyState === WebSocket.OPEN) {
      notifyTyping(false);
      socket.close();
    }
  });

  function notifyMessage() {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(
        toJSON<WSEnvelope<WSChatType, WSMessagePayload>>({
          type: WSChatType.Message,
          payload: {
            from: user()?.id!,
            to: userResource()?.data.id!,
            text: textMessage(),
          },
        })
      );
    }
  }

  function notifyTyping(isTyping: boolean) {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(
        toJSON<WSEnvelope<WSChatType, WSTypingPayload>>({
          type: WSChatType.Typing,
          payload: {
            from: user()?.id!,
            to: userResource()?.data.id!,
            isTyping: isTyping,
          },
        })
      );
    }
  }

  async function handleSendMessage(
    e: SubmitEvent & {
      currentTarget: HTMLFormElement;
      target: DOMElement;
    }
  ) {
    e.preventDefault();

    if (textMessage().length > 0) {
      notifyMessage();
      setTextMessage("");
      notifyTyping(false);
    }
  }

  function handleOnInput(
    e: InputEvent & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    }
  ) {
    setTextMessage(e.target.value);
    notifyTyping(true);

    typingDebounce(() => {
      notifyTyping(false);
    });
  }

  return (
    <main>
      <h3>{userResource()?.data.username}</h3>
      <Show when={!messagesResource.loading} fallback={<p>Loading...</p>}>
        <For each={messages()}>
          {(message) => (
            <div>
              <p>
                {message.senderId === user()?.id
                  ? "You"
                  : userResource()?.data.username}
                : {message.text}
              </p>
            </div>
          )}
        </For>
      </Show>
      {typingPayload().isTyping && (
        <p>{userResource()?.data.username} is typing...</p>
      )}
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Message..."
          value={textMessage()}
          onInput={handleOnInput}
        />
        <button type="submit">Send</button>
      </form>
    </main>
  );
}

export { Chat };
