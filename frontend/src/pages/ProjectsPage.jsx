import { useEffect, useState } from "react";
import { getProjects, deleteProject } from "../services/projectService";
import { Link } from "react-router-dom";

function ProjectsPage() {

    const [projects, setProjects] = useState([]);

    const loadProjects = async () => {
        try {
            const data = await getProjects();
            setProjects(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadProjects();
    }, []);

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this project?"))
            return;

        await deleteProject(id);

        loadProjects();
    };

    return (

        <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-6 md:p-10">

            <h1 className="text-4xl font-bold mb-8">
                My Projects
            </h1>

            <div className="grid gap-6">

                {projects.map(project => (

                    <div
                        key={project.id}
                        className="bg-slate-900 p-6 rounded-xl border border-slate-700"
                    >

                        <h2 className="text-2xl font-bold">
                            {project.title}
                        </h2>

                        <p className="mt-3 text-slate-300">
                            {project.description.substring(0,200)}...
                        </p>

                        <p className="mt-4">
                            <b>Tech Stack:</b> {project.techStack}
                        </p>

                        <div className="flex gap-3 mt-6">

                            <Link
                                to={`/projects/${project.id}`}
                                className="btn-primary px-4 py-2"
                            >
                                View
                            </Link>

                            <button
                                onClick={() => handleDelete(project.id)}
                                className="btn-danger px-4 py-2"
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default ProjectsPage;