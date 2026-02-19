import React, { useEffect, useState } from 'react'
import { ajax, ajax_or_login } from '../../util/ajax';
import { Link, useNavigate } from 'react-router-dom';

const BlogsCreate = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [type, setType] = useState("other");
    const [id, setId] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        setId(parseInt(localStorage.getItem("userID")));
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(content);
            const blogData = {
                title: title,
                content: content,
                blog_type: type
            }
            console.log(blogData);
            const res = await ajax_or_login(`/blogs/`, { method: "POST", body: JSON.stringify(blogData), headers: { 'Content-Type': 'application/json' } }, navigate);

            if (res.ok) {
                setTitle("");
                setContent("");
                setType("other");
            } else {
                console.error("Error during fetch: ", res);
            }
        } catch (error) {
            console.error("Error during fetch: ", error);
        }
    }

    const handleTitleChange = (event) => {
        const newTitle = event.target.value;
        setTitle(newTitle);
    }

    const handleContentChange = (event) => {
        const newContent = event.target.value;
        setContent(newContent);
    }

    const handleTypeChange = ((event) => {
        const newType = event.target.value;
        setType(newType);
    })

    return (
        <>
            <main className="px-mobile md:px-tablet xl:px-desktop pt-6 sm:pt-16 h-full">
                <div className="bg-[#F2F5FD] w-full rounded-b-2xl">
                    <div className="rounded-2xl flex flex-col overflow-hidden gap-4">
                        <div className="bg-secondary flex flex-row justify-between items-center h-12 px-4 sm:px-12">
                            <p className="text-text text-xl font-semibold">Create a New Blog Post</p>
                            <Link to={`/shelterDetail/${id}/`}>
                                <i className="uil uil-times text-text text-3xl"></i>
                            </Link>
                        </div>
                        <form className="flex flex-col px-6 sm:px-12 md:px-20 gap-6 pb-8" onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-2">
                                <p className="max-sm:text-sm">Title:</p>
                                <textarea rows="1" className="w-full p-3 border border-secondary rounded-[7px] font-light resize-none max-sm:text-sm" value={title} onChange={handleTitleChange} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="max-sm:text-sm">Content:</p>
                                <textarea rows="10" className="w-full p-3 border border-secondary rounded-[7px] font-light resize-none max-sm:text-sm" value={content} onChange={handleContentChange} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="max-sm:text-sm">Title:</p>
                                <select
                                    name="type"
                                    value={type}
                                    onChange={handleTypeChange}
                                    className="hover:cursor-pointer w-full border-secondary text-sm sm:text-base rounded-[7px] p-3 sm:p-6 border text-accent-100 font-semibold"
                                >
                                    <option value="other" className="text-sm sm:text-base">Other</option>
                                    <option value="pet_training" className="text-sm sm:text-base">Pet Training</option>
                                    <option value="pet_care" className="text-sm sm:text-base">Pet Care</option>
                                    <option value="adoption_tips" className="text-sm sm:text-base">Adoption Tips</option>
                                </select>
                            </div>
                            <div className="flex justify-center md:justify-end">
                                <button type="submit" className="bg-accent-100 rounded-full px-10 py-4 text-[#F2F5FD] font-bold text-lg">Post</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    )
}

export default BlogsCreate