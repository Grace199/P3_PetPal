import { useState } from 'react'
import { ajax_or_login } from '../../util/ajax';
import { useNavigate } from 'react-router-dom';

const DEFAULT_AVATAR = (process.env.REACT_APP_API_URL || "http://localhost:8000") + "/media/avatars/default-avatar.jpg";

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

    const avatarSrc = img && img !== "null" ? img : DEFAULT_AVATAR;

    return (
        <form className="flex gap-3" onSubmit={handlePostSubmit}>
            <img
                src={avatarSrc}
                className="hidden sm:block rounded-full w-11 h-11 aspect-square object-cover ring-1 ring-black/5 shrink-0 mt-1"
                alt="profile"
            />
            <div className="flex flex-col gap-2 flex-grow">
                <textarea
                    value={content}
                    onChange={handleContentChange}
                    placeholder="Add a comment..."
                    className="w-full h-28 bg-background border border-primary/40 rounded-2xl p-4 focus:outline-primary resize-none text-sm placeholder:text-text/50"
                />
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={!content.trim()}
                        className="rounded-full bg-accent-100 text-white font-semibold px-6 py-2 text-sm hover:opacity-90 active:scale-95 duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        Post Comment
                    </button>
                </div>
            </div>
        </form>
    )
}

export default NewComment