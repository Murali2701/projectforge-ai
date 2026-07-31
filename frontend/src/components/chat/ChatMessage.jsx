import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function ChatMessage({ message }) {
    return (
        <div
            className={`flex ${
                message.sender === "user"
                    ? "justify-end"
                    : "justify-start"
            }`}
        >
            <div
                className={`max-w-[85%] rounded-xl px-4 py-3 ${
                    message.sender === "user"
                        ? "bg-purple-600 text-white"
                        : "bg-slate-800 text-gray-100"
                }`}
            >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {message.text}
                </ReactMarkdown>
            </div>
        </div>
    );
}

export default ChatMessage;