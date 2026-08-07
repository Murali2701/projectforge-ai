import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../content/AuthContext";
import { IoLogOutOutline } from "react-icons/io5";

function Sidebar() {

    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();

    const menus = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Generate Project", path: "/" },
    { name: "My Projects", path: "/projects" },
    { name: "Profile", path: "/profile" }
        ];

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="w-full md:w-64 min-h-0 md:min-h-screen bg-sidebar-bg border-b md:border-b-0 md:border-r border-slate-800 flex flex-col justify-between">

            <div className="flex flex-col">
                <div className="text-2xl md:text-3xl font-bold text-purple-400 p-4 md:p-8 text-center md:text-left">
                    🚀 ProjectForge AI
                </div>

                <div className="flex flex-row md:flex-col gap-1 md:gap-2 px-2 md:px-4 pb-4 md:pb-8 overflow-x-auto md:overflow-x-visible">

                    {menus.map(menu => (

                        <Link
                            key={menu.name}
                            to={menu.path}
                            className={`relative px-4 md:pl-8 md:pr-4 py-2 md:py-3.5 rounded-xl font-medium transition-all duration-200 flex items-center gap-3 whitespace-nowrap text-sm md:text-base ${
                                location.pathname === menu.path
                                    ? "bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-lg shadow-purple-500/5"
                                    : "text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent"
                            }`}
                        >
                            {location.pathname === menu.path && (
                                <span className="hidden md:block absolute left-3.5 w-1.5 h-5 bg-purple-500 rounded-full" />
                            )}
                            {menu.name}
                        </Link>

                    ))}

                </div>
            </div>

            <div className="px-2 md:px-4 pb-4 md:pb-8 flex flex-row md:flex-col">
                <button
                    onClick={handleLogout}
                    className="w-full px-4 md:pl-8 md:pr-4 py-2 md:py-3.5 rounded-xl font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-transparent transition-all duration-200 flex items-center gap-3 whitespace-nowrap text-sm md:text-base cursor-pointer mt-2"
                >
                    <IoLogOutOutline size={18} />
                    Logout
                </button>
            </div>

        </div>
    );
}

export default Sidebar;