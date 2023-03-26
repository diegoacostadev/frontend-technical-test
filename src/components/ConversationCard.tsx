import {useChatStore} from "@/chatStore";
import {Conversation} from "@/types/conversation";

export default function ConversationCard({
  conversation,
  user,
}: {
  conversation: Conversation;
  user: number;
}) {
  const {setActiveConversation} = useChatStore();

  const cDate = new Date(Date.now() - conversation.lastMessageTimestamp);
  const avatar =
    user == conversation.senderId ? conversation.recipientNickname : conversation.senderNickname;

  const dateString = cDate.toLocaleDateString("es-UY", {
    month: "short",
    day: "numeric",
    year: "2-digit",
  });

  return (
    <button onClick={() => setActiveConversation(conversation.id)}>
      <article className="flex items-center gap-x-4 border-b px-4 py-3 text-left">
        <div className="grid h-9 w-9 shrink-0 basis-9 place-content-center rounded-full bg-orange-400">
          <span>{avatar.slice(0, 1)}</span>
        </div>
        <div className="grow">
          <div className="mb-1 flex items-center justify-between">
            <h3 className="mb-0 font-bold">{avatar}</h3>
            <span className="text-xs text-gray-800">{dateString}</span>
          </div>
          <span className="block text-xs text-gray-400 line-clamp-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, eveniet nihil, eaque quam
            dolores fugiat nesciunt accusantium deleniti quae architecto ullam, culpa repellat
            repellendus quisquam. Provident distinctio exercitationem cupiditate nisi?
          </span>
        </div>
      </article>
    </button>
  );
}
