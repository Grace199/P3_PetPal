import React from 'react'
import backdrop from '../../assets/images/Home/heroBanner.jpg'
import ShelterListCard from '../../components/ShelterListCard'
import { useState, useEffect } from 'react'
import { ajax_or_login } from '../../util/ajax'
import { useNavigate } from 'react-router-dom'

const Shelters = () => {
    const [query, setQuery] = useState({ search: "", page: 1 });
    const [totalPages, setTotalPages] = useState(1);
    const [shelters, setShelters] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { search, page } = query;
                const res = await ajax_or_login(`/accounts/shelter?search=${search}&page=${page}`, { method: "GET" }, navigate);
                if (res.ok) {
                    const data = await res.json();
                    setTotalPages(Math.ceil(data.count / 20));
                    setShelters(data.results);
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
                    <div className="z-30">
                        <p className="z-30 text-background text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold">
                            SHELTERS
                        </p>
                    </div>
                    <img
                        src={backdrop}
                        className="h-full w-full object-cover object-center absolute opacity-60"
                        alt="backdrop"
                    />
                </div>
                <div className="w-full h-[100px] sm:h-44 gap-8 flex flex-col justify-center items-center px-mobile md:px-tablet xl:px-desktop bg-secondary">
                    <input
                        className="bg-[#F2F5FD] w-full text-sm sm:text-base p-3 sm:p-6 rounded-xl border border-primary placeholder-accent-200 cursor-pointer hover:bg-[#F2F5FD87] focus:outline-none text-accent-100 font-semibold"
                        name="search-bar"
                        placeholder="Search for a shelter..."
                        type="text"
                        value={query.search}
                        onChange={event => setQuery({ search: event.target.value, page: 1 })}
                    />
                </div>
                <div className="w-full gap-8 flex flex-col px-mobile md:px-tablet xl:px-desktop pt-6 sm:pt-16">
                    {shelters && shelters.map(shelter => (
                        <ShelterListCard key={shelter.id} id={shelter.id} name={shelter.account.name} img={shelter.account.avatar} address={shelter.address} city={shelter.city} province={shelter.province}></ShelterListCard>
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

export default Shelters