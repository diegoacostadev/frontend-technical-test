import {CiSearch} from "react-icons/ci";

import {useChatStore} from "@/chatStore";

export default function SearchBox() {
  const {filterConversations} = useChatStore();

  return (
    <form action="">
      <div className="relative">
        <input
          className="w-full rounded-md border p-2 pr-6"
          id="search"
          name="search"
          placeholder="Find by..."
          type="text"
          onChange={(e) => filterConversations(e.target.value)}
        />
        <CiSearch className="absolute top-1/2 right-2 h-6 w-6 -translate-y-1/2 text-gray-400" />
      </div>
    </form>
  );
}
