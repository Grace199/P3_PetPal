import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ajax_or_login } from '../../util/ajax';
import Review from './Review';
import Pagination from '../Pagination';

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
    }, [shelterID, page, navigate]);

    return (
        <>
            <div className="flex flex-col gap-2">
                {numReviews === 0 ? <p className="text-center py-8 text-accent-200">This shelter doesn't have any reviews yet{isSelf === false ? ", be the first to make one!" : "."}</p> : null}
                <div className="flex flex-col gap-6">
                    {reviews && reviews.map(review => (
                        <Review key={review.id} isSelfReview={isSelf} reviewID={review.id} name={review?.owner} rating={review.rating} content={review.content} timestamp={review.timestamp} hasReplies={review.hasReplies}></Review>
                    ))}
                </div>
                <Pagination page={page} totalPages={totalPages} onChange={setPage} />
            </div>
        </>
    )
}

export default AllReviews