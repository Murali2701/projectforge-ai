function ActivityPanel() {

    const activities = [
        "Generated Food Delivery App",
        "Generated Student Management System",
        "Deleted Java Full Stack Project",
        "Logged in successfully"
    ];

    return (

        <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-800/80 p-6 shadow-xl">

            <h2 className="text-2xl font-bold mb-6 tracking-tight">
                Recent Activity
            </h2>

            <div className="relative border-l border-slate-800/80 pl-5 ml-2.5 space-y-6 my-2">

                {activities.map((item, index) => (

                    <div
                        key={index}
                        className="relative flex items-center gap-3 text-slate-300 hover:text-white transition-colors duration-200"
                    >
                        <span className="absolute -left-[26px] bg-[#121212] rounded-full p-0.5 border border-slate-800">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full block" />
                        </span>

                        <div className="text-sm font-medium leading-relaxed">
                            {item}
                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default ActivityPanel;