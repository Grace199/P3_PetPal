import React, { useState } from 'react'
import { ajax_or_login } from '../../util/ajax';
import { useNavigate } from 'react-router-dom';

const NewComment = ({ blogID, img }) => {
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const handleContentChange = (event) => {
        const newContent = event.target.value;
        setContent(newContent);
    }

    const handlePostSubmit = async (event) => {
        event.preventDefault();
        try {
            const messageData = {
                content: content
            }
            const res = await ajax_or_login(`/blogs/${blogID}/reply/`, { method: "POST", body: JSON.stringify(messageData), headers: { 'Content-Type': 'application/json' } }, navigate);
            if (res.ok) {
                setContent("");
            } else {
                console.error("Error during fetch: ", res);
            }
        } catch (error) {
            console.error("Error during fetch: ", error);
        }
    }

    return (
        <form className="flex flex-row gap-2" onSubmit={handlePostSubmit}>
            <div className="hidden sm:block">
                <img
                    src={img}
                    className="rounded-full hover:scale-105 active:scale-95 duration-200 w-[56px] aspect-square object-cover"
                />
            </div>
            <div className="w-full h-44 relative flex-grow">
                <textarea value={content} onChange={handleContentChange} className="absolute top-0 left-0 w-full h-full bg-background border-primary border-[0.5px] rounded-[15px] p-4 focus:outline-[#030711] resize-none text-xs"></textarea>
                <button type="submit" className="absolute text-accent-100 right-5 bottom-[14px] text-sm hover:scale-105 duration-200">
                    POST
                </button>
            </div>
        </form>
    )
}

export default NewComment