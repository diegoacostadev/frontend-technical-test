import { Conversation } from "@/types/conversation";
import { Message } from "@/types/message";

export default function MessagesLists({ messages, user }: { messages: Message[], user: number }) {
  console.log(messages);

  return (
    <ul className="flex flex-col">
      {messages?.map((m, idx) => (
        <li key={m.id} className={`${idx > 0 ? 'mt-2' : ''} flex `}>
          <div className={`p-3 rounded-xl ${user == m.authorId ? 'bg-blue-200 ml-auto' : 'bg-slate-200'}`}>
            <p className="text-sm text-gray-700">
              {m.body}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}
