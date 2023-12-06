import React, { useState, useMemo, useEffect } from 'react'
import { useSearchParams, useNavigate } from "react-router-dom";
import backdrop from '../../assets/images/Home/heroBanner.jpg'
import AnimalCardWhite from '../../components/AnimalCardWhite'
import FilterForm from '../../components/FilterForm'
import { ajax_or_login } from '../../util/ajax'

const Index = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [totalPage, setTotalPage] = useState(20);
    const [openFilter, setOpenFilter] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        animal: null,
        shelter: null,
        status: null,
        breed: null,
        age: null,
        size: null,
        colour: null,
        sex: null,
    })

    const handleSortChange = (event) => {
        const newSortValue = event.target.value;
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('sort', newSortValue);
        setSearchParams(newSearchParams);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newSearchParams = new URLSearchParams(searchParams);

        for (let name in formData) {
            if (formData[name] !== null && formData[name] !== '') {
                newSearchParams.set(name, formData[name]);
            }
        }

        setSearchParams(newSearchParams);
    }

    const query = useMemo(() => ({
        animal: searchParams.get("animal") ?? 'Dog',
        shelter: searchParams.get("shelter") ?? '',
        status: searchParams.get("status") ?? '',
        breed: searchParams.get("breed") ?? '',
        age: searchParams.get("age") ?? '',
        size: searchParams.get("size") ?? '',
        colour: searchParams.get("colour") ?? '',
        sex: searchParams.get("sex") ?? '',
        sort: searchParams.get("sort") ?? 'name',
        page: parseInt(searchParams.get("page") ?? 1),
    }), [searchParams]);

    useEffect(() => {
        // Fetch data
        const filteredQuery = Object.fromEntries(
            Object.entries(query).filter(([_, value]) => value !== '' && value !== null)
        );

        const queryString = new URLSearchParams(filteredQuery).toString();
        console.log(queryString);

        async function fetchData() {
            try {
                const res = await ajax_or_login(`/petlisting${queryString ? `?${queryString}` : ''}`, {
                    method: "GET"
                }, navigate);

                if (res.ok) {
                    const data = await res.json();
                    console.log(data);

                } else {
                    console.error("Error fetching data:", res.status, res.statusText);
                }
            } catch (error) {
                console.error("Error during fetch:", error.message);
            }
        };
        fetchData();
        setTotalPage(20);
    }, [query, navigate]);

    return (
        <>
            <main className="z-0">
                <div className="w-full flex justify-center items-center h-[300px] bg-black relative flex-col">
                    <div className="z-30">
                        <p
                            className="z-30 text-background text-8xl font-bold"
                        >
                            {query.animal.toUpperCase()}
                        </p>
                    </div>
                    <img
                        src={backdrop}
                        className="h-full w-full object-cover object-center absolute opacity-60"
                        alt="backdrop"
                    />
                </div>
                <div className="px-mobile md:px-tablet xl:px-desktop py-6">
                    <div className="flex gap-3 max-xs:gap-1">
                        <button
                            className="bg-accent-100 text-background max-sm:text-sm py-3 px-4 md:px-8 rounded-full hover:scale-105 active:scale-95 hover:bg-accent-200"
                            id="all_filter_btn"
                            onClick={() => { setOpenFilter(true) }}
                        >
                            All Filters
                        </button>
                        <div
                            className="flex justify-center items-center gap-1 py-3 px-4 max-sm:px-2 md:px-8 rounded-full group"
                        >
                            <form>
                                <select name="sort" value={query.sort} onChange={handleSortChange} className='hover:cursor-pointer'>
                                    <option value="name">sort by name</option>
                                    <option value="age">sort by age</option>
                                    <option value="size">sort by size</option>
                                </select>
                            </form>
                        </div>
                    </div>

                    <div className="w-full py-10 flex flex-wrap gap-3 justify-center">
                        <AnimalCardWhite id={1} name={"bobby"} img={backdrop} properties={"Puppy • Shiba Inu"} />
                        <AnimalCardWhite id={1} name={"bobby"} img={backdrop} properties={"Puppy • Shiba Inu"} />
                        <AnimalCardWhite id={1} name={"bobby"} img={backdrop} properties={"Puppy • Shiba Inu"} />
                        <AnimalCardWhite id={1} name={"bobby"} img={backdrop} properties={"Puppy • Shiba Inu"} />
                        <AnimalCardWhite id={1} name={"bobby"} img={backdrop} properties={"Puppy • Shiba Inu"} />
                        <AnimalCardWhite id={1} name={"bobby"} img={backdrop} properties={"Puppy • Shiba Inu"} />
                        <AnimalCardWhite id={1} name={"bobby"} img={backdrop} properties={"Puppy • Shiba Inu"} />
                        <AnimalCardWhite id={1} name={"bobby"} img={backdrop} properties={"Puppy • Shiba Inu"} />
                        <AnimalCardWhite id={1} name={"bobby"} img={backdrop} properties={"Puppy • Shiba Inu"} />
                        <AnimalCardWhite id={1} name={"bobby"} img={backdrop} properties={"Puppy • Shiba Inu"} />
                        <AnimalCardWhite id={1} name={"bobby"} img={backdrop} properties={"Puppy • Shiba Inu"} />
                        <AnimalCardWhite id={1} name={"bobby"} img={backdrop} properties={"Puppy • Shiba Inu"} />
                        <AnimalCardWhite id={1} name={"bobby"} img={backdrop} properties={"Puppy • Shiba Inu"} />
                        <AnimalCardWhite id={1} name={"bobby"} img={backdrop} properties={"Puppy • Shiba Inu"} />
                        <AnimalCardWhite id={1} name={"bobby"} img={backdrop} properties={"Puppy • Shiba Inu"} />
                        <AnimalCardWhite id={1} name={"bobby"} img={backdrop} properties={"Puppy • Shiba Inu"} />
                        <AnimalCardWhite id={1} name={"bobby"} img={backdrop} properties={"Puppy • Shiba Inu"} />
                        <AnimalCardWhite id={1} name={"bobby"} img={backdrop} properties={"Puppy • Shiba Inu"} />
                        <AnimalCardWhite id={1} name={"bobby"} img={backdrop} properties={"Puppy • Shiba Inu"} />
                        <AnimalCardWhite id={1} name={"bobby"} img={backdrop} properties={"Puppy • Shiba Inu"} />
                    </div>
                </div>
                <div className="w-full flex justify-center items-center gap-5">
                    {query.page > 1 &&
                        <button
                            className="bg-transparent border border-primary text-primary font-bold px-10 py-3 rounded-xl hover:scale-105 active:scale-95"
                            onClick={() => {
                                const newPage = query.page - 1;
                                const newSearchParams = new URLSearchParams(searchParams);
                                newSearchParams.set('page', newPage);
                                setSearchParams(newSearchParams);
                            }}
                        >
                            Previous
                        </button>
                    }

                    {query.page < totalPage &&
                        <button
                            className="bg-transparent border border-primary text-primary font-bold px-10 py-3 rounded-xl hover:scale-105 active:scale-95"
                            onClick={() => {
                                const newPage = query.page + 1;
                                const newSearchParams = new URLSearchParams(searchParams);
                                newSearchParams.set('page', newPage);
                                setSearchParams(newSearchParams);
                            }}
                        >
                            Next
                        </button>
                    }
                </div>
            </main>
            <FilterForm openFilter={openFilter} setOpenFilter={setOpenFilter} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
        </>
    )
}

export default Index
