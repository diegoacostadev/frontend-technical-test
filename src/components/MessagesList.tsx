import {Message} from "@/types/message";

export default function MessagesLists({messages, user}: {messages: Message[]; user: number}) {
  return (
    <ul className="flex flex-col">
      {messages?.map((m, idx) => (
        <li key={m.id} className={`${idx > 0 ? "mt-2" : ""} flex `}>
          <div
            className={`rounded-xl p-3 ${
              user == m.authorId ? "ml-auto bg-blue-200" : "bg-slate-200"
            }`}
          >
            <p className="text-sm text-gray-700">{m.body}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
