import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ajax_or_login } from '../../util/ajax';

const DEFAULT_AVATAR = (process.env.REACT_APP_API_URL || "http://localhost:8000") + "/media/avatars/default-avatar.jpg";

const NewReview = ({ img }) => {
    const { shelterID } = useParams();
    const navigate = useNavigate();
    const [rating, setRating] = useState(5);
    const [content, setContent] = useState("");

    const handleRatingChange = (event) => {
        const newRating = event.target.value;
        setRating(newRating);
    }

    const handleContentChange = (event) => {
        const newContent = event.target.value;
        setContent(newContent);
    }

    const handlePostSubmit = async (event) => {
        event.preventDefault();
        try {
            const reviewData = {
                rating: rating,
                content: content
            }
            const res = await ajax_or_login(`/comments/shelter/${shelterID}/review/`, { method: "POST", body: JSON.stringify(reviewData), headers: { 'Content-Type': 'application/json' } }, navigate);
            if (res.ok) {
                setRating(5);
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
        <form className="flex flex-col gap-4" onSubmit={handlePostSubmit}>
            <div className="flex flex-row items-center gap-3">
                <img
                    src={avatarSrc}
                    className="rounded-full w-10 h-10 sm:w-12 sm:h-12 aspect-square object-cover ring-1 ring-black/5 shrink-0"
                    alt="profile"
                />
                <label className="flex items-center gap-2 text-sm sm:text-base text-text">
                    Rate your experience:
                    <select
                        name="rating"
                        value={rating}
                        onChange={handleRatingChange}
                        className="hover:cursor-pointer text-sm font-semibold bg-white border border-primary/40 rounded-lg px-2 py-1 focus:outline-primary"
                    >
                        {[1, 2, 3, 4, 5].map((n) => (
                            <option key={n} value={n}>{n}</option>
                        ))}
                    </select>
                </label>
            </div>
            <textarea
                value={content}
                onChange={handleContentChange}
                placeholder="Share your experience with this shelter..."
                className="w-full h-36 sm:h-40 bg-background border border-primary/40 rounded-2xl p-4 focus:outline-primary resize-none text-sm sm:text-base placeholder:text-text/50"
            />
            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={!content.trim()}
                    className="rounded-full bg-accent-100 text-white font-semibold px-8 py-2.5 text-sm sm:text-base hover:opacity-90 active:scale-95 duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    Post Review
                </button>
            </div>
        </form>
    );
}

export default NewReview
