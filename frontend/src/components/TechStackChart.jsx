import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const COLORS = [
    "#a855f7",
    "#10b981",
    "#8b5cf6",
    "#f59e0b",
    "#ef4444"
];

function TechStackChart({ projects }) {

    const map = {};

    projects.forEach(project => {

        project.techStack.split(",")

            .map(t => t.trim())

            .forEach(stack => {

                map[stack] = (map[stack] || 0) + 1;

            });

    });

    const data = Object.keys(map).map(key => ({

        name: key,

        value: map[key]

    }));

    return (

        <div className="p-5 bg-slate-950/40 border border-slate-800/80 rounded-2xl">

            <h3 className="text-lg font-semibold text-slate-300 mb-4">
                Tech Stack Usage
            </h3>

            <ResponsiveContainer width="100%" height={260}>

                <PieChart>

                    <Pie

                        data={data}

                        dataKey="value"

                        nameKey="name"

                        innerRadius={55}

                        outerRadius={85}

                        paddingAngle={3}

                    >

                        {

                            data.map((entry,index)=>

                                <Cell

                                    key={index}

                                    fill={COLORS[index % COLORS.length]}

                                />

                            )

                        }

                    </Pie>

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

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

}

export default TechStackChart;