import api from "./api";

export const askAI = async (message) => {

    console.log("chatService called");

    const response = await api.post("/chat", {
        message
    });

    console.log("Response Data:", response.data);
    console.log("Returning:", response.data.response);

    return response.data.response;
};