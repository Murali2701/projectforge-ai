function StatCard({ icon, title, value, color }) {
    return (
        <div
            className="bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-800/80
                       hover:border-purple-500/50 transition-all duration-300
                       hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/5 p-6"
        >
            <div className="flex items-center justify-between">

                <div>

                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                        {title}
                    </p>

                    <h2 className="text-4xl font-extrabold mt-2.5 tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                        {value}
                    </h2>

                </div>

                <div
                    className={`text-2xl p-4 rounded-xl bg-slate-800/80 border border-slate-700/40 ${color}`}
                >
                    {icon}
                </div>

            </div>
        </div>
    );
}

export default StatCard;