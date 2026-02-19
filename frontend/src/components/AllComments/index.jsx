import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ajax_or_login } from '../../util/ajax';
import Comment from './Comment';

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
    }, [page, navigate]);

    return (
        <>
            <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-6">
                    {comments && comments.map(comment => (
                        <Comment key={comment.id} id={comment.id} name={comment.owner.name} img={comment.owner.avatar} timestamp={comment.timestamp} content={comment.content}></Comment>
                    ))}
                </div>
                <div className="w-full flex justify-center align-middle pt-8 gap-4">
                    {comments && page > 1 ?
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
                    {comments && page < totalPages ?
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

export default AllComments