import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import backdrop from "../../assets/images/Home/heroBanner.jpg";
import AnimalCardWhite from "../../components/AnimalCardWhite";
import FilterForm from "../../components/FilterForm";
import { ajax } from "../../util/ajax";

const AGE_CHOICES = ["Infant", "Young", "Adult", "Senior"];

const Index = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [totalPage, setTotalPage] = useState(1);
    const [openFilter, setOpenFilter] = useState(false);
    const [petlistings, setPetlistings] = useState([]);

    const [formData, setFormData] = useState({
        animal: null,
        shelter: null,
        status: null,
        breed: null,
        age: null,
        size: null,
        colour: null,
        sex: null,
    });

    const handleSortChange = (event) => {
        const newSortValue = event.target.value;
        const next = new URLSearchParams(searchParams);
        next.set("sort", newSortValue);
        next.set("page", "1");
        setSearchParams(next);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const next = new URLSearchParams(searchParams);

        Object.entries(formData).forEach(([key, val]) => {
            // Only set if user actually chose something meaningful
            if (val !== null && val !== "") next.set(key, String(val));
            else next.delete(key);
        });

        next.set("page", "1");
        setSearchParams(next);
    };

    const query = useMemo(() => {
        const pageRaw = searchParams.get("page");
        const page = Number(pageRaw ?? 1);
        return {
            animal: searchParams.get("animal") ?? "",
            shelter: searchParams.get("shelter") ?? "",
            status: searchParams.get("status") ?? "",
            breed: searchParams.get("breed") ?? "",
            age: searchParams.get("age") ?? "",
            size: searchParams.get("size") ?? "",
            colour: searchParams.get("colour") ?? "",
            sex: searchParams.get("sex") ?? "",
            sort: searchParams.get("sort") ?? "name",
            page: Number.isFinite(page) && page > 0 ? page : 1,
        };
    }, [searchParams]);

    const constructQueryString = (params) => {
        const sp = new URLSearchParams();
        Object.entries(params).forEach(([k, v]) => {
            // omit empty strings
            if (v !== "" && v !== null && v !== undefined) sp.set(k, String(v));
        });
        return sp.toString();
    };

    const handleFetchError = (err) => {
        console.error("Error during fetch:", err);

        // reset page to 1 if server rejected the page, etc.
        const next = new URLSearchParams(searchParams);
        next.set("page", "1");
        setSearchParams(next);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const queryString = constructQueryString(query);

                // Use trailing slash if your Django URLs require it
                const url = `/petlisting/${queryString ? `?${queryString}` : ""}`;

                const res = await ajax(url, { method: "GET" });

                if (!res.ok) {
                    handleFetchError(`HTTP ${res.status}`);
                    return;
                }

                const data = await res.json();
                setTotalPage(Math.max(1, Math.ceil((data.count ?? 0) / 20)));
                setPetlistings(Array.isArray(data.results) ? data.results : []);
            } catch (error) {
                handleFetchError(error?.message ?? error);
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]); // searchParams changes -> query changes -> refetch

    return (
        <>
            <main className="z-0">
                <div className="w-full flex justify-center items-center h-[300px] bg-black relative flex-col">
                    <div className="z-30">
                        <p className="z-30 text-background text-8xl font-bold">
                            {query.animal ? query.animal.toUpperCase() : "ALL PETS"}
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
                            onClick={() => setOpenFilter(true)}
                        >
                            All Filters
                        </button>

                        <div className="flex justify-center items-center gap-1 py-3 px-4 max-sm:px-2 md:px-8 rounded-full group">
                            <form>
                                <select
                                    name="sort"
                                    value={query.sort}
                                    onChange={handleSortChange}
                                    className="hover:cursor-pointer"
                                >
                                    <option value="name">sort by name</option>
                                    <option value="age">sort by age</option>
                                    <option value="size">sort by size</option>
                                </select>
                            </form>
                        </div>
                    </div>

                    <div className="w-full py-10 flex flex-wrap gap-3 justify-center">
                        {petlistings.map((petlisting) => (
                            <AnimalCardWhite
                                key={petlisting.id}
                                id={petlisting.id}
                                name={petlisting?.pet?.name}
                                img={petlisting?.pet?.image1}
                                properties={`${AGE_CHOICES[(petlisting?.pet?.age ?? 1) - 1] ?? ""} • ${petlisting?.pet?.breed ?? ""}`}
                            />
                        ))}

                        {petlistings.length === 0 && "No results"}
                    </div>
                </div>

                <div className="w-full flex justify-center items-center gap-5">
                    {query.page > 1 ? (
                        <button
                            className="bg-transparent border border-primary text-primary font-bold px-5 py-3 rounded-xl hover:scale-105 active:scale-95"
                            onClick={() => {
                                const next = new URLSearchParams(searchParams);
                                next.set("page", String(query.page - 1));
                                setSearchParams(next);
                            }}
                        >
                            Prev
                        </button>
                    ) : (
                        <button className="bg-transparent border border-secondary text-secondary font-bold px-5 py-3 rounded-xl">
                            Prev
                        </button>
                    )}

                    <p>
                        Page {query.page} of {totalPage}
                    </p>

                    {query.page < totalPage ? (
                        <button
                            className="bg-transparent border border-primary text-primary font-bold px-5 py-3 rounded-xl hover:scale-105 active:scale-95"
                            onClick={() => {
                                const next = new URLSearchParams(searchParams);
                                next.set("page", String(query.page + 1));
                                setSearchParams(next);
                            }}
                        >
                            Next
                        </button>
                    ) : (
                        <button className="bg-transparent border border-secondary text-secondary font-bold px-5 py-3 rounded-xl">
                            Next
                        </button>
                    )}
                </div>
            </main>

            <FilterForm
                openFilter={openFilter}
                setOpenFilter={setOpenFilter}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
            />
        </>
    );
};

export default Index;