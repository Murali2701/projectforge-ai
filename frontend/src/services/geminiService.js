import api from "./api";

export const generateRequirements = async (idea) => {
    const response = await api.post("/project/generate", {
        idea,
    });

    return response.data;
};

export const generateSchema = async (idea) => {
    const response = await api.post("/project/generate-schema", {
        idea,
    });

    return response.data;
};

export const generateApis = async (idea) => {
    const response = await api.post("/project/generate-apis", {
        idea,
    });

    return response.data;
};