import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import AllRooms from '../../components/Chatroom/AllRooms'
import Chat from '../../components/Chatroom/Chat'
import { ajax_or_login } from '../../util/ajax'
import { useNavigate } from 'react-router-dom'

const Chatroom = () => {

    const [chatID, setChatID] = useState(0);
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (chatID !== 0) {
                try {
                    const res = await ajax_or_login(`/comments/chatroom/${chatID}/chat/`, { method: "GET" }, navigate);

                    if (res.ok) {
                        const data = await res.json();
                        setMessages(data.results);
                        console.log(data.results);
                    }
                } catch (error) {
                    console.error("Error during fetch: ", error);
                }
            }
        };
        fetchData();

        console.log(chatID);
        // Fetch messages base on chatID
    }, [chatID])

    return (
        <>
            <Navbar />
            <main className="h-screen w-screen absolute left-0 top-0">
                <div className="flex flex-row h-full w-full pt-[72px] max-md:pt-[100px]">
                    <AllRooms setChatID={setChatID} />
                    {chatID > 0 ? <Chat key={chatID} chatID={chatID} messages={messages} /> :
                        <div className='w-full h-full hidden md:flex justify-center items-center text-3xl text-center'>
                            <p>Welcome to the chatroom</p>
                        </div>
                    }
                </div>
            </main>
        </>
    )
}

export default Chatroom