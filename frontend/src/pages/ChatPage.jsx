import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { askAI } from "../services/chatService";

function ChatPage() {

    const [messages, setMessages] = useState([]);
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);

    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    const handleSend = async () => {

        if (!question.trim()) return;

        const userMessage = {
            role: "user",
            content: question
        };

        setMessages(prev => [...prev, userMessage]);
        setQuestion("");
        setLoading(true);

        try {

            const response = await askAI(question);

            const aiMessage = {
                role: "assistant",
                content: response
            };

            setMessages(prev => [...prev, aiMessage]);

        } catch {

            setMessages(prev => [
                ...prev,
                {
                    role: "assistant",
                    content: "Something went wrong."
                }
            ]);

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="min-h-screen bg-slate-950 flex flex-col">

            <div className="bg-slate-900 p-5 shadow">

                <h1 className="text-2xl text-white font-bold">
                    🤖 ProjectForge AI Assistant
                </h1>

            </div>

            <div className="flex-1 overflow-y-auto p-8">

                <div className="max-w-5xl mx-auto space-y-6">

                    {messages.map((msg, index) => (

                        <div
                            key={index}
                            className={`flex ${
                                msg.role === "user"
                                    ? "justify-end"
                                    : "justify-start"
                            }`}
                        >

                            <div
                                className={`rounded-2xl p-5 max-w-3xl ${
                                    msg.role === "user"
                                        ? "bg-purple-600 text-white"
                                        : "bg-slate-800 text-gray-200"
                                }`}
                            >

                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        code({
                                            inline,
                                            className,
                                            children,
                                            ...props
                                        }) {

                                            const match =
                                                /language-(\w+)/.exec(
                                                    className || ""
                                                );

                                            return !inline && match ? (
                                                <SyntaxHighlighter
                                                    language={match[1]}
                                                    PreTag="div"
                                                    {...props}
                                                >
                                                    {String(children).replace(/\n$/, "")}
                                                </SyntaxHighlighter>
                                            ) : (
                                                <code
                                                    className={className}
                                                    {...props}
                                                >
                                                    {children}
                                                </code>
                                            );
                                        }
                                    }}
                                >
                                    {msg.content}
                                </ReactMarkdown>

                            </div>

                        </div>

                    ))}

                    {loading && (

                        <div className="text-gray-400">
                            🤖 Thinking...
                        </div>

                    )}

                    <div ref={bottomRef}></div>

                </div>

            </div>

            <div className="bg-slate-900 p-5">

                <div className="max-w-5xl mx-auto flex gap-4">

                    <input
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSend();
                            }
                        }}
                        className="flex-1 rounded-xl bg-slate-800 text-white p-4"
                        placeholder="Ask anything about software development..."
                    />

                    <button
                        onClick={handleSend}
                        className="btn-primary px-8 font-semibold"
                    >
                        Send
                    </button>

                </div>

            </div>

        </div>

    );
}

export default ChatPage;