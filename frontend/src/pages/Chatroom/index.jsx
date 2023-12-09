import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import AllRooms from '../../components/Chatroom/AllRooms'
import Chat from '../../components/Chatroom/Chat'

const Chatroom = () => {
    const [chatID, setChatID] = useState(0);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        console.log(chatID)
        // Fetch messages base on chatID
        setMessages([
            {application:1 ,owner: {name:"Dog Society", avatar: "void.png"}, content:"Hello there, thank you for your interest in adopting ChickenSoup123, feel free to reach out for any questions", timestamp: "Today at 3:18pm"},
            {application:2 ,owner: {name:"Dog Society", avatar: "void.png"}, content:"Hello there, thank you for your interest in adopting ChickenSoup123, feel free to reach out for any questions", timestamp: "Today at 3:18pm"},
            {application:3 ,owner: {name:"Dog Society", avatar: "void.png"}, content:"Hello there, thank you for your interest in adopting ChickenSoup123, feel free to reach out for any questions", timestamp: "Today at 3:18pm"},
            {application:4 ,owner: {name:"Dog Society", avatar: "void.png"}, content:"Hello there, thank you for your interest in adopting ChickenSoup123, feel free to reach out for any questions", timestamp: "Today at 3:18pm"},
            {application:5 ,owner: {name:"Dog Society", avatar: "void.png"}, content:"Hello there, thank you for your interest in adopting ChickenSoup123, feel free to reach out for any questions", timestamp: "Today at 3:18pm"},
            {application:6 ,owner: {name:"Dog Society", avatar: "void.png"}, content:"Hello there, thank you for your interest in adopting ChickenSoup123, feel free to reach out for any questions", timestamp: "Today at 3:18pm"},
            {application:7 ,owner: {name:"Dog Society", avatar: "void.png"}, content:"Hello there, thank you for your interest in adopting ChickenSoup123, feel free to reach out for any questions", timestamp: "Today at 3:18pm"},
            {application:8 ,owner: {name:"Dog Society", avatar: "void.png"}, content:"Hello there, thank you for your interest in adopting ChickenSoup123, feel free to reach out for any questions", timestamp: "Today at 3:18pm"},
            {application:9 ,owner: {name:"Dog Society", avatar: "void.png"}, content:"Hello there, thank you for your interest in adopting ChickenSoup123, feel free to reach out for any questions", timestamp: "Today at 3:18pm"}
        ])
    }, [chatID])

    return (
        <>
            <Navbar />
            <main className="h-screen w-screen absolute left-0 top-0">
                <div className="flex flex-row h-full w-full pt-[72px] max-md:pt-[100px]">
                    <AllRooms setChatID={setChatID} />
                    {messages?.length > 0 ? <Chat messages={messages} /> :
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