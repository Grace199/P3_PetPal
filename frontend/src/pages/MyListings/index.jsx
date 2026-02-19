import React, { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from "react-router-dom";
import backdrop from '../../assets/images/MyListing.png'
import EditAnimalCard from '../../components/EditAnimalCard'
import FilterForm from '../../components/FilterForm'
import { ajax_or_login } from '../../util/ajax'
import { useNavigate, Link } from 'react-router-dom';


const Index = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [totalPage, setTotalPage] = useState(0);
    const [openFilter, setOpenFilter] = useState(false);
    const [petlistings, setPetlistings] = useState([]);
    const AGE_CHOICES = ["Infant", "Young", "Adult", "Senior"];
    const navigate = useNavigate();
    const [shelter, setShelter] = useState(null);

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
            if (formData[name] !== null) {
                newSearchParams.set(name, formData[name]);
            }
        }
        newSearchParams.set('page', 1);

        setSearchParams(newSearchParams);
    }

    const query = useMemo(() => ({
        animal: searchParams.get("animal") ?? 'Dog',
        status: searchParams.get("status") ?? '',
        breed: searchParams.get("breed") ?? '',
        age: searchParams.get("age") ?? '',
        size: searchParams.get("size") ?? '',
        colour: searchParams.get("colour") ?? '',
        sex: searchParams.get("sex") ?? '',
        sort: searchParams.get("sort") ?? 'name',
        page: parseInt(searchParams.get("page") ?? 1),
    }), [searchParams]);

    const fetchData = async () => {
        try {
            if (!JSON.parse(localStorage.getItem("isSeeker"))) {
                const queryString = constructQueryString(query);
                const res = await ajax_or_login(`/petlisting${queryString ? `?${queryString}&shelter=${shelter}` : `?shelter=${shelter}`}`, {
                    method: "GET"
                }, navigate);

                if (res.ok) {
                    const data = await res.json();
                    setTotalPage(Math.max(1, Math.ceil(data.count / 20)));
                    setPetlistings(data.results);
                } else {
                    handleFetchError(res);
                }
            } else {
                navigate("/")
            }
        } catch (error) {
            handleFetchError(error);
        }
    };

    useEffect(() => {
        if (shelter !== null && shelter !== '') {
            fetchData();
        }
    }, [query, shelter]);

    const constructQueryString = (params) => {
        return new URLSearchParams(params).toString();
    };

    const handleFetchError = (error) => {
        console.error("Error during fetch:", error.message);

        // Reset page parameter in searchParams state to 1
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('page', 1);
        setSearchParams(newSearchParams);
    };

    const getShelter = async () => {
        const id = parseInt(localStorage.getItem("userID"), 10);
        const res = await ajax_or_login(`/accounts/shelter/${id}`, { method: "GET" }, navigate);
        if (res.ok) {
            const data = await res.json();
            console.log(data);
            setShelter(data.account.name);
        }
    }

    useEffect(() => {
        getShelter();
    }, [])


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
                    <div className="flex gap-3 max-xs:gap-1 justify-between max-md:flex-col">
                        <div className='flex max-md:flex-col'>
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

                        <Link to="/petlisting/create/" className='text-center py-3 px-4 max-sm:px-2 md:px-8 rounded-full bg-primary hover:bg-secondary'><i className="uil uil-plus"></i> Create Listing</Link>
                    </div>

                    <div className="w-full py-10 flex flex-wrap gap-3 justify-center">

                        {petlistings && petlistings.map(petlisting => (
                            <EditAnimalCard key={petlisting.id} id={petlisting.id} name={petlisting.pet.name} img={petlisting.pet.image1} properties={`${AGE_CHOICES[petlisting.pet.age - 1]} • ${petlisting.pet.breed}`} />
                        ))}

                        {(!petlistings || petlistings.length === 0) && "No results"}
                    </div>
                </div>
                <div className="w-full flex justify-center items-center gap-5">
                {query.page > 1 ?
                        <button
                            className="bg-transparent border border-primary text-primary font-bold px-5 py-3 rounded-xl hover:scale-105 active:scale-95"
                            onClick={() => {
                                const newPage = query.page - 1;
                                const newSearchParams = new URLSearchParams(searchParams);
                                newSearchParams.set('page', newPage);
                                setSearchParams(newSearchParams);
                            }}
                        >
                            Prev
                        </button>

                        :

                        <button
                            className="bg-transparent border border-secondary text-secondary font-bold px-5 py-3 rounded-xl"
                        >
                            Prev
                        </button>
                    }

                    <p>Page {query.page} of {totalPage}</p>

                    {query.page < totalPage ?
                        <button
                            className="bg-transparent border border-primary text-primary font-bold px-5 py-3 rounded-xl hover:scale-105 active:scale-95"
                            onClick={() => {
                                const newPage = query.page + 1;
                                const newSearchParams = new URLSearchParams(searchParams);
                                newSearchParams.set('page', newPage);
                                setSearchParams(newSearchParams);
                            }}
                        >
                            Next
                        </button>

                        :

                        <button
                            className="bg-transparent border border-secondary text-secondary font-bold px-5 py-3 rounded-xl"
                        >
                            Next
                        </button>
                    }
                </div>
            </main>
            <FilterForm openFilter={openFilter} setOpenFilter={setOpenFilter} handleInputChange={handleInputChange} handleSubmit={handleSubmit} shelter={shelter} />
        </>
    )
}

export default Index
