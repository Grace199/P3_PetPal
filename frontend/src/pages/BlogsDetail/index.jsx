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
                <div className="w-full flex flex-col gap-4 px-mobile md:px-tablet xl:px-desktop pt-6 sm:pt-16">
                    <Link
                        to={`/blogs/`}
                        className="text-primary flex items-center hover:text-accent-100 w-max hover:scale-105 duration-200 active:scale-95 pb-3">
                        <i className="uil uil-angle-left text-3xl"></i>All Blogs
                    </Link>
                    <div className="flex">
                        <p className="text-gray font-semibold text-sm sm:text-base">{formattedBlogType}</p>
                    </div>
                    <div className="flex">
                        <p className="text-text font-semibold text-4xl sm:text-6xl">{blog?.title}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="flex">
                            <p className="className= text-gray text-sm sm:text-base">By <span className="font-semibold">{blog?.shelter.account.name}</span></p>
                        </div>
                        <div className="flex">
                            <p className="className= text-gray text-sm sm:text-base">{formattedDate}</p>
                        </div>
                    </div>
                    <div className="flex p-3">
                        <p className="whitespace-pre-line text-sm">{blog?.content}</p>
                    </div>
                </div>
                <div className="w-full gap-14 flex flex-col px-mobile md:px-tablet xl:px-desktop pt-6 sm:pt-16">
                    <div className="w-full flex flex-col justify-center bg-[#FAFAFA] rounded-[30px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] px-8 md:px-24 py-16 gap-6">
                        <div className="flex flex-col gap-5 sm:gap-8">
                            <div className="flex flex-col">
                                <p className="text-text text-xl font-bold mb-1">Join the Conversation</p>
                                <div className="border-t-2 mb-4"></div>
                                <NewCommment key={blogID} blogID={blogID} img={avatar}></NewCommment>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-text text-xl font-bold mb-1">All Comments</p>
                                <div className="border-t-2 mb-4"></div>
                                <AllComments key={blogID} blogID={blogID}></AllComments>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default BlogsDetail