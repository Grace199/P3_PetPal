import { useEffect, useState } from 'react'
import backdrop from '../../assets/images/Home/heroBanner.jpg'
import { useNavigate } from 'react-router-dom';
import { ajax } from '../../util/ajax';
import BlogListCard from '../../components/BlogListCard';
import Pagination from '../../components/Pagination';

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
                const res = await ajax(`/blogs?search=${search}&page=${page}&type=${type}`, { method: "GET" }, navigate);
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
                <div className="relative w-full h-[260px] sm:h-[320px] flex justify-center items-center overflow-hidden">
                    <img
                        src={backdrop}
                        className="absolute inset-0 h-full w-full object-cover object-center"
                        alt=""
                    />
                    <div className="absolute inset-0 bg-primary/70" />
                    <div className="relative text-center px-4">
                        <p className="text-white text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight">Blogs</p>
                        <p className="text-white mt-2 text-sm sm:text-lg">Tips and stories from our shelters</p>
                    </div>
                </div>
                <div className="w-full px-mobile md:px-tablet xl:px-desktop -mt-8 sm:-mt-10 relative z-10">
                    <div className="flex flex-col sm:flex-row gap-3 bg-white rounded-2xl shadow-[0_6px_20px_rgba(40,60,130,0.12)] p-3">
                        <div className="relative flex-grow">
                            <i className="uil uil-search absolute left-4 top-1/2 -translate-y-1/2 text-text/40 text-xl"></i>
                            <input
                                className="w-full text-sm sm:text-base pl-11 pr-4 py-3 rounded-xl bg-background border border-transparent focus:border-primary focus:outline-none text-text"
                                name="search-bar"
                                placeholder="Search for a blog..."
                                type="text"
                                value={query.search}
                                onChange={event => setQuery({ search: event.target.value, page: 1 })}
                            />
                        </div>
                        <select
                            name="type"
                            value={type}
                            onChange={handleTypeChange}
                            className="hover:cursor-pointer bg-background text-sm sm:text-base px-4 py-3 rounded-xl border border-transparent focus:border-primary focus:outline-none text-text font-medium"
                        >
                            <option value="">All categories</option>
                            <option value="pet_training">Pet Training</option>
                            <option value="pet_care">Pet Care</option>
                            <option value="adoption_tips">Adoption Tips</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>
                <div className="w-full gap-4 sm:gap-5 flex flex-col px-mobile md:px-tablet xl:px-desktop pt-8 sm:pt-12">
                    {blogs && blogs.length > 0 ? blogs.map(blog => (
                        <BlogListCard key={blog.id} id={blog.id} img={blog.shelter.account.avatar} title={blog.title} shelter={blog.shelter.account.name} timestamp={blog.timestamp} articleType={blog.blog_type}></BlogListCard>
                    )) : (
                        <p className="text-center text-text/60 py-16">No blogs found. Try a different search or category.</p>
                    )}
                </div>
                <div className="px-mobile md:px-tablet xl:px-desktop pb-16">
                    <Pagination page={query.page} totalPages={totalPages} onChange={(p) => setQuery({ ...query, page: p })} />
                </div>
            </main>
        </>
    )
}

export default Blogs