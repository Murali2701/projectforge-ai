import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import FeatureCard from "../components/FeatureCard";
import api from "../services/api";

function HomePage() {

    const [idea, setIdea] = useState("");

    const navigate = useNavigate();

    const examples = [
        "Netflix Clone",
        "AI Resume Analyzer",
        "Student Management System",
        "Food Delivery App",
        "Hospital Management System",
    ];

    const generateBlueprint = async () => {

        if (!idea.trim()) {
            alert("Enter a project idea");
            return;
        }

        try {

            const response = await api.post(
                "/project/generate",
                {
                    idea: idea
                }
            );

            navigate("/results", {
                state: {
                    requirements: response.data.requirements
                }
            });

        } catch (err) {

            console.log(err);

            alert("Failed to generate blueprint.");
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white">

            <Navbar />

            <section className="max-w-6xl mx-auto px-6 py-16 text-center">

                <h1 className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                    Build Software with AI
                </h1>

                <p className="text-slate-400 text-xl max-w-3xl mx-auto mb-10">
                    Generate project blueprints, SQL schemas, REST APIs,
                    architecture plans and documentation using AI.
                </p>

                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

                    <textarea
                        value={idea}
                        onChange={(e) => setIdea(e.target.value)}
                        placeholder="Describe your project idea..."
                        className="w-full h-48 bg-slate-800 rounded-xl p-5"
                    />

                    <div className="flex flex-wrap gap-3 justify-center mt-5">

                        {examples.map((item) => (

                            <button
                                key={item}
                                onClick={() => setIdea(item)}
                                className="px-4 py-2 btn-pill"
                            >
                                {item}
                            </button>

                        ))}

                    </div>

                    <div className="flex justify-center mt-8">

                        <button
                            onClick={generateBlueprint}
                            className="btn-primary px-8 py-4 text-base font-semibold"
                        >
                            📄 Generate Blueprint
                        </button>

                    </div>

                </div>

            </section>

            <section className="max-w-6xl mx-auto px-6 pb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                <FeatureCard
                    icon="📄"
                    title="Blueprints"
                    description="Generate complete software requirements."
                />

                <FeatureCard
                    icon="🗄️"
                    title="Database"
                    description="Generate SQL schema automatically."
                />

                <FeatureCard
                    icon="🌐"
                    title="REST APIs"
                    description="Generate backend API documentation."
                />

                <FeatureCard
                    icon="⚡"
                    title="AI Powered"
                    description="Powered by Google Gemini."
                />

            </section>

        </div>
    );
}

export default HomePage;