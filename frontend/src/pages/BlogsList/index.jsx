import React, { useEffect, useState } from 'react'
import backdrop from '../../assets/images/Home/heroBanner.jpg'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ajax_or_login } from '../../util/ajax';
import BlogListCard from '../../components/BlogListCard';

const Blogs = () => {
    const [query, setQuery] = useState({ search: "", page: 1 });
    const [totalPages, setTotalPages] = useState(1);
    const [blogs, setBlogs] = useState([]);
    const [type, setType] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { search, page } = query;
                const res = await ajax_or_login(`/blogs?search=${search}&page=${page}&type=${type}`, { method: "GET" }, navigate);
                if (res.ok) {
                    const data = await res.json();
                    const tot = Math.ceil(data.count / 20);
                    setTotalPages(Math.max(tot, 1));
                    setBlogs(data.results);
                } else {
                    console.error("Error during fetch: ", res);
                }
            } catch (error) {
                console.error("Error during fetch: ", error);
            }
        }
        fetchData();
    }, [query, navigate, type]);

    const handleTypeChange = ((event) => {
        const newType = event.target.value;
        setType(newType);
    })

    return (
        <>
            <main className="h-full">
                <div className="w-full flex justify-center items-center h-[300px] bg-black relative flex-col">
                    <div className="z-30">
                        <p className="z-30 text-background text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold">
                            BLOGS
                        </p>
                    </div>
                    <img
                        src={backdrop}
                        className="h-full w-full object-cover object-center absolute opacity-60"
                        alt="backdrop"
                    />
                </div>
                <div className="w-full h-[100px] sm:h-44 gap-8 flex flex-col justify-center items-center px-mobile md:px-tablet xl:px-desktop bg-secondary">
                    <div className="flex w-full flex-row gap-2">
                        <input
                            className="bg-[#F2F5FD] w-full text-sm sm:text-base p-3 sm:p-6 rounded-xl border border-primary placeholder-accent-200 cursor-pointer hover:bg-[#F2F5FD87] focus:outline-none text-accent-100 font-semibold"
                            name="search-bar"
                            placeholder="Search for a blog..."
                            type="text"
                            value={query.search}
                            onChange={event => setQuery({ search: event.target.value, page: 1 })}
                        />
                        <select
                            name="type"
                            value={type}
                            onChange={handleTypeChange}
                            className="hover:cursor-pointer bg-[#F2F5FD] text-sm sm:text-base p-3 sm:p-6 rounded-xl border border-primary"
                        >
                            <option value="" className="text-sm sm:text-base"></option>
                            <option value="other" className="text-sm sm:text-base">Other</option>
                            <option value="pet_training" className="text-sm sm:text-base">Pet Training</option>
                            <option value="pet_care" className="text-sm sm:text-base">Pet Care</option>
                            <option value="adoption_tips" className="text-sm sm:text-base">Adoption Tips</option>
                        </select>
                    </div>
                </div>
                <div className="w-full gap-8 flex flex-col px-mobile md:px-tablet xl:px-desktop pt-6 sm:pt-16">
                    {blogs && blogs.map(blog => (
                        <BlogListCard key={blog.id} id={blog.id} img={blog.shelter.account.avatar} title={blog.title} shelter={blog.shelter.account.name} timestamp={blog.timestamp} articleType={blog.blog_type}></BlogListCard>
                    ))}
                </div>
                <div className="w-full flex justify-center align-middle pt-8 gap-4">
                    {query.page > 1 ?
                        <button className="flex w-[72px] sm:w-24 py-2 rounded-lg justify-center items-center bg-accent-100 hover:scale-105 active:scale-95 duration-200" onClick={() => setQuery({ ...query, page: query.page - 1 })}>
                            <p className="text-background block sm:hidden font-semibold text-xs sm:text-base">Prev</p>
                            <p className="text-background hidden sm:block font-semibold text-xs sm:text-base">Previous</p>
                        </button>
                        :
                        <div className="flex w-[72px] sm:w-24 py-2 rounded-lg justify-center items-center bg-secondary hover:cursor-default">
                            <p className="text-background block sm:hidden font-semibold text-xs sm:text-base">Prev</p>
                            <p className="text-background hidden sm:block font-semibold text-xs sm:text-base">Previous</p>
                        </div>}
                    <div className="flex items-center">
                        <p className="font-semibold text-xs sm:text-base">Page {query.page} of {totalPages}</p>
                    </div>
                    {query.page < totalPages ?
                        <button className="flex w-[72px] sm:w-24 py-2 rounded-lg justify-center items-center bg-accent-100 hover:scale-105 active:scale-95 duration-200" onClick={() => setQuery({ ...query, page: query.page + 1 })}>
                            <p className="text-background font-semibold text-xs sm:text-base">Next</p>
                        </button>
                        :
                        <div className="flex w-[72px] sm:w-24 py-2 rounded-lg justify-center items-center bg-secondary hover:cursor-default">
                            <p className="text-background font-semibold text-xs sm:text-base">Next</p>
                        </div>}
                </div>
            </main>
        </>
    )
}

export default Blogs