import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ajax_or_login } from '../../util/ajax';

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

    return (
        <>
            <form className="hidden sm:flex flex-col gap-2" onSubmit={handlePostSubmit}>
                <div className="flex flex-row gap-2">
                    <div className="w-[56px]"></div>
                    <div>
                        <div className="flex justify-left items-center gap-1 rounded-full group">
                            <p className="text-sm">Rate your experience:</p>
                            <select
                                name="rating"
                                value={rating}
                                onChange={handleRatingChange}
                                className="hover:cursor-pointer text-[13px] bg-[#fafafa]"
                            >
                                <option value={1} className="text-sm">
                                    1
                                </option>
                                <option value={2} className="text-sm">
                                    2
                                </option>
                                <option value={3} className="text-sm">
                                    3
                                </option>
                                <option value={4} className="text-sm">
                                    4
                                </option>
                                <option value={5} className="text-sm">
                                    5
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row gap-2">
                    <div>
                        <img
                            src={img}
                            className="rounded-full hover:scale-105 active:scale-95 duration-200 w-[56px] aspect-square object-cover"
                        />
                    </div>
                    <div className="w-full h-44 relative flex-grow">
                        <textarea value={content} onChange={handleContentChange} className="absolute top-0 left-0 w-full h-full bg-background border-primary border-[0.5px] rounded-[15px] p-4 focus:outline-[#030711] resize-none text-sm"></textarea>
                        <button className="absolute text-accent-100 right-5 bottom-[14px] text-base hover:scale-105 duration-200">
                            POST
                        </button>
                    </div>
                </div>
            </form>
            <form className="flex sm:hidden flex-col gap-3" onSubmit={handlePostSubmit}>
                <div className="flex flex-row gap-3">
                    <div className="flex">
                        <img
                            src={img}
                            className="rounded-full hover:scale-105 active:scale-95 duration-200 w-[40px] aspect-square object-cover"
                        />
                    </div>
                    <div className="flex justify-left items-center gap-[1px] rounded-full group">
                        <p className="text-xs">Rating:</p>
                        <select
                            name="rating"
                            value={rating}
                            onChange={handleRatingChange}
                            className="hover:cursor-pointer text-xs bg-[#fafafa]"
                        >
                            <option value={1} className="text-xs">
                                1
                            </option>
                            <option value={2} className="text-xs">
                                2
                            </option>
                            <option value={3} className="text-xs">
                                3
                            </option>
                            <option value={4} className="text-xs">
                                4
                            </option>
                            <option value={5} className="text-xs">
                                5
                            </option>
                        </select>
                    </div>
                </div>
                <div className="w-full h-44 relative flex-grow">
                    <textarea value={content} onChange={handleContentChange} className="absolute top-0 left-0 w-full h-full bg-background border-primary border-[0.5px] rounded-[15px] p-4 focus:outline-[#030711] resize-none text-xs"></textarea>
                    <button className="absolute text-accent-100 right-5 bottom-[14px] text-sm hover:scale-105 duration-200">
                        POST
                    </button>
                </div>
            </form>
        </>
    );
}

export default NewReview
