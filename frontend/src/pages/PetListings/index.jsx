import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import backdrop from "../../assets/images/Home/heroBanner.jpg";
import AnimalCardWhite from "../../components/AnimalCardWhite";
import FilterForm from "../../components/FilterForm";
import Pagination from "../../components/Pagination";
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

    const handleAnimalChange = (animalValue) => {
        const next = new URLSearchParams(searchParams);
        if (animalValue) next.set("animal", animalValue);
        else next.delete("animal");
        next.set("page", "1");
        setSearchParams(next);
    };

    const ANIMAL_TABS = [
        { value: "", label: "All" },
        { value: "dog", label: "Dogs" },
        { value: "cat", label: "Cats" },
        { value: "other", label: "Others" },
    ];

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
                <div className="relative w-full h-[260px] sm:h-[300px] flex justify-center items-center overflow-hidden">
                    <img
                        src={backdrop}
                        className="absolute inset-0 h-full w-full object-cover object-center"
                        alt=""
                    />
                    <div className="absolute inset-0 bg-primary/65" />
                    <p className="relative text-white text-6xl sm:text-8xl font-bold [text-shadow:0_2px_12px_rgba(0,0,0,0.45)]">
                        {query.animal ? query.animal.toUpperCase() : "ALL PETS"}
                    </p>
                </div>

                <div className="px-mobile md:px-tablet xl:px-desktop py-6">
                    {/* Controls: animal tabs (left) + filter & sort (right) */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        {/* Animal tabs */}
                        <div className="flex gap-1 p-1 bg-background-secondary rounded-full w-max max-w-full overflow-x-auto">
                            {ANIMAL_TABS.map((tab) => (
                                <button
                                    key={tab.label}
                                    onClick={() => handleAnimalChange(tab.value)}
                                    className={`text-sm sm:text-base font-semibold px-5 sm:px-7 py-2 rounded-full whitespace-nowrap transition duration-200 ${
                                        query.animal === tab.value
                                            ? "bg-primary text-white"
                                            : "text-text/70 hover:text-text"
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Filter + sort */}
                        <div className="flex items-center gap-3">
                            <button
                                className="flex items-center gap-2 bg-accent-100 text-white font-semibold max-sm:text-sm py-2.5 px-5 md:px-7 rounded-full hover:bg-accent-200 active:scale-95 transition duration-200"
                                id="all_filter_btn"
                                onClick={() => setOpenFilter(true)}
                            >
                                <i className="uil uil-filter"></i>
                                All Filters
                            </button>

                            <div className="relative">
                                <select
                                    name="sort"
                                    value={query.sort}
                                    onChange={handleSortChange}
                                    className="appearance-none hover:cursor-pointer bg-white text-text font-medium max-sm:text-sm py-2.5 pl-5 pr-10 rounded-full border border-black/10 focus:border-primary focus:outline-none"
                                >
                                    <option value="name">Sort: Name</option>
                                    <option value="age">Sort: Age</option>
                                    <option value="size">Sort: Size</option>
                                </select>
                                <i className="uil uil-angle-down absolute right-3 top-1/2 -translate-y-1/2 text-text/50 pointer-events-none text-lg"></i>
                            </div>
                        </div>
                    </div>

                    <div className="w-full py-10 flex flex-wrap gap-4 justify-center">
                        {petlistings.length > 0 ? petlistings.map((petlisting) => (
                            <AnimalCardWhite
                                key={petlisting.id}
                                id={petlisting.id}
                                name={petlisting?.pet?.name}
                                img={petlisting?.pet?.image1}
                                properties={`${AGE_CHOICES[(petlisting?.pet?.age ?? 1) - 1] ?? ""} • ${petlisting?.pet?.breed ?? ""}`}
                            />
                        )) : (
                            <p className="text-text/60 py-10">No pets found. Try adjusting your filters.</p>
                        )}
                    </div>

                    <Pagination
                        page={query.page}
                        totalPages={totalPage}
                        onChange={(p) => {
                            const next = new URLSearchParams(searchParams);
                            next.set("page", String(p));
                            setSearchParams(next);
                        }}
                    />
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