import { useChatStore } from "@/chatStore";
import MessagesLists from "@/components/MessagesList";
import { SyntheticEvent, useEffect, useState } from "react";
import { TbMessageCircleOff } from "react-icons/tb";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export default function Chat() {
  const [message, setMessage] = useState<string>('');
  const { activeConversation, user } = useChatStore();
  const { data: messages, error, mutate } = useSWR(activeConversation ? `http://localhost:3005/messages/${activeConversation.id}` : null, fetcher, {
    refreshInterval: 5000,
  });
  console.log(mutate);


  useEffect(() => {
    (async function () {
      if (!activeConversation) return;
    })();

  }, [activeConversation]);

  const handleAddMessage = async(ev: SyntheticEvent<HTMLFormElement>) => {
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
        "Content-Type": "application/json"
      },
      body: JSON.stringify(msg)
    });
    const newMsg = await res.json();

    mutate([...messages, [...messages, newMsg]]);
  }

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
        <form className="flex gap-x-3" action="" onSubmit={handleAddMessage}>
          <textarea
            className="w-full resize-none rounded-md border p-2 pr-6"
            id="search"
            name="search"
            placeholder="Your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={2}
          ></textarea>
          <button disabled={!activeConversation} className="rounded-lg bg-blue-400 py-3 px-5 text-white">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
