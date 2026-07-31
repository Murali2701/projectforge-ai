import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProject, updateProject } from "../services/projectService";

function EditProjectPage() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [techStack, setTechStack] = useState("");

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProject = async () => {
            try {
                const project = await getProject(id);
                setTitle(project.title);
                setDescription(project.description);
                setTechStack(project.techStack);
            } catch (err) {
                console.log(err);
                alert("Unable to load project.");
            } finally {
                setLoading(false);
            }
        };

        loadProject();
    }, [id]);

    const saveProject = async () => {

        try {

            await updateProject(id, {
                title,
                description,
                techStack
            });

            alert("Project updated successfully.");

            navigate("/projects");

        } catch (err) {

            console.log(err);

            alert("Update failed.");

        }
    };

    if (loading) {

        return (
            <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
                Loading...
            </div>
        );

    }

    return (

        <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-6 md:p-10">

            <div className="max-w-4xl mx-auto bg-slate-900 rounded-2xl p-6 md:p-8">

                <h1 className="text-3xl font-bold mb-8">
                    Edit Project
                </h1>

                <div className="space-y-6">

                    <div>

                        <label className="block mb-2">
                            Title
                        </label>

                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-3 rounded bg-slate-800"
                        />

                    </div>

                    <div>

                        <label className="block mb-2">
                            Description
                        </label>

                        <textarea
                            rows={12}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-3 rounded bg-slate-800"
                        />

                    </div>

                    <div>

                        <label className="block mb-2">
                            Tech Stack
                        </label>

                        <input
                            value={techStack}
                            onChange={(e) => setTechStack(e.target.value)}
                            className="w-full p-3 rounded bg-slate-800"
                        />

                    </div>

                    <div className="flex gap-4">

                        <button
                            onClick={saveProject}
                            className="btn-primary px-6 py-3 font-semibold"
                        >
                            Save Changes
                        </button>

                        <button
                            onClick={() => navigate("/projects")}
                            className="btn-secondary px-6 py-3 font-semibold"
                        >
                            Cancel
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default EditProjectPage;