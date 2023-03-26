import { Conversation } from "@/types/conversation";
import { User } from "@/types/user";

// function mapConversationsUser({conversations, users}:{ conversations: Conversation[], users: User[]}) {
//   const draft = conversations.map((c) => {
//     const user = users.find((u) => u.id == c.senderId ? );

//     return {
//       ...c,
//       user,
//     };
//   });

//   return draft;
// }

function timestampToDate(timestamp: number) {
  const draft = new Date(timestamp * 1000);

  return draft;
}

export { timestampToDate};
