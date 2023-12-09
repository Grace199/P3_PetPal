import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ajax_or_login } from '../../util/ajax';
import Review from './Review';

const AllReviews = ({ shelterID, isSelf }) => {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [reviews, setReviews] = useState([]);
    const [numReviews, setNumReviews] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await ajax_or_login(`/comments/shelter/${shelterID}/review?page=${page}`, { method: "GET" }, navigate);
                if (res.ok) {
                    const data = await res.json();
                    const tot = Math.ceil(data.count / 20);
                    setTotalPages(Math.max(tot, 1));
                    setReviews(data.results);
                    setNumReviews(data.count);
                } else {
                    console.error("Error during fetch: ", res);
                }
            } catch (error) {
                console.error("Error during fetch: ", error);
            }
        };
        fetchData();
    }, [page, navigate]);

    return (
        <>
            <div className="flex flex-col gap-2">
                {numReviews === 0 && isSelf === false ? <p className="text-center pt-2 text-accent-200">This shelter doesn't have any reviews yet, be the first to make one!</p> : <p></p>}
                <div className="flex flex-col gap-6">
                    {reviews && reviews.map(review => (
                        <Review key={review.id} isSelfReview={isSelf} reviewID={review.id} name={review?.owner} rating={review.rating} content={review.content} timestamp={review.timestamp} hasReplies={review.hasReplies}></Review>
                    ))}
                </div>
                <div className="w-full flex justify-center align-middle pt-8 gap-4">
                    {reviews && page > 1 ?
                        <button className="flex w-[72px] sm:w-24 py-2 rounded-lg justify-center items-center bg-accent-100 hover:scale-105 active:scale-95 duration-200" onClick={() => setPage(page - 1)}>
                            <p className="text-background block sm:hidden font-semibold text-xs sm:text-base">Prev</p>
                            <p className="text-background hidden sm:block font-semibold text-xs sm:text-base">Previous</p>
                        </button>
                        :
                        <button className="flex w-[72px] sm:w-24 py-2 rounded-lg justify-center items-center bg-secondary hover:cursor-default">
                            <p className="text-background block sm:hidden font-semibold text-xs sm:text-base">Prev</p>
                            <p className="text-background hidden sm:block font-semibold text-xs sm:text-base">Previous</p>
                        </button>
                    }
                    <div className="flex items-center">
                        <p className="font-semibold text-xs sm:text-base text-center">Page {page} of {totalPages}</p>
                    </div>
                    {reviews && page < totalPages ?
                        <button className="flex w-[72px] sm:w-24 py-2 rounded-lg justify-center items-center bg-accent-100 hover:scale-105 active:scale-95 duration-200" onClick={() => setPage(page + 1)}>
                            <p className="text-background font-semibold text-xs sm:text-base">Next</p>
                        </button>
                        :
                        <button className="flex w-[72px] sm:w-24 py-2 rounded-lg justify-center items-center bg-secondary hover:cursor-default">
                            <p className="text-background font-semibold text-xs sm:text-base">Next</p>
                        </button>
                    }
                </div>
            </div>
        </>
    )
}

export default AllReviews