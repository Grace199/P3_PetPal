import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ajax_or_login } from '../../util/ajax';
import NewCommment from '../../components/NewComment'
import AllComments from '../../components/AllComments';

const formatBlogType = (type) => {
    switch (type) {
        case 'other':
            return 'Other';
        case 'pet_training':
            return 'Pet Training';
        case 'pet_care':
            return 'Pet Care';
        case 'adoption_tips':
            return 'Adoption Tips';
        default:
            return '';
    }
};

const formatTimestamp = (timestamp) => {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    const formattedDate = new Date(timestamp).toLocaleDateString(undefined, options);
    return formattedDate;
};

const BlogsDetail = () => {
    const { blogID } = useParams();
    const [blog, setBlog] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await ajax_or_login(`/blogs/${blogID}/`, { method: "GET" }, navigate);

                if (res.ok) {
                    const data = await res.json();
                    setBlog(data);
                    setAvatar(localStorage.getItem("avatar"));
                }
            } catch (error) {
                console.error("Error during fetch: ", error);
            }
        };
        fetchData();
    }, [blogID, navigate]);

    const formattedBlogType = blog ? formatBlogType(blog.blog_type) : '';
    const formattedDate = blog ? formatTimestamp(blog.timestamp) : '';

    return (
        <>
            <main className="h-full">
                <div className="w-full max-w-3xl mx-auto flex flex-col gap-4 px-mobile md:px-6 pt-6 sm:pt-12">
                    <Link
                        to={`/blogs/`}
                        className="text-primary flex items-center hover:text-accent-100 w-max duration-200 pb-2">
                        <i className="uil uil-angle-left text-3xl"></i>All Blogs
                    </Link>
                    <span className="w-max text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-accent-100 bg-accent-100/10 rounded-full px-3 py-1">
                        {formattedBlogType}
                    </span>
                    <p className="text-text font-bold text-3xl sm:text-5xl leading-tight">{blog?.title}</p>
                    <div className="flex items-center gap-3 pb-2 border-b border-black/10">
                        <img
                            src={blog?.shelter.account.avatar}
                            alt=""
                            className="w-10 h-10 rounded-full object-cover ring-1 ring-black/5"
                        />
                        <div className="flex flex-col">
                            <p className="text-text text-sm font-semibold">{blog?.shelter.account.name}</p>
                            <p className="text-text/60 text-xs">{formattedDate}</p>
                        </div>
                    </div>
                    <p className="whitespace-pre-line text-base text-text/90 leading-relaxed py-2">{blog?.content}</p>
                </div>
                <div className="w-full max-w-3xl mx-auto px-mobile md:px-6 pt-10 sm:pt-16 pb-16">
                    <div className="w-full flex flex-col bg-white rounded-3xl shadow-[0_6px_20px_rgba(0,0,0,0.08)] px-6 sm:px-10 py-10 gap-8">
                        <div className="flex flex-col">
                            <p className="text-text text-xl sm:text-2xl font-bold mb-3">Join the Conversation</p>
                            <div className="border-t border-black/10 mb-5"></div>
                            <NewCommment key={blogID} blogID={blogID} img={avatar}></NewCommment>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-text text-xl sm:text-2xl font-bold mb-3">All Comments</p>
                            <div className="border-t border-black/10 mb-5"></div>
                            <AllComments key={blogID} blogID={blogID}></AllComments>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default BlogsDetail