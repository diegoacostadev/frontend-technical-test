export default function Header() {
  const year = new Date().getFullYear();

  return (
    <header className="flex justify-between bg-slate-900 px-8 py-6 text-white">
      <h1 className="text-xl font-bold">LebonChat</h1>
      <b>{year}</b>
    </header>
  );
}
