import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ajax_or_login } from '../../util/ajax';
import Review from './Review';

const AllReviews = ({ shelterID }) => {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await ajax_or_login(`/comments/shelter/${shelterID}/review/`, { method: "GET" }, navigate);
                if (res.ok) {
                    const data = await res.json();
                    setTotalPages(Math.ceil(data.count / 20));
                    setReviews(data.results);
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
            <div className="flex flex-col gap-1">
                {reviews && reviews.map(review => (
                    <Review key={review.id} name={review?.owner} rating={review.rating} content={review.content} timestamp={review.timestamp} hasReplies={review.hasReplies}></Review>
                ))}
            </div>
        </>
    )
}

export default AllReviews