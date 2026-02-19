import React, { useEffect, useState } from 'react'
import { ajax_or_login } from '../../../util/ajax';
import { useNavigate } from 'react-router-dom';
import Reply from './Reply'

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
        const newReplyContent = event.target.value;
        setReplyContent(newReplyContent);
    }

    const handleReplySubmit = async (event) => {
        event.preventDefault();
        try {
            if (replyContent !== "") {
                const replyData = {
                    content: replyContent,
                    isSelf: isSelfReview
                }
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

    const year = jsDate.getFullYear();
    const month = (jsDate.getMonth() + 1).toString().padStart(2, '0');
    const day = jsDate.getDate().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    const renderStars = () => {
        if (rating === 5) {
            return (
                <>
                    <div className="flex flex-row">
                        <i className="uis uis-star text-lg text-lg sm:text-2xl"></i>
                        <i className="uis uis-star text-lg sm:text-2xl"></i>
                        <i className="uis uis-star text-lg sm:text-2xl"></i>
                        <i className="uis uis-star text-lg sm:text-2xl"></i>
                        <i className="uis uis-star text-lg sm:text-2xl"></i>
                    </div>
                </>
            );
        } else if (rating === 4) {
            return (
                <>
                    <div className="flex flex-row">
                        <i className="uis uis-star text-lg sm:text-2xl"></i>
                        <i className="uis uis-star text-lg sm:text-2xl"></i>
                        <i className="uis uis-star text-lg sm:text-2xl"></i>
                        <i className="uis uis-star text-lg sm:text-2xl"></i>
                        <i className="uil uil-star text-lg sm:text-2xl"></i>
                    </div>
                </>
            );
        } else if (rating === 3) {
            return (
                <>
                    <div className="flex flex-row">
                        <i className="uis uis-star text-lg sm:text-2xl"></i>
                        <i className="uis uis-star text-lg sm:text-2xl"></i>
                        <i className="uis uis-star text-lg sm:text-2xl"></i>
                        <i className="uil uil-star text-lg sm:text-2xl"></i>
                        <i className="uil uil-star text-lg sm:text-2xl"></i>
                    </div>
                </>
            );
        } else if (rating === 2) {
            return (
                <>
                    <div className="flex flex-row">
                        <i className="uis uis-star text-lg sm:text-2xl"></i>
                        <i className="uis uis-star text-lg sm:text-2xl"></i>
                        <i className="uil uil-star text-lg sm:text-2xl"></i>
                        <i className="uil uil-star text-lg sm:text-2xl"></i>
                        <i className="uil uil-star text-lg sm:text-2xl"></i>
                    </div>
                </>
            );
        } else if (rating === 1) {
            return (
                <>
                    <div className="flex flex-row">
                        <i className="uis uis-star text-lg sm:text-2xl"></i>
                        <i className="uil uil-star text-lg sm:text-2xl"></i>
                        <i className="uil uil-star text-lg sm:text-2xl"></i>
                        <i className="uil uil-star text-lg sm:text-2xl"></i>
                        <i className="uil uil-star text-lg sm:text-2xl"></i>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <div className="flex flex-row">
                        <i className="uil uil-star text-lg sm:text-2xl"></i>
                        <i className="uil uil-star text-lg sm:text-2xl"></i>
                        <i className="uil uil-star text-lg sm:text-2xl"></i>
                        <i className="uil uil-star text-lg sm:text-2xl"></i>
                        <i className="uil uil-star text-lg sm:text-2xl"></i>
                    </div>
                </>
            );
        }
    };

    return (
        <>
            <div className="hidden sm:flex flex-col gap-1">
                {content === "" ?
                    <>
                        <div className="flex flex-row gap-2 items-center">
                            <div>
                                <img
                                    src={avatar}
                                    className="rounded-full hover:scale-105 active:scale-95 duration-200 w-[56px] aspect-square object-cover"
                                    alt='profile-pic'
                                />
                            </div>
                            <div className="flex flex-col w-full gap-1">
                                <div className="flex flex-row items-center">
                                    <div className="flex flex-row items-center">
                                        <p className="text-text text-base font-bold">{name}</p>
                                        <pre className="text-2xl"> | </pre>
                                        <p className="text-text text-sm">{formattedDate}</p>
                                        <pre className="text-2xl"> | </pre>
                                        {renderStars()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className="flex flex-row gap-2">
                            <div className="w-[56px]"></div>
                            <div className="flex flex-col w-full gap-1">
                                <div className="flex flex-row items-center">
                                    <div className="flex flex-row items-center">
                                        <p className="text-text text-base font-bold">{name}</p>
                                        <pre className="text-2xl"> | </pre>
                                        <p className="text-text text-sm">{formattedDate}</p>
                                        <pre className="text-2xl"> | </pre>
                                        {renderStars()}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row gap-2">
                            <div>
                                <img
                                    src={avatar}
                                    className="rounded-full hover:scale-105 active:scale-95 duration-200 w-[56px] aspect-square object-cover"
                                    alt='profile-pic'
                                />
                            </div>
                            <div className="w-full flex">
                                <div className="w-full h-full bg-background border-background-secondary border-[0.5px] rounded-[15px] flex items-center p-3">
                                    <p className="text-text text-base font-light">{content}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row gap-2">
                            <div className="w-[56px]"></div>
                            <div className="flex flex-row gap-4">
                                <button className="text-text text-sm font-semibold" onClick={() => { setOpenReply(prev => !prev); }}>Reply</button>
                                {hasReplies && <button className="text-text text-sm font-semibold" onClick={() => { setOpenReplies(prev => !prev); }}>View Replies</button>}
                            </div>
                        </div>
                        {openReply &&
                            <form className="w-full flex flex-row gap-2" onSubmit={handleReplySubmit}>
                                <div className="w-[56px]"></div>
                                <div className="w-full h-20 relative flex-grow">
                                    <textarea value={replyContent} onChange={handleReplyContentChange} className="absolute w-full h-full bg-background border-primary border-[0.5px] rounded-[15px] p-4 focus:outline-[#030711] resize-none text-xs"></textarea>
                                    <button className="absolute text-accent-100 right-5 bottom-[14px] text-sm hover:scale-105 duration-200">REPLY</button>
                                </div>
                            </form>
                        }
                        {openReplies && replies.map(reply => (
                            <div className="w-full flex flex-row gap-2 pt-4" key={reply.id}>
                                <div className="w-[56px]"></div>
                                <div>
                                    <Reply name={reply.owner} isReplyingToSelf={reply.isSelf} timestamp={reply.timestamp} content={reply.content}></Reply>
                                </div>
                            </div>
                        ))}
                    </>
                }
            </div>
            <div className="flex flex-col gap-2 sm:hidden">
                <div className="flex flex-row gap-3">
                    <div className="flex">
                        <div className="relative w-[40px] h-[40px]">
                            <img
                                src={avatar}
                                className="rounded-full hover:scale-105 active:scale-95 duration-200 absolute inset-0 w-full h-full aspect-square object-cover"
                                alt='profile-pic'
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex flex-row gap-3">
                            <p className="text-text text-xs font-semibold">{name}</p>
                            <p className="text-text text-xs">{formattedDate}</p>
                        </div>
                        {renderStars()}
                    </div>
                </div>
                {content === "" ? <></> :
                    <div className="flex flex-col gap-1">
                        <div className="w-full flex">
                            <div className="w-full h-full bg-background border-background-secondary border-[0.5px] rounded-[15px] flex items-center p-3">
                                <p className="text-text font-light text-sm">{content}</p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between">
                            <button className="text-text text-xs font-semibold" onClick={() => { setOpenReply(prev => !prev); }}>Reply</button>
                            {hasReplies &&
                                <button className="text-text text-xs font-semibold" onClick={() => { setOpenReplies(prev => !prev); }}>View Replies</button>
                            }
                        </div>
                        {openReply &&
                            <form className="w-full flex flex-row pt-1" onSubmit={handleReplySubmit}>
                                <div className="w-full h-20 relative flex-grow">
                                    <textarea value={replyContent} onChange={handleReplyContentChange} className="absolute w-full h-full bg-background border-primary border-[0.5px] rounded-[15px] p-2 focus:outline-[#030711] resize-none text-xs"></textarea>
                                    <button className="absolute text-accent-100 right-2 bottom-2 text-xs hover:scale-105 duration-200">REPLY</button>
                                </div>
                            </form>
                        }
                        {openReplies && replies.map(reply => (
                            <div className="w-full flex flex-row gap-2 pt-3" key={reply.id}>
                                <div className="w-1"></div>
                                <div>
                                    <Reply name={reply.owner} isReplyingToSelf={reply.isSelf} timestamp={reply.timestamp} content={reply.content}></Reply>
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </>
    )
}

export default Review