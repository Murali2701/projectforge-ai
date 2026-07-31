import { useState, useEffect, useRef } from "react";
import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";
import ChatMessage from "./ChatMessage";
import { askAI } from "../../services/chatService";
function ChatWidget() {

    const [open, setOpen] = useState(false);

    const [messages, setMessages] = useState([
        {
            sender: "ai",
            text: "👋 Hello! I'm ProjectForge AI.\n\nAsk me anything about Java, Spring Boot, React, SQL, APIs, or your project."
        }
    ]);

    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef(null);

useEffect(() => {
    bottomRef.current?.scrollIntoView({
        behavior: "smooth"
    });
}, [messages]);

    const handleSend = async () => {

    if (!input.trim()) return;

    const question = input;

    console.log("Sending:", question);

    setMessages(prev => [
        ...prev,
        {
            sender: "user",
            text: question
        }
    ]);

    setInput("");
    setLoading(true);

    try {

        const reply = await askAI(question);

        console.log("Gemini Reply:", reply);

        setMessages(prev => [
            ...prev,
            {
                sender: "ai",
                text: reply
            }
        ]);

    } catch (err) {

        console.error(err);

        setMessages(prev => [
            ...prev,
            {
                sender: "ai",
                text: "❌ Unable to contact ProjectForge AI."
            }
        ]);

    } finally {

        setLoading(false);

    }
};

    return (
        <>

            {/* Floating Button */}

            <button
                onClick={() => setOpen(!open)}
                className="fixed bottom-6 right-6 w-16 h-16 btn-primary rounded-full shadow-2xl flex items-center justify-center text-2xl z-50 hover:scale-105 active:scale-95 transition-all duration-200"
            >
                {open ? <FaTimes /> : <FaRobot />}
            </button>

            {open && (

                <div className="fixed bottom-24 right-6 w-[380px] h-[620px] bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl flex flex-col overflow-hidden z-50">

                    {/* Header */}

                    <div className="bg-purple-600 px-5 py-4 flex justify-between items-center">

                        <h2 className="font-bold text-lg text-white">
                            🤖 ProjectForge AI
                        </h2>

                        <button
                            onClick={() => setOpen(false)}
                            className="text-white"
                        >
                            <FaTimes />
                        </button>

                    </div>

                    {/* Messages */}

                    <div className="flex-1 overflow-y-auto p-4 space-y-3">

                        {messages.map((message, index) => (

                            <ChatMessage
                                key={index}
                                message={message}
                            />

                        ))}

                        {loading && (

                            <div className="flex items-center gap-2 text-slate-400">
    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-150"></div>
    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-300"></div>
    <span>ProjectForge AI is thinking...</span>
</div>

                        )}
                        <div ref={bottomRef}></div>

                    </div>

                    {/* Input */}

                    <div className="border-t border-slate-700 p-3 flex gap-2">

                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSend();
                                }
                            }}
                            placeholder="Ask anything..."
                            className="flex-1 bg-slate-800 text-white rounded-lg px-4 py-3 outline-none"
                        />

                        <button
                            disabled={loading}
                            onClick={handleSend}
                            className="btn-primary px-4"
                        >
                            {loading ? "..." : <FaPaperPlane />}
                        </button>

                    </div>

                </div>

            )}

        </>
    );

}

export default ChatWidget;