import { useAuth } from "../context/auth";

interface HeaderProps {
  createTask: () => void;
}

export default function Header({ createTask }: HeaderProps) {
  const { user } = useAuth();

  return (
    <header className="flex font-bold bg-eminence-600 text-eminence-100 items-center justify-between px-16 py-5">
      <a className="tracking-widest text-xl" href="/">Task Manager</a>

      <div className="flex justify-between items-center gap-10">
        <button className="hover:bg-eminence-50 border-2 border-eminence-50 p-2 rounded-full text-2xl ease-in-out duration-500 hover:text-eminence-600 text-eminence-50" onClick={createTask}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
        </button>
        <p>{user.username}</p>
      </div>
    </header>
  );
}
