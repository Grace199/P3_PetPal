import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ajax_or_login } from '../../util/ajax';
import Comment from './Comment';
import Pagination from '../Pagination';

const AllComments = ({ blogID }) => {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await ajax_or_login(`/blogs/${blogID}/reply?page=${page}`, { method: "GET" }, navigate);
                if (res.ok) {
                    const data = await res.json();
                    const tot = Math.ceil(data.count / 20);
                    setTotalPages(Math.max(tot, 1));
                    setComments(data.results);
                } else {
                    console.error("Error during fetch: ", res);
                }
            } catch (error) {
                console.error("Error during fetch: ", error);
            }
        };
        fetchData();
    }, [blogID, page, navigate]);

    return (
        <>
            <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-6">
                    {comments && comments.map(comment => (
                        <Comment key={comment.id} id={comment.id} name={comment.owner.name} img={comment.owner.avatar} timestamp={comment.timestamp} content={comment.content}></Comment>
                    ))}
                </div>
                <Pagination page={page} totalPages={totalPages} onChange={setPage} />
            </div>
        </>
    )
}

export default AllComments