import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import StatCard from "../components/StatCard";
import QuickActions from "../components/QuickActions";
import ActivityPanel from "../components/ActivityPanel";
import ProjectChart from "../components/ProjectChart";
import TechStackChart from "../components/TechStackChart";
import ChatWidget from "../components/chat/ChatWidget";
import { Link } from "react-router-dom";

import {
    FaFolderOpen,
    FaRobot,
    FaDatabase,
    FaCode
} from "react-icons/fa";

import { getProjects } from "../services/projectService";

function Dashboard() {

    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    const [search, setSearch] = useState("");

    const loadProjects = async () => {
        try {
            const data = await getProjects();
            setProjects(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadProjects();
    }, []);

    const filteredProjects = projects.filter((project) =>
        project.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <div className="min-h-screen bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col md:flex-row">

                <Sidebar />

                <div className="flex-1 p-4 md:p-8 overflow-x-hidden">

                    {/* Header */}

                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:via-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
                        Welcome to ProjectForge AI
                    </h1>

                    <p className="text-slate-400 mt-3 text-base md:text-lg font-medium">
                        Your AI-powered software engineering workspace.
                    </p>

                    {/* Search */}

                    <div className="mt-8">
                        <SearchBar
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {/* Statistics */}

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

                        <StatCard
                            title="Projects"
                            value={projects.length}
                            icon={<FaFolderOpen />}
                            color="text-purple-500"
                        />

                        <StatCard
                            title="Blueprints"
                            value={projects.length}
                            icon={<FaRobot />}
                            color="text-green-500"
                        />

                        <StatCard
                            title="Tech Stacks"
                            value={
                                new Set(
                                    projects.flatMap(project =>
                                        project.techStack
                                            ? project.techStack.split(",").map(t => t.trim())
                                            : []
                                    )
                                ).size
                            }
                            icon={<FaDatabase />}
                            color="text-purple-500"
                        />

                        <StatCard
                            title="AI Requests"
                            value="127"
                            icon={<FaCode />}
                            color="text-yellow-500"
                        />

                    </div>

                    {/* Main Content */}

                    <div className="grid lg:grid-cols-3 gap-8 mt-10">

                        {/* Left Side */}

                        <div className="lg:col-span-2">

                            <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-800/80 p-6 shadow-xl">

                                <div className="flex justify-between items-center">

                                    <h2 className="text-3xl font-bold tracking-tight">
                                        Recent Projects
                                    </h2>

                                    <Link
                                        to="/projects/create"
                                        className="btn-primary px-5 py-3 font-semibold"
                                    >
                                        Create Project
                                    </Link>

                                </div>

                                {/* Charts */}

                                <div className="grid lg:grid-cols-2 gap-8 mt-8">

                                    <ProjectChart
                                        projects={projects}
                                    />

                                    <TechStackChart
                                        projects={projects}
                                    />

                                </div>

                                {/* Project List */}

                                <div className="space-y-5 mt-8">

                                    {filteredProjects.length === 0 ? (

                                        <p className="text-slate-400">
                                            No Projects Found
                                        </p>

                                    ) : (

                                        filteredProjects.map((project) => (

                                            <div
                                                key={project.id}
                                                className="bg-slate-800/40 hover:bg-slate-800/80 rounded-xl p-5 border border-slate-800/60 hover:border-purple-500/50 transition-all duration-300 shadow-md"
                                            >

                                                <h3 className="text-2xl font-semibold">
                                                    {project.title}
                                                </h3>

                                                <p className="text-slate-400 mt-2 text-sm leading-relaxed">
                                                    {project.description.substring(0, 150)}...
                                                </p>

                                                <div className="flex justify-between items-center mt-5">

                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-cyan-400/10 text-cyan-400 border border-cyan-400/20">
                                                        {project.techStack}
                                                    </span>

                                                    <button
                                                        onClick={() =>
                                                            navigate(`/projects/${project.id}`)
                                                        }
                                                        className="btn-primary px-4 py-2"
                                                    >
                                                        View
                                                    </button>

                                                </div>

                                            </div>

                                        ))

                                    )}

                                </div>

                            </div>

                        </div>

                        {/* Right Side */}

                        <div className="space-y-8">

                            <QuickActions />

                            <ActivityPanel />

                        </div>

                    </div>

                </div>

            </div>

            {/* AI Chat Widget */}

            <ChatWidget />

        </>
    );
}

export default Dashboard;