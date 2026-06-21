import React from 'react'
import backdrop from '../../../../../src/assets/images/Home/heroBanner.jpg'
import ApplicationListCard from '../../../../components/ApplicationShelterCard'
import { useState, useEffect } from 'react'
import { ajax_or_login } from '../../../../util/ajax'
import { useNavigate } from 'react-router-dom'
import Pagination from '../../../../components/Pagination'

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

            const url = '/applications/shelter/list';
            const urlWithParams = `${url}?${params.toString()}`;
            try {
                const res = await ajax_or_login(urlWithParams, { method: "GET" }, navigate);
                if (res.ok) {
                    const data = await res.json();
                    const tot = Math.ceil(data.count / 20);
                    setTotalPages(Math.max(tot, 1));
                    setApplications(data.results);
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
                <div className="relative w-full h-[260px] sm:h-[300px] flex justify-center items-center overflow-hidden">
                    <img
                        src={backdrop}
                        className="absolute inset-0 h-full w-full object-cover object-center"
                        alt=""
                    />
                    <div className="absolute inset-0 bg-primary/65" />
                    <p className="relative text-white text-4xl sm:text-6xl md:text-7xl px-6 font-bold text-center [text-shadow:0_2px_12px_rgba(0,0,0,0.45)]">
                        Applications
                    </p>
                </div>

                <div className="px-mobile md:px-tablet xl:px-desktop pt-8 flex flex-wrap items-center justify-center gap-3">
                    <div className="relative">
                        <select name="status" value={query.status} onChange={handleQueryChange}
                            className="appearance-none hover:cursor-pointer bg-white text-text font-medium text-sm py-2.5 pl-5 pr-10 rounded-full border border-black/10 focus:border-primary focus:outline-none">
                            <option value="">All statuses</option>
                            <option value="pending">Pending</option>
                            <option value="accepted">Accepted</option>
                            <option value="denied">Denied</option>
                            <option value="withdrawn">Withdrawn</option>
                        </select>
                        <i className="uil uil-angle-down absolute right-3 top-1/2 -translate-y-1/2 text-text/50 pointer-events-none text-lg"></i>
                    </div>

                    <div className="relative">
                        <select name="sort" value={query.sort} onChange={handleQueryChange}
                            className="appearance-none hover:cursor-pointer bg-white text-text font-medium text-sm py-2.5 pl-5 pr-10 rounded-full border border-black/10 focus:border-primary focus:outline-none">
                            <option value="">Sort by: default</option>
                            <option value="create_time">Sort by: created</option>
                            <option value="update_time">Sort by: updated</option>
                        </select>
                        <i className="uil uil-angle-down absolute right-3 top-1/2 -translate-y-1/2 text-text/50 pointer-events-none text-lg"></i>
                    </div>
                </div>

                <div className="w-full gap-5 flex flex-col px-mobile md:px-tablet xl:px-desktop pt-8 pb-4">
                    {applications && applications.length > 0 ? applications.map(application => (
                        <ApplicationListCard key={application.id} id={application.id} pet_name={application.petlisting.pet.name} seeker_name={application.seeker.account.name} pet_img={application.petlisting.pet.image1} seeker_address={application.seeker.address} seeker_city={application.seeker.city} seeker_province={application.seeker.province}></ApplicationListCard>
                    )) : (
                        <p className="text-center text-text/60 py-16">No applications yet.</p>
                    )}
                </div>

                <div className="px-mobile md:px-tablet xl:px-desktop pb-16">
                    <Pagination page={query.page} totalPages={totalPages} onChange={(p) => setQuery({ ...query, page: p })} />
                </div>
            </main>
        </>
    )
}

export default ApplicationListSeeker