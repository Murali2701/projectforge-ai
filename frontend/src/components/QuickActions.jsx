import { Link } from "react-router-dom";

function QuickActions() {

    const button =
        "btn-primary px-5 py-3 font-semibold";

    return (

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">

            <h2 className="text-2xl font-bold mb-5">
                Quick Actions
            </h2>

            <div className="flex flex-wrap gap-4">

                <Link
                    to="/"
                    className={button}
                >
                    Generate Project
                </Link>

                <Link
                    to="/projects"
                    className={button}
                >
                    My Projects
                </Link>

                <Link
                    to="/profile"
                    className={button}
                >
                    Profile
                </Link>

            </div>

        </div>

    );
}

export default QuickActions;