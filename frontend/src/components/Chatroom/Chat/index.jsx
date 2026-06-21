import { useState, useRef, useEffect } from 'react'
import Message from '../Message'
import { ajax_or_login } from '../../../util/ajax';
import { useNavigate } from 'react-router-dom';

const Index = ({ chatID, messages, onSent }) => {
    const [newMessage, setNewMessage] = useState('');
    const [sending, setSending] = useState(false);
    const navigate = useNavigate();
    const bottomRef = useRef(null);

    // Current user's avatar, used to tell "my" messages from the other person's.
    const myAvatar = localStorage.getItem("avatar");

    // Auto-scroll to the newest message whenever the list changes.
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleChange = (e) => setNewMessage(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const content = newMessage.trim();
        if (!content || sending) return;
        setSending(true);
        try {
            const res = await ajax_or_login(
                `/comments/chatroom/${chatID}/chat/`,
                { method: "POST", body: JSON.stringify({ content }), headers: { 'Content-Type': 'application/json' } },
                navigate
            );
            if (res.ok) {
                setNewMessage("");
                if (onSent) await onSent();
            }
        } catch (error) {
            console.error("Error during fetch: ", error);
        } finally {
            setSending(false);
        }
    }

    return (
        <div className="bg-background w-full flex flex-col h-full">
            <div className="flex-grow overflow-y-auto px-4 py-6 md:px-8 lg:px-14 flex flex-col gap-1">
                {messages && messages.length > 0 ? (
                    messages.map(message => (
                        <Message
                            key={message.id}
                            name={message.owner.name}
                            time={message.timestamp}
                            image={message.owner.avatar}
                            content={message.content}
                            isMine={message.owner.avatar === myAvatar}
                        />
                    ))
                ) : (
                    <div className="flex-grow flex items-center justify-center text-text/50">
                        <p>No messages yet. Say hello! 👋</p>
                    </div>
                )}
                <div ref={bottomRef} />
            </div>

            <form className="flex items-center gap-2 px-4 md:px-8 lg:px-14 py-4 border-t border-black/5 bg-white" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="newMessage"
                    value={newMessage}
                    onChange={handleChange}
                    className="flex-grow bg-background border border-black/10 rounded-full px-5 py-3 focus:border-primary focus:outline-none"
                    placeholder="Send a message..."
                />
                <button
                    type="submit"
                    disabled={!newMessage.trim() || sending}
                    className="bg-primary text-white font-semibold rounded-full px-6 py-3 hover:bg-accent-200 active:scale-95 transition duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    Send
                </button>
            </form>
        </div>
    )
}

export default Index
