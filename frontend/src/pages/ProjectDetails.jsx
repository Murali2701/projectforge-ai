import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProject } from "../services/projectService";

function ProjectDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [project, setProject] = useState(null);

    useEffect(() => {

        async function load() {

            const data = await getProject(id);
            setProject(data);

        }

        load();

    }, [id]);

    if (!project) {

        return (
            <h2 className="text-white p-10">
                Loading...
            </h2>
        );

    }

    return (

        <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-6 md:p-10">

            <div className="flex gap-4">

                <Link
                    to="/projects"
                    className="btn-secondary px-4 py-2"
                >
                    ← Back
                </Link>

                <button
                    onClick={() => navigate(`/projects/edit/${id}`)}
                    className="btn-primary px-4 py-2"
                >
                    ✏️ Edit Project
                </button>

            </div>

            <h1 className="text-4xl font-bold mt-8">
                {project.title}
            </h1>

            <p className="mt-6 whitespace-pre-wrap">
                {project.description}
            </p>

            <p className="mt-8">
                <b>Tech Stack:</b> {project.techStack}
            </p>

        </div>

    );
}

export default ProjectDetails;