import { useState, useEffect, useCallback } from 'react'
import Navbar from '../../components/Navbar'
import AllRooms from '../../components/Chatroom/AllRooms'
import Chat from '../../components/Chatroom/Chat'
import { ajax_or_login } from '../../util/ajax'
import { useNavigate } from 'react-router-dom'

const Chatroom = () => {

    const [chatID, setChatID] = useState(0);
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();

    const fetchMessages = useCallback(async () => {
        if (chatID === 0) return;
        try {
            const res = await ajax_or_login(`/comments/chatroom/${chatID}/chat/`, { method: "GET" }, navigate);
            if (res.ok) {
                const data = await res.json();
                setMessages(data.results);
            }
        } catch (error) {
            console.error("Error during fetch: ", error);
        }
    }, [chatID, navigate]);

    // Fetch on room change, then poll for new messages.
    useEffect(() => {
        setMessages([]);
        fetchMessages();
        if (chatID === 0) return;
        const interval = setInterval(fetchMessages, 4000);
        return () => clearInterval(interval);
    }, [chatID, fetchMessages])

    return (
        <>
            <Navbar />
            <main className="h-screen w-screen absolute left-0 top-0">
                <div className="flex flex-row h-full w-full pt-[72px] max-md:pt-[100px]">
                    <AllRooms setChatID={setChatID} />
                    {chatID > 0 ? <Chat key={chatID} chatID={chatID} messages={messages} onSent={fetchMessages} /> :
                        <div className='w-full h-full hidden md:flex flex-col gap-3 justify-center items-center text-center text-text/50'>
                            <i className="uil uil-comments-alt text-6xl"></i>
                            <p className="text-xl font-medium">Select a conversation to start chatting</p>
                        </div>
                    }
                </div>
            </main>
        </>
    )
}

export default Chatroom