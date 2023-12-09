import React, { useState } from 'react'
import Message from '../Message'

const Index = ({ messages }) => {
    const [newMessage, setNewMessage] = useState('');

    const handleChange = (e) => {
        const { value } = e.target;
        setNewMessage(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(newMessage);
    }

    return (
        <div className="bg-background-secondary w-full flex flex-col justify-end px-4 py-4 md:px-8 md:py-6 lg:px-14 lg:py-8 gap-5">
            <div className='w-full overflow-y-scroll mt-10'>
                {messages && messages.map(message => (
                    <Message key={message.application} name={message.owner.name} time={message.timestamp} image={message.owner.avatar} content={message.content} />
                ))}
            </div>


            <form className="w-full relative flex items-center h-14 mt-4" onSubmit={handleSubmit}>
                <input type="text" name='newMessage' value={newMessage} onChange={handleChange} className="absolute top-0 left-0 w-full h-full bg-background border-[#A4A4A4] border-[0.5px] rounded-[28px] px-6" placeholder="Send a message..." />
                <button className="absolute text-accent-100 right-6">Send</button>
            </form>
        </div>
    )
}

export default Index
