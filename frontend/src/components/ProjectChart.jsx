import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

function ProjectChart({ projects }) {

    const data = projects.map((project, index) => ({
        name: `P${index + 1}`,
        projects: index + 1
    }));

    return (

        <div className="p-5 bg-slate-950/40 border border-slate-800/80 rounded-2xl">

            <h3 className="text-lg font-semibold text-slate-300 mb-4">
                Project Growth
            </h3>

            <ResponsiveContainer width="100%" height={260}>

                <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>

                    <CartesianGrid stroke="#2A2A2A" strokeDasharray="3 3" vertical={false} />

                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} />

                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} />

                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#1E1E1E',
                            borderColor: '#2D2D2D',
                            borderRadius: '12px',
                            color: '#fff',
                            fontSize: '12px',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
                        }}
                    />

                    <Line
                        type="monotone"
                        dataKey="projects"
                        stroke="#a855f7"
                        strokeWidth={3}
                        dot={{ fill: '#a855f7', r: 4, strokeWidth: 0 }}
                        activeDot={{ r: 6, strokeWidth: 0 }}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    );

}

export default ProjectChart;