import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./content/AuthContext";
import EditProjectPage from "./pages/EditProjectPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ResultsPage from "./pages/ResultsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ProjectDetails from "./pages/ProjectDetails";
import ProjectsPage from "./pages/ProjectsPage";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/ProfilePage";
import CreateProjectPage from "./pages/CreateProjectPage";
import ChatPage from "./pages/ChatPage";

function App() {
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "light") {
            document.documentElement.classList.remove("dark");
        } else {
            document.documentElement.classList.add("dark");
        }
    }, []);

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    <Route
    path="/dashboard"
    element={
        <ProtectedRoute>
            <Dashboard />
        </ProtectedRoute>
    }
    />

    <Route
    path="/"
    element={
        <ProtectedRoute>
            <HomePage />
        </ProtectedRoute>
    }
/>

<Route
    path="/profile"
    element={
        <ProtectedRoute>
            <ProfilePage />
        </ProtectedRoute>
    }
/>


                    <Route
    path="/projects"
    element={
        <ProtectedRoute>
            <ProjectsPage />
        </ProtectedRoute>
    }
/>

<Route
    path="/projects/create"
    element={
        <ProtectedRoute>
            <CreateProjectPage />
        </ProtectedRoute>
    }
/>

                    <Route
    path="/projects/:id"
    element={
        <ProtectedRoute>
            <ProjectDetails />
        </ProtectedRoute>
    }
/>

<Route
    path="/chat"
    element={
        <ProtectedRoute>
            <ChatPage />
        </ProtectedRoute>
    }
/>

<Route
    path="/projects/edit/:id"
    element={
        <ProtectedRoute>
            <EditProjectPage />
        </ProtectedRoute>
    }
/>

                    <Route
                        path="/results"
                        element={
                            <ProtectedRoute>
                                <ResultsPage />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;