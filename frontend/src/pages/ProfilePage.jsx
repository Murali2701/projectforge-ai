import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProfile, updateProfile } from "../services/profileService";
import { getProjects } from "../services/projectService";
import Sidebar from "../components/Sidebar";
import { 
    IoPerson, IoMail, IoShieldCheckmark, IoKey, IoTime, 
    IoDownload, IoDocumentText, 
    IoCodeWorking, IoSparkles 
} from "react-icons/io5";

function ProfilePage() {
    const [profile, setProfile] = useState(null);
    const [projects, setProjects] = useState([]);
    
    // Form fields
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(true);
    
    // Custom settings states
    const [avatar, setAvatar] = useState(null);
    const [skills, setSkills] = useState(["React", "Node.js", "Java", "Spring Boot", "MySQL", "Tailwind CSS"]);
    const [newSkill, setNewSkill] = useState("");
    const [githubConnected] = useState(true);
    const [linkedinConnected] = useState(false);
    
    // Notifications State
    const [notifyBlueprints] = useState(true);
    const [notifySummaries] = useState(true);
    
    // Passwords State
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const loadData = async () => {
        try {
            const profileData = await getProfile();
            setProfile(profileData);
            setName(profileData.name);
            setRole(profileData.role || "Software Architect");
            
            const projectsData = await getProjects();
            setProjects(projectsData);
        } catch (err) {
            console.error(err);
            alert("Unable to load profile data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadData();
    }, []);

    const saveProfile = async () => {
        try {
            const data = await updateProfile(name);
            setProfile(data);
            alert("Profile updated successfully.");
        } catch (err) {
            console.error(err);
            alert("Update failed.");
        }
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("New passwords do not match!");
            return;
        }
        if (!currentPassword || !newPassword) {
            alert("Please fill in all password fields.");
            return;
        }
        alert("Password updated successfully.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    const addSkill = (e) => {
        e.preventDefault();
        if (newSkill.trim() && !skills.includes(newSkill.trim())) {
            setSkills([...skills, newSkill.trim()]);
            setNewSkill("");
        }
    };

    const removeSkill = (skillToRemove) => {
        setSkills(skills.filter(s => s !== skillToRemove));
    };

    const handleAvatarUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(URL.createObjectURL(file));
        }
    };

    const exportProfileJSON = () => {
        const exportData = {
            profile: {
                name: profile?.name,
                email: profile?.email,
                role: profile?.role,
                createdDate: "August 2024",
            },
            skills,
            connectedAccounts: {
                github: githubConnected,
                linkedin: linkedinConnected
            },
            notifications: {
                emailBlueprints: notifyBlueprints,
                weeklySummaries: notifySummaries
            },
            stats: {
                projectsCreated: projects.length,
                aiConversations: 18,
                blueprintsGenerated: 12,
                apisDesigned: 8,
                schemasCreated: 9
            }
        };

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `projectforge_profile_${profile?.name.replace(/\s+/g, '_')}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
    };

    const triggerPrint = () => {
        window.print();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    const getInitials = (fullName) => {
        if (!fullName) return "U";
        const parts = fullName.split(" ");
        if (parts.length > 1) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return parts[0].substring(0, 2).toUpperCase();
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
            <Sidebar />

            <div className="flex-1 p-4 md:p-8 overflow-y-auto max-w-6xl mx-auto space-y-8 overflow-x-hidden w-full">
                
                {/* Header Welcome banner with export actions */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:via-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
                            My Profile Hub
                        </h1>
                        <p className="text-slate-400 mt-2">
                            Manage credentials, monitor platform usage metrics, and audit active sessions.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={exportProfileJSON}
                            className="btn-secondary flex items-center gap-2 px-4 py-2.5 text-xs font-semibold"
                            title="Export details as JSON"
                        >
                            <IoDownload size={14} />
                            Export Data
                        </button>
                        <button
                            onClick={triggerPrint}
                            className="btn-primary flex items-center gap-2 px-4 py-2.5 text-xs font-semibold cursor-pointer"
                            title="Print workspace summary report"
                        >
                            <IoDocumentText size={14} />
                            Generate Summary Report
                        </button>
                    </div>
                </div>

                {/* Primary Layout Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left Column: Avatar details, Technical skills, Settings */}
                    <div className="lg:col-span-1 space-y-8">
                        
                        {/* Profile Info Summary Card */}
                        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 text-center shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 to-indigo-500"></div>
                            
                            {/* Avatar dropzone with local URL state */}
                            <div className="relative inline-block mx-auto mt-4 mb-4 group">
                                {avatar ? (
                                    <img 
                                        src={avatar} 
                                        alt="Avatar" 
                                        className="w-24 h-24 rounded-full object-cover border border-slate-800 shadow-inner"
                                    />
                                ) : (
                                    <div className="w-24 h-24 bg-gradient-to-tr from-purple-600 to-indigo-500 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-inner">
                                        {getInitials(name)}
                                    </div>
                                )}
                                
                                <label className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer text-[10px] text-white font-bold select-none">
                                    Upload
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={handleAvatarUpload} 
                                        className="hidden"
                                    />
                                </label>
                                
                                <span className="absolute bottom-0.5 right-1.5 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
                            </div>

                            <h3 className="text-xl font-bold truncate text-slate-900 dark:text-white">{name}</h3>
                            <p className="text-slate-500 text-xs mt-1 uppercase tracking-widest">{role}</p>
                            <p className="text-slate-600 text-[10px] mt-2 font-mono">Member since August 2024</p>

                            <div className="mt-6 pt-6 border-t border-slate-800 text-left space-y-4">
                                <div className="flex items-center justify-between text-xs text-slate-400">
                                    <span>Plan Tier</span>
                                    <span className="bg-indigo-600/10 text-indigo-400 px-2 py-0.5 rounded-full border border-indigo-500/20 text-[10px] font-bold">
                                        ENTERPRISE ADMIN
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-xs text-slate-400">
                                    <span>System Status</span>
                                    <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Technical Skills Card */}
                        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-lg space-y-4">
                            <h3 className="text-base font-bold flex items-center gap-2 border-b border-slate-800 pb-3 text-slate-200">
                                <IoCodeWorking className="text-purple-400" />
                                Technical Skills
                            </h3>

                            {/* Tags list */}
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, index) => (
                                    <span 
                                        key={index}
                                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 border border-slate-800 text-slate-300"
                                    >
                                        {skill}
                                        <button 
                                            onClick={() => removeSkill(skill)}
                                            className="hover:text-red-400 transition-colors text-[10px] ml-1 cursor-pointer font-bold"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>

                            {/* Add Tag Form */}
                            <form onSubmit={addSkill} className="flex gap-2 pt-2">
                                <input
                                    type="text"
                                    placeholder="Add skill tag..."
                                    value={newSkill}
                                    onChange={(e) => setNewSkill(e.target.value)}
                                    className="flex-1 bg-slate-950 border border-slate-800 focus:border-slate-650 rounded-lg px-3 py-2 text-xs text-white outline-none"
                                />
                                <button
                                    type="submit"
                                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg border border-slate-800 cursor-pointer"
                                >
                                    Add
                                </button>
                            </form>
                        </div>

                    </div>

                    {/* Right Column: Usage metrics grid, credentials update form, timelines, security config */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* Engagement & platform Usage statistics */}
                        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-lg">
                            <h3 className="text-base font-bold flex items-center gap-2 border-b border-slate-800 pb-3 text-slate-200 mb-5">
                                <IoSparkles className="text-indigo-400" />
                                Platform Engagement Metrics
                            </h3>
                            
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
                                    <span className="block text-2xl font-bold text-slate-900 dark:text-white">{projects.length}</span>
                                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block mt-1">Projects</span>
                                </div>
                                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
                                    <span className="block text-2xl font-bold text-slate-900 dark:text-white">18</span>
                                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block mt-1">AI Chats</span>
                                </div>
                                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
                                    <span className="block text-2xl font-bold text-slate-900 dark:text-white">12</span>
                                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block mt-1">Blueprints</span>
                                </div>
                                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
                                    <span className="block text-2xl font-bold text-slate-900 dark:text-white">8</span>
                                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block mt-1">REST APIs</span>
                                </div>
                                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
                                    <span className="block text-2xl font-bold text-slate-900 dark:text-white">9</span>
                                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block mt-1">Schemas</span>
                                </div>
                            </div>
                        </div>

                        {/* Personal Credentials form */}
                        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 shadow-lg">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-200">
                                <IoPerson className="text-purple-400" />
                                Personal Credentials
                            </h3>

                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full bg-slate-950 border border-slate-800 focus:border-slate-500 rounded-xl p-3.5 text-slate-900 dark:text-white outline-none focus:ring-1 focus:ring-slate-500/20 transition-all text-sm font-medium"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                                            Role / Position
                                        </label>
                                        <input
                                            type="text"
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                            className="w-full bg-slate-950 border border-slate-800 focus:border-slate-500 rounded-xl p-3.5 text-slate-900 dark:text-white outline-none focus:ring-1 focus:ring-slate-500/20 transition-all text-sm font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                                            Email Address
                                        </label>
                                        <div className="relative flex items-center bg-slate-950/50 border border-slate-800/60 rounded-xl p-3.5 text-slate-400 opacity-60 text-sm">
                                            <IoMail className="mr-2 text-slate-500" />
                                            <span>{profile?.email}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                                            Authority Level
                                        </label>
                                        <div className="relative flex items-center bg-slate-950/50 border border-slate-800/60 rounded-xl p-3.5 text-slate-400 opacity-60 text-sm">
                                            <IoShieldCheckmark className="mr-2 text-slate-500" />
                                            <span>{profile?.role.toUpperCase()}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <button
                                        onClick={saveProfile}
                                        className="btn-primary px-6 py-3 font-semibold text-sm cursor-pointer"
                                    >
                                        Save Profile Changes
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Recent Projects for Quick Navigation */}
                        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-lg">
                            <h3 className="text-base font-bold flex items-center gap-2 border-b border-slate-800 pb-3 text-slate-200 mb-4">
                                <IoDocumentText className="text-indigo-400" />
                                Recent Workspaces
                            </h3>

                            {projects.length === 0 ? (
                                <p className="text-xs text-slate-500 p-2">No generated workspaces found.</p>
                            ) : (
                                <div className="grid md:grid-cols-2 gap-4">
                                    {projects.slice(0, 2).map((project) => (
                                        <div 
                                            key={project.id}
                                            className="bg-slate-950 border border-slate-800 hover:border-slate-500/50 p-4 rounded-xl transition-all"
                                        >
                                            <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">{project.title}</h4>
                                            <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">{project.description}</p>
                                            <div className="mt-4 flex items-center justify-between">
                                                <span className="text-[10px] font-semibold text-cyan-400/90 bg-cyan-400/5 px-2 py-0.5 rounded border border-cyan-400/10">
                                                    {project.techStack}
                                                </span>
                                                <Link 
                                                    to={`/projects/${project.id}`} 
                                                    className="text-xs text-indigo-400 font-bold hover:underline"
                                                >
                                                    Open →
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Password Management */}
                        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 shadow-lg">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-200">
                                <IoKey className="text-purple-400" />
                                Security & Password Configuration
                            </h3>

                            <form onSubmit={handlePasswordChange} className="space-y-5">
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                                            Current Security Key
                                        </label>
                                        <input
                                            type="password"
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            className="w-full bg-slate-950 border border-slate-800 focus:border-slate-500 rounded-xl p-3.5 text-slate-900 dark:text-white outline-none focus:ring-1 focus:ring-slate-500/20 text-xs font-medium"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                                            New Security Key
                                        </label>
                                        <input
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="w-full bg-slate-950 border border-slate-800 focus:border-slate-500 rounded-xl p-3.5 text-slate-900 dark:text-white outline-none focus:ring-1 focus:ring-slate-500/20 text-xs font-medium"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                                            Confirm New Key
                                        </label>
                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full bg-slate-950 border border-slate-800 focus:border-slate-500 rounded-xl p-3.5 text-slate-900 dark:text-white outline-none focus:ring-1 focus:ring-slate-500/20 text-xs font-medium"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        className="btn-secondary px-6 py-3 font-semibold text-xs border border-slate-800 hover:bg-slate-800 cursor-pointer"
                                    >
                                        Change Password
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Recent Activity Timeline */}
                        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 shadow-lg">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-200">
                                <IoTime className="text-purple-400" />
                                Recent Activity History
                            </h3>

                            <div className="relative border-l border-slate-800 pl-5 ml-2.5 space-y-6 my-2">
                                <div className="relative flex items-center gap-3 text-slate-300">
                                    <span className="absolute -left-[26px] bg-slate-900 rounded-full p-0.5 border border-slate-800">
                                        <span className="w-2 h-2 bg-purple-500 rounded-full block"></span>
                                    </span>
                                    <div className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                                        <span className="font-semibold text-slate-900 dark:text-white">Profile updated:</span> Changed authority credentials and role descriptions.
                                        <span className="block text-[10px] text-slate-500 mt-0.5">Today at 2:15 PM</span>
                                    </div>
                                </div>
                                <div className="relative flex items-center gap-3 text-slate-300">
                                    <span className="absolute -left-[26px] bg-slate-900 rounded-full p-0.5 border border-slate-800">
                                        <span className="w-2 h-2 bg-indigo-500 rounded-full block"></span>
                                    </span>
                                    <div className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                                        <span className="font-semibold text-slate-900 dark:text-white">Generated blueprint:</span> Restored security configs with advanced Spring annotations.
                                        <span className="block text-[10px] text-slate-500 mt-0.5">Yesterday at 11:34 AM</span>
                                    </div>
                                </div>
                                <div className="relative flex items-center gap-3 text-slate-300">
                                    <span className="absolute -left-[26px] bg-slate-900 rounded-full p-0.5 border border-slate-800">
                                        <span className="w-2 h-2 bg-slate-500 rounded-full block"></span>
                                    </span>
                                    <div className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                                        <span className="font-semibold text-slate-900 dark:text-white">Session logged:</span> Successful authentication from Windows Chrome client.
                                        <span className="block text-[10px] text-slate-500 mt-0.5">3 days ago</span>
                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>

                </div>
            </div>
        </div>
    );
}

export default ProfilePage;