import React from 'react'
import backdrop from '../../../../../src/assets/images/Home/heroBanner.jpg'
import ApplicationListCard from '../../../../components/ApplicationSeekerCard'
import { useState, useEffect } from 'react'
import { ajax_or_login } from '../../../../util/ajax'
import { useNavigate } from 'react-router-dom'

const ApplicationListSeeker = () => {
    const [query, setQuery] = useState({ status: "", sort: "", page: 1 });
    const [totalPages, setTotalPages] = useState(1);
    const [applications, setApplications] = useState([]);
    const navigate = useNavigate();

    const handleQueryChange = (e) => {
        const { name, value } = e.target;
        setQuery({ ...query, [name]: value });
    };


    useEffect(() => {
        const fetchData = async () => {
            const params = new URLSearchParams();
            params.append('status', query.status);
            params.append('sort', query.sort);
            params.append('page', query.page);

            const url = '/applications/seeker/list';
            const urlWithParams = `${url}?${params.toString()}`;
            try {
                const res = await ajax_or_login(urlWithParams, { method: "GET" }, navigate);
                if (res.ok) {
                    const data = await res.json();
                    const tot = Math.ceil(data.count / 20);
                    setTotalPages(Math.max(tot, 1));
                    setApplications(data.results);
                    console.log(data.results);
                } else {
                    console.error("Error during fetch: ", res);
                }
            } catch (error) {
                console.error("Error during fetch: ", error);
            }
        };
        fetchData();
    }, [query, navigate]);

    return (
        <>
            <main className="h-full">
                <div className="w-full flex justify-center items-center h-[300px] bg-black relative flex-col">
                    <div className="z-30 text-center text-background">
                        <p className="z-30 text-4xl sm:text-6xl md:text-8xl px-6 font-bold">
                            My Applications
                        </p>
                    </div>
                    <img
                        src={backdrop}
                        className="h-full w-full object-cover object-center absolute opacity-60"
                        alt="backdrop"
                    />
                </div>
                <div className="flex gap-5 max-sm:flex-col px-mobile md:px-tablet xl:px-desktop">
                    <div className="flex max-sm:justify-start justify-center items-center gap-1 py-3 rounded-full group">
                        <label
                            htmlFor="filter_by_status"
                            className="text-xs font-thin sm:text-sm text-black"
                        >Filter by Status:
                        </label>
                        <form id="filter_by_status">
                            <select name="status" value={query.status} onChange={handleQueryChange}
                                className='hover:cursor-pointer px-1 py-1 flex flex-col place-items-center rounded-3xl bg-primary w-full text-xs md:text-sm lg:text-base xl:text-lg'>
                                <option value=""></option>
                                <option value="pending">pending</option>
                                <option value="denied">denied</option>
                                <option value="accepted">accepted</option>
                                <option value="withdrawn">withdrawn</option>
                            </select>
                        </form>
                    </div>

                    <div className="flex justify-center items-center gap-1 py-3 rounded-full group max-sm:justify-start">
                        <label
                            htmlFor="sort_by_time"
                            className="text-xs font-thin sm:text-sm text-black"
                        >Sort by Create or Update Time:
                        </label>
                        <form id="sort_by_time">
                            <select name="sort" value={query.sort} onChange={handleQueryChange} className='hover:cursor-pointer px-1 py-1 flex flex-col place-items-center rounded-3xl bg-primary w-full text-xs md:text-sm lg:text-base xl:text-lg'>
                                <option value=""></option>
                                <option value="create_time">creation</option>
                                <option value="update_time">update</option>
                            </select>
                        </form>
                    </div>
                </div>
                <div className="w-full gap-8 flex flex-col px-mobile md:px-tablet xl:px-desktop pt-6 sm:pt-16">
                    {applications && applications.map(application => (
                        <ApplicationListCard key={application.id} id={application.id} pet_name={application.petlisting.pet.name} shelter_name={application.shelter.account.name} pet_img={application.petlisting.pet.image1} shelter_address={application.shelter.address} shelter_city={application.shelter.city} shelter_province={application.shelter.province}></ApplicationListCard>
                    ))}

                    {(!applications || applications.length === 0) && <p>No applications</p>}
                </div>
                <div className="w-full flex justify-center align-middle pt-8 gap-4">
                    {query.page > 1 ?
                        <button className="flex bg-accent-100 w-[72px] sm:w-24 py-2 rounded-lg justify-center items-center" onClick={() => setQuery({ ...query, page: query.page - 1 })}> Previous </button>
                        :
                        <div className="flex bg-secondary w-[72px] sm:w-24 py-2 rounded-lg justify-center items-center">
                            <p className="text-background font-semibold text-xs sm:text-base">Previous</p>
                        </div>
                    }
                    <div className="flex items-center">
                        <p className="font-semibold text-xs sm:text-base">Page {query.page} of {totalPages}</p>
                    </div>
                    {query.page < totalPages ?
                        <button className="flex bg-accent-100 w-[72px] sm:w-24 py-2 rounded-lg justify-center items-center" onClick={() => setQuery({ ...query, page: query.page + 1 })}> Next </button>
                        :
                        <div className="flex bg-secondary w-[72px] sm:w-24 py-2 rounded-lg justify-center items-center">
                            <p className="text-background font-semibold text-xs sm:text-base">Next</p>
                        </div>
                    }
                </div>
            </main>
        </>
    )
}

export default ApplicationListSeeker