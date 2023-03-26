import { useChatStore } from "@/chatStore";
import Chat from "@/components/Chat";
import ConversationCard from "@/components/ConversationCard";
import Sidebar from "@/components/Sidebar";
import { Conversation } from "@/types/conversation";
import { getLoggedUserId } from "@/utils/getLoggedUserId";
import { GetServerSideProps } from "next";
import { useEffect } from "react";

const Home = ({
  conversations,
  user,
}: {
  conversations: Conversation[];
  user: number;
}) => {
  const { setUser, setConversations, filteredConversations} = useChatStore();

  useEffect(() => {
    setUser(user);
    setConversations(conversations);
  }, []);

  return (
    <section className="grid grow grid-cols-12 overflow-hidden">
      <div className="col-span-4 flex flex-col overflow-hidden border-r">
        <Sidebar>
          <ul className="mb-0 p-0 flex flex-col">
            {filteredConversations.map((c, idx) => (
              <li
                key={c.id}
              >
                <ConversationCard conversation={c} user={user} />
              </li>
            ))}
          </ul>
        </Sidebar>
      </div>
      <main className="col-span-8 flex flex-col">
        <Chat />
      </main>
    </section>
  );
};

export default Home;

// revalidation is enabled and a new request comes in
export const getServerSideProps: GetServerSideProps = async () => {
  const user = getLoggedUserId();
  const res = await fetch(`http://localhost:3005/conversations/${user}`);
  const conversations = await res.json();

  return {
    props: {
      conversations,
      user,
    },
  };
};
