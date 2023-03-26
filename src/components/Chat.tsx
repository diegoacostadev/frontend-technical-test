import {SyntheticEvent, useEffect, useState} from "react";
import {TbMessageCircleOff} from "react-icons/tb";
import useSWR from "swr";

import {useChatStore} from "@/chatStore";
import MessagesLists from "@/components/MessagesList";
import {fetcher} from "@/utils/fetcher";

export default function Chat() {
  const [message, setMessage] = useState<string>("");
  const {activeConversation, user} = useChatStore();
  const {data: messages, mutate} = useSWR(
    activeConversation ? `http://localhost:3005/messages/${activeConversation.id}` : null,
    fetcher,
    {
      refreshInterval: 5000,
    },
  );

  useEffect(() => {
    (async function () {
      if (!activeConversation) return;
    })();
  }, [activeConversation]);

  const handleAddMessage = async (ev: SyntheticEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (!activeConversation) return;

    const msg = {
      conversationId: activeConversation.id,
      body: message,
      authorId: user,
      timestamp: 0,
    };

    const res = await fetch(`http://localhost:3005/messages/${activeConversation.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(msg),
    });
    const newMsg = await res.json();

    mutate([...messages, [...messages, newMsg]]);
  };

  return (
    <div className="flex grow flex-col bg-slate-50 p-6">
      {!activeConversation && (
        <div className="grid grow place-content-center">
          <span className="mb-4 flex justify-center">
            <TbMessageCircleOff className="h-12 w-12 text-orange-400" />
          </span>
          No hay chat seleccionado.
        </div>
      )}
      {activeConversation && <MessagesLists messages={messages} user={user} />}
      <div className="mt-auto">
        <form action="" className="flex gap-x-3" onSubmit={handleAddMessage}>
          <textarea
            className="w-full resize-none rounded-md border p-2 pr-6"
            id="search"
            name="search"
            placeholder="Your message..."
            rows={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="rounded-lg bg-blue-400 py-3 px-5 text-white"
            disabled={!activeConversation}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
