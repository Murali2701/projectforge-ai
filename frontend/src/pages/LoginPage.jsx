import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login as loginUser } from "../services/authService";
import { useAuth } from "../content/AuthContext";
import { IoMail, IoLockClosed } from "react-icons/io5";

function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await loginUser({
                email: email.trim().toLowerCase(),
                password,
            });
            login(response.token);
            navigate("/dashboard");
        } catch (err) {
            console.error(err);
            alert(
                err.response?.data?.message ||
                "Invalid Email or Password"
            );
        }
    };

    return (
        <div className="min-h-screen bg-[#121212] flex items-center justify-center p-4 md:p-10 font-sans relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 z-0">
                {/* Subtle Dotted Grid Pattern */}
                <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.03)_1.5px,transparent_1.5px)] [background-size:28px_28px]"></div>
                
                {/* Ambient Dark Blurs */}
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-slate-800/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-slate-700/10 rounded-full blur-[120px]"></div>
                
                {/* Center Halo behind the card */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-slate-500/5 rounded-full blur-[140px] pointer-events-none"></div>
            </div>

            <div className="w-full max-w-5xl bg-[#1E1E1E] rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)] flex flex-col md:flex-row min-h-[600px] border border-[#2D2D2D] z-10 relative">
                
                {/* Left Side: Graphic, Deep Black background & Features Info */}
                <div className="w-full md:w-1/2 bg-[#0A0A0A] p-12 text-white flex flex-col justify-between relative overflow-hidden border-r border-[#2D2D2D]">
                    
                    {/* Glowing background shapes */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16"></div>
                    <div className="absolute top-1/3 left-10 w-32 h-32 bg-slate-800/20 rounded-full blur-xl"></div>
                    
                    {/* Floating diagonal capsule elements in grey shades */}
                    <div className="absolute bottom-0 left-0 w-full h-1/2 pointer-events-none overflow-hidden opacity-30">
                        <div className="absolute bottom-[-20px] left-5 w-48 h-10 bg-[#1E1E1E] rounded-full rotate-[35deg] transform origin-bottom-left border border-[#2D2D2D]/35"></div>
                        <div className="absolute bottom-[-10px] left-16 w-64 h-14 bg-[#2D2D2D]/40 rounded-full rotate-[35deg] transform origin-bottom-left border border-[#2D2D2D]/50"></div>
                        <div className="absolute bottom-10 left-32 w-32 h-6 bg-[#1E1E1E]/80 rounded-full rotate-[35deg] transform origin-bottom-left border border-[#2D2D2D]/20"></div>
                        <div className="absolute bottom-[-40px] left-40 w-44 h-8 bg-[#2D2D2D]/20 rounded-full rotate-[35deg] transform origin-bottom-left"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 my-auto space-y-6">
                        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                            Welcome to ProjectForge
                        </h1>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                            Accelerate your software engineering lifecycle. Generate comprehensive blueprints, database schemas, and REST APIs instantly with Google Gemini.
                        </p>
                        
                        <div className="space-y-3 pt-4 text-xs font-semibold text-slate-300">
                            <div className="flex items-center gap-2">
                                <span className="p-1 rounded bg-[#1E1E1E] border border-[#2D2D2D]">📄</span> Requirement Blueprints
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="p-1 rounded bg-[#1E1E1E] border border-[#2D2D2D]">🗄️</span> Database Schemas (MySQL)
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="p-1 rounded bg-[#1E1E1E] border border-[#2D2D2D]">🌐</span> REST API Specifications
                            </div>
                        </div>
                    </div>

                    <div className="text-[10px] text-slate-500 tracking-wider relative z-10">
                        POWERED BY GEMINI AI • v2.4.0
                    </div>
                </div>

                {/* Right Side: Form in Dark Grey background */}
                <div className="w-full md:w-1/2 p-12 flex flex-col justify-center bg-[#1E1E1E] text-slate-200">
                    <div className="w-full max-w-sm mx-auto">
                        
                        <div className="text-center mb-8">
                            <h2 className="text-sm font-bold tracking-widest text-slate-300 uppercase mb-2">
                                User Login
                            </h2>
                            <p className="text-xs text-slate-500">
                                Enter details to access your workspace
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Email Input */}
                            <div className="space-y-1">
                                <div className="relative flex items-center bg-[#0A0A0A] border border-[#2D2D2D] focus-within:border-slate-500 rounded-full px-5 py-3.5 transition-all">
                                    <span className="text-slate-500 mr-3">
                                        <IoMail size={16} />
                                    </span>
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        className="bg-transparent border-none outline-none w-full text-white placeholder:text-slate-600 text-sm"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div className="space-y-1">
                                <div className="relative flex items-center bg-[#0A0A0A] border border-[#2D2D2D] focus-within:border-slate-500 rounded-full px-5 py-3.5 transition-all">
                                    <span className="text-slate-500 mr-3">
                                        <IoLockClosed size={16} />
                                    </span>
                                    <input
                                        type="password"
                                        placeholder="Security Key / Password"
                                        className="bg-transparent border-none outline-none w-full text-white placeholder:text-slate-600 text-sm"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Remember / Forgot password links */}
                            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                                <label className="flex items-center gap-2 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="accent-slate-600 rounded bg-[#0A0A0A] border-[#2D2D2D]"
                                    />
                                    Remember me
                                </label>
                                <a href="#" className="hover:text-white hover:underline transition-colors font-medium text-slate-400">
                                    Forgot password?
                                </a>
                            </div>

                            {/* Action Submit button - Premium white button */}
                            <button
                                type="submit"
                                className="w-full py-4 mt-2 bg-slate-100 hover:bg-white text-[#121212] rounded-full font-bold text-sm tracking-wider shadow-lg active:scale-[0.98] transition-all cursor-pointer text-center"
                            >
                                LOGIN
                            </button>
                        </form>

                        <div className="text-center mt-8">
                            <p className="text-xs text-slate-500">
                                Don't have an account?{" "}
                                <Link to="/register" className="text-slate-300 font-bold hover:text-white hover:underline ml-1">
                                    Register
                                </Link>
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default LoginPage;