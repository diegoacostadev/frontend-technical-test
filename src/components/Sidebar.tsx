import SearchBox from "@/components/SearchBox";

export default function Sidebar({children}) {
  return (
    <aside className="flex grow flex-col overflow-hidden pt-4">
      <div className="border-b px-3 pb-4">
        <SearchBox />
      </div>
      <div className="flex grow flex-col overflow-y-auto">{children}</div>
    </aside>
  );
}
