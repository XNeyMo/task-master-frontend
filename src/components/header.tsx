import { useAuth } from "../context/auth";

interface HeaderProps {
  createTask: () => void;
}

export default function Header({ createTask }: HeaderProps) {
  const { user } = useAuth();

  return (
    <header className="flex font-bold bg-eminence-900 text-eminence-100 items-center justify-between px-16 py-5">
      <a className="tracking-widest text-xl" href="/">Task Manager</a>

      <div className="flex justify-between items-center gap-10">
        <button onClick={createTask}>+ Add Task</button>
        <button className="">{user.username}</button>
      </div>
    </header>
  );
}
