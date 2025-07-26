import { DOMElement } from "solid-js/jsx-runtime";
import { onCleanup, onMount } from "solid-js";

import { services } from "@/services";

function Chat() {
  const protocol = window.location.protocol === "https:" ? "wss" : "ws";
  const socket = new WebSocket(
    `${protocol}://${import.meta.env.VITE_WS_SERVER}/ws/chat`
  );

  onMount(() => {
    socket.onopen = (event) => {
      console.log("Socket connected successfully");
    };

    socket.onclose = (event) => {
      console.log("Socket closed successfully");
    };
  });

  onCleanup(() => {
    if (socket.readyState === WebSocket.OPEN) {
      socket.close();
    }
  });

  async function handleSendMessage(
    e: SubmitEvent & {
      currentTarget: HTMLFormElement;
      target: DOMElement;
    }
  ) {
    e.preventDefault();

    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: "message", content: "Hello world!" }));
    }
  }

  return (
    <main>
      <form onSubmit={handleSendMessage}>
        <input type="text" placeholder="Message..." />
        <button type="submit">Send</button>
      </form>
    </main>
  );
}

export { Chat };
