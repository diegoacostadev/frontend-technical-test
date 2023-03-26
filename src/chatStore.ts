import {create} from "zustand";
import {devtools} from "zustand/middleware";

import {Conversation} from "@/types/conversation";

interface ChatState {
  user: number | null;
  conversations: Conversation[];
  activeConversation: Conversation | null;
  filteredConversations: Conversation[];

  filterConversations: (key: string) => void;
  setActiveConversation: (id: number) => void;
  addConversation: (c: Conversation) => void;
  setUser: (u: number) => void;
  setConversations: (c: Conversation[]) => void;
}

export const useChatStore = create<ChatState>()(
  devtools(
    (set, get) => ({
      user: null,
      conversations: [],
      filteredConversations: [],
      activeConversation: null,

      filterConversations: (key) => {
        const conv = get().conversations;
        const k = key.toLowerCase();
        const filtered = conv.filter(
          (c) =>
            c.recipientNickname.toLowerCase().includes(k) ||
            c.senderNickname.toLowerCase().includes(k),
        );

        set({filteredConversations: filtered});
      },
      setActiveConversation: (id) => {
        const active = get().conversations.find((c) => c.id == id);

        set({activeConversation: active});
      },
      addConversation: (c) => {
        set({conversations: [c, ...get().conversations]});
      },
      setUser: (user) => set({user}),
      setConversations: (conversations) => {
        set({conversations});
        set({filteredConversations: conversations});
      },
    }),
    {
      name: "chat-storage",
    },
  ),
);
