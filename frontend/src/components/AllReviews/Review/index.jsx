import React, { useEffect, useState } from 'react'
import { ajax_or_login } from '../../../util/ajax';
import { useNavigate } from 'react-router-dom';
import Reply from './Reply'

const DEFAULT_AVATAR = (process.env.REACT_APP_API_URL || "http://localhost:8000") + "/media/avatars/default-avatar.jpg";

const StarRating = ({ rating }) => {
    const value = Math.max(0, Math.min(5, rating || 0));
    return (
        <div className="flex flex-row text-accent-100" aria-label={`${value} out of 5 stars`}>
            {[1, 2, 3, 4, 5].map((n) => (
                <i
                    key={n}
                    className={`${n <= value ? "uis uis-star" : "uil uil-star"} text-base sm:text-xl`}
                ></i>
            ))}
        </div>
    );
};

const Review = ({ isSelfReview, reviewID, name, rating, content, timestamp, hasReplies }) => {
    const [avatar, setAvatar] = useState(null);
    const [openReply, setOpenReply] = useState(false);
    const [openReplies, setOpenReplies] = useState(false);
    const [replyContent, setReplyContent] = useState("");
    const [replies, setReplies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setAvatar(localStorage.getItem("avatar"));
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await ajax_or_login(`/comments/review/${reviewID}/reply/`, { method: "GET" }, navigate);
                if (res.ok) {
                    const data = await res.json();
                    setReplies(data.results);
                }
            } catch (error) {
                console.error("Error during fetch: ", error);
            }
        };
        fetchData();
    }, [reviewID, navigate]);

    const handleReplyContentChange = (event) => {
        setReplyContent(event.target.value);
    }

    const handleReplySubmit = async (event) => {
        event.preventDefault();
        try {
            if (replyContent.trim() !== "") {
                const replyData = { content: replyContent, isSelf: isSelfReview };
                const res = await ajax_or_login(`/comments/review/${reviewID}/reply/`, { method: "POST", body: JSON.stringify(replyData), headers: { 'Content-Type': 'application/json' } }, navigate);
                if (res.ok) {
                    setReplyContent("");
                    setOpenReply(false);
                } else {
                    console.error("Error during fetch: ", res);
                }
            }
        } catch (error) {
            console.error("Error during fetch: ", error);
        }
    }

    const jsDate = new Date(timestamp);
    const formattedDate = jsDate.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

    const avatarSrc = avatar && avatar !== "null" ? avatar : DEFAULT_AVATAR;

    return (
        <div className="bg-white rounded-2xl border border-black/5 p-4 sm:p-5">
            {/* Header: avatar, name, date, stars */}
            <div className="flex flex-row items-start gap-3">
                <img
                    src={avatarSrc}
                    className="rounded-full w-10 h-10 sm:w-12 sm:h-12 aspect-square object-cover ring-1 ring-black/5 shrink-0"
                    alt={name}
                />
                <div className="flex flex-col gap-0.5 flex-grow min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                        <p className="text-text text-sm sm:text-base font-bold truncate">{name}</p>
                        <p className="text-text/60 text-xs sm:text-sm">{formattedDate}</p>
                    </div>
                    <StarRating rating={rating} />
                </div>
            </div>

            {/* Body */}
            {content !== "" && (
                <p className="text-text text-sm sm:text-base font-light mt-3 whitespace-pre-line">{content}</p>
            )}

            {/* Actions */}
            {content !== "" && (
                <div className="flex flex-row gap-5 mt-3">
                    <button
                        className="text-accent-100 text-sm font-semibold hover:underline"
                        onClick={() => setOpenReply((prev) => !prev)}
                    >
                        Reply
                    </button>
                    {hasReplies && (
                        <button
                            className="text-text/70 text-sm font-semibold hover:underline"
                            onClick={() => setOpenReplies((prev) => !prev)}
                        >
                            {openReplies ? "Hide replies" : "View replies"}
                        </button>
                    )}
                </div>
            )}

            {/* Reply form */}
            {openReply && (
                <form className="flex flex-col gap-2 mt-3" onSubmit={handleReplySubmit}>
                    <textarea
                        value={replyContent}
                        onChange={handleReplyContentChange}
                        placeholder="Write a reply..."
                        className="w-full h-20 bg-background border border-primary/40 rounded-xl p-3 focus:outline-primary resize-none text-sm placeholder:text-text/50"
                    />
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={!replyContent.trim()}
                            className="rounded-full bg-accent-100 text-white font-semibold px-6 py-2 text-sm hover:opacity-90 active:scale-95 duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            Reply
                        </button>
                    </div>
                </form>
            )}

            {/* Replies */}
            {openReplies && replies.length > 0 && (
                <div className="flex flex-col gap-3 mt-4 pl-4 sm:pl-6 border-l-2 border-background-secondary">
                    {replies.map((reply) => (
                        <Reply
                            key={reply.id}
                            name={reply.owner}
                            isReplyingToSelf={reply.isSelf}
                            timestamp={reply.timestamp}
                            content={reply.content}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Review
