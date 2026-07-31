import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-8 py-5 border-b border-slate-800 bg-slate-950">
      <Link to="/dashboard" className="text-2xl font-bold text-purple-400 hover:text-purple-300 transition">
        🚀 ProjectForge AI
      </Link>

      <div className="flex gap-6 text-slate-300 items-center">
        <Link to="/dashboard" className="cursor-pointer hover:text-white transition">
          Dashboard
        </Link>
        <Link to="/projects" className="cursor-pointer hover:text-white transition">
          My Projects
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;