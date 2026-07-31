import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProjects, deleteProject } from "../services/projectService";

export default function MyProjects() {

    const [projects, setProjects] = useState([]);

    const navigate = useNavigate();

    const loadProjects = async () => {

        try {

            const data = await getProjects();

            setProjects(data);

        } catch (err) {

            console.log(err);

            alert("Unable to load projects");
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadProjects();
    }, []);

    const removeProject = async (id) => {

        if (!window.confirm("Delete this project?")) return;

        await deleteProject(id);

        loadProjects();
    };

    return (

        <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-6 md:p-10">

            <h1 className="text-4xl font-bold mb-8">
                My Projects
            </h1>

            {
                projects.length === 0 ?

                    <p>No Projects Found</p>

                    :

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {
                            projects.map(project => (

                                <div
                                    key={project.id}
                                    className="bg-slate-900 rounded-xl p-6 shadow"
                                >

                                    <h2 className="text-2xl font-semibold">

                                        {project.title}

                                    </h2>

                                    <p className="text-slate-400 mt-3">

                                        {project.techStack}

                                    </p>

                                    <p className="text-sm mt-3">

                                        {project.createdAt}

                                    </p>

                                    <div className="flex gap-3 mt-5">

                                        <button

                                            onClick={() =>
                                                navigate(`/project/${project.id}`)
                                            }

                                            className="btn-primary px-4 py-2"
                                        >
                                            View
                                        </button>

                                        <button

                                            onClick={() =>
                                                removeProject(project.id)
                                            }

                                            className="btn-danger px-4 py-2"
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            ))
                        }

                    </div>

            }

        </div>

    );

}